// Deploy as a Supabase Edge Function named "application-confirmation".
// Required secrets: RESEND_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY,
// SUPABASE_SERVICE_ROLE_KEY. Set your verified Resend sender below.
import { createClient } from 'npm:@supabase/supabase-js@2';
const cors = {
  'Access-Control-Allow-Origin': 'https://www.varsity-stay.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
function reply(body: unknown, status=200){return new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json'}})}
const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]!));
Deno.serve(async(req)=>{
 if(req.method==='OPTIONS')return new Response(null,{headers:cors});
 if(req.method!=='POST')return reply({error:'Method not allowed'},405);
 try{
  const authorization=req.headers.get('Authorization')||'';
  if(!authorization.startsWith('Bearer '))return reply({error:'Authentication required'},401);
  const authClient=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_ANON_KEY')!,{global:{headers:{Authorization:authorization}}});
  const {data:{user},error:authError}=await authClient.auth.getUser(authorization.slice(7));
  if(authError||!user?.email||!user.email_confirmed_at)return reply({error:'Verified user required'},401);
  const {reservation_id}=await req.json();
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(reservation_id)))return reply({error:'Invalid reservation ID'},400);
  const admin=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const {data:reservation,error}=await admin.from('reservations').select('id,student_id,request_type,created_at,properties(title)').eq('id',reservation_id).eq('student_id',user.id).single();
  if(error||!reservation)return reply({error:'Application not found'},404);
  const property=Array.isArray(reservation.properties)?reservation.properties[0]:reservation.properties;
  const propertyName=String(property?.title||'your selected accommodation');
  const resendKey=Deno.env.get('RESEND_API_KEY');
  if(!resendKey)return reply({error:'Email service not configured'},503);
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${resendKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:'VarsityStay <no-reply@varsity-stay.com>',to:[user.email],subject:'VarsityStay application received',html:`<h2>Application received</h2><p>Thank you for submitting your ${escapeHtml(reservation.request_type==='viewing'?'viewing request':'accommodation application')} for <strong>${escapeHtml(propertyName)}</strong>.</p><p>Your request has been received and is awaiting review. This is not a booking confirmation.</p><p>You can view its status in your <a href="https://www.varsity-stay.com/#dashboard">VarsityStay dashboard</a>.</p><p>VarsityStay — Securing your Stay. Securing your Success.</p>`})});
  if(!result.ok){console.error('Resend error',result.status,await result.text());return reply({error:'Email provider rejected the message'},502)}
  return reply({sent:true});
 }catch(err){console.error('Application confirmation error',err);return reply({error:'Unable to send confirmation'},500)}
});
