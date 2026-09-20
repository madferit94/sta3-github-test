// Bronze Age Aegean-inspired weapons. Reach and tempo differ; sustained damage is comparable.
const WEAPONS={
 1:{id:'sword',name:'BRONZE SWORD',korean:'청동검',damage:[17,17,30],duration:[.24,.24,.35],reach:100,depth:32,knock:[8,8,32],color:'#ffdf95'},
 2:{id:'spear',name:'BRONZE SPEAR',korean:'청동창',damage:[18,18,32],duration:[.27,.27,.34],reach:145,depth:23,knock:[10,10,28],color:'#bfe6e4'},
 3:{id:'dagger',name:'BRONZE DAGGER',korean:'청동단검',damage:[15,15,26],duration:[.22,.22,.29],reach:78,depth:35,knock:[6,6,24],color:'#ffd2a1'}
};
function currentWeapon(){return WEAPONS[p?.weapon||1];}
function syncWeaponGuide(){
 const slot=p?.weapon||1;
 for(const prefix of ['weapon-','weapon-en-'])for(const n of [1,2,3])document.getElementById(prefix+n)?.setAttribute('aria-pressed',String(n===slot));
 const status=document.getElementById('weapon-current');if(status)status.textContent=currentWeapon().korean;const english=document.getElementById('weapon-en-current');if(english)english.textContent=currentWeapon().name;syncProgressGuide();
}
function applyWeapon(slot){p.weapon=slot;p.pendingWeapon=0;combo=0;comboUntil=0;queued=false;syncWeaponGuide();label(WEAPONS[slot].name,p.x,p.y-110,WEAPONS[slot].color);tone(420+slot*90,.08,'triangle',.03);}
function switchWeapon(slot){
 if(!WEAPONS[slot]||!p||state!=='play'||cutscene||divine>0||stage===10)return false;
 if(slot===p.weapon){p.pendingWeapon=0;return true;}
 if(attack>0){p.pendingWeapon=slot;return true;}applyWeapon(slot);return true;
}
function inputKey(event){
 return {Space:' ',KeyA:'a',KeyS:'s',KeyQ:'q',KeyW:'w',KeyE:'e',KeyR:'r',Digit1:'1',Digit2:'2',Digit3:'3',Numpad1:'1',Numpad2:'2',Numpad3:'3'}[event.code]||(event.key.length===1?event.key.toLowerCase():event.key);
}
function bindWeaponGuide(){for(const prefix of ['weapon-','weapon-en-'])for(const n of [1,2,3]){const button=document.getElementById(prefix+n);if(button)button.onclick=()=>{switchWeapon(n);canvas.focus();};}syncWeaponGuide();}
function drawHeroWeapon(){
 const w=currentWeapon(),striking=attack>0&&!isBlocking(),thrust=striking?Math.sin(Math.min(1,attack/w.duration[Math.max(0,combo-1)])*Math.PI)*9:0;
 g.save();
 if(w.id==='spear'){
  if(striking){g.translate(18+thrust,-40);g.rotate(Math.PI/2);}else g.translate(24,-13);
  rect(-2,-82,4,102,'#8f613d');rect(-1,-81,1,99,'#d1ac71');
  poly([[-2,-83],[-10,-97],[0,-121],[10,-97],[2,-83]],'#d5b473');rect(-1,-110,2,27,'#fff0b3');
  for(let i=0;i<3;i++)rect(-3,-81+i*4,6,2,'#ead29b');
 }else{
  g.translate(striking?19+thrust:23,striking?-40:-22);if(striking)g.rotate(Math.PI/2);
  const length=w.id==='dagger'?32:54,width=w.id==='dagger'?6:8;
  poly([[-3,0],[-width,-length*.45],[-width+2,-length*.72],[0,-length],[width-2,-length*.72],[width,-length*.45],[3,0]],'#c99e58');
  poly([[0,-length],[3,-length*.44],[0,-2],[-2,-length*.44]],'#fff0b5');
  rect(-9,0,18,4,'#c9aa6b');rect(-3,4,6,13,'#855037');rect(-5,17,10,4,'#e1c080');rect(-1,7,2,2,'#e3be7e');
 }
 g.restore();
}
function drawWeaponTrail(x,y){
 const w=currentWeapon();g.save();g.translate(x,y-34);g.scale(p.face,1);g.strokeStyle=w.color;g.lineWidth=combo===3?8:4;
 if(w.id==='spear'){
  poly([[26,-3],[w.reach-18,-6],[w.reach+3,0],[w.reach-18,6],[26,3]],combo===3?'#fff2cabb':'#c2ebeb99');
 }else{g.beginPath();g.ellipse(20,0,w.id==='dagger'?51:combo===3?81:68,w.id==='dagger'?26:36,0,-1.4,1.4);g.stroke();}
 g.restore();
}
