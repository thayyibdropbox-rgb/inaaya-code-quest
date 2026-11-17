import base64,os,json
F='node_modules/@fontsource/baloo-chettan-2/files/'
css=''
for sub,rng in [('malayalam','U+0307,U+0323,U+0951-0952,U+0964-0965,U+0D00-0D7F,U+1CDA,U+1CF2,U+200C-200D,U+20B9,U+25CC'),('latin','U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD')]:
  for w in (400,700):
    b=base64.b64encode(open(f'{F}baloo-chettan-2-{sub}-{w}-normal.woff2','rb').read()).decode()
    css+=f"@font-face{{font-family:'Baloo Chettan 2';font-style:normal;font-display:swap;font-weight:{w};src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}\n"
h=open('src/index.html').read().replace('/*FONTS*/',css).replace('/*APP*/',open('src/app.js').read())
os.makedirs('dist',exist_ok=True); open('dist/index.html','w').write(h)
json.dump({"name":"Codeloo","short_name":"Codeloo","description":"Free coding adventure game for kids – Malayalam & English. Designed by Thayyib · Powered by RIZTHA","start_url":"./","scope":"./","display":"standalone","orientation":"any","background_color":"#fdf6e9","theme_color":"#62cdf5","lang":"ml","icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png","purpose":"any maskable"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]},open('dist/manifest.webmanifest','w'),ensure_ascii=False,indent=1)
open('dist/sw.js','w').write("""const C='codeloo-v2';const F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))))});
""")
open('dist/.nojekyll','w').write('')
print(os.path.getsize('dist/index.html'))
