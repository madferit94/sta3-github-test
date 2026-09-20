// Face feedback has its own clock and never interrupts enemy movement or attacks.
function setExpression(a,mood,duration){a.faceMood=mood;a.faceTime=duration;}
function tickExpression(a,dt){a.faceTime=Math.max(0,(a.faceTime||0)-dt);}
function expressionFor(a,player=false){
 if(a.faceTime>0)return a.faceMood;
 if(a.hp===0)return 'defeated';
 if(a.enraged)return 'rage';
 if(a.hp<(player?(a.maxHP||100):a.max)*.3)return 'strained';
 if(player&&(isBlocking()||attack>0||a.airTime>0)||!player&&(a.wind>0||a.dash>0))return 'focus';
 return 'calm';
}
function drawExpression(a,player,skin,oneEye){
 const mood=expressionFor(a,player),ink='#263039';
 rect(-5,-60,18,14,skin);
 const eyeXs=oneEye?[2]:[-3,7],blink=mood==='calm'&&(time+(a.x||0)*.007)%4.1<.12;
 for(const ex of eyeXs){
  const ew=oneEye?9:5;
  if(mood==='pain'||mood==='defeated'){
   g.strokeStyle=ink;g.lineWidth=2;g.beginPath();g.moveTo(ex,-59);g.lineTo(ex+ew,-55);g.moveTo(ex+ew,-59);g.lineTo(ex,-55);g.stroke();
  }else if(mood==='relief'||mood==='guard'||blink){
   rect(ex,-56,ew,2,ink);if(mood==='guard')rect(ex+1,-59,ew,1,ink);
  }else{
   rect(ex,-59,ew,mood==='shock'?7:5,mood==='rage'?'#ffdfbc':'#fff2d0');
   rect(ex+(oneEye?4:2),-58,mood==='shock'?2:3,mood==='shock'?4:3,ink);
   if(['focus','rage','strained'].includes(mood))poly([[ex-1,-62],[ex+ew+1,-59],[ex+ew+1,-57],[ex-1,-60]],ink);
  }
 }
 if(mood==='shock')ellipse(5,-47,3,4,ink);
 else if(mood==='pain'||mood==='rage'){rect(0,-50,11,5,ink);rect(1,-49,8,2,'#fff0d2');}
 else if(mood==='relief'||mood==='guard'){rect(0,-48,3,2,ink);rect(3,-46,7,2,ink);rect(9,-48,2,2,ink);}
 else if(mood==='strained'||mood==='defeated'){rect(2,-49,7,2,ink);rect(0,-47,3,2,ink);rect(9,-47,2,2,ink);rect(13,-57,2,5,'#a9eaff');}
 else rect(3,-47,7,2,ink);
 if(mood==='shock'){rect(15,-64,2,4,'#c7f7ff');rect(18,-60,2,4,'#c7f7ff');}
}
function drawHeroMarker(x,groundY,z){
 g.save();g.strokeStyle='#e7ca83';g.lineWidth=2;g.beginPath();g.ellipse(x,groundY+1,29-z*.1,8-z*.02,0,0,Math.PI*2);g.stroke();
 const y=groundY-z-115;
 rect(x-38,y-15,76,16,'#0b263be6');text('ODYSSEUS',x,y-3,11,'#d4faff','center');
 poly([[x-5,y+4],[x+5,y+4],[x,y+10]],'#ffe29b');g.restore();
}
const JUMP_DURATION=.72,JUMP_HEIGHT=72;
function jump(){
 if(!p||state!=='play'||cutscene||stage===10||divine>0||attack>0||p.airTime>0||p.jumpCooldown>0)return false;
 p.airTime=JUMP_DURATION;p.z=0;queued=false;setExpression(p,'focus',JUMP_DURATION);
 burst(p.x,p.y,'#c1c8b2',7,.35);tone(260,.18,'triangle',.025,540);return true;
}
function updateJump(dt){
 if(p.airTime>0){p.airTime=Math.max(0,p.airTime-dt);const t=1-p.airTime/JUMP_DURATION;p.z=4*JUMP_HEIGHT*t*(1-t);
  if(p.airTime===0){p.z=0;p.jumpCooldown=.28;burst(p.x,p.y,'#bdc7b7',8,.4);tone(85,.07,'triangle',.02);}
 }else p.jumpCooldown=Math.max(0,(p.jumpCooldown||0)-dt);
}
function jumpEvades(kind){
 // Height matters: aerial magic, tall fire and vortices remain dangerous.
 const clearance={melee:32,charge:56,arrow:22,rock:30,wave:52,shock:24,slam:36,trap:24,counter:36,stab:36,swordcut:36};
 return p.airTime>0&&clearance[kind]!==undefined&&p.z>=clearance[kind];
}
