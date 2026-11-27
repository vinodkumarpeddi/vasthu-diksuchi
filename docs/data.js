// Vasthu data (traditional guidance). Directions in order of compass sectors.
const DIRS = ['N','NE','E','SE','S','SW','W','NW'];

const DIR = {
  N:  {te:'ఉత్తరం', en:'North', deity:{te:'కుబేరుడు',en:'Kubera'}, planet:{te:'బుధుడు',en:'Mercury'}, el:null,
       suits:{te:'ముఖద్వారం, హాలు, ఖాళీ స్థలం, కిటికీలు, లాకర్ తలుపు తెరుచుకునే వైపు',en:'Main door, living room, open space, windows, the side a locker opens to'},
       avoid:{te:'బరువైన నిర్మాణం, మెట్లు, మరుగుదొడ్లు',en:'Heavy construction, staircase, toilets'},
       fix:{te:'ఉత్తరం వైపు ఖాళీగా, శుభ్రంగా, తేలికగా ఉంచండి.',en:'Keep the north side open, clean and light.'}},
  NE: {te:'ఈశాన్యం', en:'North-East', deity:{te:'ఈశానుడు (శివుడు)',en:'Ishana (Shiva)'}, planet:{te:'గురువు',en:'Jupiter'}, el:{te:'జలం',en:'Water'},
       suits:{te:'పూజ గది, బోర్‌వెల్ / సంప్, ఖాళీ స్థలం, కిటికీలు',en:'Pooja room, borewell / sump, open space, windows'},
       avoid:{te:'మరుగుదొడ్డి, వంటగది, మెట్లు, సెప్టిక్ ట్యాంక్, బరువైన వస్తువులు',en:'Toilet, kitchen, staircase, septic tank, heavy items'},
       fix:{te:'ఈశాన్యం ఇంటిలో అత్యంత తక్కువ ఎత్తులో, శుభ్రంగా, తేలికగా ఉండాలి.',en:'Keep the north-east the lowest, cleanest and lightest part of the house.'}},
  E:  {te:'తూర్పు', en:'East', deity:{te:'ఇంద్రుడు',en:'Indra'}, planet:{te:'సూర్యుడు',en:'Sun'}, el:null,
       suits:{te:'ముఖద్వారం, హాలు, కిటికీలు, చదువు గది, ఖాళీ స్థలం',en:'Main door, living room, windows, study, open space'},
       avoid:{te:'బరువైన నిర్మాణం, ఎత్తైన గోడలు, మరుగుదొడ్లు',en:'Heavy construction, tall walls, toilets'},
       fix:{te:'ఉదయ సూర్యకాంతి లోపలికి వచ్చేలా తూర్పు కిటికీలు తెరిచి ఉంచండి.',en:'Keep east windows open so morning sunlight comes in.'}},
  SE: {te:'ఆగ్నేయం', en:'South-East', deity:{te:'అగ్నిదేవుడు',en:'Agni'}, planet:{te:'శుక్రుడు',en:'Venus'}, el:{te:'అగ్ని',en:'Fire'},
       suits:{te:'వంటగది, కరెంట్ మీటర్, జనరేటర్, ఇన్వర్టర్',en:'Kitchen, electricity meter, generator, inverter'},
       avoid:{te:'నీటి సంపు / బోర్‌వెల్, దంపతుల పడకగది',en:'Water sump / borewell, couple\'s bedroom'},
       fix:{te:'ఆగ్నేయంలో నీరు ఉంటే అక్కడ దీపం లేదా ఎరుపు రంగు ఉంచాలని సంప్రదాయం.',en:'Traditionally, if water is in the south-east, keep a lamp or red colour there.'}},
  S:  {te:'దక్షిణం', en:'South', deity:{te:'యముడు',en:'Yama'}, planet:{te:'కుజుడు',en:'Mars'}, el:null,
       suits:{te:'మెట్లు, బరువైన గోడలు, స్టోర్ రూమ్',en:'Staircase, heavy walls, store room'},
       avoid:{te:'పెద్ద ఖాళీ స్థలం, బోర్‌వెల్, గుంతలు',en:'Large open space, borewell, pits'},
       fix:{te:'దక్షిణ గోడ ఎత్తుగా, మందంగా ఉండాలి.',en:'Keep the south wall high and thick.'}},
  SW: {te:'నైరుతి', en:'South-West', deity:{te:'నిరృతి',en:'Nirruti'}, planet:{te:'రాహువు',en:'Rahu'}, el:{te:'భూమి',en:'Earth'},
       suits:{te:'ప్రధాన పడకగది, ఓవర్‌హెడ్ ట్యాంక్, బీరువా / లాకర్, బరువైన వస్తువులు',en:'Master bedroom, overhead tank, cupboard / locker, heavy items'},
       avoid:{te:'ముఖద్వారం, మరుగుదొడ్డి, సంపు, గుంతలు, ఖాళీ స్థలం',en:'Main door, toilet, sump, pits, open space'},
       fix:{te:'నైరుతి మూల ఇంటిలో అత్యంత ఎత్తుగా, బరువుగా ఉండాలి.',en:'Keep the south-west the highest and heaviest part of the house.'}},
  W:  {te:'పడమర', en:'West', deity:{te:'వరుణుడు',en:'Varuna'}, planet:{te:'శని',en:'Saturn'}, el:null,
       suits:{te:'భోజన గది, పిల్లల గది, చదువు గది, ఓవర్‌హెడ్ ట్యాంక్',en:'Dining, children\'s room, study, overhead tank'},
       avoid:{te:'పెద్ద ఖాళీ స్థలం, ఇంటి కంటే తక్కువ ఎత్తు',en:'Large open space, ground lower than the house'},
       fix:{te:'పడమర గోడ తూర్పు గోడ కంటే ఎత్తుగా ఉండాలి.',en:'Keep the west wall higher than the east wall.'}},
  NW: {te:'వాయువ్యం', en:'North-West', deity:{te:'వాయుదేవుడు',en:'Vayu'}, planet:{te:'చంద్రుడు',en:'Moon'}, el:{te:'వాయువు',en:'Air'},
       suits:{te:'అతిథి గది, మరుగుదొడ్లు, సెప్టిక్ ట్యాంక్, వాహనాల పార్కింగ్, ధాన్యాల నిల్వ',en:'Guest room, toilets, septic tank, parking, grain store'},
       avoid:{te:'ప్రధాన పడకగది (దీర్ఘకాలం), పూజ గది',en:'Master bedroom (long term), pooja room'},
       fix:{te:'గాలి, వెలుతురు బాగా వచ్చేలా కిటికీలు ఉంచండి.',en:'Keep windows here for good air flow and light.'}}
};

