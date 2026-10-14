import base64, io, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
W,H=1000,700
U='/home/user/uploads/'
VIO=(108,92,247); TEAL=(45,212,191); ORG=(255,138,42); DARK=(11,14,26)

def find_coeffs(source_coords, target_coords):
    matrix=[]
    for s,tq in zip(source_coords,target_coords):
        matrix.append([tq[0],tq[1],1,0,0,0,-s[0]*tq[0],-s[0]*tq[1]])
        matrix.append([0,0,0,tq[0],tq[1],1,-s[1]*tq[0],-s[1]*tq[1]])
    A=np.matrix(matrix,dtype=np.float64); B=np.array(source_coords,dtype=np.float64).reshape(8)
    return np.array(np.dot(np.linalg.pinv(A),B),dtype=np.float64).reshape(8)

def rounded(im,r):
    m=Image.new('L',im.size,0); d=ImageDraw.Draw(m); d.rounded_rectangle([0,0,im.size[0],im.size[1]],r,fill=255)
    im=im.convert('RGBA'); im.putalpha(m); return im

def shadow(canvas,quad,off=12,blur=18,alpha=180):
    lv=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lv)
    cx=sum(p[0] for p in quad)/4; cy=sum(p[1] for p in quad)/4
    pts=[((p[0]-cx)*1.05+cx,(p[1]-cy)*1.05+cy+off) for p in quad]
    d.polygon(pts,fill=(0,0,0,alpha)); return lv.filter(ImageFilter.GaussianBlur(blur))

def bezel(canvas,quad,pad,fill):
    cx=sum(p[0] for p in quad)/4; cy=sum(p[1] for p in quad)/4
    pts=[(p[0]+(pad if p[0]>cx else -pad), p[1]+(pad if p[1]>cy else -pad)) for p in quad]
    lv=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lv)
    d.polygon(pts,fill=fill); canvas.alpha_composite(lv)

def place(canvas,img,quad,radius=10):
    w,h=img.size; img=rounded(img,radius)
    tr=img.transform(canvas.size,Image.PERSPECTIVE,find_coeffs([(0,0),(w,0),(w,h),(0,h)],quad),Image.BICUBIC)
    canvas.alpha_composite(shadow(canvas,quad)); canvas.alpha_composite(tr)

# bg
ys,xs=np.mgrid[0:H,0:W].astype(np.float32); t=(ys/H)[:,:,None]
img=(np.array([12,17,40])*(1-t)+np.array([19,26,62])*t)
def glow(cx,cy,r,col,amp):
    return (np.exp(-(((xs-cx)**2+(ys-cy)**2))/(2*r*r))[:,:,None]*amp)*np.array(col)
img=img+glow(820,120,300,VIO,.5)+glow(150,600,260,TEAL,.22)+glow(500,700,300,ORG,.12)
bg=Image.fromarray(np.clip(img,0,255).astype(np.uint8)).convert('RGBA')
d=ImageDraw.Draw(bg)
hor=560; y=hor; i=0
while y<H:
    d.line([(0,int(y)),(W,int(y))],fill=(108,92,247,50),width=1); i+=1; y=hor+i*i*3+i*9
for x0 in range(-500,W+500,140):
    d.line([(500+(x0-500)*.25,hor),(x0,H)],fill=(108,92,247,36),width=1)

web=Image.open(U+'Website_Bzmail - Professional Email Sending tool.png').convert('RGBA').crop((0,0,1366,2400)).resize((280,490),Image.LANCZOS)
qw=[(50,70),(330,50),(330,540),(50,560)]
bezel(bg,qw,8,(*DARK,255)); place(bg,web,qw,radius=8)

dash=Image.open(U+'admin_Bzmail Email Marketing Tool. (1).png').convert('RGBA').resize((640,284),Image.LANCZOS)
q=[(300,170),(960,140),(960,430),(300,460)]
bezel(bg,q,10,(*DARK,255)); place(bg,dash,q,radius=8)

log=Image.open(U+'website_Screenshot_7.png').convert('RGBA')
w,h=log.size; cw=int(h*0.52); log=log.crop(((w-cw)//2,0,(w+cw)//2,h)).resize((240,460),Image.LANCZOS)
q3=[(120,210),(350,240),(350,670),(120,640)]
bezel(bg,q3,8,(*DARK,255)); place(bg,log,q3,radius=18)

buf=io.BytesIO(); bg.convert('RGB').save(buf,'JPEG',quality=78,optimize=True)
uri='data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()
print('combo KB:',round(len(uri)/1024,1))
j=json.load(open('/home/user/scripts/img.json')); j['combo']=uri
json.dump(j,open('/home/user/scripts/img.json','w'))
bg.convert('RGB').save('/home/user/scripts/combo_preview.jpg',quality=80)
