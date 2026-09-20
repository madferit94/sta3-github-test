// A fictional Three Kingdoms encounter: commander Cao Cao and the banners of Wei.
function queueCaoCaoAttack(e){
 if(e.mode==='sword')hazards.push({kind:'swordcut',bossAttack:true,sourceX:e.x,x:e.x+e.face*105,y:e.targetY,r:125,delay:e.wind,life:e.wind+.3,damage:enemyDamage(e,22),hit:false});
 if(e.mode==='ambush')for(let i=0;i<(e.enraged?3:2);i++){
  const delay=e.wind+i*.35;
  hazards.push({kind:'arrowrain',bossAttack:true,sourceX:e.x,x:clamp(e.targetX+(i===0?0:i===1?110:-110),60,880),y:clamp(e.targetY+(i%2?25:0),338,464),r:70,delay,life:delay+.35,damage:enemyDamage(e,19),hit:false});
 }
}
function drawWeiCamp(){
 rect(0,283,960,42,'#3b3939');
 for(let i=0;i<27;i++){const x=i*38;poly([[x,319],[x,280],[x+8,267],[x+16,280],[x+16,319]],'#6e5b43');rect(x+3,281,3,38,'#a28a60');}
 for(const x of [45,660]){poly([[x,283],[x+110,180],[x+220,283]],'#403a3a');poly([[x+110,187],[x+183,283],[x+75,283]],'#6c343a');rect(x+97,238,35,59,'#1b2429');rect(x+27,280,164,6,'#bc9c65');}
 rect(362,264,224,49,'#473d36');rect(349,305,250,11,'#ac8a5c');rect(342,316,264,7,'#6c5744');
 for(const [x,side] of [[270,1],[622,-1]]){
  rect(x,143,5,180,'#c2a36d');poly([[x-7,147],[x+2,126],[x+11,147]],'#dac6a0');
  const flutter=Math.sin(time*2+x)*5;
  poly([[x+5,153],[x+73*side,158+flutter],[x+68*side,242],[x+42*side,229],[x+5,239]],'#702f3a');
  poly([[x+9*side,162],[x+62*side,166+flutter],[x+58*side,225],[x+9*side,228]],'#222c33');
  text('魏',x+35*side,199,27,'#e2c18a','center');text('WEI',x+35*side,218,10,'#d1b381','center');
 }
}
function drawCaoCao(a){
 const x=Math.round(a.x-cam),y=Math.round(a.y),scale=1.72,step=Math.sin(a.walk||0)*3;
 ellipse(x,y,37,8,'#14232a99');g.save();g.translate(x,y);g.scale(a.face*scale,scale);
 // Crimson commander's cloak, dark lamellar plates, gold fittings and a straight sword.
 poly([[-17,-49],[-34,-16-Math.sin(time*5)*4],[-25,-2],[-9,-7],[9,-48]],'#662b38');
 poly([[-17,-46],[-28,-8],[-24,-7],[-12,-45]],'#d5a65c');
 rect(-11,-19,8,17+step,'#242a2c');rect(3,-19,8,17-step,'#242a2c');rect(-14,-4+step,14,5,'#31272a');rect(2,-4-step,15,5,'#31272a');
 poly([[-14,-31],[14,-31],[21,-9],[-19,-9]],'#753e42');
 rect(-15,-46,31,29,'#3a4650');
 for(let row=0;row<4;row++)for(let col=0;col<5;col++){rect(-12+col*6,-43+row*6,5,4,row%2?'#677076':'#515b63');rect(-11+col*6,-43+row*6,1,1,'#ceb47b');}
 poly([[-19,-47],[-6,-51],[-4,-40],[-21,-36]],'#b4935e');poly([[9,-50],[22,-46],[23,-37],[12,-40]],'#b4935e');
 rect(-15,-23,33,5,'#cfaf69');rect(-2,-24,9,7,'#e8cf8c');rect(0,-22,5,3,'#773a40');
 const skin='#ccaa87';rect(-8,-67,23,23,skin);rect(-11,-67,5,23,'#26262a');rect(13,-67,5,24,'#26262a');
 // Tall black court cap; no magical staff or sage hat.
 rect(-10,-75,26,10,'#202933');rect(-6,-88,16,17,'#1b222b');rect(-11,-70,28,4,'#b99458');rect(-3,-86,2,12,'#6d6250');rect(5,-86,2,12,'#6d6250');rect(-1,-72,7,6,'#d4b677');
 drawExpression(a,false,skin,false);
 poly([[-1,-51],[4,-53],[7,-51],[13,-49],[10,-47],[5,-49],[0,-48]],'#29262a');
 poly([[-3,-44],[4,-41],[12,-44],[10,-34],[5,-28],[-1,-35]],'#29262a');rect(4,-40,2,8,'#56504b');
 rect(13,-39,8,17,skin);rect(-18,-38,6,15,skin);
 const raised=a.wind>0||a.dash>0;
 if(raised){rect(18,-39,16,6,skin);rect(32,-42,5,13,'#c9a867');poly([[37,-39],[77,-43],[85,-37],[77,-33],[37,-34]],'#e3e7d7');rect(39,-37,34,2,'#a2bfc7');}
 else{rect(22,-51,3,35,'#c7d8da');poly([[22,-51],[24,-63],[26,-51]],'#e7eddf');rect(17,-20,14,4,'#d7b871');rect(22,-16,4,10,'#71343c');}
 if(a.hit>0){g.globalAlpha=.45;rect(-15,-46,31,29,'#fff2c5');g.globalAlpha=1;}
 g.restore();
 if(a.enraged){g.strokeStyle='#f28e63';g.lineWidth=3;g.beginPath();g.ellipse(x,y-75,52,88,0,0,Math.PI*2);g.stroke();}
}
function drawCaoCaoHazard(h){
 const x=h.x-cam,y=h.y,warn=h.delay>0;
 ellipse(x,y,h.r,h.r*.4,warn?'#be53424d':'#ffe0a788');
 g.strokeStyle=warn?'#f6bd81':'#ffe8b9';g.lineWidth=3;g.beginPath();g.ellipse(x,y,h.r,h.r*.4,0,0,Math.PI*2);g.stroke();
 if(warn)text(h.kind==='arrowrain'?'AMBUSH — ARROWS':'SWORD STRIKE',x,y+5,10,'#ffe2b7','center');
 if(h.kind==='arrowrain'&&h.delay<.45){
  const drop=Math.max(0,Math.min(1,(.45-h.delay)/.45));
  for(let i=0;i<7;i++){const xx=x-48+i*16,yy=y-260*(1-drop)-20+(i%2)*12;
   rect(xx,yy-33,2,31,'#e2cf9e');poly([[xx-4,yy-4],[xx+6,yy-4],[xx+1,yy+6]],'#eaf0df');rect(xx-3,yy-32,8,5,'#773d41');
  }
 }else if(h.kind==='swordcut'&&!warn){
  g.strokeStyle='#f9eac2';g.lineWidth=11;g.beginPath();g.ellipse(x,y-25,h.r*.8,45,-.2,Math.PI,Math.PI*2);g.stroke();
 }
}