const CENTRE = {te:'బ్రహ్మస్థానం (ఇంటి మధ్య)',en:'Brahmasthanam (centre of the house)', deity:{te:'బ్రహ్మ',en:'Brahma'}, el:{te:'ఆకాశం',en:'Space'},
  text:{te:'ఇంటి మధ్య భాగం ఖాళీగా, వెలుతురుతో ఉండాలి. ఇక్కడ మరుగుదొడ్డి, మెట్లు, బరువైన స్తంభాలు వద్దు.',en:'Keep the centre open and bright. No toilet, staircase or heavy pillars here.'}};

// House facing = the direction you face when standing at the main door looking OUT.
// score: used for the overall verdict. crit: a serious defect.
const FACING = {
  N:  {score:3, v:'good', te:'శుభం', en:'Good',
       door:{te:'ఉత్తర గోడలో ఈశాన్యం వైపు సగంలో ద్వారం ఉత్తమం.',en:'Door in the north-east half of the north wall is best.'},
       avoid:{te:'వాయువ్య మూలలో ద్వారం వద్దు.',en:'Avoid a door in the north-west corner.'}},
  NE: {score:3, v:'good', te:'అత్యంత శుభం', en:'Very good',
       door:{te:'ఈశాన్యం వైపు ద్వారం శ్రేష్ఠం; ఆ మూల తెరిచి, తేలికగా ఉండాలి.',en:'A north-east entrance is excellent; keep that corner open and light.'},
       avoid:{te:'ఈశాన్యంలో మరుగుదొడ్డి, మెట్లు ఉండకూడదు.',en:'No toilet or staircase in the north-east.'}},
  E:  {score:3, v:'good', te:'శుభం', en:'Good',
       door:{te:'తూర్పు గోడలో ఈశాన్యం వైపు సగంలో ద్వారం ఉత్తమం.',en:'Door in the north-east half of the east wall is best.'},
       avoid:{te:'ఆగ్నేయ మూలలో ద్వారం వద్దు.',en:'Avoid a door in the south-east corner.'}},
  SE: {score:-1, v:'care', te:'జాగ్రత్త అవసరం', en:'Needs care',
       door:{te:'ద్వారం సరిగ్గా మూలలో కాకుండా, దక్షిణ గోడలో తూర్పు వైపు భాగంలో ఉంటే మంచిది.',en:'Better if the door is not in the exact corner but in the east part of the south wall.'},
       avoid:{te:'ఆగ్నేయ మూల మీదే ద్వారం వద్దు; అక్కడ నీరు ఉండకూడదు.',en:'Avoid the door on the exact corner; no water there.'}},
  S:  {score:-1, v:'care', te:'ద్వారం స్థానం సరైతే పర్వాలేదు', en:'Fine only with correct door position',
       door:{te:'దక్షిణ గోడలో ఆగ్నేయం వైపు సగంలో ద్వారం ఉండాలి.',en:'The door must be in the south-east half of the south wall.'},
       avoid:{te:'నైరుతి వైపు సగంలో ద్వారం వద్దు.',en:'Avoid a door in the south-west half.'}},
  SW: {score:-6, v:'bad', crit:true, te:'సాధారణంగా వద్దు', en:'Generally avoided',
       door:{te:'తప్పనిసరైతే ద్వారం మూలకు దూరంగా ఉండాలి; నిపుణుడిని సంప్రదించండి.',en:'If unavoidable, keep the door away from the corner and consult an expert.'},
       avoid:{te:'నైరుతి మూలలో ద్వారం అత్యంత అశుభంగా భావిస్తారు.',en:'A door in the south-west corner is considered most inauspicious.'}},
  W:  {score:1, v:'ok', te:'మంచిదే', en:'Good with care',
       door:{te:'పడమర గోడలో వాయువ్యం వైపు సగంలో ద్వారం ఉత్తమం.',en:'Door in the north-west half of the west wall is best.'},
       avoid:{te:'నైరుతి వైపు సగంలో ద్వారం వద్దు.',en:'Avoid a door in the south-west half.'}},
  NW: {score:0, v:'ok', te:'మధ్యమం', en:'Average',
       door:{te:'ద్వారం ఉత్తర గోడలో వాయువ్యం మూలకు కొంచెం దూరంగా ఉంటే మంచిది.',en:'Better with the door on the north wall, a little away from the north-west corner.'},
       avoid:{te:'సరిగ్గా వాయువ్య మూలపై ద్వారం వద్దు.',en:'Avoid the door exactly on the north-west corner.'}}
};

