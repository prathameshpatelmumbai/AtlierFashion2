const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const path = require('node:path');
require.extensions['.ts'] = (m,f) => m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);
const resolve=Module._resolveFilename;
Module._resolveFilename=function(name,...args){ return resolve.call(this,name.startsWith('@/')?path.resolve(__dirname,'../src',name.slice(2)):name,...args); };
const {NextRequest}=require('next/server');
const {POST}=require('../src/app/api/uvibe/route.ts');
async function post(body){const r=await POST(new NextRequest('http://localhost/api/uvibe',{method:'POST',body:JSON.stringify(body)})); return {status:r.status,body:await r.json()};}
(async()=>{
 assert.equal((await post({query:23})).status,400);
 assert.equal((await post({query:'gown',filters:{fabric:42}})).status,400);
 assert.equal((await post({mode:'vision',image:'filename-blue-gown.jpg'})).status,400);
 assert.equal((await post({mode:'vision',image:'data:image/svg+xml;base64,AAAA'})).status,400);
 const previous=process.env.GEMINI_API_KEY; delete process.env.GEMINI_API_KEY;
 assert.equal((await post({mode:'vision',image:'data:image/png;base64,iVBORw0KGgo='})).status,503);
 if(previous) process.env.GEMINI_API_KEY=previous;
 const result=await post({query:'kids cotton tee under 10000'}); assert.equal(result.status,200); assert.ok(result.body.topMatch.price<=10000);
 const none=await post({query:'gown under 1'}); assert.equal(none.body.topMatch,null);
 console.log('7 API validation and fallback checks passed (no remote image requests made)');
})().catch(e=>{console.error(e);process.exitCode=1});
