import json, re
imgs = json.load(open('/home/user/scripts/img.json'))
html = open('/home/user/scripts/template.html').read()
for k,v in imgs.items():
    html = html.replace('__IMG_%s__'%k, v)
assert '__IMG_' not in html, 'leftover token!'
open('/home/user/index.html','w').write(html)
# extract inline script for syntax check
m = re.search(r'<script>(.*?)</script>', html, re.S)
open('/home/user/scripts/_inline.js','w').write(m.group(1))
print('index.html bytes:', len(html))