// Rooms: best / ok / avoid directions; crit = directions that are serious defects.
const ROOMS = [
 {id:'kitchen', te:'వంటగది', en:'Kitchen', best:['SE'], ok:['NW','E'], avoid:['NE','SW','N'], crit:['NE','SW'],
  note:{te:'ఆగ్నేయం ఉత్తమం; వీలుకాకపోతే వాయువ్యం. తూర్పు వైపు చూస్తూ వంట చేయాలి.',en:'South-east is ideal, north-west second. Cook facing east.'}},
 {id:'master', te:'ప్రధాన పడకగది', en:'Master bedroom', best:['SW'], ok:['S','W'], avoid:['NE','SE'], crit:['NE'],
  note:{te:'నైరుతి ఉత్తమం. తల దక్షిణం లేదా తూర్పు వైపు పెట్టి పడుకోవాలి; ఉత్తరం వైపు తల వద్దు.',en:'South-west is ideal. Sleep with head to the south or east, never north.'}},
 {id:'pooja', te:'పూజ గది', en:'Pooja room', best:['NE'], ok:['E','N'], avoid:['S','SW','SE'], crit:[],
  note:{te:'ఈశాన్యం ఉత్తమం. తూర్పు లేదా ఉత్తరం వైపు చూస్తూ పూజ చేయాలి. మెట్ల కింద, మరుగుదొడ్డి పక్కన వద్దు.',en:'North-east is ideal. Pray facing east or north. Not under stairs or next to a toilet.'}},
 {id:'toilet', te:'మరుగుదొడ్డి / స్నానాల గది', en:'Toilet / bathroom', best:['NW','W'], ok:['S','SE'], avoid:['NE','SW','E','N'], crit:['NE','SW'],
  note:{te:'వాయువ్యం లేదా పడమర. ఈశాన్యం, నైరుతి, ఇంటి మధ్యలో ఎప్పుడూ వద్దు.',en:'North-west or west. Never in the north-east, south-west or the centre.'}, multi:true},
 {id:'stairs', te:'మెట్లు', en:'Staircase', best:['S','W','SW'], ok:['SE','NW'], avoid:['NE','N','E'], crit:['NE'],
  note:{te:'దక్షిణం, పడమర లేదా నైరుతి; సవ్యదిశలో (క్లాక్‌వైజ్) ఎక్కేలా ఉండాలి. ఈశాన్యంలో వద్దు.',en:'South, west or south-west, climbing clockwise. Never in the north-east.'}},
 {id:'sump', te:'బోర్‌వెల్ / సంప్', en:'Borewell / sump', best:['NE'], ok:['N','E'], avoid:['SW','SE','S'], crit:['SW'],
  note:{te:'ఈశాన్యం ఉత్తమం; ఉత్తరం, తూర్పు కూడా సరే. నైరుతి, ఆగ్నేయంలో వద్దు.',en:'North-east is ideal; north or east are fine. Never south-west or south-east.'}},
 {id:'ohtank', te:'ఓవర్‌హెడ్ ట్యాంక్', en:'Overhead tank', best:['SW'], ok:['W','S'], avoid:['NE','E','N'], crit:['NE'],
  note:{te:'నైరుతి ఉత్తమం — అక్కడ ఎత్తు, బరువు ఉండాలి. ఈశాన్యంపై వద్దు.',en:'South-west is ideal, where height and weight belong. Never over the north-east.'}},
 {id:'septic', te:'సెప్టిక్ ట్యాంక్', en:'Septic tank', best:['NW'], ok:['W','N'], avoid:['NE','SW','SE','E'], crit:['NE','SW'],
  note:{te:'వాయువ్యం ఉత్తమం. ఈశాన్యం, నైరుతిలో ఎప్పుడూ వద్దు.',en:'North-west is ideal. Never in the north-east or south-west.'}},
 {id:'hall', te:'హాలు', en:'Living room', best:['N','E','NE'], ok:['NW','W'], avoid:['SW'], crit:[],
  note:{te:'ఉత్తరం, తూర్పు లేదా ఈశాన్యం. బరువైన సోఫాలు దక్షిణ, పడమర గోడల వైపు.',en:'North, east or north-east. Keep heavy sofas along the south and west walls.'}},
 {id:'kids', te:'పిల్లల గది', en:'Children\'s room', best:['W','NW'], ok:['E','N'], avoid:['SE'], crit:[],
  note:{te:'పడమర లేదా వాయువ్యం మంచిది. తూర్పు లేదా ఉత్తరం వైపు చూస్తూ చదువుకోవాలి.',en:'West or north-west suits. Study facing east or north.'}},
 {id:'guest', te:'అతిథి గది', en:'Guest room', best:['NW'], ok:['N','W'], avoid:['SW'], crit:[],
  note:{te:'వాయువ్యం ఉత్తమం.',en:'North-west is ideal.'}},
 {id:'dining', te:'భోజన గది', en:'Dining', best:['W'], ok:['E','N'], avoid:[], crit:[],
  note:{te:'పడమర మంచిది. తూర్పు లేదా ఉత్తరం వైపు చూస్తూ భోజనం చేయాలి.',en:'West suits. Eat facing east or north.'}},
 {id:'study', te:'చదువు గది', en:'Study', best:['E','N','NE'], ok:['W'], avoid:['SE','SW'], crit:[],
  note:{te:'తూర్పు, ఉత్తరం లేదా ఈశాన్యం; తూర్పు / ఉత్తరం వైపు చూస్తూ చదవాలి.',en:'East, north or north-east; study facing east or north.'}},
 {id:'locker', te:'బీరువా / లాకర్', en:'Cupboard / locker', best:['SW'], ok:['S','W'], avoid:['NE','SE'], crit:[],
  note:{te:'నైరుతి గదిలో దక్షిణ గోడకు ఆనించి, తలుపు ఉత్తరం వైపు తెరుచుకునేలా ఉంచాలి.',en:'In the south-west room against the south wall, opening towards north.'}},
 {id:'parking', te:'వాహనాల పార్కింగ్', en:'Parking', best:['NW','SE'], ok:['N','E'], avoid:['NE','SW'], crit:[],
  note:{te:'వాయువ్యం లేదా ఆగ్నేయం. ఈశాన్య మూలను మూసివేయవద్దు.',en:'North-west or south-east. Do not block the north-east corner.'}},
 {id:'open', te:'ఖాళీ స్థలం / తోట', en:'Open space / garden', best:['N','E','NE'], ok:['NW'], avoid:['SW','S'], crit:[],
  note:{te:'ఉత్తరం, తూర్పులో ఎక్కువ ఖాళీ ఉండాలి; పెద్ద చెట్లు దక్షిణం, పడమర వైపు.',en:'Most open space on the north and east; big trees on the south and west.'}}
];

