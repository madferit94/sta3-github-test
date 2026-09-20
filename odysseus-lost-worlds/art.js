function horse(x,y){g.save();g.translate(x-40,y+3);g.scale(.9,.9);
// Four legs, timber body, curved neck and recognizable horse silhouette.
rect(28,-16,232,15,'#352c29');rect(35,-20,222,7,'#bd9155');
for(const [lx,shade] of [[76,'#67472f'],[188,'#67472f'],[54,'#9e7246'],[165,'#9e7246']]){poly([[lx,-102],[lx+20,-102],[lx+15,-25],[lx-7,-25]],shade);rect(lx-10,-31,28,11,'#392d26');rect(lx+3,-92,4,49,'#d1a264');}
poly([[30,-177],[46,-192],[175,-188],[190,-170],[185,-103],[164,-86],[63,-89],[35,-113]],'#3b3027');
poly([[37,-176],[54,-185],[174,-181],[182,-167],[176,-109],[160,-96],[66,-98],[43,-117]],'#a27848');
for(let j=0;j<8;j++){let yy=-174+j*9;rect(46,yy,126,3,j%2?'#c39457':'#64472f');for(let i=0;i<4;i++)rect(54+i*31+(j%2)*6,yy+4,15,1,'#775537');}
// Neck, muzzle, ears, mane and bronze bridle.
poly([[146,-164],[169,-199],[175,-236],[199,-253],[238,-242],[253,-223],[274,-218],[274,-200],[255,-191],[224,-204],[211,-177],[190,-122]],'#4a3528');
poly([[159,-166],[180,-201],[182,-234],[202,-243],[231,-234],[244,-216],[263,-210],[265,-201],[253,-199],[223,-214],[204,-181],[184,-134]],'#b58a51');
poly([[192,-244],[190,-264],[201,-258],[205,-242]],'#c79b60');poly([[211,-244],[216,-260],[224,-255],[223,-239]],'#8d633b');
for(let j=0;j<6;j++)rect(171-j*3,-229+j*14,9,16,'#44352b');
rect(223,-229,10,8,'#332b27');rect(225,-228,3,3,'#e4c58a');rect(258,-207,5,4,'#403029');
poly([[237,-228],[242,-225],[229,-204],[225,-207]],'#d2ad6d');rect(248,-212,4,15,'#d8b77b');
for(let j=0;j<4;j++)rect(186-j*5,-215+j*18,23,2,'#775438');
// Riveted reinforcing straps and diagonal supports.
for(const lx of [58,151]){rect(lx,-184,8,90,'#5c4e39');for(let j=0;j<5;j++)rect(lx+2,-179+j*18,3,3,'#deba78');}
poly([[43,-168],[48,-174],[172,-113],[168,-107]],'#d0a269');poly([[43,-116],[46,-109],[174,-169],[171,-175]],'#b78b52');
poly([[34,-179],[22,-174],[15,-136],[21,-119],[26,-125],[24,-137],[30,-165],[39,-168]],'#443126');
// Open belly hatch and rope ladder.
rect(94,-132,34,39,'#3b2c24');rect(99,-128,24,35,'#151f23');rect(94,-94,36,5,'#dfb678');
for(let j=0;j<8;j++){rect(97-j*2,-91+j*10,3,12,'#dec18d');rect(124-j*2,-91+j*10,3,12,'#dec18d');rect(97-j*2,-85+j*10,28,4,'#ad8050');}
for(const wx of [57,214]){g.fillStyle='#2d2926';g.beginPath();g.arc(wx,0,23,0,Math.PI*2);g.fill();g.strokeStyle='#bc925b';g.lineWidth=5;g.beginPath();g.arc(wx,0,17,0,Math.PI*2);g.stroke();for(let j=0;j<6;j++){g.save();g.translate(wx,0);g.rotate(j*Math.PI/3);rect(-2,-17,4,34,'#8c673f');g.restore();}rect(wx-5,-5,10,10,'#dfbc7d');}
g.restore();}
function drawAthena(){const elapsed=2.7-divine,impact=elapsed>=.8,fade=Math.min(1,elapsed*5,divine*3);g.save();g.globalAlpha=fade;rect(0,95,960,390,'#0c243b99');let x=clamp(athenaX-cam-athenaFace*100,155,795);let y=430-Math.min(elapsed/.8,1)*15;
// A radiant full-body apparition: crested helm, bronze armor, white peplos, shield and spear.
for(let i=0;i<12;i++){const a=i*Math.PI/6+time*.12;g.strokeStyle='#e8d39635';g.lineWidth=3;g.beginPath();g.moveTo(x+Math.cos(a)*76,270+Math.sin(a)*76);g.lineTo(x+Math.cos(a)*150,270+Math.sin(a)*150);g.stroke();}
g.translate(x,y);g.scale(athenaFace*1.75,1.75);
poly([[-24,-100],[-40,-38],[-35,-8],[0,0],[24,-11],[26,-103]],'#447c93');
poly([[-15,-82],[13,-82],[26,-3],[-27,-3]],'#f0e6c8');poly([[-9,-79],[-2,-77],[-8,-6],[-19,-6]],'#9fc7c5');poly([[5,-79],[13,-77],[19,-6],[10,-6]],'#c8d8cc');rect(-27,-8,53,5,'#d5b374');
rect(-16,-115,34,35,'#c4a05e');rect(-12,-111,25,6,'#f0dca0');rect(-13,-89,27,5,'#6e6550');rect(-15,-82,32,6,'#e5c57e');
poly([[-16,-113],[-27,-105],[-25,-83],[-18,-83],[-16,-103]],'#f0d5ae');
rect(-11,-137,25,24,'#f3d4ad');rect(-13,-140,7,32,'#726e59');rect(9,-133,6,25,'#7c775e');rect(-8,-148,26,13,'#d8b971');rect(-15,-141,31,6,'#edcf89');rect(-12,-141,5,23,'#b6975a');rect(3,-133,6,3,'#32545c');rect(5,-121,7,2,'#aa8166');
poly([[-13,-147],[-14,-158],[-4,-167],[15,-165],[26,-152],[23,-135],[16,-144],[10,-153],[-4,-152]],'#f2e4be');poly([[-8,-156],[2,-162],[16,-158],[22,-151],[16,-152],[5,-156]],'#9bcacc');
// Shield carries Athena's owl.
g.fillStyle='#d4b675';g.beginPath();g.ellipse(-23,-84,20,27,0,0,Math.PI*2);g.fill();g.fillStyle='#315b69';g.beginPath();g.ellipse(-23,-84,15,22,0,0,Math.PI*2);g.fill();rect(-33,-93,9,9,'#ecdbac');rect(-22,-93,9,9,'#ecdbac');rect(-30,-90,3,4,'#294956');rect(-19,-90,3,4,'#294956');poly([[-27,-81],[-19,-81],[-23,-73]],'#ecdbac');
let thrust=impact?19:0;rect(15,-110,17+thrust,8,'#d8bd91');rect(28+thrust,-150,4,146,'#e9d59a');poly([[25+thrust,-150],[30+thrust,-170],[36+thrust,-150],[30+thrust,-140]],'#f7fff0');
g.restore();if(impact)drawDivineImpact(elapsed-.8,fade);text('ATHENA',480,126,20,'#e9e9c4','center');text(impact?"ATHENA'S JUDGMENT":'I WILL GUIDE YOU HOME.',480,157,23,'#fff0bb','center');}
