import type { Category, Product } from '../lib/types';


// Reference-site snapshot (9 October 2026). Used ONLY when both live APIs fail.
// Prices are illustrative at that point in time, not live or verified market quotes.
export const categories: Category[] = [
 {slug:'chal',name:'চাল',emoji:'🍚'}, {slug:'dal',name:'ডাল',emoji:'🫘'},
 {slug:'tel',name:'তেল',emoji:'🛢️'}, {slug:'sobji',name:'সবজি',emoji:'🥬'},
 {slug:'mach',name:'মাছ',emoji:'🐟'}, {slug:'mangsho',name:'মাংস',emoji:'🍗'},
 {slug:'dim-dui',name:'ডিম-দুধ',emoji:'🥛'}, {slug:'mosla',name:'মসলা',emoji:'🌶️'}
];
// Each row: slug | Bengali title | emoji | category | unit | today | % change
const rows: Array<[string,string,string,string,string,number,number]> = [
 ['sorno-machi-chal','স্বর্ণমাছি চাল','🍚','chal','কেজি',148,2.1],
 ['miniket-chal','মিনিকেট চাল','🍚','chal','কেজি',99,-2.9],
 ['nazir-chal','নাজির চাল','🍚','chal','কেজি',74,0],
 ['batam-size-chal','বাটাম সাইজ চাল','🍚','chal','কেজি',66,3.1],
 ['mosur-dal','মসুর ডাল','🫘','dal','কেজি',142,2.9],
 ['mug-dal','মুগ ডাল','🫘','dal','কেজি',135,0],
 ['chola','ছোলা','🫘','dal','কেজি',120,-2.4],
 ['amon-dal','আমন ডাল (খোসাসিলা)','🫘','dal','কেজি',156,2.6],
 ['sorishar-tel','সরিষার তেল','🫙','tel','লিটার',192,2.1],
 ['palm-tel','পাম তেল','🛢️','tel','কেজি',168,-2.3],
 ['ghani-vanga-sorishar-tel','ঘানি ভাঙা সরিষার তেল','🫙','tel','লিটার',215,2.4],
 ['alu','আলু','🥔','sobji','কেজি',30,-6.2],
 ['peyaj','পেঁয়াজ','🧅','sobji','কেজি',54,12.5],
 ['kacha-morich','কাঁচামরিচ','🌶️','sobji','কেজি',92,-12.4],
 ['begun','বেগুন','🍆','sobji','কেজি',44,4.8],
 ['dherosh','ঢেঁড়স','🟢','sobji','কেজি',38,0],
 ['rui-mach','রুই মাছ','🐟','mach','কেজি',46,4.5],
 ['telapia','তেলাপিয়া','🐟','mach','কেজি',36,0],
 ['ilish-mach','ইলিশ মাছ','🐠','mach','কেজি',1850,3.4],
 ['katla-mach','কাতলা মাছ','🐠','mach','কেজি',43,-4.4],
 ['chingri-mach','চিংড়ি মাছ (খোলা)','🦐','mach','কেজি',330,3.1],
 ['murgir-mangsho','মুরগির মাংস','🍗','mangsho','কেজি',225,-1.3],
 ['gorur-mangsho','গরুর মাংস','🥩','mangsho','কেজি',790,-1.2],
 ['khashir-mangsho','খাসির মাংস','🍖','mangsho','কেজি',1290,-3.0],
 ['haser-mangsho','হাঁসের মাংস','🦆','mangsho','কেজি',285,-3.4],
 ['dim','ডিম','🥚','dim-dui','ডজন',158,3.9],
 ['dudh','দুধ','🥛','dim-dui','লিটার',102,2.0],
 ['doi','দই','🥣','dim-dui','লিটার',92,0],
 ['makhon','মাখন (১০০ গ্রাম)','🧈','dim-dui','পিস',145,3.6],
 ['ada','আদা','🫚','mosla','কেজি',85,9.0],
 ['rosun','রসুন','🧄','mosla','কেজি',125,-7.4],
 ['morich-gura','মরিচ গুঁড়া','🌶️','mosla','কেজি',245,-2.0],
 ['dhonepata-gura','ধনেপাতা গুঁড়া','🍃','mosla','কেজি',265,0]
];
export const snapshotProducts: Product[] = rows.map(([slug,name,emoji,category,unit,price,change], i) => ({
 id: i + 1,slug,name,emoji,category,unit,price,change,markets:[],
 description: `${name}-এর বাজারভিত্তিক বর্তমান দাম ও মূল্য পরিবর্তনের তথ্য দেখুন।`
}));
