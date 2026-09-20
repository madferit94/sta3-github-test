function olympianStrike(){
 athenaStruck=true;const zeus=activeGod==='zeus';
 for(const e of enemies)if(!e.dead&&(zeus?e.x>=cam&&e.x<=cam+960:Math.abs(e.x-athenaX)<290&&Math.abs(e.y-athenaY)<150)){
  damage(e,zeus?125:180,zeus?10:65,true);burst(e.x,e.y-35,zeus?'#d4f9ff':'#bcffe8',34,1.8);
 }
 projectiles=[];hazards=[];freeze=.14;flash=.32;shake=zeus?19:15;
 rings.push({x:athenaX,y:athenaY,life:1.2,max:1.2});noise(zeus?.5:.38,.09);
 tone(zeus?110:220,.65,zeus?'sawtooth':'triangle',.07,zeus?26:880);tone(zeus?1400:1174,.5,'triangle',.06,zeus?110:587);
}
function hermesWing(x,y,side=1){
 g.save();g.translate(x,y);g.scale(side,1);
 poly([[0,4],[8,-2],[22,-16],[21,-5],[29,-11],[26,0],[17,9],[3,12]],'#f5fff1');
 for(let i=0;i<3;i++)poly([[4+i*4,7],[15+i*4,-3-i*3],[10+i*4,7-i]],'#a8dbd3');g.restore();
}
function drawHermesBody(x,y,face,alpha=1){
 g.save();g.globalAlpha*=alpha;g.translate(x,y);g.scale(face*1.85,1.85);
 const flutter=Math.sin(time*12)*5;
 // Travelling cloak, short tunic, winged petasos and winged sandals.
 poly([[-16,-103],[-56-flutter,-74],[-72-flutter,-28],[-30,-47],[7,-92]],'#439e9c');
 poly([[-20,-92],[-52-flutter,-35],[-41,-48],[-12,-91]],'#b0f0d7');
 rect(-15,-33,10,29,'#dfb68b');rect(5,-34,10,34,'#ecc597');
 poly([[-15,-102],[16,-102],[23,-35],[-20,-35]],'#f1ecd4');
 poly([[-11,-99],[-4,-99],[16,-42],[9,-37]],'#6cbab4');rect(-15,-64,33,6,'#d8b867');
 rect(-18,-7,17,7,'#a67942');rect(3,-4,20,7,'#a67942');
 hermesWing(-12,-10,-1);hermesWing(11,-6,1);
 rect(-10,-134,24,29,'#ecc597');rect(-12,-136,7,22,'#735638');
 ellipse(1,-136,27,5,'#e5c57e');poly([[-18,-138],[-11,-149],[10,-150],[18,-138]],'#c6a765');rect(-9,-146,16,3,'#f9df9b');
 hermesWing(-13,-143,-1);hermesWing(12,-143,1);
 rect(-1,-125,4,3,'#32484c');rect(8,-125,4,3,'#32484c');rect(4,-114,7,2,'#8e5e42');
 rect(-25,-102,10,34,'#e5b88d');rect(14,-104,24,9,'#e5b88d');
 // Caduceus: intertwined serpents and a winged crown.
 rect(38,-131,4,105,'#f3d184');ellipse(40,-138,5,5,'#ffedaa');hermesWing(38,-131,-1);hermesWing(42,-131,1);
 for(let i=0;i<4;i++){g.strokeStyle=i%2?'#e4be6f':'#baf9df';g.lineWidth=3;g.beginPath();g.ellipse(40,-114+i*12,9,8,0,i%2?0:Math.PI,i%2?Math.PI:Math.PI*2);g.stroke();}
 g.restore();
}
function drawOlympian(){
 const zeus=activeGod==='zeus',elapsed=2.7-divine,impact=elapsed>=.8,fade=Math.min(1,elapsed*5,divine*3);
 const gx=clamp(athenaX-cam-athenaFace*115,155,795),gy=408-Math.sin(elapsed*4)*5;
 g.save();g.globalAlpha=fade;rect(0,95,960,391,zeus?'#071b42ba':'#072d35bb');
 ellipse(gx,270,92+Math.sin(time*6)*6,140,zeus?'#9fe9ff22':'#9effd82b');
 if(zeus){
  g.save();g.translate(gx,gy);g.scale(athenaFace*1.85,1.85);
  poly([[-26,-112],[-43,-12],[-20,0],[30,-8],[27,-109]],'#76b8d0');
  poly([[-17,-97],[17,-97],[30,-2],[-28,-2]],'#e8f4ee');poly([[-4,-96],[5,-94],[16,-7],[2,-7]],'#82aebb');
  rect(-11,-139,25,30,'#efc79b');rect(-13,-145,29,13,'#e7f3ed');rect(-15,-138,8,26,'#d8eeef');rect(10,-137,8,28,'#d8eeef');
  poly([[-7,-117],[13,-119],[7,-94],[-3,-96]],'#efffff');for(let i=0;i<3;i++)rect(-8+i*9,-153,5,13,'#f3db8d');
  rect(4,-130,6,3,'#568d99');rect(-25,-107,9,33,'#eac597');rect(17,-111,27,9,'#eac597');
  poly([[42,-156],[24,-125],[37,-125],[27,-96],[55,-134],[40,-132],[52,-156]],'#e5ffff');g.restore();
 }else{
  if(impact)for(let i=3;i>=1;i--)drawHermesBody(gx-athenaFace*i*32,gy+i*3,athenaFace,.08*(4-i));
  drawHermesBody(gx,gy,athenaFace,1);
 }
 if(impact){const t=elapsed-.8;
  if(zeus){
   for(let i=0;i<7;i++){const x=75+i*137+Math.sin(i*2)*17,y=355+(i%3)*42,jitter=Math.sin(Math.floor(t*22)+i)*19;
    g.globalAlpha=fade*(.48+.48*Math.abs(Math.sin(t*13+i)));poly([[x-16,96],[x+18,96],[x-9+jitter,207],[x+26,195],[x-16,y-58],[x+15,y-67],[x-4,y],[x+2,y-101],[x-26,y-92],[x-2,228],[x-34,234]],'#c1f9ff');
    ellipse(x,y,45+t*23,12,'#a1e5ff88');ellipse(x,y-8,14,35,'#ffffffaa');
   }
  }else{
   const cx=athenaX-cam,cy=athenaY-30,exp=Math.min(1,t*5);g.globalAlpha=fade;
   ellipse(cx,cy,exp*290,exp*82,'#9affe333');
   for(const side of [-1,1]){
    const reach=75+Math.min(230,t*580);
    poly([[cx,cy-8],[cx+side*(reach-45),cy-47],[cx+side*reach,cy],[cx+side*(reach-45),cy+38],[cx,cy+9]],'#d0fff1a8');
    poly([[cx+side*50,cy-2],[cx+side*(reach-35),cy-20],[cx+side*(reach+13),cy],[cx+side*(reach-35),cy+12]],'#f4fff4c9');
   }
   for(let i=0;i<17;i++){
    const phase=(t*1.5+i/17)%1,x=cx-300+phase*600,y=cy-68+(i%5)*31;
    poly([[x-30,y+5],[x+15,y-4],[x+31,y],[x-12,y+9]],i%3?'#baffdcaa':'#ffecb2cc');
   }
   for(let i=0;i<3;i++){g.strokeStyle=i%2?'#fff2b0':'#bdffea';g.lineWidth=5-i;g.beginPath();g.ellipse(cx,athenaY,30+((t*360+i*60)%285),12+((t*95+i*16)%68),0,0,Math.PI*2);g.stroke();}
  }
 }
 g.restore();text(zeus?'ZEUS':'HERMES',480,126,20,zeus?'#ddffff':'#d9ffed','center');
 text(impact?(zeus?'THUNDER OF OLYMPUS':'WINGS OF DELIVERANCE'):(zeus?'THE SKY ANSWERS YOUR CALL.':'I WILL GUIDE YOU HOME.'),480,156,21,zeus?'#c9faff':'#e9ffcf','center');
}
