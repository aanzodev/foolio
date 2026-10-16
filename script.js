(function(){
  for(var i=0;i<45;i++){var s=document.createElement('div'),z=2+Math.random()*3;
    s.className='star';s.style.cssText='width:'+z+'px;height:'+z+'px;left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;opacity:'+(.4+Math.random()*.6);
    document.body.appendChild(s);}
  var au=document.getElementById('au'),pp=document.getElementById('pp'),ico=document.getElementById('ico'),
  fill=document.getElementById('fill'),cur=document.getElementById('cur'),dur=document.getElementById('dur'),bar=document.getElementById('bar');
  var P='M8 5v14l11-7z',U='M6 5h4v14H6zm8 0h4v14h-4z';
  function f(t){t=Math.floor(t||0);return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}
  pp.onclick=function(){ if(!au.getAttribute('src'))return; au.paused?au.play():au.pause(); };
  au.onplay=function(){ico.firstChild.setAttribute('d',U)};
  au.onpause=function(){ico.firstChild.setAttribute('d',P)};
  au.onloadedmetadata=function(){dur.textContent=f(au.duration)};
  au.ontimeupdate=function(){cur.textContent=f(au.currentTime);fill.style.width=(au.currentTime/au.duration*100||0)+'%'};
  bar.onclick=function(e){ if(au.duration){var r=bar.getBoundingClientRect();au.currentTime=(e.clientX-r.left)/r.width*au.duration;} };
})();
/* ===== VIEW COUNTER: change this to something unique to you ===== */
const COUNTER_NAME = 'yourname-portfolio';
(async function(){
  try{
    const r = await fetch('https://abacus.jasoncameron.dev/hit/' + COUNTER_NAME + '/views');
    const d = await r.json();
    document.getElementById('views').textContent = d.value;
  }catch(e){}
})();

/* ===== PUT YOUR DISCORD USER ID HERE ===== */
const DISCORD_ID = '1387162307385233408';

const colors = {online:'#3ba55d', idle:'#faa81a', dnd:'#ed4245', offline:'#8a8a98'};
async function updateStatus(){
  if(!DISCORD_ID) return;
  try{
    const r = await fetch('https://api.lanyard.rest/v1/users/' + DISCORD_ID);
    const {data} = await r.json();
    const u = data.discord_user;
    const av = document.querySelector('.av');
    if(u.avatar){
      av.style.background = 'url(https://cdn.discordapp.com/avatars/'+u.id+'/'+u.avatar+'.png?size=128) center/cover';
      av.firstChild.textContent = '';
    }
    document.querySelector('.nm').firstChild.textContent = u.username + ' ';
    document.querySelector('.av i').style.background = colors[data.discord_status];
    const act = data.activities.find(a => a.type !== 4);
    document.querySelector('.seen').textContent = act ? 'playing ' + act.name : data.discord_status;
  }catch(e){}
}
updateStatus();
setInterval(updateStatus, 30000);
