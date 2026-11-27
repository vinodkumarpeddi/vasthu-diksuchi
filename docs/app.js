'use strict';
{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const RAD=Math.PI/180, norm=a=>((a%360)+360)%360, adiff=(a,b)=>((a-b)%360+540)%360-180;
const sector=h=>DIRS[Math.round(norm(h)/45)%8];
const OPP={N:'S',NE:'SW',E:'W',SE:'NW',S:'N',SW:'NE',W:'E',NW:'SE'};

/* ================= text ================= */
const T={
 app:{te:'వాస్తు దిక్సూచి',en:'Vasthu Diksuchi'},
 tHome:{te:'హోమ్',en:'Home'},tCompass:{te:'దిక్సూచి',en:'Compass'},tPhotos:{te:'ఫోటోలు',en:'Photos'},tReports:{te:'రిపోర్టులు',en:'Reports'},tGuide:{te:'గైడ్',en:'Guide'},
 heroK:{te:'ఇంటి దగ్గరే చెక్ చేయండి',en:'Check on the spot'},
 heroT:{te:'ఇల్లు వాస్తు ప్రకారం ఉందా?',en:'Is this house as per Vasthu?'},
 heroP:{te:'రోడ్డు, వీధి పోటు, ముఖద్వారం, గదులను ఫోటోతో కొలవండి. చివరలో స్కోర్, చార్టులతో స్పష్టమైన ఫలితం.',en:'Measure the road, road hits, main door and rooms with photos. Get a clear verdict with score and charts.'},
 startCheck:{te:'కొత్త ఇల్లు చెక్ చేయండి',en:'Check a new house'},contCheck:{te:'మిగిలినది కొనసాగించండి',en:'Continue the unfinished check'},
 myT:{te:'మా కుటుంబానికి ఏ ముఖ ఇల్లు మంచిది?',en:'Which facing suits our family?'},myP:{te:'కర్త పేరు → రాశి → ఉత్తమ ముఖం, ఆయం',en:'Head of family\'s name → rasi → best facing, aayam'},
 recent:{te:'ఇటీవలి రిపోర్టులు',en:'Recent reports'},all:{te:'అన్నీ',en:'All'},
 howT:{te:'సరైన కొలత కోసం',en:'For an accurate reading'},
 howP:{te:'ఫోన్‌ను ఎలా పట్టుకున్నా సరే — సమతలంగా ఉంటే ఫోన్ పైభాగం దిశ, నిలువుగా ఉంటే కెమెరా చూస్తున్న దిశ చూపిస్తుంది. కార్లు, ఇనుప గేట్లు, గ్రిల్స్, మీటర్ బోర్డులకు 1–2 అడుగుల దూరంలో ఉండండి.',en:'Hold the phone any way — flat, it reads the direction of the top of the phone; upright, the direction the camera looks. Stay 1–2 feet away from cars, iron gates, grills and meter boards.'},
 // compass
 hold:{te:'దిశను నిలుపు',en:'Hold'},resume:{te:'మళ్లీ కదిలించు',en:'Resume'},calibrate:{te:'క్యాలిబ్రేట్',en:'Calibrate'},camera:{te:'కెమెరా',en:'Camera'},
 startCompass:{te:'దిక్సూచి ప్రారంభించండి',en:'Start compass'},
 manual:{te:'ఈ ఫోన్‌లో దిక్సూచి సెన్సార్ దొరకలేదు. దిశను చేతితో సెట్ చేయండి.',en:'No compass sensor found on this phone. Set the direction by hand.'},
 qgood:{te:'ఖచ్చితం',en:'Accurate'},qmedium:{te:'సుమారు',en:'Fair'},qlow:{te:'క్యాలిబ్రేట్ చేయండి',en:'Calibrate'},qinterf:{te:'అయస్కాంత అంతరాయం',en:'Interference'},qnone:{te:'సెన్సార్ లేదు',en:'No sensor'},qmanual:{te:'చేతితో',en:'Manual'},qwait:{te:'వేచి ఉంది…',en:'Waiting…'},
 mFlat:{te:'సమతలం · ఫోన్ పైభాగం దిశ',en:'Flat · top of phone'},mUp:{te:'నిలువు · కెమెరా దిశ',en:'Upright · camera direction'},mTilt:{te:'వంచి · టిల్ట్ సరిచేయబడింది',en:'Tilted · tilt-corrected'},
 deity:{te:'దిక్పాలకుడు',en:'Deity'},planet:{te:'గ్రహం',en:'Planet'},element:{te:'పంచభూతం',en:'Element'},suits:{te:'అనుకూలం',en:'Suits'},avoid:{te:'వద్దు',en:'Avoid'},tip:{te:'సూచన',en:'Tip'},
 calT:{te:'దిక్సూచి క్యాలిబ్రేషన్',en:'Calibrate the compass'},
 calP:{te:'ఫోన్‌ను గాలిలో 8 ఆకారంలో 3–4 సార్లు నెమ్మదిగా తిప్పండి, మధ్యలో ఫోన్‌ను అన్ని వైపులకు వంచండి. ఇనుము, కార్లు, స్పీకర్లు, మాగ్నెటిక్ కవర్లకు దూరంగా ఉండండి.',en:'Slowly move the phone in a figure-8 three or four times, tilting it every way as you go. Keep away from iron, cars, speakers and magnetic phone covers.'},
 calNow:{te:'ప్రస్తుత స్థితి',en:'Status now'},done:{te:'పూర్తయింది',en:'Done'},
 interfP:{te:'దగ్గరలో అయస్కాంత అంతరాయం ఉంది. ఇనుము / విద్యుత్ పరికరాలకు దూరంగా జరగండి.',en:'Magnetic interference nearby. Move away from iron or electrical items.'},
 // flow
 back:{te:'వెనక్కి',en:'Back'},next:{te:'తర్వాత',en:'Next'},skip:{te:'దాటవేయి',en:'Skip'},exit:{te:'మూసివేయి',en:'Close'},seeResult:{te:'ఫలితం చూడండి',en:'See result'},
 gFam:{te:'కుటుంబం',en:'Family'},gRoad:{te:'రోడ్డు',en:'Road'},gEntry:{te:'ద్వారం',en:'Entrance'},gRooms:{te:'గదులు',en:'Rooms'},gQ:{te:'ప్రశ్నలు',en:'Questions'},gRes:{te:'ఫలితం',en:'Result'},
 famQ:{te:'ఇంటి కర్త వివరాలు',en:'Head of the family (Kartha)'},
 famHow:{te:'కర్త పేరులోని మొదటి అక్షరం నుండి నామ రాశి తెలుస్తుంది. జన్మ రాశి తెలిస్తే అదే ఎంచుకోండి — అది ఇంకా ఖచ్చితం.',en:'The first syllable of the Kartha\'s name gives the name rasi. If you know the birth rasi, pick it instead — that is more exact.'},
 kName:{te:'కర్త పేరు (తెలుగు లేదా English)',en:'Kartha\'s name (Telugu or English)'},
 detected:{te:'గుర్తించిన అక్షరం',en:'Detected syllable'},noDetect:{te:'పేరు నుండి రాశి గుర్తించలేదు — కింద రాశిని ఎంచుకోండి.',en:'Could not find the rasi from the name — pick it below.'},
 knowRasi:{te:'జన్మ రాశి తెలిస్తే ఎంచుకోండి',en:'Pick the birth rasi if you know it'},fromName:{te:'పేరు నుండి',en:'from name'},chosen:{te:'ఎంచుకున్నది',en:'chosen'},
 plot:{te:'స్థలం / ఇంటి కొలతలు అడుగుల్లో (ఆయం కోసం, ఐచ్ఛికం)',en:'Plot / house size in feet (for aayam, optional)'},len:{te:'పొడవు',en:'Length'},wid:{te:'వెడల్పు',en:'Breadth'},
 hname:{te:'ఇంటి పేరు / చిరునామా (ఐచ్ఛికం)',en:'House name / address (optional)'},
 persT:{te:'మీ కుటుంబానికి అనుకూల ముఖం',en:'Best facing for your family'},
 rasi:{te:'రాశి',en:'Rasi'},bestFace:{te:'ఉత్తమ ముఖం',en:'Best facing'},aayam:{te:'ఆయం',en:'Aayam'},area:{te:'వైశాల్యం',en:'Area'},sqft:{te:'చ.అ.',en:'sq ft'},
 shubham:{te:'శుభం',en:'auspicious'},ashubham:{te:'అశుభం',en:'inauspicious'},
 aayaBad:{te:'ఈ కొలతల్లో ఆయం అశుభం. ఒకటి–రెండు అడుగులు మార్చి శుభ ఆయం (ధ్వజ, సింహ, వృషభ, గజ) వచ్చేలా చూడండి.',en:'The aayam for these measurements is inauspicious. Changing a side by a foot or two can give a good aayam (Dhwaja, Simha, Vrishabha, Gaja).'},
 pBest:{te:'ఉత్తమం',en:'Best'},pGood:{te:'మంచిది',en:'Good'},pOk:{te:'పర్వాలేదు',en:'Fair'},pAvoid:{te:'వద్దు',en:'Avoid'},
 suitChart:{te:'8 ముఖాల అనుకూలత (100 లో)',en:'Suitability of the 8 facings (out of 100)'},
 checkThis:{te:'ఈ వివరాలతో ఇల్లు చెక్ చేయండి',en:'Check a house with these details'},
 road1q:{te:'ప్రధాన రోడ్డు ఏ వైపు ఉంది?',en:'Which side is the main road on?'},
 roadHow:{te:'ఇంటి / స్థలం ముందు నిలబడి రోడ్డు వైపు చూస్తూ ఫోటో తీయండి లేదా "కొలవండి" నొక్కండి.',en:'Stand in front of the house / plot, face the road, then take a photo or tap "Measure".'},
 road2q:{te:'రెండవ వైపు కూడా రోడ్డు ఉందా? (కార్నర్ స్థలం)',en:'Is there a road on a second side too? (corner plot)'},
 road2How:{te:'ఉంటే, ఆ రోడ్డు వైపు చూస్తూ కొలవండి. లేకపోతే దాటవేయండి.',en:'If yes, face that road and measure. If not, skip.'},
 slopeQ:{te:'రోడ్డు / నేల ఏ వైపుకు వాలుగా ఉంది?',en:'Which way does the road / ground slope down?'},
 slopeHow:{te:'వర్షం నీరు ఏ వైపుకు ప్రవహిస్తుందో ఆ దిశను ఎంచుకోండి. ఉత్తరం, తూర్పు, ఈశాన్యం వైపు వాలు శుభం.',en:'Pick the direction rain water flows to. A slope down to the north, east or north-east is good.'},
 flat:{te:'సమతలం / తెలియదు',en:'Level / not sure'},
 potuQ:{te:'ఏదైనా రోడ్డు నేరుగా స్థలాన్ని తాకుతోందా? (వీధి పోటు)',en:'Does any road run straight into the plot? (veedhi potu)'},
 potuHow:{te:'ఎదురుగా వచ్చి ఆగే రోడ్డు ఏ వైపు, ఏ సగాన్ని తాకుతుందో బొమ్మలో నొక్కండి. పై వైపు ఉత్తరం.',en:'Tap where a road coming head-on meets the plot — which side and which half. North is at the top.'},
 noPotu:{te:'ఏ రోడ్డూ నేరుగా తాకడం లేదు',en:'No road hits the plot'},
 buildQ:{te:'భవనం / కాంపౌండ్ గేటు ఏ వైపు ముఖంగా ఉంది?',en:'Which way does the building / compound gate face?'},
 buildHow:{te:'అపార్ట్‌మెంట్ అయితే భవనం ప్రవేశం వద్ద, ఇండిపెండెంట్ ఇల్లు అయితే గేటు వద్ద బయటకు చూస్తూ కొలవండి.',en:'For a flat, at the building entrance; for an independent house, at the gate — facing outwards.'},
 doorQ:{te:'ఇంటి / ఫ్లాట్ ముఖద్వారం ఏ వైపు?',en:'Which way does the main door face?'},
 doorIn:{te:'లోపల నుండి, బయటకు చూస్తూ',en:'From inside, looking out'},doorOut:{te:'బయట నుండి, ద్వారం వైపు చూస్తూ',en:'From outside, looking at the door'},
 doorHowIn:{te:'ముఖద్వారం లోపల నిలబడి బయటకు చూస్తూ కొలవండి — మీరు చూసే దిశే ఇంటి ముఖం.',en:'Stand just inside the main door looking out and measure — the direction you face is the house facing.'},
 doorHowOut:{te:'బయటి నుండి లోపలికి వస్తున్నట్లుగా ద్వారం ముందు నిలబడి, ద్వారం వైపు కెమెరాను చూపించండి. యాప్ మీరు లోపలికి నడిచే దిశ, ఇంటి ముఖం రెండూ చూపిస్తుంది.',en:'Stand outside in front of the door as if walking in, and point the camera at the door. The app shows the direction you walk in and the house facing.'},
 roomHow:{te:'ఇంటి మధ్యలో నిలబడి ఆ గది వైపు కెమెరా / ఫోన్ పైభాగాన్ని చూపించి కొలవండి. లేని వాటిని దాటవేయండి.',en:'Stand at the centre of the house, point the camera / top of the phone at the room and measure. Skip anything the house does not have.'},
 roomQ:{te:'{r} ఏ వైపు ఉంది?',en:'Where is the {r}?'},
 photoMeasure:{te:'ఫోటో + కొలత',en:'Photo + measure'},measure:{te:'కొలవండి',en:'Measure'},orPick:{te:'లేదా దిశను నేరుగా ఎంచుకోండి',en:'Or pick the direction'},
 yes:{te:'అవును',en:'Yes'},no:{te:'కాదు',en:'No'},dk:{te:'తెలియదు',en:"Don't know"},
 faces:{te:'ఇంటి ముఖం',en:'House faces'},enterTo:{te:'లోపలికి వెళ్తూ మీరు నడిచే దిశ',en:'Walking in, you head'},buildFaces:{te:'భవనం / గేటు ముఖం',en:'Building / gate faces'},doorBest:{te:'ద్వారం ఉత్తమ స్థానం',en:'Best door position'},
 awayRoad:{te:'ముఖద్వారం రోడ్డు వైపు లేదు — ఇంటి ముఖం ముఖద్వారం దిశతోనే లెక్కించబడింది.',en:'The main door does not face the road — the house facing is taken from the main door.'},
 best:{te:'శ్రేష్ఠం',en:'Ideal'},okay:{te:'పర్వాలేదు',en:'Acceptable'},bad:{te:'లోపం',en:'Defect'},neutral:{te:'సాధారణం',en:'Neutral'},critical:{te:'తీవ్రం',en:'serious'},
 slopeTo:{te:'వాలు',en:'Slope down to'},slopeBad:{te:'వాలు ఉత్తరం / తూర్పు వైపు ఉండాలి; దక్షిణ / పడమర భాగం ఎత్తుగా ఉండాలి.',en:'The slope should be to the north / east; the south / west should be higher.'},
 noSensor:{te:'దిక్సూచి సిద్ధంగా లేదు — దిశను చేతితో ఎంచుకోండి.',en:'Compass not ready — pick the direction by hand.'},
 // report
 vGood:{te:'వాస్తు ప్రకారం మంచి ఇల్లు',en:'Good as per Vasthu'},vOk:{te:'పర్వాలేదు — చిన్న లోపాలు',en:'Acceptable — minor issues'},vBad:{te:'వాస్తు ప్రకారం అనుకూలం కాదు',en:'Not as per Vasthu'},
 vGoodT:{te:'ముఖ్యమైన లోపాలు లేవు. ఈ ఇల్లు తీసుకోవచ్చు.',en:'No major defects. You can go ahead with this house.'},
 vOkT:{te:'తీవ్రమైన లోపాలు లేవు, కానీ కింది విషయాలు గమనించండి.',en:'No serious defects, but note the points below.'},
 vBadT:{te:'తీవ్రమైన వాస్తు లోపాలు ఉన్నాయి. వేరే ఇల్లు చూడటం మంచిది.',en:'Serious Vasthu defects. Better to look at another house.'},
 brief:{te:'సారాంశం',en:'In brief'},forKartha:{te:'కర్తకు అనుకూలత',en:'Suits the Kartha?'},thisHouse:{te:'ఈ ఇల్లు',en:'This house'},
 entryT:{te:'బయటి నుండి ఏ వైపు ప్రవేశం మంచిది',en:'Best side to enter from outside'},
 entryBest:{te:'{d} రోడ్డు వైపు నుండి ప్రవేశించడం ఉత్తమం (లోపలికి {o} వైపు నడుస్తారు). {door}',en:'Entering from the {d} side is best (you walk in heading {o}). {door}'},
 entryNow:{te:'ప్రస్తుత ముఖద్వారం {d} వైపు — {s}.',en:'The present main door faces {d} — {s}.'},
 entryBetter:{te:'{d} వైపు గేటు / ద్వారం ఉంటే ఇంకా మంచిది.',en:'A gate / door on the {d} side would be better.'},
 zoneT:{te:'అష్టదిక్ పటం — గదులు ఎక్కడ ఉన్నాయి',en:'Direction map — where the rooms are'},road:{te:'రోడ్డు',en:'ROAD'},door:{te:'ద్వారం',en:'Door'},centre:{te:'బ్రహ్మస్థానం',en:'Centre'},
 catT:{te:'విభాగాల వారీగా స్కోర్',en:'Score by area'},cRoad:{te:'రోడ్డు / స్థలం',en:'Road / plot'},cEntry:{te:'ముఖద్వారం',en:'Entrance'},cRooms:{te:'గదులు',en:'Rooms'},cSite:{te:'ఇతర అంశాలు',en:'Other checks'},
 issues:{te:'లోపాలు, సూచనలు',en:'Issues and fixes'},goods:{te:'మంచి విషయాలు',en:'Good points'},photosT:{te:'ఫోటోలు',en:'Photos'},
 notChecked:{te:'ముఖద్వారం దిశ కొలవలేదు — ఆ దశ పూర్తి చేయండి.',en:'Main door facing not measured — complete that step first.'},
 score:{te:'స్కోర్',en:'Score'},save:{te:'సేవ్',en:'Save'},share:{te:'షేర్',en:'Share'},del:{te:'తొలగించు',en:'Delete'},open:{te:'చూడండి',en:'Open'},saved:{te:'సేవ్ అయింది',en:'Saved'},
 savedT:{te:'సేవ్ చేసిన ఇళ్లు',en:'Saved houses'},none:{te:'ఇంకా ఏ రిపోర్టూ లేదు. హోమ్‌లో "కొత్త ఇల్లు చెక్ చేయండి" నొక్కండి.',en:'No reports yet. Tap "Check a new house" on Home.'},
 delQ:{te:'ఇది తొలగించాలా?',en:'Delete this?'},cancel:{te:'వద్దు',en:'Cancel'},
 matchGood:{te:'ఈ కుటుంబానికి అనుకూలం',en:'suits this family'},matchOk:{te:'పర్వాలేదు',en:'acceptable for this family'},matchBad:{te:'ఈ కుటుంబానికి అనుకూలం కాదు',en:'does not suit this family'},
 // photos
 openCam:{te:'కెమెరా తెరవండి',en:'Open camera'},noPhotos:{te:'ఇంకా ఫోటోలు లేవు. ప్రతి ఫోటోలో దిశ, డిగ్రీలు, తేదీ ముద్రించబడతాయి.',en:'No photos yet. Every photo is stamped with the direction, degrees and date.'},
 savePhone:{te:'ఫోన్‌లో సేవ్',en:'Save to phone'},savedPhone:{te:'గ్యాలరీలో సేవ్ అయింది',en:'Saved to gallery'},
 camErr:{te:'కెమెరా తెరవలేకపోయాం. సెట్టింగ్స్‌లో కెమెరా అనుమతి ఇవ్వండి.',en:'Could not open the camera. Allow camera permission in Settings.'},
 photoOf:{te:'ఫోటో దేనిది?',en:'What is this photo of?'},camDir:{te:'కెమెరా దిశ',en:'Camera'},
 lDoor:{te:'ముఖద్వారం',en:'Main door'},lRoad:{te:'రోడ్డు',en:'Road'},lGate:{te:'గేటు',en:'Gate'},lPlot:{te:'స్థలం',en:'Plot'},lOther:{te:'ఇతర',en:'Other'},
 // guide
 gRoomsT:{te:'గదులు',en:'Rooms'},gDirsT:{te:'అష్ట దిక్కులు',en:'8 directions'},lgBest:{te:'శ్రేష్ఠం',en:'Ideal'},lgOk:{te:'పర్వాలేదు',en:'Acceptable'},lgAvoid:{te:'వద్దు',en:'Avoid'},
 disclaimer:{te:'ఇది సంప్రదాయ వాస్తు సూచనల సారాంశం మాత్రమే (రాశి, ఆయం సంప్రదాయ పద్ధతులు). ఇల్లు కట్టే / మార్చే ముందు అనుభవం ఉన్న వాస్తు నిపుణుడిని సంప్రదించండి.',en:'A summary of traditional Vasthu guidance (rasi and aayam use traditional methods). Consult an experienced Vasthu expert before building or altering a house.'},
 toilet2:{te:'రెండవ మరుగుదొడ్డి',en:'Second toilet'},
 chooseLang:{te:'భాషను ఎంచుకోండి',en:'Choose language'}
};
let lang=LS.get('lang',null)||'te';
const t=(k,v)=>{let s=(T[k]||{})[lang]||k;if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s};
const L=o=>o?(o[lang]||o.en||''):'';
const dn=d=>d==='flat'?t('flat'):(DIR[d]?DIR[d][lang]:d);
const ROOM=id=>id==='toilet2'?Object.assign({},ROOMS.find(r=>r.id==='toilet'),{id:'toilet2',te:T.toilet2.te,en:T.toilet2.en}):ROOMS.find(r=>r.id===id);
const toastEl=$('#toast');let tt;function toast(m){toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toastEl.classList.remove('on'),2200)}
const native=()=>!!(window.AndroidBridge);

