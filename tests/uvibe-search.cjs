const fs = require('node:fs');
const ts = require('typescript');
const assert = require('node:assert/strict');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { rankGarmentsByQuery: search } = require('../src/lib/uvibe-search.ts');
const { CATALOG_PRODUCTS } = require('../src/data/catalogProducts.ts');
const { INITIAL_LISTED_PRODUCTS } = require('../src/lib/mock-data.ts');
let passed = 0;
function check(name, fn) { fn(); passed++; console.log('PASS ' + name); }
check('All catalog titles retrieve their own listing', () => {
 for (const p of CATALOG_PRODUCTS) assert.equal(search(p.title).topMatch?.id, p.id, p.title);
});
check('Empty and unrelated queries do not fabricate results', () => {
 assert.equal(search('').topMatch, null); assert.equal(search('spaceship quantum toaster').topMatch, null);
});
check('Budget and kids audience are enforced', () => {
 const r = search('kids cotton tee under 10000'); assert.ok(r.topMatch); for (const p of [r.topMatch, ...r.similarSuggestions]) { assert.ok(p.price <= 10000); assert.equal(p.gender, 'kids'); }
});
check('Impossible budget returns no match', () => assert.equal(search('gown under 1').topMatch, null));
check('Negated fabric is excluded', () => { const r=search('coat without wool'); for(const p of [r.topMatch,...r.similarSuggestions].filter(Boolean)) assert.ok(!p.fabrics.includes('wool')); });
check('Scores are deterministic and explanations agree', () => {
 const a=search('blue velvet gown'), b=search('blue velvet gown'); assert.deepEqual(a,b);
 for(const p of [a.topMatch,...a.similarSuggestions].filter(Boolean)) { assert.ok(p.matchScore >= 0 && p.matchScore <= 99); assert.ok(p.justification.summary.startsWith(p.matchScore + '%')); }
});
check('New live listing is searchable and delisted entries are excluded', () => {
 const p={...INITIAL_LISTED_PRODUCTS[0],id:'test-new',title:'Cobalt Linen Comet Jacket',description:'Cobalt blue linen jacket',materials:'linen',tags:[],subcategory:'Jacket'};
 assert.equal(search(p.title,{},[p]).topMatch?.id,p.id);
 assert.notEqual(search(p.title,{},[{...p,status:'DELISTED'}]).topMatch?.id,p.id);
});
check('Wrong color cannot receive a near-perfect score', () => {
 const r=search('chartreuse velvet gown'); assert.ok(r.topMatch); assert.ok(r.topMatch.matchScore < 95);
});
check('Live stock changes override shared catalog availability', () => {
 const p=CATALOG_PRODUCTS[0];
 const r=search(p.title,{},[{...p,availableStock:0}]);
 assert.notEqual(r.topMatch?.id,p.id);
});
check('Unavailable garment types do not produce unrelated top matches', () => assert.equal(search('purple hoodie under 1').topMatch,null));
const start=performance.now(); for(let i=0;i<100;i++) search('blue velvet gown');
console.log('100 warm searches: ' + Math.round(performance.now()-start) + 'ms');
console.log(passed + ' regression groups passed');
