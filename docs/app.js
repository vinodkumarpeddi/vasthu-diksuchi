{
const $=s=>document.querySelector(s);
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const T={
 app:{te:'వాస్తు దిక్సూచి',en:'Vasthu Diksuchi'},
 tCompass:{te:'దిక్సూచి',en:'Compass'},tCheck:{te:'ఇల్లు చెక్',en:'House check'},tRooms:{te:'గదులు',en:'Rooms'},tDirs:{te:'దిక్కులు',en:'Directions'},
 start:{te:'దిక్సూచి ప్రారంభించండి',en:'Start compass'},hold:{te:'ఈ దిశను నిలుపు',en:'Hold reading'},resume:{te:'మళ్లీ కదిలించు',en:'Resume'},
 manual:{te:'దిక్సూచి సెన్సార్ దొరకలేదు. దిశను చేతితో ఎంచుకోండి.',en:'No compass sensor found. Set the direction by hand.'},
 calib:{te:'ఫోన్‌ను అడ్డంగా సమతలంగా పట్టుకోండి. రీడింగ్ కదులుతూ ఉంటే ఫోన్‌ను గాలిలో 8 ఆకారంలో తిప్పండి. ఇనుము, అయస్కాంతాలు, విద్యుత్ పరికరాలకు దూరంగా ఉండండి.',en:'Hold the phone flat. If the reading jumps, move the phone in a figure-8 to calibrate. Keep away from iron, magnets and electrical appliances.'},
 deity:{te:'దిక్పాలకుడు',en:'Deity'},planet:{te:'గ్రహం',en:'Planet'},element:{te:'పంచభూతం',en:'Element'},suits:{te:'అనుకూలం',en:'Suits'},avoid:{te:'వద్దు',en:'Avoid'},fix:{te:'సూచన',en:'Tip'},
 checkTitle:{te:'అద్దె / కొత్త ఇల్లు వాస్తు చెక్',en:'On-site Vasthu check'},
 checkIntro:{te:'ఇంటిని చూసేటప్పుడే ఈ మూడు దశలు చేయండి. చివరలో ఇల్లు వాస్తు ప్రకారం ఉందో లేదో స్పష్టమైన ఫలితం వస్తుంది.',en:'Do these three steps while you are at the house. At the end you get a clear answer: is it as per Vasthu or not.'},
 hname:{te:'ఇంటి పేరు / చిరునామా (ఐచ్ఛికం)',en:'House name / address (optional)'},
 step1:{te:'1. ఇంటి ముఖం (ముఖద్వారం)',en:'1. House facing (main door)'},
 doorHow:{te:'ఇంటి లోపల ముఖద్వారం వద్ద నిలబడి, బయటకు చూస్తూ ఫోన్‌ను సమతలంగా పట్టుకోండి. "కొలవండి" నొక్కండి. మీరు చూస్తున్న దిశే ఇంటి ముఖం.',en:'Stand inside at the main door, face outwards and hold the phone flat. Tap "Measure". The direction you face is the house facing.'},
 step2:{te:'2. గదుల దిశలు',en:'2. Room directions'},
 roomHow:{te:'ఇంటి మధ్యలో నిలబడి, ఫోన్ పైభాగాన్ని ఆ గది వైపు చూపించి "కొలవండి" నొక్కండి. లేదా దిశను నేరుగా ఎంచుకోండి. లేని వాటిని వదిలేయండి.',en:'Stand at the centre of the house, point the top of the phone at the room and tap "Measure". Or pick the direction yourself. Skip anything the house does not have.'},
 step3:{te:'3. కొన్ని ప్రశ్నలు',en:'3. A few questions'},
 measure:{te:'కొలవండి',en:'Measure'},clear:{te:'తీసివేయి',en:'Clear'},yes:{te:'అవును',en:'Yes'},no:{te:'కాదు',en:'No'},dk:{te:'తెలియదు',en:"Don't know"},
 live:{te:'ప్రస్తుత దిశ',en:'Now pointing'},noSensor:{te:'దిక్సూచి ఆన్ చేయండి',en:'Start the compass first'},
 seeResult:{te:'ఫలితం చూడండి',en:'See result'},reset:{te:'కొత్త ఇల్లు',en:'New house'},
 faces:{te:'ఇంటి ముఖం',en:'House faces'},doorBest:{te:'ద్వారం ఉత్తమ స్థానం',en:'Best door position'},
 best:{te:'శ్రేష్ఠం',en:'Ideal'},okay:{te:'పర్వాలేదు',en:'Acceptable'},bad:{te:'లోపం',en:'Defect'},neutral:{te:'సాధారణం',en:'Neutral'},
 vGood:{te:'వాస్తు ప్రకారం మంచి ఇల్లు',en:'Good as per Vasthu'},vOk:{te:'పర్వాలేదు — చిన్న లోపాలు ఉన్నాయి',en:'Acceptable — minor issues'},vBad:{te:'వాస్తు ప్రకారం అనుకూలం కాదు',en:'Not as per Vasthu'},
 vGoodT:{te:'ముఖ్యమైన లోపాలు లేవు. ఈ ఇల్లు తీసుకోవచ్చు.',en:'No major defects. You can go ahead with this house.'},
 vOkT:{te:'పెద్ద లోపాలు లేవు, కానీ కింది విషయాలు గమనించండి.',en:'No serious defects, but note the points below.'},
 vBadT:{te:'తీవ్రమైన వాస్తు లోపాలు ఉన్నాయి. వేరే ఇల్లు చూడటం మంచిది.',en:'Serious Vasthu defects. Better to look at another house.'},
 issues:{te:'లోపాలు',en:'Issues'},goods:{te:'మంచి విషయాలు',en:'Good points'},notChecked:{te:'ఇల్లు ముఖం కొలవలేదు — ముందు దశ 1 పూర్తి చేయండి.',en:'House facing not measured — complete step 1 first.'},
 score:{te:'స్కోర్',en:'Score'},save:{te:'సేవ్ చేయండి',en:'Save'},share:{te:'షేర్ / కాపీ',en:'Share / copy'},back:{te:'వెనక్కి',en:'Back'},
 savedT:{te:'సేవ్ చేసిన ఇళ్లు',en:'Saved houses'},none:{te:'ఇంకా ఏమీ లేవు.',en:'Nothing saved yet.'},open:{te:'చూడండి',en:'Open'},del:{te:'తొలగించు',en:'Delete'},
 saved:{te:'సేవ్ అయింది',en:'Saved'},copied:{te:'కాపీ అయింది',en:'Copied'},critical:{te:'తీవ్రం',en:'serious'},
 roomsTitle:{te:'గదులు ఏ దిశలో ఉండాలి',en:'Where each room should be'},lgBest:{te:'శ్రేష్ఠం',en:'Ideal'},lgOk:{te:'పర్వాలేదు',en:'Acceptable'},lgAvoid:{te:'వద్దు',en:'Avoid'},
 dirsTitle:{te:'అష్ట దిక్కులు',en:'The eight directions'},
 disclaimer:{te:'ఇది సంప్రదాయ వాస్తు సూచనల సారాంశం మాత్రమే. ఇల్లు కట్టే ముందు లేదా మార్పులకు ముందు అనుభవం ఉన్న వాస్తు నిపుణుడిని సంప్రదించండి.',en:'A summary of traditional Vasthu guidance only. Consult an experienced Vasthu expert before building or altering a house.'},
 toilet2:{te:'రెండవ మరుగుదొడ్డి',en:'Second toilet'}
};
let lang=LS.get('lang','te');
const t=k=>(T[k]||{})[lang]||k;
const L=o=>o?o[lang]:'';
const dn=d=>DIR[d][lang];
const sector=h=>DIRS[Math.round(((h%360)+360)%360/45)%8];
const ROOM=id=>id==='toilet2'?Object.assign({},ROOMS.find(r=>r.id==='toilet'),{id:'toilet2',te:T.toilet2.te,en:T.toilet2.en}):ROOMS.find(r=>r.id===id);

/* ---------- compass ---------- */
let heading=null,smooth=null,held=false,sensor=false,gotAbs=false;
function buildDial(){
 const c=150,parts=[];
 parts.push(`<circle cx="150" cy="150" r="146" fill="var(--card)" stroke="var(--gold2)" stroke-width="4"/>`);
 parts.push(`<g id="rose">`);
 for(let a=0;a<360;a+=5){const big=a%45===0,mid=a%15===0;const r1=140,r2=big?120:mid?128:133;const s=Math.sin(a*Math.PI/180),co=-Math.cos(a*Math.PI/180);
  parts.push(`<line x1="${c+r1*s}" y1="${c+r1*co}" x2="${c+r2*s}" y2="${c+r2*co}" stroke="${big?'var(--red)':'var(--mute)'}" stroke-width="${big?3:1.2}"/>`)}
 DIRS.forEach((d,i)=>{const a=i*45,s=Math.sin(a*Math.PI/180),co=-Math.cos(a*Math.PI/180),r=i%2?96:100;
  parts.push(`<text x="${c+r*s}" y="${c+r*co}" text-anchor="middle" dominant-baseline="central" transform="rotate(${a} ${c+r*s} ${c+r*co})" font-size="${i%2?15:19}" fill="${d==='N'?'var(--red)':'var(--ink)'}" font-family="Ramabhadra,sans-serif">${esc(dn(d))}</text>`)});
 parts.push(`<polygon points="150,74 164,150 150,142 136,150" fill="var(--red)"/><polygon points="150,226 164,150 150,158 136,150" fill="var(--gold2)"/><circle cx="150" cy="150" r="9" fill="var(--card)" stroke="var(--red)" stroke-width="3"/>`);
 parts.push(`</g><polygon points="150,2 160,20 140,20" fill="var(--red)"/>`);
 $('#dial').innerHTML=parts.join('');
 setRose();
}
function setRose(){const r=$('#rose');if(r)r.style.transform=`rotate(${-(heading||0)}deg)`;r&&(r.style.transformOrigin='150px 150px')}
function onOri(e){
 let h=null;
 if(typeof e.webkitCompassHeading==='number')h=e.webkitCompassHeading;
 else if((e.absolute||e.type==='deviceorientationabsolute')&&e.alpha!=null){h=360-e.alpha;if(e.type==='deviceorientationabsolute')gotAbs=true}
 if(h==null||(gotAbs&&e.type==='deviceorientation'&&typeof e.webkitCompassHeading!=='number'))return;
 sensor=true;
 const so=(screen.orientation&&screen.orientation.angle)||window.orientation||0;
 h=((h+so)%360+360)%360;
 if(smooth==null)smooth=h;else{const d=((h-smooth+540)%360)-180;smooth=(smooth+d*0.25+360)%360}
 if(!held){heading=smooth;updateHeading()}
}
async function startCompass(){
 try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function')await DeviceOrientationEvent.requestPermission()}catch(e){}
 addEventListener('deviceorientationabsolute',onOri);addEventListener('deviceorientation',onOri);
 $('#start').hidden=true;$('#hold').hidden=false;
 setTimeout(()=>{if(!sensor)showManual()},3000);
}
function showManual(){if(sensor)return;$('#manualBox').hidden=false;if(heading==null){heading=0;updateHeading()}}
function updateHeading(){
 setRose();
 const h=Math.round(heading),d=sector(heading);
 $('#dname').textContent=dn(d);$('#deg').textContent=`${h}° · ${DIR[d].en}`;
 renderDirInfo(d);
 const lt=$('#liveTag');if(lt)lt.textContent=`${t('live')}: ${dn(d)} ${h}°`;
}
let lastInfo='';
function renderDirInfo(d){
 if(lastInfo===d+lang)return;lastInfo=d+lang;const x=DIR[d];
 $('#dirInfo').innerHTML=`<div class="facts"><b>${t('deity')}</b><span>${esc(L(x.deity))}</span><b>${t('planet')}</b><span>${esc(L(x.planet))}</span>${x.el?`<b>${t('element')}</b><span>${esc(L(x.el))}</span>`:''}<b>${t('suits')}</b><span>${esc(L(x.suits))}</span><b>${t('avoid')}</b><span>${esc(L(x.avoid))}</span></div>`;
}

/* ---------- house check ---------- */
let cur=LS.get('cur',{name:'',facing:null,rooms:{},q:{}});
const saveCur=()=>LS.set('cur',cur);
function chips(sel,attr){return `<div class="chips">${DIRS.map(d=>`<button class="chip${sel===d?' sel':''}" ${attr}="${d}">${esc(dn(d))}</button>`).join('')}</div>`}
function grade(room,d){if(!d)return null;if(room.best.includes(d))return'good';if(room.ok.includes(d))return'ok';if(room.avoid.includes(d))return'bad';return'neutral'}
function renderFacing(){
 const f=cur.facing,F=f&&FACING[f];
 $('#facingBox').innerHTML=`<div class="row" style="margin-bottom:8px"><button class="btn sm" data-measure="facing">${t('measure')}</button></div>${chips(f,'data-face')}
 ${F?`<div class="res ${F.v==='good'?'good':F.v==='bad'?'bad':'ok'}">${t('faces')}: <b>${esc(dn(f))}</b> — ${esc(L(F))}<br>${t('doorBest')}: ${esc(L(F.door))}<br>${esc(L(F.avoid))}</div>`:''}`;
}
function renderRooms(){
 $('#roomsBox').innerHTML=CHECK_ROOMS.map(id=>{const r=ROOM(id),d=cur.rooms[id],g=grade(r,d);
  const lab={good:t('best'),ok:t('okay'),bad:t('bad'),neutral:t('neutral')}[g];
  return `<div class="item"><h3>${esc(L(r))}</h3><div class="row" style="margin-bottom:8px"><button class="btn sm" data-measure="${id}">${t('measure')}</button>${d?`<button class="btn sm alt" data-clear="${id}">${t('clear')}</button>`:''}</div>${chips(d,'data-room-'+id)}
  ${d?`<div class="res ${g==='neutral'?'ok':g}">${esc(dn(d))} — ${lab}${g==='bad'&&(r.crit||[]).includes(d)?` (${t('critical')})`:''}. ${esc(L(r.note))}</div>`:''}</div>`}).join('');
}
function renderQs(){
 $('#qBox').innerHTML=QUESTIONS.map(q=>{const a=cur.q[q.id];return `<div class="item"><div>${esc(L(q))}</div><div class="yn">${['yes','no','dk'].map(v=>`<button class="chip${a===v?' sel':''}" data-q="${q.id}" data-a="${v}">${t(v)}</button>`).join('')}</div></div>`}).join('');
}
function evaluate(h){
 const issues=[],goods=[];let crit=0,score=0,max=0;
 if(h.facing){const F=FACING[h.facing];score+=F.score;max+=3;
  const line=`${t('faces')} ${dn(h.facing)}: ${L(F)}`;
  if(F.v==='good')goods.push(line);else if(F.v==='bad'){issues.push({t:line,c:true});crit++}else issues.push({t:line+' — '+L(F.door),c:false});}
 CHECK_ROOMS.forEach(id=>{const d=h.rooms[id];if(!d)return;const r=ROOM(id),g=grade(r,d);max+=2;
  if(g==='good'){score+=2;goods.push(`${L(r)}: ${dn(d)}`)}
  else if(g==='ok'){score+=1}
  else if(g==='bad'){const c=(r.crit||[]).includes(d);score-=c?5:2;if(c)crit++;issues.push({t:`${L(r)} — ${dn(d)} (${L(r.note)})`,c})}});
 QUESTIONS.forEach(q=>{const a=h.q[q.id];if(!a||a==='dk')return;
  if(q.w>0){max+=q.w;if(a==='yes'){score+=q.w;goods.push(L(q.good))}else issues.push({t:L(q.issue),c:false})}
  else if(a===q.bad){score+=q.w;if(q.crit)crit++;issues.push({t:L(q.issue),c:!!q.crit})}});
 const major=issues.filter(i=>!i.c).length;
 const v=crit>0?'bad':major>=3?'bad':major>0?'ok':'good';
 const pct=max>0?Math.max(0,Math.min(100,Math.round(score/max*100))):0;
 return {v,pct,issues,goods,crit};
}
function report(h,fromSaved){
 if(!h.facing){toast(t('notChecked'));return}
 const r=evaluate(h);const vk={good:['vGood','vGoodT'],ok:['vOk','vOkT'],bad:['vBad','vBadT']}[r.v];
 const name=h.name||'';
 $('#report').innerHTML=`<button class="btn sm alt" id="back" style="margin-bottom:12px">← ${t('back')}</button>
 <div class="verdict ${r.v}">${name?`<div style="opacity:.9">${esc(name)}</div>`:''}<h2>${t(vk[0])}</h2><div>${t(vk[1])}</div><div style="margin-top:8px">${t('score')}: ${r.pct}%</div><div class="meter"><i style="width:${r.pct}%"></i></div></div>
 ${r.issues.length?`<div class="card"><h3 style="font-size:20px;color:var(--bad)">${t('issues')}</h3><ul class="list">${r.issues.map(i=>`<li>${esc(i.t)}${i.c?` <span class="tag" style="background:var(--bad);color:#fff">${t('critical')}</span>`:''}</li>`).join('')}</ul></div>`:''}
 ${r.goods.length?`<div class="card"><h3 style="font-size:20px;color:var(--good)">${t('goods')}</h3><ul class="list">${r.goods.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`:''}
 <div class="row">${fromSaved?'':`<button class="btn" id="saveH">${t('save')}</button>`}<button class="btn gold" id="shareH">${t('share')}</button></div>
 <p class="mute" style="margin-top:14px">${t('disclaimer')}</p>`;
 $('#checkForm').hidden=true;$('#report').hidden=false;scrollTo(0,0);
 $('#back').onclick=()=>{$('#report').hidden=true;$('#checkForm').hidden=false};
 const sv=$('#saveH');if(sv)sv.onclick=()=>{const list=LS.get('saved',[]);list.unshift(Object.assign({},JSON.parse(JSON.stringify(h)),{at:Date.now()}));LS.set('saved',list.slice(0,50));renderSaved();toast(t('saved'));sv.remove()};
 $('#shareH').onclick=()=>shareText([name||t('app'),t(vk[0])+` (${t('score')} ${r.pct}%)`,'',t('issues')+':',...r.issues.map(i=>'• '+i.t),'',t('goods')+':',...r.goods.map(g=>'• '+g)].join('\n'));
}
function shareText(txt){
 if(window.AndroidBridge&&AndroidBridge.share){AndroidBridge.share(txt);return}
 if(navigator.share){navigator.share({text:txt}).catch(()=>{});return}
 if(navigator.clipboard){navigator.clipboard.writeText(txt).then(()=>toast(t('copied')),()=>{})}
}
function renderSaved(){
 const list=LS.get('saved',[]);
 $('#savedBox').innerHTML=`<h3 style="font-size:20px">${t('savedT')}</h3>`+(list.length?list.map((h,i)=>{const r=h.facing?evaluate(h):null;const col=r?{good:'var(--good)',ok:'var(--ok)',bad:'var(--bad)'}[r.v]:'var(--mute)';
  return `<div class="saved"><div><span class="dot" style="background:${col}"></span>${esc(h.name||new Date(h.at).toLocaleDateString())}${r?` · ${r.pct}%`:''}</div><div class="row"><button class="btn sm alt" data-open="${i}">${t('open')}</button><button class="btn sm alt" data-del="${i}">${t('del')}</button></div></div>`}).join(''):`<p class="mute">${t('none')}</p>`);
}
function renderCheck(){$('#hname').value=cur.name||'';renderFacing();renderRooms();renderQs();renderSaved()}
function takeHeading(){if(heading==null){toast(t('noSensor'));return null}return sector(heading)}

/* ---------- guides ---------- */
function mini(r){
 const c=42,R=40,segs=DIRS.map((d,i)=>{const a0=(i*45-22.5-90)*Math.PI/180,a1=(i*45+22.5-90)*Math.PI/180;
  const col=r.best.includes(d)?'var(--good)':r.ok.includes(d)?'var(--gold2)':r.avoid.includes(d)?'var(--bad)':'var(--line)';
  return `<path d="M${c} ${c}L${c+R*Math.cos(a0)} ${c+R*Math.sin(a0)}A${R} ${R} 0 0 1 ${c+R*Math.cos(a1)} ${c+R*Math.sin(a1)}Z" fill="${col}" stroke="var(--card)" stroke-width="2"/>`}).join('');
 return `<svg class="mini" viewBox="0 0 84 84" aria-hidden="true">${segs}<text x="42" y="12" text-anchor="middle" font-size="11" fill="#fff" font-family="sans-serif">N</text></svg>`;
}
function renderGuide(){
 $('#roomsGuide').innerHTML=ROOMS.map(r=>`<div class="card rcard">${mini(r)}<div><h3 style="font-size:20px">${esc(L(r))}</h3>
 <div class="mute">${t('lgBest')}: ${r.best.map(dn).join(', ')||'—'}${r.ok.length?` · ${t('lgOk')}: ${r.ok.map(dn).join(', ')}`:''}${r.avoid.length?` · ${t('lgAvoid')}: ${r.avoid.map(dn).join(', ')}`:''}</div>
 <div style="margin-top:6px">${esc(L(r.note))}</div></div></div>`).join('');
 $('#dirsGrid').innerHTML=DIRS.map(d=>{const x=DIR[d];return `<div class="card"><h3 style="font-size:24px;color:var(--red)">${esc(dn(d))} <span class="mute" style="font-family:Mandali,sans-serif">${lang==='te'?x.en:''}</span></h3>
 <div class="facts" style="margin-top:8px"><b>${t('deity')}</b><span>${esc(L(x.deity))}</span><b>${t('planet')}</b><span>${esc(L(x.planet))}</span>${x.el?`<b>${t('element')}</b><span>${esc(L(x.el))}</span>`:''}<b>${t('suits')}</b><span>${esc(L(x.suits))}</span><b>${t('avoid')}</b><span>${esc(L(x.avoid))}</span><b>${t('fix')}</b><span>${esc(L(x.fix))}</span></div></div>`}).join('')+
 `<div class="card"><h3 style="font-size:22px;color:var(--red)">${esc(L(CENTRE))}</h3><div class="facts" style="margin-top:8px"><b>${t('deity')}</b><span>${esc(L(CENTRE.deity))}</span><b>${t('element')}</b><span>${esc(L(CENTRE.el))}</span></div><p style="margin:8px 0 0">${esc(L(CENTRE.text))}</p></div>`;
}

/* ---------- shell ---------- */
function applyLang(){
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-k]').forEach(el=>{el.textContent=t(el.dataset.k)});
 if(held)$('#hold').textContent=t('resume');
 $('#lang').textContent=lang==='te'?'English':'తెలుగు';
 document.title=t('app');lastInfo='';
 buildDial();if(heading!=null)updateHeading();
 renderCheck();renderGuide();
}
let tt;function toast(m){const el=$('#toast');el.textContent=m;el.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),1800)}
function show(v){document.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id==='v-'+v));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));LS.set('view',v);scrollTo(0,0)}