// Rooms measured during an on-site house check (order on screen).
const CHECK_ROOMS = ['kitchen','master','pooja','toilet','toilet2','stairs','sump','ohtank','septic'];

// Yes / No questions. yes = points if answered yes; crit marks a serious defect when the answer is the bad one.
const QUESTIONS = [
 {id:'necut', bad:'yes', w:-4, crit:true,
  te:'ఈశాన్య మూల కోసుకుపోయిందా, మూసివేశారా, లేదా బరువైన నిర్మాణం ఉందా?', en:'Is the north-east corner cut, closed off, or built heavy?',
  issue:{te:'ఈశాన్య మూల లోపం',en:'North-east corner defect'}},
 {id:'swlow', bad:'yes', w:-3,
  te:'నైరుతి భాగం ఇంటిలో అత్యంత తక్కువ ఎత్తులో లేదా ఖాళీగా ఉందా (గుంత, వాలు)?', en:'Is the south-west the lowest or most open part (pit, slope)?',
  issue:{te:'నైరుతి తక్కువగా / ఖాళీగా ఉంది',en:'South-west is low or open'}},
 {id:'centre', bad:'yes', w:-3,
  te:'ఇంటి మధ్యలో (బ్రహ్మస్థానం) మరుగుదొడ్డి, మెట్లు లేదా స్తంభం ఉందా?', en:'Is there a toilet, staircase or pillar at the centre (Brahmasthanam)?',
  issue:{te:'బ్రహ్మస్థానంలో అడ్డంకి',en:'Centre (Brahmasthanam) blocked'}},
 {id:'slope', bad:'no', w:2,
  te:'నేల / ఫ్లోర్ వాలు ఉత్తరం లేదా తూర్పు వైపుకు ఉందా?', en:'Does the floor / land slope down towards north or east?',
  good:{te:'ఉత్తరం / తూర్పు వైపు వాలు ఉంది',en:'Slopes towards north / east'}, issue:{te:'వాలు ఉత్తరం / తూర్పు వైపు లేదు',en:'Slope not towards north / east'}},
 {id:'light', bad:'no', w:2,
  te:'తూర్పు, ఉత్తరం వైపు కిటికీలు, మంచి వెలుతురు ఉన్నాయా?', en:'Are there windows and good light on the east and north?',
  good:{te:'తూర్పు / ఉత్తరం వెలుతురు బాగుంది',en:'Good east / north light'}, issue:{te:'తూర్పు / ఉత్తరం వెలుతురు తక్కువ',en:'Poor east / north light'}},
 {id:'shape', bad:'no', w:2,
  te:'ఇల్లు / స్థలం చతురస్రం లేదా దీర్ఘచతురస్రం ఆకారంలో ఉందా?', en:'Is the house / plot square or rectangular?',
  good:{te:'చతురస్ర / దీర్ఘచతురస్ర ఆకారం',en:'Square / rectangular shape'}, issue:{te:'ఆకారం సక్రమంగా లేదు',en:'Irregular shape'}}
];

