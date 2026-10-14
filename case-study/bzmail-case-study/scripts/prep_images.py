import base64, io, json, os, shutil
from PIL import Image

U = '/home/user/uploads/'
def load(f): return Image.open(U+f).convert('RGB')

def jpeg_b64(im, width, q):
    w,h = im.size
    nh = int(h*width/w)
    im = im.resize((width, nh), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=q, optimize=True)
    data = buf.getvalue()
    return 'data:image/jpeg;base64,'+base64.b64encode(data).decode(), len(data)

def save_png_copy(src, dst):
    shutil.copy(U+src, '/home/user/screenshots/'+dst)

imgs = {}
def add(key, file, width, q):
    uri, n = jpeg_b64(load(file), width, q)
    imgs[key] = uri
    print(key, file, round(n/1024,1), 'KB raw')

add('dash',     'admin_Bzmail Email Marketing Tool. (1).png', 1200, 70)
add('servers',  'admin_Bzmail Email Marketing Tool. (2).png', 1200, 70)
add('users',    'admin_Bzmail Email Marketing Tool. (3).png', 1200, 70)
add('campaigns','admin_Bzmail Email Marketing Tool. (6).png', 1200, 70)
add('templates','admin_Bzmail Email Marketing Tool. (5).png', 1200, 70)
add('login',    'website_Screenshot_7.png', 900, 72)
add('register', 'website_Screenshot_5.png', 900, 72)

# website hero crop (top of the long landing page)
web = load('Website_Bzmail - Professional Email Sending tool.png')
crop = web.crop((0,0,1366,2500))
uri, n = jpeg_b64(crop, 700, 65)
imgs['web'] = uri
print('web crop', round(n/1024,1), 'KB raw')

total = sum(len(v) for v in imgs.values())
print('TOTAL b64 KB:', round(total/1024,1))
json.dump(imgs, open('/home/user/scripts/img.json','w'))

# clean copies for GitHub repo
save_png('admin_Bzmail Email Marketing Tool. (1).png','admin-dashboard.png') if False else None
copies = {
 'admin_Bzmail Email Marketing Tool. (1).png':'admin-dashboard.png',
 'admin_Bzmail Email Marketing Tool. (2).png':'admin-servers.png',
 'admin_Bzmail Email Marketing Tool. (3).png':'admin-users.png',
 'admin_Bzmail Email Marketing Tool. (6).png':'admin-campaigns.png',
 'admin_Bzmail Email Marketing Tool. (5).png':'admin-templates.png',
 'admin_Bzmail Email Marketing Tool. (4).png':'admin-custom-templates.png',
 'website_Screenshot_7.png':'pwa-guest-login.png',
 'website_Screenshot_5.png':'pwa-guest-register.png',
 'Website_Bzmail - Professional Email Sending tool.png':'website-full-home.png',
}
for s,d in copies.items(): save_png_copy(s,d)
print('screenshots copied:', os.listdir('/home/user/screenshots'))
