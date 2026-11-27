const C='vasthu-v1';
const FILES=['./','index.html','app.js','data.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','fonts/mandali-telugu-400-normal.woff2','fonts/mandali-latin-400-normal.woff2','fonts/ramabhadra-telugu-400-normal.woff2','fonts/ramabhadra-latin-400-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>r)))});