// Road on one side of the plot / building. Measure: stand in front of the house looking at the road.
const ROAD = {
  N:  {score:3, v:'good', te:'ఉత్తర వీధి — శుభం', en:'Road on the north — good'},
  E:  {score:3, v:'good', te:'తూర్పు వీధి — శుభం', en:'Road on the east — good'},
  NE: {score:3, v:'good', te:'ఈశాన్య వీధి — అత్యంత శుభం', en:'Road on the north-east — very good'},
  W:  {score:1, v:'ok',   te:'పడమర వీధి — మంచిదే', en:'Road on the west — fine'},
  NW: {score:0, v:'ok',   te:'వాయువ్య వీధి — మధ్యమం', en:'Road on the north-west — average'},
  S:  {score:0, v:'care', te:'దక్షిణ వీధి — ద్వారం ఆగ్నేయం వైపు ఉంటే పర్వాలేదు', en:'Road on the south — fine only if the door is towards the south-east'},
  SE: {score:-1,v:'care', te:'ఆగ్నేయ వీధి — జాగ్రత్త అవసరం', en:'Road on the south-east — needs care'},
  SW: {score:-3,v:'bad',  te:'నైరుతి వీధి — సాధారణంగా మంచిది కాదు', en:'Road on the south-west — generally not good'}
};
// Two roads (corner plot / roads on opposite sides). Key = the two directions sorted in DIRS order.
const CORNER = {
  'N+E':  {score:4, v:'good', te:'ఈశాన్య మూల స్థలం (ఉత్తరం + తూర్పు వీధులు) — అత్యంత శుభం', en:'North-east corner plot (roads on north and east) — very good'},
  'E+S':  {score:0, v:'care', te:'ఆగ్నేయ మూల స్థలం (తూర్పు + దక్షిణం) — తూర్పు వైపు ద్వారం ఉంటే పర్వాలేదు', en:'South-east corner plot (east and south) — fine with the door on the east side'},
  'N+W':  {score:1, v:'ok',   te:'వాయువ్య మూల స్థలం (ఉత్తరం + పడమర) — మంచిదే, ఉత్తరం వైపు ద్వారం ఉత్తమం', en:'North-west corner plot (north and west) — fine, door on the north side is best'},
  'S+W':  {score:-4,v:'bad',  te:'నైరుతి మూల స్థలం (దక్షిణం + పడమర) — సాధారణంగా మంచిది కాదు', en:'South-west corner plot (south and west) — generally not good'},
  'N+S':  {score:1, v:'ok',   te:'ఉత్తరం, దక్షిణం రెండు వైపులా వీధులు — పర్వాలేదు', en:'Roads on north and south — acceptable'},
  'E+W':  {score:1, v:'ok',   te:'తూర్పు, పడమర రెండు వైపులా వీధులు — పర్వాలేదు', en:'Roads on east and west — acceptable'}
};