/* ================= compass engine =================
   Heading = direction of the phone's "forward" vector = top edge + back camera axis, both
   expressed in earth coordinates. When the phone is flat the top edge dominates; when it is
   upright the camera axis dominates; in between both point the same way, so the reading is
   correct at ANY tilt or roll (full tilt compensation from the rotation matrix). */
const C={up:false,tv:0,src:null,fx:null,fy:null,target:null,disp:null,shown:null,held:false,buf:[],acc:-1,magAcc:-1,field:0,flat:1,last:0,gotAbs:false,manual:null};
function eulerHeading(a,b,g){
 const cA=Math.cos(a*RAD),sA=Math.sin(a*RAD),cB=Math.cos(b*RAD),sB=Math.sin(b*RAD),cG=Math.cos(g*RAD),sG=Math.sin(g*RAD);
 // rotation matrix columns: device top edge (m12,m22,m32) and back-camera axis -(m13,m23,m33), in East/North/Up
 const m12=-cB*sA,m22=cA*cB,m13=cG*sA*sB+cA*sG,m23=sA*sG-cA*cG*sB,tv=Math.abs(sB);
 // flat-ish: top edge (immune to sideways roll); upright: camera axis. Hysteresis avoids flicker at 45 deg.
 C.up=C.up?tv>0.6:tv>0.75;
 const E=C.up?-m13:m12,N=C.up?-m23:m22;return {h:norm(Math.atan2(E,N)/RAD),tv};
}
function feed(h,src){
 C.src=src;C.last=performance.now();
 const rx=Math.sin(h*RAD),ry=Math.cos(h*RAD);
 if(C.fx==null){C.fx=rx;C.fy=ry}
 const cur=norm(Math.atan2(C.fx,C.fy)/RAD),d=Math.abs(adiff(h,cur));
 // adaptive low-pass: steady when still, quick when turning
 const k=d>30?0.55:d>12?0.3:d>4?0.16:0.08;
 C.fx+=(rx-C.fx)*k;C.fy+=(ry-C.fy)*k;
 if(!C.held)C.target=norm(Math.atan2(C.fx,C.fy)/RAD);
 C.buf.push(adiff(h,cur));if(C.buf.length>30)C.buf.shift();
}
window.__nh=function(h,acc,magAcc,field,tv,up){C.acc=acc;C.magAcc=magAcc;C.field=field;C.tv=tv;C.up=!!up;feed(h,'native')};
function onWeb(e){
 if(C.src==='native'||C.src==='manual')return;
 if(typeof e.webkitCompassHeading==='number'&&e.webkitCompassHeading>=0){
  C.acc=typeof e.webkitCompassAccuracy==='number'?e.webkitCompassAccuracy:-1;
  const r=eulerHeading(0,e.beta||0,e.gamma||0);C.tv=r.tv;feed(e.webkitCompassHeading,'web');return}
 if(e.alpha==null)return;
 if(e.type==='deviceorientationabsolute')C.gotAbs=true;
 else if(C.gotAbs||!e.absolute)return;
 const r=eulerHeading(e.alpha,e.beta||0,e.gamma||0);C.tv=r.tv;feed(r.h,'web');
}
function jitter(){if(C.buf.length<8)return 0;const m=C.buf.reduce((a,b)=>a+b,0)/C.buf.length;return Math.sqrt(C.buf.reduce((a,b)=>a+(b-m)*(b-m),0)/C.buf.length)}
function quality(){
 if(C.src==='manual')return 'manual';
 if(!C.src||performance.now()-C.last>2500)return C.src?'none':'wait';
 if(C.src==='native'){
  if(C.field&&(C.field<20||C.field>75))return 'interf';
  if(C.magAcc>=0&&C.magAcc<=1)return 'low';
  if(C.acc>25)return 'low';
  if(C.magAcc===2||C.acc>12)return 'medium';
  return jitter()>6?'medium':'good';
 }
 const j=jitter();
 if(C.acc>25||j>9)return 'low';
 if(C.acc>12||j>3.5)return 'medium';
 return 'good';
}
const qcls=q=>q==='good'?'q-good':q==='medium'?'q-medium':(q==='low'||q==='interf')?'q-low':'';
const qtxt=q=>q==='wait'?t('qwait'):t('q'+q);
const heading=()=>C.disp==null?null:norm(C.disp);
const hasHeading=()=>C.disp!=null&&(C.src==='manual'||C.src==='native'||C.src==='web');
function modeTxt(){if(C.src==='manual'||!C.src)return '';return C.up?t('mUp'):C.tv<0.3?t('mFlat'):t('mTilt')}
async function startCompass(){
 try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){const r=await DeviceOrientationEvent.requestPermission();LS.set('iosPerm',r)}}catch(e){}
 setTimeout(()=>{if(!C.src){C.src='manual';C.manual=0;C.target=0;renderView()}},3500);
}
window.addEventListener('deviceorientationabsolute',onWeb,true);
window.addEventListener('deviceorientation',onWeb,true);

