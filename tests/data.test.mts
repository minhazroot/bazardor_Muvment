import test from 'node:test';
import assert from 'node:assert/strict';
import {bnNumber, numericValue, marketStats, marketRangeStats, priceChange, sortProducts} from '../lib/numbers.ts';
import {snapshotProducts, categories} from '../data/snapshot.ts';

test('Bengali digits, separators and negative arrows parse correctly',()=>{
 assert.equal(numericValue('৳ ১,৮৫০ টাকা'),1850);
 assert.equal(numericValue('▼ ১২.৪%'),-12.4);
 assert.equal(numericValue('−২.৯%'),-2.9);
 assert.equal(numericValue('—০.০%'),0);
 assert.equal(numericValue('১৪৮ টাকা'),148);
});
test('Bengali formatting has localized digits',()=>{
 assert.equal(bnNumber(1850),'১,৮৫০');
 assert.equal(bnNumber(2.1,1),'২.১');
});
test('sorts by numeric price even if source has localized text',()=>{
 const rows=[{price:'১,৮৫০',id:'c'},{price:'৯৯',id:'a'},{price:'১৪৮',id:'b'}];
 // Inputs may arrive as localized strings; the production normalizer turns them into numbers.
 const numeric=rows.map(v=>({...v, price:numericValue(v.price)}));
 assert.deepEqual(sortProducts(numeric,'low').map(p=>p.id),['a','b','c']);
 assert.deepEqual(sortProducts(numeric,'high').map(p=>p.id),['c','b','a']);
 assert.deepEqual(sortProducts(numeric,'default').map(p=>p.id),['c','a','b']);
});
test('snapshot covers all 33 products in 8 categories',()=>{
 assert.equal(snapshotProducts.length,33);
 assert.equal(categories.length,8);
 assert.equal(new Set(snapshotProducts.map(p=>p.slug)).size,33);
 for(const product of snapshotProducts){assert.ok(product.price>0);assert.ok(categories.some(c=>c.slug===product.category));}
});
test('top six changes match the reference snapshot',()=>{
 const risen=[...snapshotProducts].filter(p=>p.change>0).sort((a,b)=>b.change-a.change).slice(0,6);
 const fallen=[...snapshotProducts].filter(p=>p.change<0).sort((a,b)=>a.change-b.change).slice(0,6);
 assert.equal(risen[0].name,'পেঁয়াজ');
 assert.equal(fallen[0].name,'কাঁচামরিচ');
 assert.equal(risen.length,6);assert.equal(fallen.length,6);
});
test('min, max and average use actual market records',()=>{
 assert.deepEqual(marketStats([45,50,55]),{min:45,max:55,avg:50});
 assert.equal(marketStats([]),null);
});

test('real API object shape yields positive and negative movers',()=>{
 assert.equal(priceChange({dir:'up',pct:12.5}),12.5);
 assert.equal(priceChange({dir:'down',pct:12.4}),-12.4);
 assert.equal(priceChange({dir:'flat',pct:0}),0);
 assert.equal(priceChange({dir:'down',pct:'৭.৪'}),-7.4);
 assert.equal(priceChange(undefined,{today:110,yesterday:100}),10);
 assert.equal(priceChange(undefined,{fallback:-2.9}),-2.9);
});
test('market ranges retain min and max, and average their midpoints',()=>{
 assert.deepEqual(marketRangeStats([
  {min:40,max:50,price:45},{min:46,max:54,price:50}
 ]),{min:40,max:54,avg:47.5});
});