// Veedhi potu / veedhi shoola: a road that runs straight INTO the plot. Key = side + the corner half it hits.
const POTU = {
  'N-NE':{v:'good',w:3, te:'ఉత్తర ఈశాన్య వీధి పోటు — శుభం', en:'Road hitting the north side, north-east half — auspicious'},
  'E-NE':{v:'good',w:3, te:'తూర్పు ఈశాన్య వీధి పోటు — శుభం', en:'Road hitting the east side, north-east half — auspicious'},
  'S-SE':{v:'ok',  w:1, te:'దక్షిణ ఆగ్నేయ వీధి పోటు — పర్వాలేదు', en:'Road hitting the south side, south-east half — acceptable'},
  'W-NW':{v:'ok',  w:1, te:'పడమర వాయువ్య వీధి పోటు — పర్వాలేదు', en:'Road hitting the west side, north-west half — acceptable'},
  'N-NW':{v:'bad', w:-3, te:'ఉత్తర వాయువ్య వీధి పోటు — మంచిది కాదు', en:'Road hitting the north side, north-west half — not good'},
  'E-SE':{v:'bad', w:-3, te:'తూర్పు ఆగ్నేయ వీధి పోటు — మంచిది కాదు', en:'Road hitting the east side, south-east half — not good'},
  'S-SW':{v:'bad', w:-5, crit:true, te:'దక్షిణ నైరుతి వీధి పోటు — అత్యంత అశుభం', en:'Road hitting the south side, south-west half — very inauspicious'},
  'W-SW':{v:'bad', w:-5, crit:true, te:'పడమర నైరుతి వీధి పోటు — అత్యంత అశుభం', en:'Road hitting the west side, south-west half — very inauspicious'}
};
// Road slope: the direction the road / ground runs DOWN towards.
const SLOPE = {
  N:{v:'good',w:2},NE:{v:'good',w:3},E:{v:'good',w:2},NW:{v:'ok',w:0},SE:{v:'ok',w:0},W:{v:'bad',w:-2},S:{v:'bad',w:-2},SW:{v:'bad',w:-3}
};