// render loop: unwrapped angle so the dial never spins the long way round at 0°/360°
function frame(){
 if(C.target!=null){
  if(C.disp==null)C.disp=C.target;
  const d=adiff(C.target,C.disp);
  C.disp+=Math.abs(d)<0.05?d:d*0.2;
  const a=-C.disp;
  for(const el of document.querySelectorAll('.rose'))el.setAttribute('transform',`rotate(${a.toFixed(2)} ${el.dataset.c||150} ${el.dataset.c||150})`);
  if(C.shown==null||Math.abs(adiff(C.disp,C.shown))>=0.6)C.shown=norm(C.disp);
  const deg=Math.round(C.shown)%360,s=sector(C.shown);
  for(const el of document.querySelectorAll('[data-live=deg]'))el.textContent=deg+'°';
  for(const el of document.querySelectorAll('[data-live=dn]'))el.textContent=dn(s);
  for(const el of document.querySelectorAll('[data-live=dir]'))el.textContent=`${dn(s)} · ${deg}°`;
  for(const el of document.querySelectorAll('[data-live=out]')){const f=OPP[s];el.textContent=`${t('faces')}: ${dn(f)}`}
  if(s!==lastSec){lastSec=s;onSector(s)}
 }
 requestAnimationFrame(frame);
}
let lastSec=null;
function onSector(s){const box=$('#dirInfo');if(box)box.innerHTML=dirInfo(s)}
setInterval(()=>{const q=quality();$('#qdot').className=qcls(q);$('#qtxt').textContent=qtxt(q);
 for(const el of $$('[data-live=q]')){el.className='qdot '+qcls(q)}
 for(const el of $$('[data-live=qt]'))el.textContent=qtxt(q)+(C.acc>0&&C.src!=='manual'?` · ±${Math.round(C.acc)}°`:'');
 for(const el of $$('[data-live=mode]'))el.textContent=modeTxt();
 const cs=$('#calStat');if(cs)cs.innerHTML=`<span class="qdot ${qcls(q)}"></span> ${qtxt(q)}${q==='interf'?'<br><span class="mute">'+t('interfP')+'</span>':''}`;
},300);

/* ================= dial graphics ================= */
const SHORT={te:{N:'ఉ',NE:'ఈ',E:'తూ',SE:'ఆ',S:'ద',SW:'నై',W:'ప',NW:'వా'},en:{N:'N',NE:'NE',E:'E',SE:'SE',S:'S',SW:'SW',W:'W',NW:'NW'}};
function bigDial(){
 const c=150,p=[];
 p.push(`<defs><radialGradient id="bz" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#f3e6d4"/></radialGradient></defs>`);
 p.push(`<circle cx="150" cy="150" r="148" fill="#c69a3c"/><circle cx="150" cy="150" r="141" fill="url(#bz)"/>`);
 p.push(`<g class="rose" data-c="150">`);
 for(let a=0;a<360;a+=2){const big=a%45===0,mid=a%10===0;const r1=138,r2=big?118:mid?126:132;const s=Math.sin(a*RAD),co=-Math.cos(a*RAD);
  p.push(`<line x1="${(c+r1*s).toFixed(1)}" y1="${(c+r1*co).toFixed(1)}" x2="${(c+r2*s).toFixed(1)}" y2="${(c+r2*co).toFixed(1)}" stroke="${big?'#9e0f1b':mid?'#5a3a32':'#a89088'}" stroke-width="${big?3:mid?1.6:0.9}"/>`)}
 for(let a=30;a<360;a+=30){if(a%90===0)continue;const s=Math.sin(a*RAD),co=-Math.cos(a*RAD),r=110;p.push(`<text x="${(c+r*s).toFixed(1)}" y="${(c+r*co).toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="10" fill="#76605a" transform="rotate(${a} ${(c+r*s).toFixed(1)} ${(c+r*co).toFixed(1)})">${a}</text>`)}
 DIRS.forEach((d,i)=>{const a=i*45,s=Math.sin(a*RAD),co=-Math.cos(a*RAD),r=i%2?86:92;
  p.push(`<text x="${(c+r*s).toFixed(1)}" y="${(c+r*co).toFixed(1)}" text-anchor="middle" dominant-baseline="central" transform="rotate(${a} ${(c+r*s).toFixed(1)} ${(c+r*co).toFixed(1)})" font-size="${i%2?14:19}" fill="${d==='N'?'#9e0f1b':'#2a1210'}" font-family="Ramabhadra,sans-serif">${esc(dn(d))}</text>`)});
 p.push(`<circle cx="150" cy="150" r="64" fill="none" stroke="#e2cdb8" stroke-width="1"/>`);
 p.push(`<polygon points="150,70 160,150 140,150" fill="#c4202e"/><polygon points="150,230 160,150 140,150" fill="#d8c6b4"/>`);
 p.push(`</g>`);
 p.push(`<circle cx="150" cy="150" r="10" fill="#fff" stroke="#9e0f1b" stroke-width="3"/>`);
 p.push(`<line x1="150" y1="18" x2="150" y2="44" stroke="#9e0f1b" stroke-width="3" stroke-linecap="round"/><polygon points="150,2 161,20 139,20" fill="#9e0f1b"/>`);
 return `<svg viewBox="0 0 300 300" role="img" aria-label="compass">${p.join('')}</svg>`;
}
function miniRose(size=64,dark=false){
 const c=50,p=[];const fg=dark?'#fff':'#2a1210',ring=dark?'rgba(255,255,255,.85)':'#c69a3c';
 p.push(`<circle cx="50" cy="50" r="47" fill="${dark?'rgba(0,0,0,.45)':'#fffaf2'}" stroke="${ring}" stroke-width="3"/>`);
 p.push(`<g class="rose" data-c="50">`);
 for(let a=0;a<360;a+=15){const big=a%90===0;const s=Math.sin(a*RAD),co=-Math.cos(a*RAD),r1=43,r2=big?34:38;p.push(`<line x1="${c+r1*s}" y1="${c+r1*co}" x2="${c+r2*s}" y2="${c+r2*co}" stroke="${big?'#ff4b55':fg}" stroke-width="${big?2.5:1}" opacity="${big?1:.7}"/>`)}
 ['N','E','S','W'].forEach((d,i)=>{const a=i*90,s=Math.sin(a*RAD),co=-Math.cos(a*RAD),r=26;p.push(`<text x="${c+r*s}" y="${c+r*co}" text-anchor="middle" dominant-baseline="central" font-size="13" fill="${d==='N'?'#ff4b55':fg}" font-family="Ramabhadra,sans-serif" transform="rotate(${a} ${c+r*s} ${c+r*co})">${SHORT[lang][d]}</text>`)});
 p.push(`<polygon points="50,14 56,50 44,50" fill="#e0242f"/><polygon points="50,86 56,50 44,50" fill="${dark?'#ddd':'#cbb8a6'}"/></g>`);
 p.push(`<polygon points="50,0 56,9 44,9" fill="${dark?'#ffc72c':'#9e0f1b'}"/><circle cx="50" cy="50" r="4" fill="${dark?'#fff':'#9e0f1b'}"/>`);
 return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">${p.join('')}</svg>`;
}
function dirInfo(d){const x=DIR[d];
 return `<h3>${esc(dn(d))} <span class="mute">${x.en}</span></h3><div class="facts"><b>${t('deity')}</b><span>${esc(L(x.deity))}</span><b>${t('planet')}</b><span>${esc(L(x.planet))}</span>${x.el?`<b>${t('element')}</b><span>${esc(L(x.el))}</span>`:''}<b>${t('suits')}</b><span>${esc(L(x.suits))}</span><b>${t('avoid')}</b><span>${esc(L(x.avoid))}</span><b>${t('tip')}</b><span>${esc(L(x.fix))}</span></div>`}

/* ================= calibration ================= */
function calibModal(){
 modal(`<h2 style="font-size:22px;margin-bottom:6px">${t('calT')}</h2>
 <svg viewBox="0 0 200 110" style="width:100%;max-width:280px"><path id="f8" d="M100 55 C 130 12, 185 12, 185 55 C 185 98, 130 98, 100 55 C 70 12, 15 12, 15 55 C 15 98, 70 98, 100 55Z" fill="none" stroke="#e0cdbd" stroke-width="3" stroke-dasharray="6 6"/>
 <g><rect x="-10" y="-17" width="20" height="34" rx="4" fill="#9e0f1b"/><rect x="-6" y="-12" width="12" height="20" rx="1.5" fill="#ffc72c"/><animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto"><mpath href="#f8"/></animateMotion></g></svg>
 <p style="text-align:left;font-size:15px">${t('calP')}</p>
 <div class="badge" style="justify-content:center;width:100%;font-size:15px" id="calStat"></div>
 <button class="btn" data-close>${t('done')}</button>`);
}

