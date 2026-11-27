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
 {id:'potu', bad:'yes', w:-4, crit:true,
  te:'దక్షిణం, పడమర లేదా నైరుతి నుండి రోడ్డు నేరుగా ఇంటిని తాకుతోందా (వీధి పోటు)?', en:'Does a road end straight at the house from the south, west or south-west (veedhi potu)?',
  issue:{te:'అశుభ వీధి పోటు',en:'Inauspicious road hit (veedhi potu)'}},
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