$('#lang').onclick=()=>{lang=lang==='te'?'en':'te';LS.set('lang',lang);applyLang()};
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>show(b.dataset.v));
$('#start').onclick=startCompass;
$('#hold').onclick=()=>{held=!held;$('#hold').textContent=t(held?'resume':'hold');if(!held&&smooth!=null){heading=smooth;updateHeading()}};
$('#manual').oninput=e=>{heading=+e.target.value;updateHeading()};
$('#hname').oninput=e=>{cur.name=e.target.value;saveCur()};
$('#v-check').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.measure){const d=takeHeading();if(!d)return;if(b.dataset.measure==='facing')cur.facing=d;else cur.rooms[b.dataset.measure]=d;saveCur();renderFacing();renderRooms();return}
 if(b.dataset.face){cur.facing=b.dataset.face;saveCur();renderFacing();return}
 for(const id of CHECK_ROOMS){const d=b.getAttribute('data-room-'+id);if(d){cur.rooms[id]=d;saveCur();renderRooms();return}}
 if(b.dataset.clear){delete cur.rooms[b.dataset.clear];saveCur();renderRooms();return}
 if(b.dataset.q){cur.q[b.dataset.q]=b.dataset.a;saveCur();renderQs();return}
 if(b.dataset.open!=null){const h=LS.get('saved',[])[+b.dataset.open];if(h)report(h,true);return}
 if(b.dataset.del!=null){const l=LS.get('saved',[]);l.splice(+b.dataset.del,1);LS.set('saved',l);renderSaved();return}
});
$('#seeResult').onclick=()=>report(cur,false);
$('#reset').onclick=()=>{cur={name:'',facing:null,rooms:{},q:{}};saveCur();renderCheck();scrollTo(0,0)};

applyLang();
show(LS.get('view','compass'));
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
}