/* ================= personal (Kartha) ================= */
const VMAP={'ా':'','ీ':'ి','ూ':'ు','ె':'ే','ొ':'ో','ై':'ే','ౌ':'ో','ృ':'ు','ౄ':'ు'};
const IV={'ఆ':'అ','ఈ':'ఇ','ఊ':'ఉ','ఏ':'ఎ','ఐ':'ఎ','ఓ':'ఒ','ఔ':'ఒ','ఋ':'ఉ','ౠ':'ఉ'};
const CMAP={'శ':'స','బ':'భ','ళ':'ల','ఱ':'ర'};
const isCons=c=>c&&c>='క'&&c<='హ',isIV=c=>c&&c>='అ'&&c<='ఔ',isMatra=c=>c&&c>='ా'&&c<='ౌ';
function teSyl(s){
 s=[...s];let i=s.findIndex(c=>isCons(c)||isIV(c));if(i<0)return null;const c=s[i];
 if(isIV(c))return IV[c]||c;
 let j=i+1;while(s[j]==='్'&&isCons(s[j+1]))j+=2;
 const m=isMatra(s[j])?s[j]:'';return (CMAP[c]||c)+(m in VMAP?VMAP[m]:m);
}
const TEIDX={},ENIDX={};RASI.forEach(r=>{r.s.forEach(x=>{const k=teSyl(x);if(k&&!TEIDX[k])TEIDX[k]=r.id});r.r.forEach(x=>{if(!ENIDX[x])ENIDX[x]=r.id})});
function enVowel(v){const two=v.slice(0,2);const M={aa:'a',ee:'i',ii:'i',ie:'i',ea:'i',oo:'u',uu:'u',ai:'e',ay:'e',ei:'e',au:'o',ou:'o',oa:'o'};return M[two]||v[0]||''}
function detect(name){
 name=(name||'').trim();if(!name)return null;
 if(/[ఀ-౿]/.test(name)){const k=teSyl(name);if(!k)return null;let id=TEIDX[k];
  if(!id){const c0=[...k][0];const hit=Object.keys(TEIDX).find(x=>[...x][0]===c0&&x.length===1)||Object.keys(TEIDX).find(x=>[...x][0]===c0);id=hit&&TEIDX[hit]}
  return id?{syl:k,rasi:id}:{syl:k,rasi:null}}
 let w=name.toLowerCase().replace(/[^a-z]/g,'').replace(/w/g,'v').replace(/z/g,'j').replace(/q/g,'k').replace(/x/g,'ks');
 if(!w)return null;
 const m=w.match(/^([^aeiou]*)([aeiouy]*)/);let on=m[1],vr=m[2];
 if(on.endsWith('y')&&!vr){on=on.slice(0,-1);vr='i'}
 const v=enVowel(vr||'a');
 const dg=/^(th|dh|bh|kh|gh|ch|ph|sh|jh)/.test(on)?on.slice(0,2):on.slice(0,1);
 const cands=on?[on+v,dg+v,on[0]+v]:[v];
 for(const c of cands)if(ENIDX[c])return {syl:c[0].toUpperCase()+c.slice(1),rasi:ENIDX[c]};
 return {syl:(cands[0]||'').replace(/^./,x=>x.toUpperCase()),rasi:null};
}
const RID=id=>RASI.find(r=>r.id===id);
const BASE={3:78,1:60,0:50,'-1':42,'-6':12};
function personal(k){
 if(!k)return null;
 const det=detect(k.name);const rid=k.rasi||(det&&det.rasi);const r=rid?RID(rid):null;
 const el=r?ELEM[r.el]:null;const rd=el?el.dir:null;
 const len=+k.len||0,wid=+k.wid||0;const ar=len>0&&wid>0?Math.round(len*wid):0;const aa=ar?AAYA[ar%8]:null;
 const sc={};
 DIRS.forEach(d=>{let s=BASE[FACING[d].score];
  if(rd){if(d===rd)s+=20;else if(d.includes(rd)&&s>=50)s+=6}
  if(aa&&aa.good){if(aa.dir===d)s+=10;else if(aa.all)s+=3}
  sc[d]=Math.max(0,Math.min(100,Math.round(s)))});
 const order=DIRS.slice().sort((a,b)=>sc[b]-sc[a]);
 return {name:k.name||'',det,r,src:k.rasi?'chosen':'name',el,rd,ar,aa,sc,order};
}
const plab=s=>s>=85?'pBest':s>=65?'pGood':s>=45?'pOk':'pAvoid';
const pcol=s=>s>=85?'var(--good)':s>=65?'#4fae6e':s>=45?'var(--gold2)':'var(--bad)';
function suitBars(P,mark){
 return `<div class="bars">${DIRS.slice().sort((a,b)=>P.sc[b]-P.sc[a]).map(d=>`<div class="bar${d===mark?' me':''}"><span class="lab">${esc(dn(d))}</span><span class="tr"><i style="width:${P.sc[d]}%;background:${pcol(P.sc[d])}"></i></span><span class="v">${P.sc[d]}</span></div>`).join('')}</div>`}
function persSummary(P){
 const nm=P.name?esc(P.name):'';
 if(!P.r)return '';
 const best=P.order[0];
 const s=lang==='te'
  ?`${nm?nm+' గారికి ':''}${P.r.te} రాశి (${P.el.te}) — <b>${esc(dn(P.rd))}</b> ముఖ ఇల్లు అత్యంత అనుకూలం.${best!==P.rd?` మొత్తం మీద ఉత్తమం: <b>${esc(dn(best))}</b>.`:''}`
  :`${nm?nm+': ':''}${P.r.en} rasi (${P.el.en}) — a <b>${esc(dn(P.rd))}</b>-facing house suits best.${best!==P.rd?` Best overall: <b>${esc(dn(best))}</b>.`:''}`;
 return s;
}
function aayaLine(P){if(!P.aa)return '';const g=P.aa.good;
 return `${esc(L(P.aa))} — ${g?t('shubham'):t('ashubham')}${g&&P.aa.dir?` (${dn(P.aa.dir)})`:''}`}

/* ================= evaluation ================= */
const resCls=v=>v==='good'?'good':v==='bad'?'bad':'ok';
function grade(room,d){if(!d)return null;if(room.best.includes(d))return'good';if(room.ok.includes(d))return'ok';if(room.avoid.includes(d))return'bad';return'neutral'}
function roadKey(a,b){return [a,b].sort((x,y)=>DIRS.indexOf(x)-DIRS.indexOf(y)).join('+')}
function roadResult(h){const a=h.road1,b=h.road2;if(!a&&!b)return null;
 if(a&&b&&a!==b){const k=roadKey(a,b);if(CORNER[k])return Object.assign({corner:true},CORNER[k]);const r1=ROAD[a],r2=ROAD[b],s=r1.score+r2.score;return {corner:true,score:Math.round(s/2),v:s>=2?'good':s<-2?'bad':'ok',te:r1.te+' · '+r2.te,en:r1.en+' · '+r2.en}}
 return Object.assign({},ROAD[a||b])}
const CHECKS=['kitchen','master','pooja','toilet','toilet2','stairs','sump','ohtank','septic'];
function evaluate(h){
 const issues=[],goods=[];let crit=0;const cat={road:[0,0],entry:[0,0],rooms:[0,0],site:[0,0]};
 const add=(c,s,m)=>{cat[c][0]+=s;cat[c][1]+=m};
 const rr=roadResult(h);
 if(rr){add('road',rr.score,rr.corner?4:3);const line=`${t('road')}: ${L(rr)}`;rr.v==='good'?goods.push(line):issues.push({t:line,c:false})}
 if(h.slope&&h.slope!=='flat'){const S=SLOPE[h.slope];add('road',S.w,3);const line=`${t('slopeTo')} ${dn(h.slope)}`;S.v==='good'?goods.push(line):S.v==='bad'?issues.push({t:line+' — '+t('slopeBad'),c:false}):0}
 if(h.potu&&h.potu!=='none'){const P=POTU[h.potu];add('road',P.w,3);if(P.v==='good')goods.push(L(P));else{if(P.crit)crit++;issues.push({t:L(P),c:!!P.crit,m:P.v==='ok'})}}
 if(h.building){const B=FACING[h.building];add('entry',Math.round(B.score/2),2);const line=`${t('buildFaces')} ${dn(h.building)}: ${L(B)}`;B.v==='good'?goods.push(line):issues.push({t:line,c:false})}
 if(h.facing){const F=FACING[h.facing];add('entry',F.score,3);const line=`${t('faces')} ${dn(h.facing)}: ${L(F)}`;
  if(F.v==='good')goods.push(line);else if(F.v==='bad'){issues.push({t:line+' — '+L(F.door),c:true});crit++}else issues.push({t:line+' — '+L(F.door),c:false})}
 CHECKS.forEach(id=>{const d=(h.rooms||{})[id];if(!d)return;const r=ROOM(id),g=grade(r,d);add('rooms',0,2);
  if(g==='good'){cat.rooms[0]+=2;goods.push(`${L(r)}: ${dn(d)}`)}
  else if(g==='ok'||g==='neutral'){cat.rooms[0]+=1}
  else if(g==='bad'){const c=(r.crit||[]).includes(d);cat.rooms[0]-=c?5:2;if(c)crit++;issues.push({t:`${L(r)} — ${dn(d)}. ${L(r.note)}`,c})}});
 QUESTIONS.forEach(q=>{const a=(h.q||{})[q.id];if(!a||a==='dk')return;
  if(q.w>0){add('site',0,q.w);if(a==='yes'){cat.site[0]+=q.w;goods.push(L(q.good))}else issues.push({t:L(q.issue),c:false,m:true})}
  else{add('site',0,0);if(a===q.bad){cat.site[0]+=q.w;cat.site[1]+=Math.abs(q.w);if(q.crit)crit++;issues.push({t:L(q.issue),c:!!q.crit})}else{cat.site[0]+=Math.abs(q.w);cat.site[1]+=Math.abs(q.w)}}});
 let s=0,m=0;for(const k in cat){s+=cat[k][0];m+=cat[k][1]}
 const pct=m>0?Math.max(0,Math.min(100,Math.round(s/m*100))):0;
 const cp={};for(const k in cat)cp[k]=cat[k][1]>0?Math.max(0,Math.min(100,Math.round(cat[k][0]/cat[k][1]*100))):null;
 const major=issues.filter(i=>!i.c&&!i.m).length,minor=issues.filter(i=>i.m).length;
 const v=crit>0||major>=3||pct<40?'bad':(major>0||minor>=2)?'ok':'good';
 return {v,pct,issues,goods,crit,cp};
}
function bestEntry(h,P){
 const roads=[h.road1,h.road2].filter(Boolean);const cands=roads.length?[...new Set(roads)]:['N','E','S','W'];
 const sc=d=>P?P.sc[d]:BASE[FACING[d].score];
 const best=cands.slice().sort((a,b)=>sc(b)-sc(a))[0];
 return {best,cands,sc};
}

