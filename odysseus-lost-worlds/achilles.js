function achillesStrike(){
 athenaStruck=true;
 for(const e of enemies)if(!e.dead&&(e.x-athenaX)*athenaFace>-25&&(e.x-athenaX)*athenaFace<470&&Math.abs(e.y-athenaY)<95)damage(e,210,95,true);
 projectiles=[];hazards=[];freeze=.16;flash=.28;shake=21;
 burst(athenaX+athenaFace*210,athenaY-40,'#ffc170',80,2.4);burst(athenaX+athenaFace*210,athenaY-40,'#fff2ca',35,1.6);
 rings.push({x:athenaX+athenaFace*230,y:athenaY,life:1,max:1});noise(.42,.10);tone(85,.55,'sawtooth',.07,30);tone(740,.45,'triangle',.05,185);
}
function drawAchillesBody(x,y,face,alpha=1,lunge=false){
 g.save();g.globalAlpha*=alpha;g.translate(x,y);g.scale(face*1.7,1.7);
 poly([[-22,-108],[-42,-66],[-65,-19],[-25,-35],[5,-89]],'#9c3d48');poly([[-28,-93],[-53,-25],[-45,-28],[-18,-81]],'#df8d6d');
 rect(-15,-40,11,31,'#d8ad7d');rect(7,-38,12,34,'#e5bb89');rect(-20,-12,19,11,'#a8854d');rect(4,-8,22,9,'#a8854d');
 rect(-21,-108,44,61,'#bf9957');poly([[-20,-105],[-2,-100],[1,-63],[-17,-69]],'#f0cf8e');poly([[1,-101],[20,-106],[20,-70],[5,-62]],'#deb46a');rect(-20,-58,44,8,'#654b3a');
 for(let i=0;i<5;i++)rect(-21+i*9,-49,7,17,'#b44744');
 rect(-12,-139,26,32,'#e7bd90');rect(-18,-145,36,15,'#e9c276');rect(-18,-136,8,31,'#c79850');rect(10,-129,7,19,'#ac7a3c');
 poly([[-16,-145],[-22,-159],[-12,-177],[8,-183],[27,-168],[25,-145],[12,-157],[-2,-163]],'#d7574d');
 rect(-2,-128,5,3,'#283640');rect(5,-128,5,3,'#283640');rect(0,-116,8,2,'#8b573a');
 rect(20,-104,lunge?42:28,10,'#e6b982');
 // Broad bronze shield and a long, level spear distinguish the summoned warrior.
 ellipse(-19,-81,28,33,'#544332');ellipse(-19,-81,25,30,'#d8b469');ellipse(-19,-81,19,24,'#633f43');
 poly([[-19,-99],[-8,-81],[-19,-63],[-30,-81]],'#f0ce85');ellipse(-19,-81,6,7,'#fff0ad');
 rect(27,-99,lunge?127:100,5,'#a77945');rect(28,-99,lunge?126:99,1,'#f8df9e');
 const tip=lunge?162:135;poly([[tip-23,-103],[tip,-97],[tip-23,-91],[tip-14,-97]],'#eff5d7');g.restore();
}
function drawAchilles(){
 const elapsed=2.7-divine,impact=elapsed>=.8,fade=Math.min(1,elapsed*5,divine*3),cx=athenaX-cam,base=clamp(cx-athenaFace*110,150,810),travel=impact?Math.min(230,(elapsed-.8)*420):0;
 const x=base+athenaFace*travel,y=425;g.save();g.globalAlpha=fade;rect(0,95,960,391,'#251d30bc');
 ellipse(base,285,100,155,'#ffb66c22');
 if(impact){
  for(let i=3;i>=1;i--)drawAchillesBody(x-athenaFace*i*45,y,athenaFace,.09*(4-i),true);
  const reach=Math.min(470,90+(elapsed-.8)*950),sy=athenaY-42;
  poly([[cx,sy-10],[cx+athenaFace*(reach-80),sy-32],[cx+athenaFace*reach,sy],[cx+athenaFace*(reach-80),sy+31],[cx,sy+10]],'#ffe3a388');
  poly([[cx+athenaFace*40,sy-3],[cx+athenaFace*(reach-35),sy-9],[cx+athenaFace*reach,sy],[cx+athenaFace*(reach-35),sy+9]],'#fff8d9');
  for(let i=0;i<12;i++){const a=i*Math.PI/6,r=32+Math.min(135,(elapsed-.8)*210);const xx=cx+athenaFace*220+Math.cos(a)*r,yy=sy+Math.sin(a)*r*.6;poly([[xx-4,yy-7],[xx+6,yy],[xx-4,yy+7]],i%2?'#ffe6b6':'#e48460');}
 }
 drawAchillesBody(x,y,athenaFace,1,impact);g.restore();text('ACHILLES',480,125,20,'#ffe2ab','center');text(impact?'SPEAR OF THE MYRMIDONS':'STAND WITH ME, ODYSSEUS.',480,156,21,'#fff0c9','center');
}