// Kartha (head of family) name -> rasi. Telugu first-syllable groups (nama nakshatra tradition).
// el: fire/earth/air/water. dir: house facing traditionally recommended for that rasi's element.
const RASI = [
 {id:'mesha',     te:'మేషం',      en:'Mesha (Aries)',        el:'fire',  s:['చు','చే','చో','లా','లి','లు','లే','లో','అ'], r:['chu','che','cho','la','li','lu','le','lo','a']},
 {id:'vrishabha', te:'వృషభం',     en:'Vrishabha (Taurus)',   el:'earth', s:['ఇ','ఉ','ఎ','ఒ','వ','వి','వు','వే','వో'], r:['i','u','e','o','va','vi','vu','ve','vo','wa','wi']},
 {id:'mithuna',   te:'మిథునం',    en:'Mithuna (Gemini)',     el:'air',   s:['క','కి','కు','ఘ','ఙ','ఛ','కే','కో','హ'], r:['ka','ki','ku','gha','chha','ke','ko','ha','kha','qa']},
 {id:'karkataka', te:'కర్కాటకం',  en:'Karkataka (Cancer)',   el:'water', s:['హి','హు','హే','హో','డ','డి','డు','డే','డో'], r:['hi','hu','he','ho']},
 {id:'simha',     te:'సింహం',     en:'Simha (Leo)',          el:'fire',  s:['మ','మి','ము','మే','మో','ట','టి','టు','టే'], r:['ma','mi','mu','me','mo']},
 {id:'kanya',     te:'కన్య',       en:'Kanya (Virgo)',        el:'earth', s:['టో','ప','పి','పు','ష','ణ','ఠ','పే','పో'], r:['pa','pi','pu','pe','po']},
 {id:'tula',      te:'తుల',        en:'Tula (Libra)',         el:'air',   s:['ర','రి','రు','రే','రో','త','తి','తు','తే'], r:['ra','ri','ru','re','ro','ta','ti','tu','te','tha','thi','thu','the']},
 {id:'vrischika', te:'వృశ్చికం',  en:'Vrischika (Scorpio)',  el:'water', s:['తో','న','ని','ను','నే','నో','య','యి','యు'], r:['to','tho','na','ni','nu','ne','no','ya','yi','yu']},
 {id:'dhanus',    te:'ధనుస్సు',   en:'Dhanus (Sagittarius)', el:'fire',  s:['యే','యో','భ','భి','భు','ధ','ఫ','ఢ','భే'], r:['ye','yo','bha','bhi','bhu','dha','dhi','dhu','pha','fa','phi','fi','bhe','ba','bi','bu','be']},
 {id:'makara',    te:'మకరం',      en:'Makara (Capricorn)',   el:'earth', s:['భో','జ','జి','ఖి','ఖు','ఖే','ఖో','గ','గి'], r:['bho','bo','ja','ji','khi','khu','khe','kho','ga','gi','za','zi']},
 {id:'kumbha',    te:'కుంభం',     en:'Kumbha (Aquarius)',    el:'air',   s:['గు','గే','గో','స','సి','సు','సే','సో','ద'], r:['gu','ge','go','sa','si','su','se','so','da','sha','shi','shu','she','sho']},
 {id:'meena',     te:'మీనం',      en:'Meena (Pisces)',       el:'water', s:['ది','దు','థ','ఝ','ఞ','దే','దో','చ','చి'], r:['di','du','jha','de','do','cha','chi']}
];
const ELEM = {
 fire:  {dir:'E', te:'అగ్ని తత్వం',  en:'Fire element'},
 earth: {dir:'S', te:'భూ తత్వం',    en:'Earth element'},
 air:   {dir:'W', te:'వాయు తత్వం',  en:'Air element'},
 water: {dir:'N', te:'జల తత్వం',    en:'Water element'}
};
// Aaya from the plot / built-up area (sq ft) % 8. Odd = auspicious. Preferred facing for the good aayas.
const AAYA = [
 {te:'కాకాయం',  en:'Kaka',     good:false},
 {te:'ధ్వజాయం', en:'Dhwaja',   good:true, dir:'E', all:true},
 {te:'ధూమాయం',  en:'Dhuma',    good:false},
 {te:'సింహాయం', en:'Simha',    good:true, dir:'S'},
 {te:'శ్వానాయం', en:'Shwana',   good:false},
 {te:'వృషభాయం', en:'Vrishabha',good:true, dir:'W'},
 {te:'ఖరాయం',   en:'Khara',    good:false},
 {te:'గజాయం',   en:'Gaja',     good:true, dir:'N'}
];