/* ================= photos (IndexedDB) ================= */
const DB={p:null,
 open(){return this.p||(this.p=new Promise((res,rej)=>{const r=indexedDB.open('vasthu',1);r.onupgradeneeded=()=>r.result.createObjectStore('photos',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))},
 async tx(mode,fn){const db=await this.open();return new Promise((res,rej)=>{const x=db.transaction('photos',mode);const st=x.objectStore('photos');const r=fn(st);x.oncomplete=()=>res(r&&r.result);x.onerror=()=>rej(x.error)})},
 put(rec){return this.tx('readwrite',s=>s.put(rec))},get(id){return this.tx('readonly',s=>s.get(id))},all(){return this.tx('readonly',s=>s.getAll())},del(id){return this.tx('readwrite',s=>s.delete(id))}};
const URLS={};
async function purl(id){if(URLS[id])return URLS[id];const r=await DB.get(id);if(!r)return '';return URLS[id]=URL.createObjectURL(r.blob)}
async function fillThumbs(root){for(const im of (root||document).querySelectorAll('img[data-pid]')){if(!im.src||im.src===location.href)im.src=await purl(im.dataset.pid)}}

/* ================= camera ================= */
let camStream=null,camOpts=null,camLabel='lDoor';
const CAMLABS=['lDoor','lRoad','lGate','lPlot','kitchen','master','pooja','toilet','stairs','sump','ohtank','hall','lOther'];
const labName=k=>T[k]?t(k):L(ROOM(k));
async function openCamera(o){
 camOpts=o||{};const cam=$('#cam');cam.hidden=false;
 const lab=camOpts.label||labName(camLabel);
 cam.innerHTML=`<video playsinline muted autoplay></video><div class="aim"></div>
 <div class="ctop"><button class="ib" data-act="camClose" aria-label="close"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <div style="flex:1"><div class="clab" id="camLab">${esc(lab)}</div><div class="clab small" style="display:inline-flex;gap:6px;align-items:center;margin-top:6px"><span class="qdot" data-live="q"></span><span data-live="qt"></span></div></div></div>
 <div class="camrose">${miniRose(128,true)}<div class="cd" data-live="dir"></div>${camOpts.outside?`<div class="cd small" data-live="out"></div>`:''}</div>
 <div class="cbot">${camOpts.slot?'':`<div class="labs">${CAMLABS.map(k=>`<button data-cl="${k}" class="${k===camLabel?'on':''}">${esc(labName(k))}</button>`).join('')}</div>`}
  <div class="shut"><span></span><button class="shutter" data-act="shoot" aria-label="capture"></button><span style="justify-self:end"><img class="lastimg" id="lastImg" alt="" hidden></span></div></div>
 <div class="flash" id="flash"></div>`;
 try{
  camStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});
  const v=cam.querySelector('video');v.srcObject=camStream;await v.play().catch(()=>{});
 }catch(e){cam.insertAdjacentHTML('beforeend',`<div class="camerr"><div><p>${t('camErr')}</p><button class="btn gold" data-act="camClose">${t('exit')}</button></div></div>`)}
}
function closeCamera(){if(camStream){camStream.getTracks().forEach(x=>x.stop());camStream=null}$('#cam').hidden=true;$('#cam').innerHTML=''}
async function shoot(){
 const v=$('#cam video');if(!v||!v.videoWidth){toast(t('camErr'));return}
 const h=hasHeading()?heading():null;
 const sc=Math.min(1,1600/Math.max(v.videoWidth,v.videoHeight));const W=Math.round(v.videoWidth*sc),H=Math.round(v.videoHeight*sc);
 const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.drawImage(v,0,0,W,H);
 $('#flash').classList.add('on');setTimeout(()=>{const f=$('#flash');f&&f.classList.remove('on')},60);
 const label=camOpts.label||labName(camLabel);
 let extra='';if(h!=null&&camOpts.outside)extra=`${t('faces')}: ${dn(OPP[sector(h)])}`;
 try{await document.fonts.load('30px Ramabhadra','తెలుగు');await document.fonts.load('30px Mandali','తెలుగు')}catch(e){}
 stamp(x,W,H,h,label,extra);
 const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',0.86));
 const rec={id:'p'+Date.now(),ts:Date.now(),blob,heading:h,dir:h!=null?sector(h):null,label,slot:camOpts.slot||camLabel,rid:camOpts.rid||null};
 await DB.put(rec);
 const li=$('#lastImg');if(li){li.src=await purl(rec.id);li.hidden=false;li.dataset.pid=rec.id}
 if(camOpts.onCapture){const cb=camOpts.onCapture;setTimeout(()=>{closeCamera();cb(rec)},450)}
 else toast(`${label} · ${h!=null?dn(sector(h))+' '+Math.round(h)+'°':''}`);
}
function stamp(x,W,H,h,label,extra){
 const R=Math.round(Math.min(W,H)*0.15),cx=W-R-Math.round(R*0.3),cy=R+Math.round(R*0.3);
 const date=new Date().toLocaleString(lang==='te'?'te-IN':'en-IN',{dateStyle:'medium',timeStyle:'short'});
 x.save();x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=R*0.15;
 x.beginPath();x.arc(cx,cy,R*1.06,0,7);x.fillStyle='rgba(0,0,0,.5)';x.fill();x.shadowBlur=0;
 x.lineWidth=R*0.05;x.strokeStyle='#ffc72c';x.stroke();
 if(h!=null){
  x.translate(cx,cy);x.rotate(-h*RAD);
  for(let a=0;a<360;a+=5){const big=a%90===0,mid=a%45===0||a%15===0;x.save();x.rotate(a*RAD);x.beginPath();x.moveTo(0,-R*0.95);x.lineTo(0,-R*(big?0.74:mid?0.82:0.88));x.lineWidth=big?R*0.045:R*0.018;x.strokeStyle=big?'#ff4b55':'rgba(255,255,255,.85)';x.stroke();x.restore()}
  const cards=['N','E','S','W'];cards.forEach((d,i)=>{x.save();x.rotate(i*90*RAD);x.fillStyle=d==='N'?'#ff4b55':'#fff';x.font=`${Math.round(R*0.24)}px Ramabhadra, sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(SHORT[lang][d],0,-R*0.56);x.restore()});
  x.beginPath();x.moveTo(0,-R*0.42);x.lineTo(R*0.09,0);x.lineTo(-R*0.09,0);x.closePath();x.fillStyle='#e0242f';x.fill();
  x.beginPath();x.moveTo(0,R*0.42);x.lineTo(R*0.09,0);x.lineTo(-R*0.09,0);x.closePath();x.fillStyle='#ddd';x.fill();
  x.setTransform(1,0,0,1,0,0);
 }
 x.beginPath();x.moveTo(cx,cy-R*1.06-R*0.02);x.lineTo(cx+R*0.12,cy-R*1.06+R*0.18);x.lineTo(cx-R*0.12,cy-R*1.06+R*0.18);x.closePath();x.fillStyle='#ffc72c';x.fill();
 x.beginPath();x.arc(cx,cy,R*0.05,0,7);x.fillStyle='#fff';x.fill();
 const dtxt=h!=null?`${Math.round(h)%360}° ${dn(sector(h))}`:'—';
 x.font=`${Math.round(R*0.27)}px Ramabhadra, sans-serif`;x.textAlign='center';x.textBaseline='top';x.fillStyle='#fff';x.shadowColor='rgba(0,0,0,.8)';x.shadowBlur=R*0.12;
 x.fillText(dtxt,cx,cy+R*1.14);x.shadowBlur=0;
 const bh=Math.max(Math.round(H*0.11),64);const g=x.createLinearGradient(0,H-bh*1.3,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.3,'rgba(0,0,0,.6)');g.addColorStop(1,'rgba(0,0,0,.75)');x.fillStyle=g;x.fillRect(0,H-bh*1.3,W,bh*1.3);
 x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle='#fff';const pad=Math.round(bh*0.3);
 x.font=`${Math.round(bh*0.34)}px Ramabhadra, sans-serif`;x.fillText(`${label}  ·  ${t('camDir')}: ${dtxt}`,pad,H-bh*0.52);
 x.font=`${Math.round(bh*0.22)}px Mandali, sans-serif`;x.fillStyle='#ffe7a6';x.fillText(`${extra?extra+'  ·  ':''}${date}  ·  ${t('app')}`,pad,H-bh*0.16);
 x.restore();
}

/* ================= wizard ================= */
const blank=()=>({id:'r'+Date.now(),name:'',kartha:LS.get('kartha',{name:'',rasi:null,len:'',wid:''}),road1:null,road2:null,slope:null,potu:null,building:null,facing:null,doorMode:'in',deg:{},rooms:{},q:{},photos:[],step:0,mode:'check'});
let cur=LS.get('cur',null);
const saveCur=()=>{LS.set('cur',cur);if(cur&&cur.kartha)LS.set('kartha',cur.kartha)};
function STEPS(){
 const s=[{k:'family',type:'family',g:'gFam',opt:true},{k:'personal',type:'personal',g:'gFam'}];
 if(cur.mode==='personal')return s;
 s.push({k:'road1',type:'dir',g:'gRoad',title:'road1q',how:'roadHow',lab:'lRoad'},
  {k:'road2',type:'dir',g:'gRoad',opt:true,title:'road2q',how:'road2How',lab:'lRoad'},
  {k:'slope',type:'pick',g:'gRoad',opt:true,title:'slopeQ',how:'slopeHow'},
  {k:'potu',type:'potu',g:'gRoad',opt:true,title:'potuQ',how:'potuHow'},
  {k:'building',type:'dir',g:'gEntry',opt:true,title:'buildQ',how:'buildHow',lab:'lGate'},
  {k:'facing',type:'dir',g:'gEntry',title:'doorQ',how:'doorHowIn',lab:'lDoor',door:true});
 CHECKS.forEach(id=>{s.push({k:id,type:'dir',g:'gRooms',opt:true,room:ROOM(id),how:'roomHow'})});
 QUESTIONS.forEach(q=>s.push({k:q.id,type:'q',g:'gQ',q}));
 s.push({k:'result',type:'result',g:'gRes'});
 return s;
}
const SLOT=['facing','road1','road2','building'];
const getv=k=>SLOT.includes(k)?cur[k]:cur.rooms[k];
function setv(k,d,deg){if(SLOT.includes(k))cur[k]=d;else if(d)cur.rooms[k]=d;else delete cur.rooms[k];if(deg!=null)cur.deg[k]=Math.round(deg);else delete cur.deg[k];saveCur();renderFlow()}
function startFlow(mode,resume){
 if(!resume||!cur){cur=blank();cur.mode=mode;if(mode==='check'&&!cur.kartha.name&&!cur.kartha.rasi)cur.step=0}
 saveCur();$('#flow').hidden=false;document.body.style.overflow='hidden';renderFlow();
}
function closeFlow(){$('#flow').hidden=true;document.body.style.overflow='';renderView()}
function stepTitle(st){if(st.type==='q')return L(st.q);if(st.room)return t('roomQ',{r:lang==='te'?L(st.room):L(st.room).toLowerCase()});if(st.type==='family')return t('famQ');if(st.type==='personal')return t('persT');return t(st.title)}
let viewing=null; // saved report being viewed
function flowShell(title,prog,stage,body,foot){
 $('#flow').innerHTML=`<div class="top"><button class="ib" data-act="flowClose" aria-label="close"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg></button><h1>${esc(title)}</h1><button class="qpill" data-act="calib"><i class="${qcls(quality())}" data-live="q"></i><span data-live="qt">${qtxt(quality())}</span></button></div>
 ${prog!=null?`<div class="prog"><i style="width:${prog}%"></i></div>`:''}${stage||''}<div class="body" id="fbody">${body}</div>${foot?`<div class="foot${foot.one?' one':''}">${foot.html}</div>`:''}`;
 fillThumbs($('#flow'));
}
function dirButtons(sel){
 const pos=['NW','N','NE','W',null,'E','SW','S','SE'];
 return `<div class="pick">${pos.map(d=>d?`<button data-pick="${d}" class="${sel===d?'sel':''}">${esc(dn(d))}</button>`:`<span class="ctr">${miniRose(46)}</span>`).join('')}</div>`}
function stepResult(st){
 const d=st.type==='dir'?getv(st.k):null;if(!d)return '';
 if(st.k==='road1'||st.k==='road2'){const r=roadResult(cur);return r?`<div class="res ${resCls(r.v)}">${esc(L(r))}</div>`:''}
 if(st.k==='building'||st.k==='facing'){const F=FACING[d];
  const away=st.k==='facing'&&(cur.road1||cur.road2)&&![cur.road1,cur.road2].includes(d);
  return `<div class="res ${resCls(F.v)}"><b>${st.k==='building'?t('buildFaces'):t('faces')}: ${esc(dn(d))}</b> — ${esc(L(F))}${st.k==='facing'?`<br>${t('enterTo')}: <b>${esc(dn(OPP[d]))}</b><br>${t('doorBest')}: ${esc(L(F.door))} ${esc(L(F.avoid))}`:''}</div>${away?`<p class="mute">${t('awayRoad')}</p>`:''}${st.k==='facing'?persMatch(d):''}`}
 const r=st.room,g=grade(r,d);const lab={good:t('best'),ok:t('okay'),bad:t('bad'),neutral:t('neutral')}[g];
 return `<div class="res ${g==='neutral'?'ok':g}"><b>${esc(dn(d))} — ${lab}</b>${g==='bad'&&(r.crit||[]).includes(d)?` (${t('critical')})`:''}. ${esc(L(r.note))}</div>`;
}
function persMatch(d){const P=personal(cur.kartha);if(!P||!P.r)return '';const s=P.sc[d];const k=s>=65?'matchGood':s>=45?'matchOk':'matchBad';
 return `<div class="res ${s>=65?'good':s>=45?'ok':'bad'}">${esc(P.name||t('rasi'))} (${esc(L(P.r))}): ${t(k)} · ${s}/100</div>`}
function potuSvg(sel){
 const sq=[90,90,120,120];const segs={'N-NW':[91,42,57,36],'N-NE':[152,42,57,36],'E-NE':[222,91,36,57],'E-SE':[222,152,36,57],'S-SE':[152,222,57,36],'S-SW':[91,222,57,36],'W-SW':[42,152,36,57],'W-NW':[42,91,36,57]};
 let p=`<svg viewBox="0 0 300 300" style="width:100%;max-width:300px;display:block;margin:0 auto"><rect x="${sq[0]-6}" y="${sq[1]-6}" width="${sq[2]+12}" height="${sq[3]+12}" fill="#f3e6d4" stroke="#7a5a50" stroke-width="3"/><text x="150" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#76605a">${lang==='te'?'స్థలం':'PLOT'}</text>`;
 p+=`<text x="150" y="18" text-anchor="middle" font-size="15" fill="#9e0f1b" font-family="Ramabhadra">${esc(dn('N'))} ↑</text><text x="150" y="292" text-anchor="middle" font-size="13" fill="#76605a">${esc(dn('S'))}</text><text x="20" y="150" text-anchor="middle" font-size="13" fill="#76605a" transform="rotate(-90 20 150)">${esc(dn('W'))}</text><text x="280" y="150" text-anchor="middle" font-size="13" fill="#76605a" transform="rotate(90 280 150)">${esc(dn('E'))}</text>`;
 for(const k in segs){const [x,y,w,h]=segs[k];const P=POTU[k];const on=sel===k;const col=P.v==='good'?'#17804a':P.v==='ok'?'#e8a200':'#c0202c';
  p+=`<g data-potu="${k}" style="cursor:pointer"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${on?col:'#8a8a8a'}" opacity="${on?1:.55}"/>`;
  const vert=w<h;const ax=x+w/2,ay=y+h/2;
  p+=`<text x="${ax}" y="${ay}" text-anchor="middle" dominant-baseline="central" font-size="18" fill="#fff">${k[0]==='N'?'↓':k[0]==='S'?'↑':k[0]==='E'?'←':'→'}</text></g>`;
 }
 return p+'</svg>'}
function stageBar(S,idx){
 const gs=[...new Set(S.map(s=>s.g))];const cg=S[idx].g;const ci=gs.indexOf(cg);
 return `<div class="stage">${gs.map((g,i)=>`<span class="${i===ci?'on':i<ci?'done':''}">${t(g)}</span>`).join('')}</div>`}
function renderFlow(){
 if($('#flow').hidden)return;
 if(viewing){renderReport(viewing,true);return}
 const S=STEPS();cur.step=Math.max(0,Math.min(cur.step,S.length-1));const st=S[cur.step];
 if(st.type==='result'){renderReport(cur,false);return}
 const prog=Math.round(cur.step/(S.length-1)*100);
 let body=`<h2 class="qt">${esc(stepTitle(st))}</h2>`,foot;
 const last=cur.step===S.length-1;
 const nav=(nextLab,dis)=>({html:`<button class="btn ghost" data-act="prev" ${cur.step===0?'disabled':''}>← ${t('back')}</button><button class="btn" data-act="next" ${dis?'disabled':''}>${nextLab} →</button>`});
 if(st.type==='family'){
  const k=cur.kartha;const P=personal(k);
  body+=`<p class="how">${t('famHow')}</p>
  <label class="f" for="kname">${t('kName')}</label><input type="text" id="kname" value="${esc(k.name)}" autocomplete="off" autocapitalize="words">
  <div id="detBox">${detBox(k)}</div>
  <label class="f">${t('knowRasi')}</label><div class="rasis">${RASI.map(r=>`<button data-rasi="${r.id}" class="${k.rasi===r.id?'sel':''}">${esc(L(r).replace(/ \(.*\)/,''))}</button>`).join('')}</div>
  <label class="f">${t('plot')}</label><div class="g2"><input type="number" inputmode="decimal" id="klen" placeholder="${t('len')}" value="${esc(k.len)}"><input type="number" inputmode="decimal" id="kwid" placeholder="${t('wid')}" value="${esc(k.wid)}"></div>
  ${cur.mode==='check'?`<label class="f" for="hname">${t('hname')}</label><input type="text" id="hname" value="${esc(cur.name)}" autocomplete="off">`:''}`;
  foot=nav(t('next'));foot.html=foot.html.replace('disabled','');
  foot.html=`<button class="btn ghost" data-act="${cur.mode==='check'?'skipFam':'flowClose'}">${cur.mode==='check'?t('skip'):t('exit')}</button><button class="btn" data-act="next">${t('next')} →</button>`;
 } else if(st.type==='personal'){
  const P=personal(cur.kartha);
  body+=persCard(P,null);
  if(cur.mode==='personal')foot={html:`<button class="btn ghost" data-act="prev">← ${t('back')}</button><button class="btn gold" data-act="toCheck">${t('checkThis')}</button>`};
  else foot=nav(t('next'));
 } else if(st.type==='dir'){
  const d=getv(st.k);const door=st.door;const outside=door&&cur.doorMode==='out';
  if(door)body+=`<div class="toggle"><button data-dm="in" class="${!outside?'on':''}">${t('doorIn')}</button><button data-dm="out" class="${outside?'on':''}">${t('doorOut')}</button></div>`;
  body+=`<p class="how">${t(door?(outside?'doorHowOut':'doorHowIn'):st.how)}</p>
  <div class="live">${miniRose(64)}<div style="flex:1"><div class="mute small">${outside?t('camDir'):(lang==='te'?'ప్రస్తుత దిశ':'Now pointing')}</div><div class="dn" data-live="dn">—</div><div class="dg"><span data-live="deg"></span> · <span class="small" data-live="mode"></span></div>${outside?`<div class="small" data-live="out"></div>`:''}</div><span class="qdot ${qcls(quality())}" data-live="q"></span></div>
  <div class="g2"><button class="btn" data-act="photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>${t('photoMeasure')}</button><button class="btn alt" data-act="measure">${t('measure')}</button></div>
  ${photosFor(st.k)}
  <p class="mute" style="text-align:center;margin:14px 0 2px">${t('orPick')}</p>${dirButtons(d)}
  ${stepResult(st)}`;
  foot=d?nav(last?t('seeResult'):t('next')):{html:`<button class="btn ghost" data-act="prev" ${cur.step===0?'disabled':''}>← ${t('back')}</button>${st.opt?`<button class="btn ghost" data-act="next">${t('skip')} →</button>`:`<button class="btn" disabled>${t('next')} →</button>`}`};
 } else if(st.type==='pick'){
  const d=cur.slope;
  body+=`<p class="how">${t(st.how)}</p>${dirButtons(d==='flat'?null:d)}<button class="btn ghost wide" data-pick="flat" style="margin-top:8px;${d==='flat'?'background:var(--red);color:#fff':''}">${t('flat')}</button>
  ${d&&d!=='flat'?`<div class="res ${resCls(SLOPE[d].v)}">${t('slopeTo')} <b>${esc(dn(d))}</b></div>`:''}`;
  foot=d?nav(t('next')):{html:`<button class="btn ghost" data-act="prev">← ${t('back')}</button><button class="btn ghost" data-act="next">${t('skip')} →</button>`};
 } else if(st.type==='potu'){
  const p=cur.potu;
  body+=`<p class="how">${t(st.how)}</p>${potuSvg(p)}<button class="btn ghost wide" data-potu="none" style="margin-top:10px;${p==='none'?'background:var(--good);color:#fff':''}">${t('noPotu')}</button>
  ${p&&p!=='none'?`<div class="res ${resCls(POTU[p].v)}">${esc(L(POTU[p]))}</div>`:''}`;
  foot=p?nav(t('next')):{html:`<button class="btn ghost" data-act="prev">← ${t('back')}</button><button class="btn ghost" data-act="next">${t('skip')} →</button>`};
 } else if(st.type==='q'){
  const a=cur.q[st.k];
  body+=`<div class="yn">${['yes','no','dk'].map(x=>`<button data-ans="${x}" class="${a===x?'sel':''}">${t(x)}</button>`).join('')}</div>`;
  foot=nav(last?t('seeResult'):t('next'),!a);
 }
 flowShell(t('app'),prog,stageBar(S,cur.step),body,foot);
 lastSec=null;
 const kn=$('#kname');if(kn){const up=()=>{cur.kartha.name=kn.value;saveCur();$('#detBox').innerHTML=detBox(cur.kartha)};kn.oninput=up;
  $('#klen').oninput=e=>{cur.kartha.len=e.target.value;saveCur()};$('#kwid').oninput=e=>{cur.kartha.wid=e.target.value;saveCur()};
  const hn=$('#hname');if(hn)hn.oninput=e=>{cur.name=e.target.value;saveCur()}}
}
function detBox(k){
 const d=detect(k.name);
 if(k.rasi){const r=RID(k.rasi);return `<div class="detect"><div class="syl">✓</div><div><div class="mute small">${t('rasi')} (${t('chosen')})</div><b>${esc(L(r))}</b> · ${esc(L(ELEM[r.el]))}</div></div>`}
 if(!k.name)return '';
 if(!d||!d.rasi)return `<div class="hint">${t('noDetect')}</div>`;
 const r=RID(d.rasi);return `<div class="detect"><div class="syl">${esc(d.syl)}</div><div><div class="mute small">${t('detected')} → ${t('rasi')} (${t('fromName')})</div><b>${esc(L(r))}</b> · ${esc(L(ELEM[r.el]))}</div></div>`;
}
function persCard(P,mark){
 if(!P||!P.r)return `<div class="hint">${t('noDetect')}</div>${P&&P.aa?`<div class="card"><div class="kv"><b>${t('area')}</b><span>${P.ar} ${t('sqft')}</span><b>${t('aayam')}</b><span>${aayaLine(P)}</span></div></div>`:''}`;
 return `<div class="brief">${persSummary(P)}</div>
 <div class="card"><div class="rcard"><div style="flex:1"><div class="kv"><b>${t('rasi')}</b><span>${esc(L(P.r))}</span><b>${t('element')}</b><span>${esc(L(P.el))}</span><b>${t('bestFace')}</b><span><b>${esc(dn(P.order[0]))}</b>, ${esc(dn(P.order[1]))}</span>${P.aa?`<b>${t('area')}</b><span>${P.ar} ${t('sqft')}</span><b>${t('aayam')}</b><span>${aayaLine(P)}</span>`:''}</div></div>${facingRose(P,mark)}</div>
 ${P.aa&&!P.aa.good?`<div class="hint">${t('aayaBad')}</div>`:''}</div>
 <div class="card"><h3>${t('suitChart')}</h3>${suitBars(P,mark)}</div>`;
}
function facingRose(P,mark){ // radial chart: petal length = suitability
 const c=60,p=[`<svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true"><circle cx="60" cy="60" r="54" fill="#fbf7f3" stroke="#eadbd1"/><circle cx="60" cy="60" r="27" fill="none" stroke="#eadbd1" stroke-dasharray="2 3"/>`];
 DIRS.forEach((d,i)=>{const a=i*45,s=P.sc[d],r=8+s*0.44;const a1=(a-18)*RAD,a2=(a+18)*RAD;
  p.push(`<path d="M60 60 L${c+r*Math.sin(a1)} ${c-r*Math.cos(a1)} A${r} ${r} 0 0 1 ${c+r*Math.sin(a2)} ${c-r*Math.cos(a2)}Z" fill="${pcol(s)}" opacity="${d===mark?1:.85}" stroke="${d===mark?'#2a1210':'#fff'}" stroke-width="${d===mark?2:1}"/>`);
  const lr=57;p.push(`<text x="${c+lr*Math.sin(a*RAD)}" y="${c-lr*Math.cos(a*RAD)}" font-size="8" text-anchor="middle" dominant-baseline="central" fill="#76605a">${SHORT[lang][d]}</text>`)});
 return p.join('')+'</svg>'}
function photosFor(k){const ids=(cur.photos||[]).filter(p=>p.slot===k).map(p=>p.id);if(!ids.length)return '';return `<div class="thumbrow">${ids.map(id=>`<img data-pid="${id}" data-view="${id}" alt="">`).join('')}</div>`}
function doMeasure(st,h){
 if(st.door&&cur.doorMode==='out')h=norm(h+180);
 setv(st.k,sector(h),h);
}
function stepNow(){const S=STEPS();return S[cur.step]}

/* ================= report ================= */
function gauge(p){const r=44,cl=Math.PI*r;return `<svg viewBox="0 0 110 66"><path d="M11 58 A44 44 0 0 1 99 58" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="11" stroke-linecap="round"/><path d="M11 58 A44 44 0 0 1 99 58" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-dasharray="${(cl*p/100).toFixed(1)} ${cl.toFixed(1)}"/><text x="55" y="55" text-anchor="middle" font-size="22" fill="#fff" font-family="Ramabhadra,sans-serif">${p}%</text></svg>`}
function zoneMap(h){
 const pos=['NW','N','NE','W','C','E','SW','S','SE'];const by={};CHECKS.forEach(id=>{const d=(h.rooms||{})[id];if(d){(by[d]=by[d]||[]).push(id)}});
 const roads=[h.road1,h.road2].filter(d=>d&&d.length===1);
 const dpos={N:'left:calc(50% - 15px);top:-6px',S:'left:calc(50% - 15px);bottom:-6px',E:'right:-6px;top:calc(50% - 15px);width:8px;height:30px',W:'left:-6px;top:calc(50% - 15px);width:8px;height:30px',NE:'right:-6px;top:-6px;width:18px;height:18px',NW:'left:-6px;top:-6px;width:18px;height:18px',SE:'right:-6px;bottom:-6px;width:18px;height:18px',SW:'left:-6px;bottom:-6px;width:18px;height:18px'};
 return `<div class="zone">${pos.map(d=>d==='C'?`<div class="c"><span class="zl">${t('centre')}</span>${(h.q||{}).centre==='yes'?`<span class="rm bad">✕</span>`:''}</div>`:`<div><span class="zl">${esc(dn(d))}</span>${(by[d]||[]).map(id=>{const r=ROOM(id);return `<span class="rm ${grade(r,d)}">${esc(L(r))}</span>`}).join('')}</div>`).join('')}
 ${roads.map(d=>`<span class="road ${d}">${t('road')}</span>`).join('')}
 ${h.facing?`<span class="door" style="${dpos[h.facing]}"></span>`:''}</div>
 <div class="legend"><span style="--c:var(--good)">${t('lgBest')}</span><span style="--c:var(--gold)">${t('lgOk')}</span><span style="--c:var(--bad)">${t('lgAvoid')}</span><span style="--c:var(--gold2)">${t('door')}</span><span style="--c:#5d5d5d">${t('road')}</span></div>`}
function catBars(cp){const rows=[['road','cRoad'],['entry','cEntry'],['rooms','cRooms'],['site','cSite']].filter(([k])=>cp[k]!=null);
 return `<div class="bars">${rows.map(([k,l])=>`<div class="bar"><span>${t(l)}</span><span class="tr"><i style="width:${cp[k]}%;background:${cp[k]>=70?'var(--good)':cp[k]>=45?'var(--gold2)':'var(--bad)'}"></i></span><span class="v">${cp[k]}%</span></div>`).join('')}</div>`}
function briefText(h,r,P){
 const vk={good:'vGoodT',ok:'vOkT',bad:'vBadT'}[r.v];const out=[t(vk)];
 if(h.facing)out.push(lang==='te'?`ఇల్లు ${dn(h.facing)} ముఖం; లోపలికి వెళ్తూ మీరు ${dn(OPP[h.facing])} వైపు నడుస్తారు.`:`The house faces ${dn(h.facing)}; walking in you head ${dn(OPP[h.facing])}.`);
 if(P&&P.r&&h.facing){const s=P.sc[h.facing];out.push(lang==='te'?`${P.name||'కర్త'} గారి ${P.r.te} రాశికి ఈ ముఖం ${t(plab(s))} (${s}/100); ఉత్తమ ముఖం ${dn(P.order[0])}.`:`For ${P.name||'the Kartha'} (${P.r.en}) this facing is ${t(plab(s)).toLowerCase()} (${s}/100); best is ${dn(P.order[0])}.`)}
 if(r.crit)out.push(lang==='te'?`${r.crit} తీవ్ర లోపం(లు) ఉన్నాయి.`:`${r.crit} serious defect(s) found.`);
 return out.join(' ');
}
function renderReport(h,isSaved){
 if(!h.facing){toast(t('notChecked'));if(!isSaved){const S=STEPS();cur.step=S.findIndex(s=>s.k==='facing');saveCur();renderFlow()}return}
 const r=evaluate(h);const P=personal(h.kartha);const vk={good:'vGood',ok:'vOk',bad:'vBad'}[r.v];
 const be=bestEntry(h,P);const fs=be.sc(h.facing);
 const entry=`${t('entryBest',{d:dn(be.best),o:dn(OPP[be.best]),door:L(FACING[be.best].door)})}<br>${t('entryNow',{d:dn(h.facing),s:t(plab(fs))+` (${fs}/100)`})}${be.best!==h.facing&&be.sc(be.best)-fs>=10?' '+t('entryBetter',{d:dn(be.best)}):''}`;
 const date=new Date(h.at||Date.now()).toLocaleDateString(lang==='te'?'te-IN':'en-IN',{dateStyle:'medium'});
 const photos=(h.photos||[]).map(p=>p.id);
 const body=`<div class="verdict ${r.v}">${gauge(r.pct)}<div><div class="small" style="opacity:.9">${esc(h.name||'')}${h.name?' · ':''}${date}</div><h2>${t(vk)}</h2><div class="small">${t({good:'vGoodT',ok:'vOkT',bad:'vBadT'}[r.v])}</div></div></div>
 <div class="brief"><b>${t('brief')}:</b> ${esc(briefText(h,r,P))}</div>
 ${P&&P.r?`<div class="card"><h3>${t('forKartha')}</h3><div class="rcard"><div style="flex:1"><div class="kv"><b>${t('rasi')}</b><span>${esc(P.name?P.name+' · ':'')}${esc(L(P.r))}</span><b>${t('bestFace')}</b><span><b>${esc(dn(P.order[0]))}</b>, ${esc(dn(P.order[1]))}</span><b>${t('thisHouse')}</b><span><b>${esc(dn(h.facing))}</b> <span class="tag ${fs>=65?'good':fs>=45?'ok':'bad'}">${t(plab(fs))} ${fs}</span></span>${P.aa?`<b>${t('aayam')}</b><span>${aayaLine(P)}</span>`:''}</div></div>${facingRose(P,h.facing)}</div><div style="margin-top:12px">${suitBars(P,h.facing)}</div></div>`:''}
 <div class="card"><h3>${t('entryT')}</h3><p style="margin:0">${esc(entry).replace(/&lt;br&gt;/g,'<br>')}</p></div>
 <div class="card"><h3>${t('zoneT')}</h3>${zoneMap(h)}</div>
 <div class="card"><h3>${t('catT')}</h3>${catBars(r.cp)}</div>
 ${r.issues.length?`<div class="card"><h3 style="color:var(--bad)">${t('issues')}</h3><ul class="list">${r.issues.map(i=>`<li>${esc(i.t)}${i.c?`<span class="tag bad">${t('critical')}</span>`:''}</li>`).join('')}</ul></div>`:''}
 ${r.goods.length?`<div class="card"><h3 style="color:var(--good)">${t('goods')}</h3><ul class="list">${r.goods.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`:''}
 ${photos.length?`<div class="card"><h3>${t('photosT')}</h3><div class="gal">${photos.map(id=>`<button data-view="${id}"><img data-pid="${id}" alt=""></button>`).join('')}</div></div>`:''}
 <p class="mute small">${t('disclaimer')}</p>`;
 const foot=isSaved?{html:`<button class="btn ghost" data-act="delReport" data-id="${h.id}">${t('del')}</button><button class="btn gold" data-act="shareReport">${t('share')}</button>`}
  :{html:`<button class="btn ghost" data-act="prev">← ${t('back')}</button><div class="g2"><button class="btn" data-act="saveReport">${t('save')}</button><button class="btn gold" data-act="shareReport">${t('share')}</button></div>`};
 flowShell(t('gRes'),isSaved?null:100,null,body,foot);
}
function reportText(h){
 const r=evaluate(h),P=personal(h.kartha);const vk={good:'vGood',ok:'vOk',bad:'vBad'}[r.v];
 return [`${t('app')} — ${h.name||''}`,`${t(vk)} · ${t('score')} ${r.pct}%`,briefText(h,r,P),'',t('issues')+':',...r.issues.map(i=>'• '+i.t),'',t('goods')+':',...r.goods.map(g=>'• '+g)].join('\n');
}
function shareText(txt){
 if(native()&&AndroidBridge.share){AndroidBridge.share(txt);return}
 if(navigator.share)navigator.share({text:txt}).catch(()=>{});
}
async function blobToDataURL(b){return new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(b)})}
async function savePhoto(id){const rec=await DB.get(id);if(!rec)return;const name=`vasthu_${rec.id}.jpg`;
 if(native()&&AndroidBridge.saveImage){const res=AndroidBridge.saveImage(await blobToDataURL(rec.blob),name);toast(res==='ok'?t('savedPhone'):res);return}
 const a=document.createElement('a');a.href=URL.createObjectURL(rec.blob);a.download=name;document.body.appendChild(a);a.click();a.remove();toast(t('savedPhone'))}
async function sharePhoto(id){const rec=await DB.get(id);if(!rec)return;const txt=`${rec.label} · ${rec.dir?dn(rec.dir)+' '+Math.round(rec.heading)+'°':''}`;
 if(native()&&AndroidBridge.shareImage){AndroidBridge.shareImage(await blobToDataURL(rec.blob),txt);return}
 const f=new File([rec.blob],`vasthu_${rec.id}.jpg`,{type:'image/jpeg'});
 if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],text:txt}).catch(()=>{});else savePhoto(id)}
