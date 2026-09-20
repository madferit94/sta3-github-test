// One page load counts once. Refreshing the count or retrying a request reuses its ID.
const pageViewId=crypto.randomUUID();
let pageViewCount=null,pageViewBusy=false,pageViewFailed=false;
function refreshViewsLabel(){
 const el=document.getElementById('site-views'),ko=controlLanguage==='ko';
 el.textContent=pageViewCount!==null?(ko?'조회수: ':'Views: ')+pageViewCount.toLocaleString(ko?'ko-KR':'en-US'):pageViewFailed?(ko?'조회수 재시도':'Retry views'):(ko?'조회수: …':'Views: …');
 el.title=ko?'새로고침을 포함한 페이지 조회수입니다. 클릭하면 집계를 다시 확인합니다.':'Page loads, including reloads. Click to refresh the count.';
 document.getElementById('views-note').textContent=ko?'2026.09.11부터 집계':'Since Sep 11, 2026';
 el.disabled=pageViewBusy;
}
async function loadPageViews(){
 if(pageViewBusy)return;
 pageViewBusy=true;pageViewFailed=false;refreshViewsLabel();
 try{
  const response=await fetch('/api/views',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({pageId:pageViewId})});
  if(!response.ok)throw Error('Views unavailable');
  const data=await response.json();if(!Number.isSafeInteger(data.views)||data.views<0)throw Error('Invalid count');
  pageViewCount=data.views;
 }catch{pageViewFailed=true;}
 finally{pageViewBusy=false;refreshViewsLabel();}
}
document.getElementById('site-views').onclick=loadPageViews;
const pageViewsLoading=loadPageViews();