async function viewPhoto(id){const rec=await DB.get(id);if(!rec)return;const v=$('#viewer');v.hidden=false;
 v.innerHTML=`<img src="${await purl(id)}" alt=""><div class="vb"><button class="btn sm ghost" data-act="vClose">✕</button><button class="btn sm" data-act="vSave" data-id="${id}">${t('savePhone')}</button><button class="btn sm gold" data-act="vShare" data-id="${id}">${t('share')}</button><button class="btn sm ghost" data-act="vDel" data-id="${id}">${t('del')}</button></div>`}

/* ================= main views ================= */
let view='home';
function renderView(){
 $$('nav.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===view));
 $$('main section').forEach(s=>s.classList.toggle('on',s.id==='v-'+view));
 const el=$('#v-'+view);lastSec=null;
 if(view==='home')el.innerHTML=homeHTML();
 if(view==='compass')el.innerHTML=compassHTML();
 if(view==='photos')photosHTML().then(h=>{el.innerHTML=h;fillThumbs(el)});
 if(view==='reports')el.innerHTML=reportsHTML();
 if(view==='guide')el.innerHTML=guideHTML();
 fillThumbs(el);
 $$('[data-k]').forEach(e=>e.textContent=t(e.dataset.k));
 $$('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));
 document.documentElement.lang=lang;
}
const IC={
 compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
 camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
 guide:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/></svg>',
 family:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.5-4 3-6 5.5-6s5 2 5.5 6M13.5 20c.4-3 2-4.5 3.5-4.5s3.2 1.5 3.6 4.5"/></svg>',
 chev:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>'};
function savedList(){return LS.get('saved',[])}
function savedRow(h){const r=evaluate(h);const col=r.v==='good'?'var(--good)':r.v==='ok'?'var(--ok)':'var(--bad)';
 return `<div class="saved"><div class="sc" style="background:${col}">${r.pct}</div><div class="nm"><b>${esc(h.name||t('thisHouse'))}</b><div class="mute small">${h.facing?esc(dn(h.facing))+' · ':''}${new Date(h.at).toLocaleDateString(lang==='te'?'te-IN':'en-IN',{dateStyle:'medium'})}</div></div><button class="btn sm alt" data-act="openReport" data-id="${h.id}">${t('open')}</button></div>`}
function homeHTML(){
 const unfinished=cur&&cur.mode==='check'&&cur.step>1;const list=savedList().slice(0,3);
 return `<div class="hero"><svg class="deco" viewBox="0 0 100 100">${'<circle cx="50" cy="50" r="46" fill="none" stroke="#fff" stroke-width="3"/><path d="M50 8l7 42H43z" fill="#fff"/><path d="M50 92l7-42H43z" fill="#fff" opacity=".5"/>'}</svg>
  <div class="small" style="opacity:.85">${t('heroK')}</div><h2>${t('heroT')}</h2><p>${t('heroP')}</p>
  <button class="btn" data-act="newCheck">${t('startCheck')}</button>
  ${unfinished?`<button class="btn" data-act="contCheck" style="margin-top:8px;background:rgba(255,255,255,.18);color:#fff">${t('contCheck')}</button>`:''}</div>
 <button class="wide-tile" data-act="personal"><span class="ic">${IC.family}</span><span><h3>${t('myT')}</h3><span class="mute">${t('myP')}</span></span><span class="chev">${IC.chev}</span></button>
 <div class="tiles"><button class="tile" data-go="compass"><span class="ic">${IC.compass}</span>${t('tCompass')}</button><button class="tile" data-act="freeCam"><span class="ic">${IC.camera}</span>${t('camera')}</button><button class="tile" data-go="guide"><span class="ic">${IC.guide}</span>${t('tGuide')}</button></div>
 ${list.length?`<div class="sec-h"><h2>${t('recent')}</h2><button class="btn sm ghost" data-go="reports">${t('all')}</button></div><div class="card">${list.map(savedRow).join('')}</div>`:''}
 <div class="card"><h3>${t('howT')}</h3><p class="mute" style="margin:0">${t('howP')}</p></div>
 <p class="mute small">${t('disclaimer')}</p>`;
}
function compassHTML(){
 const manual=C.src==='manual';const needPerm=!C.src&&typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function';
 return `<div class="dialwrap">${bigDial()}</div>
 <div class="read"><div class="dn" data-live="dn">—</div><div class="dg" data-live="deg"></div></div>
 <div class="status"><span class="badge"><span class="qdot" data-live="q"></span><span data-live="qt"></span></span><span class="badge" data-live="mode"></span></div>
 ${needPerm?`<button class="btn wide" data-act="startCompass" style="margin-bottom:12px">${t('startCompass')}</button>`:''}
 <div class="g2" style="grid-template-columns:1fr 1fr 1fr;margin-bottom:14px"><button class="btn ${C.held?'gold':'alt'} sm" data-act="hold">${C.held?t('resume'):t('hold')}</button><button class="btn alt sm" data-act="calib">${t('calibrate')}</button><button class="btn alt sm" data-act="freeCam">${t('camera')}</button></div>
 ${manual?`<div class="card"><div class="mute">${t('manual')}</div><input type="range" id="manual" min="0" max="359" value="${C.manual||0}" style="width:100%"></div>`:''}
 <div class="card" id="dirInfo">${C.shown!=null?dirInfo(sector(C.shown)):''}</div>
 <div class="card"><h3>${t('howT')}</h3><p class="mute" style="margin:0">${t('howP')}</p></div>`;
}
async function photosHTML(){
 let all=[];try{all=(await DB.all()).sort((a,b)=>b.ts-a.ts)}catch(e){}
 return `<button class="btn wide" data-act="freeCam" style="margin-bottom:14px">${IC.camera}${t('openCam')}</button>
 ${all.length?`<div class="gal">${all.map(p=>`<button data-view="${p.id}"><img data-pid="${p.id}" alt=""><span>${esc(p.label)}${p.dir?' · '+esc(dn(p.dir)):''}</span></button>`).join('')}</div>`:`<div class="card empty">${IC.camera}<p>${t('noPhotos')}</p></div>`}`;
}
function reportsHTML(){const list=savedList();
 return `<div class="sec-h"><h2>${t('savedT')}</h2><button class="btn sm" data-act="newCheck">+ ${t('startCheck')}</button></div>
 ${list.length?`<div class="card">${list.map(savedRow).join('')}</div>`:`<div class="card empty">${t('none')}</div>`}`}
let gtab='rooms';
function miniGrid(r){const pos=['NW','N','NE','W',null,'E','SW','S','SE'];return `<div class="mini">${pos.map(d=>d?`<i class="${r.best.includes(d)?'good':r.ok.includes(d)?'ok':r.avoid.includes(d)?'bad':''}">${SHORT[lang][d]}</i>`:'<i></i>').join('')}</div>`}
function guideHTML(){
 return `<div class="gtabs"><button data-gt="rooms" class="${gtab==='rooms'?'on':''}">${t('gRoomsT')}</button><button data-gt="dirs" class="${gtab==='dirs'?'on':''}">${t('gDirsT')}</button></div>
 ${gtab==='rooms'?`<div class="legend"><span style="--c:var(--good)">${t('lgBest')}</span><span style="--c:var(--gold)">${t('lgOk')}</span><span style="--c:var(--bad)">${t('lgAvoid')}</span></div>`+ROOMS.map(r=>`<div class="card rcard">${miniGrid(r)}<div><h3>${esc(L(r))}</h3><div class="small"><b style="color:var(--good)">${t('lgBest')}:</b> ${r.best.map(dn).join(', ')}${r.ok.length?` · <b style="color:var(--ok)">${t('lgOk')}:</b> ${r.ok.map(dn).join(', ')}`:''}</div><p class="mute" style="margin:4px 0 0">${esc(L(r.note))}</p></div></div>`).join('')
 :DIRS.map(d=>`<div class="card">${dirInfo(d)}</div>`).join('')}`}

/* ================= modal ================= */
function modal(html){const m=$('#modal');m.innerHTML=`<div class="card">${html}</div>`;m.hidden=false}
function closeModal(){$('#modal').hidden=true;$('#modal').innerHTML=''}
function confirmBox(msg,fn){modal(`<p style="font-size:18px">${msg}</p><button class="btn" id="cfOk">${t('del')}</button><button class="btn alt" data-close>${t('cancel')}</button>`);$('#cfOk').onclick=()=>{closeModal();fn()}}

/* ================= events ================= */
document.addEventListener('click',async e=>{
 const b=e.target.closest('button,[data-potu],[data-view]');if(!b)return;
 const d=b.dataset;
 if(d.close!==undefined){closeModal();return}
 if(d.lang){lang=d.lang;LS.set('lang',lang);renderView();if(!$('#flow').hidden)renderFlow();if(!$('#cam').hidden&&camOpts){const o=camOpts;closeCamera();openCamera(o)}return}
 if(d.pickLang){lang=d.pickLang;LS.set('lang',lang);closeModal();renderView();return}
 if(d.v){view=d.v;renderView();scrollTo(0,0);return}
 if(d.go){view=d.go;renderView();scrollTo(0,0);return}
 if(d.gt){gtab=d.gt;renderView();return}
 if(d.cl){camLabel=d.cl;$$('.labs button').forEach(x=>x.classList.toggle('on',x===b));$('#camLab').textContent=labName(camLabel);return}
 if(d.view&&!d.act){viewPhoto(d.view);return}
 if(d.rasi){cur.kartha.rasi=cur.kartha.rasi===d.rasi?null:d.rasi;saveCur();$$('[data-rasi]').forEach(x=>x.classList.toggle('sel',x.dataset.rasi===cur.kartha.rasi));$('#detBox').innerHTML=detBox(cur.kartha);return}
 if(d.dm){cur.doorMode=d.dm;saveCur();renderFlow();return}
 if(d.pick){const st=stepNow();if(st.type==='pick'){cur.slope=d.pick;saveCur();renderFlow()}else setv(st.k,getv(st.k)===d.pick?null:d.pick);return}
 if(d.potu){cur.potu=cur.potu===d.potu?null:d.potu;saveCur();renderFlow();return}
 if(d.ans){cur.q[stepNow().k]=d.ans;saveCur();renderFlow();setTimeout(()=>{const S=STEPS();if(cur.step<S.length-1&&stepNow().type==='q'){cur.step++;saveCur();renderFlow()}},260);return}
 switch(d.act){
  case 'calib':calibModal();break;
  case 'startCompass':startCompass();renderView();break;
  case 'hold':C.held=!C.held;if(!C.held)C.target=norm(Math.atan2(C.fx||0,C.fy||1)/RAD);renderView();break;
  case 'newCheck':viewing=null;startFlow('check');break;
  case 'contCheck':viewing=null;startFlow('check',true);break;
  case 'personal':viewing=null;if(cur&&cur.mode==='check'&&cur.step>1)LS.set('stash',cur);cur=blank();cur.mode='personal';startFlow('personal',true);break;
  case 'toCheck':LS.set('stash',null);cur.mode='check';cur.step=2;saveCur();renderFlow();break;
  case 'skipFam':cur.step=2;saveCur();renderFlow();break;
  case 'flowClose':viewing=null;if(cur&&cur.mode==='personal'){const st=LS.get('stash',null);cur=st;LS.set('stash',null);saveCur()}closeFlow();break;
  case 'prev':cur.step=Math.max(0,cur.step-1);saveCur();renderFlow();break;
  case 'next':cur.step++;saveCur();renderFlow();$('#fbody')&&($('#fbody').scrollTop=0);break;
  case 'measure':{const st=stepNow();if(!hasHeading()){toast(t('noSensor'));break}doMeasure(st,heading());break}
  case 'photo':{const st=stepNow();const lab=st.room?L(st.room):t(st.lab||'lOther');
   openCamera({slot:st.k,label:lab,rid:cur.id,outside:st.door&&cur.doorMode==='out',onCapture:rec=>{cur.photos=cur.photos||[];cur.photos.push({id:rec.id,slot:st.k});if(rec.heading!=null)doMeasure(st,rec.heading);else{saveCur();renderFlow()}}});break}
  case 'freeCam':openCamera({});break;
  case 'camClose':closeCamera();if(view==='photos')renderView();break;
  case 'shoot':shoot();break;
  case 'saveReport':{cur.at=Date.now();const list=savedList().filter(x=>x.id!==cur.id);list.unshift(JSON.parse(JSON.stringify(cur)));LS.set('saved',list.slice(0,60));toast(t('saved'));const keep=cur;cur=null;LS.set('cur',null);viewing=keep;renderFlow();break}
  case 'shareReport':shareText(reportText(viewing||cur));break;
  case 'openReport':{viewing=savedList().find(x=>x.id===d.id);if(viewing){$('#flow').hidden=false;document.body.style.overflow='hidden';renderFlow()}break}
  case 'delReport':confirmBox(t('delQ'),()=>{LS.set('saved',savedList().filter(x=>x.id!==d.id));viewing=null;closeFlow()});break;
  case 'vClose':$('#viewer').hidden=true;$('#viewer').innerHTML='';break;
  case 'vSave':savePhoto(d.id);break;
  case 'vShare':sharePhoto(d.id);break;
  case 'vDel':confirmBox(t('delQ'),async()=>{await DB.del(d.id);if(cur&&cur.photos)cur.photos=cur.photos.filter(p=>p.id!==d.id),saveCur();$('#viewer').hidden=true;renderView();if(!$('#flow').hidden)renderFlow()});break;
 }
});
document.addEventListener('input',e=>{if(e.target.id==='manual'){C.src='manual';C.manual=+e.target.value;C.target=C.manual;C.last=performance.now()}});
// block copy / select / long-press menus outside form fields
const inField=e=>e.target.closest&&e.target.closest('input,textarea');
['copy','cut','selectstart','dragstart'].forEach(ev=>document.addEventListener(ev,e=>{if(!inField(e))e.preventDefault()}));
document.addEventListener('contextmenu',e=>{if(!inField(e))e.preventDefault()});
// Android back button (called from MainActivity): returns true when handled inside the app
window.__back=function(){
 if(!$('#viewer').hidden){$('#viewer').hidden=true;$('#viewer').innerHTML='';return true}
 if(!$('#modal').hidden){closeModal();return true}
 if(!$('#cam').hidden){closeCamera();return true}
 if(!$('#flow').hidden){if(!viewing&&cur&&cur.step>0){cur.step--;saveCur();renderFlow()}else{const b=document.querySelector('[data-act=flowClose]');b?b.click():closeFlow()}return true}
 if(view!=='home'){view='home';renderView();return true}
 return false};

/* ================= init ================= */
renderView();
if(!LS.get('lang',null))modal(`<h2 style="font-size:22px">భాషను ఎంచుకోండి<br>Choose language</h2><button class="btn" data-pick-lang="te">తెలుగు</button><button class="btn alt" data-pick-lang="en">English</button>`);
if(!(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'))startCompass();
requestAnimationFrame(frame);
if('serviceWorker' in navigator&&location.protocol==='https:'&&!native())navigator.serviceWorker.register('sw.js').catch(()=>{});
window.__vasthu={C,detect,personal,evaluate,feed};
}
