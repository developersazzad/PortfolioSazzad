#!/usr/bin/env python3
"""BZmail case-study posters — 1920x1080, minimal 3D concept."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1920, 1080
U = '/home/user/uploads/'
FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
VIO=(108,92,247); VIO2=(139,124,255); TEAL=(45,212,191); ORG=(255,138,42)
INK=(238,241,255); MUT=(154,165,209); DARK=(11,14,26)

def f(size,b=True): return ImageFont.truetype(FB if b else FR,size)

def make_bg():
    ys,xs=np.mgrid[0:H,0:W].astype(np.float32)
    t=(ys/H)[:,:,None]
    img=(np.array([8,11,26])*(1-t)+np.array([15,20,46])*t)
    def glow(cx,cy,r,col,amp):
        d2=((xs-cx)**2+(ys-cy)**2)
        return (np.exp(-d2/(2*r*r))[:,:,None]*amp)*np.array(col)
    img=img+glow(1580,140,430,VIO,.55)+glow(240,920,400,TEAL,.25)+glow(960,1080,520,ORG,.13)
    return Image.fromarray(np.clip(img,0,255).astype(np.uint8)).convert('RGBA')

def grid_floor():
    ov=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(ov)
    hor=740; y=hor; i=0
    while y<H:
        d.line([(0,int(y)),(W,int(y))],fill=(108,92,247,60),width=1)
        i+=1; y=hor+i*i*4+i*10
    for x0 in range(-900,W+900,170):
        d.line([(960+(x0-960)*.22,hor),(x0,H)],fill=(108,92,247,42),width=1)
    return ov

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

def shadow_layer(quad,off=18,blur=26,alpha=190):
    lv=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lv)
    cx=sum(p[0] for p in quad)/4; cy=sum(p[1] for p in quad)/4
    pts=[( (p[0]-cx)*1.05+cx, (p[1]-cy)*1.05+cy+off ) for p in quad]
    d.polygon(pts,fill=(0,0,0,alpha))
    return lv.filter(ImageFilter.GaussianBlur(blur))

def place(canvas,img,quad,radius=10):
    w,h=img.size
    img=rounded(img,radius)
    coeffs=find_coeffs([(0,0),(w,0),(w,h),(0,h)],quad)
    tr=img.transform(canvas.size,Image.PERSPECTIVE,coeffs,Image.BICUBIC)
    canvas.alpha_composite(shadow_layer(quad)); canvas.alpha_composite(tr)

def body_around(canvas,quad,pad,fill):
    cx=sum(p[0] for p in quad)/4; cy=sum(p[1] for p in quad)/4
    pts=[(p[0]+(pad if p[0]>cx else -pad), p[1]+(pad if p[1]>cy else -pad)) for p in quad]
    lv=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lv)
    d.polygon(pts,fill=fill)
    canvas.alpha_composite(lv)

def load(fn,w=None):
    im=Image.open(U+fn).convert('RGBA')
    if w:
        hh=int(im.size[1]*w/im.size[0]); im=im.resize((w,hh),Image.LANCZOS)
    return im

def phone_crop(fn):
    im=Image.open(U+fn).convert('RGBA')
    w,h=im.size
    cw=int(h*0.52)
    return im.crop(((w-cw)//2,0,(w+cw)//2,h))

def chip(d,x,y,text,size=26,col=VIO):
    ft=f(size,False); tw=d.textlength(text,font=ft)
    d.rounded_rectangle([x,y,x+tw+44,y+size+26],(size+26)//2,fill=(*col,40),outline=(*col,150),width=2)
    d.text((x+22,y+12),text,font=ft,fill=INK)
    return x+tw+44+18

def header(d,title1,title2,eyebrow,ts=88):
    d.rounded_rectangle([110,84,178,152],20,fill=(*ORG,255))
    d.text((122,98),"BZ",font=f(34),fill=(255,255,255))
    d.text((196,92),"BZmail",font=f(46),fill=INK)
    d.text((196+d.textlength("BZmail",font=f(46))+18,108),"CASE STUDY - 2026",font=f(24,False),fill=ORG)
    d.text((110,208),eyebrow,font=f(30),fill=TEAL)
    d.text((110,258),title1,font=f(ts),fill=INK)
    d.text((110,262+ts+14),title2,font=f(ts),fill=VIO2)

def credit(d):
    d.rectangle([0,H-92,W,H],fill=(6,8,18,242))
    d.line([(0,H-92),(W,H-92)],fill=(*VIO2,160),width=2)
    d.text((110,H-66),"Developed by  Sazzad Hossain  -  @developersazzad",font=f(30),fill=INK)
    t="github.com/developersazzad"
    tw=d.textlength(t,font=f(30,False))
    d.text((W-110-tw,H-66),t,font=f(30,False),fill=ORG)

# ---------------- poster 1 : PWA user panel ----------------
bg=make_bg(); bg.alpha_composite(grid_floor()); d=ImageDraw.Draw(bg)
header(d,"User Panel -","Installable PWA","WHY THE USER PANEL")
y=500
for line in ["A modern progressive web app: guest login and","registration in seconds, installable straight from","the browser. Iconic dark-glass UI, high UX anywhere."]:
    d.text((110,y),line,font=f(30,False),fill=MUT); y+=46
x=110
x=chip(d,x,y+24,"PWA - installable"); x=chip(d,x,y+24,"Guest flows",col=TEAL); x=chip(d,x,y+24,"High-UX UI",col=ORG)
login=phone_crop('website_Screenshot_7.png'); reg=phone_crop('website_Screenshot_5.png')
lw,lh=login.size
q1=[(1020,240),(1020+lw*0.92,270),(1020+lw*0.92,240+lh*1.02),(1020,270+lh*1.02)]
body_around(bg,q1,10,(*DARK,255)); place(bg,login,q1,radius=26)
rw,rh=reg.size
q2=[(1450,300),(1450+rw*0.92,270),(1450+rw*0.92,300+rh*1.02),(1450,270+rh*1.02)]
body_around(bg,q2,10,(*DARK,255)); place(bg,reg,q2,radius=26)
d.text((1030,205),"GUEST LOGIN",font=f(26),fill=VIO2)
d.text((1455,930),"GUEST REGISTRATION",font=f(26),fill=TEAL)
credit(d)
bg.convert('RGB').save('/home/user/posters/poster-1-user-panel-pwa.png',quality=95)
print('poster1 ok')

# ---------------- poster 2 : admin panel ----------------
bg=make_bg(); bg.alpha_composite(grid_floor()); d=ImageDraw.Draw(bg)
header(d,"Admin Panel -","Full Control Room","WHY THE ADMIN PANEL",ts=78)
y=486
for line in ["One control room for the whole engine: live KPI","analytics, Gmail SMTP server pool with failover","toggles, users, projects, campaigns and exports."]:
    d.text((110,y),line,font=f(29,False),fill=MUT); y+=44
x=110
x=chip(d,x,y+22,"SMTP failover"); x=chip(d,x,y+22,"Live analytics",col=TEAL); x=chip(d,x,y+22,"Exports",col=ORG)
dash=load('admin_Bzmail Email Marketing Tool. (1).png',880)
dw,dh=dash.size
q=[(980,260),(980+dw,228),(980+dw,228+dh*1.06),(980,260+dh*1.06)]
body_around(bg,q,14,(*DARK,255)); place(bg,dash,q,radius=8)
srv=load('admin_Bzmail Email Marketing Tool. (2).png',500)
sw,sh=srv.size
q2=[(1390,660),(1390+sw,632),(1390+sw,632+sh*1.05),(1390,660+sh*1.05)]
body_around(bg,q2,10,(*DARK,255)); place(bg,srv,q2,radius=8)
d.text((990,196),"LIVE DASHBOARD",font=f(26),fill=VIO2)
d.text((1395,935),"SMTP SERVER POOL",font=f(24),fill=TEAL)
credit(d)
bg.convert('RGB').save('/home/user/posters/poster-2-admin-panel.png',quality=95)
print('poster2 ok')

# ---------------- poster 3 : full ecosystem ----------------
bg=make_bg(); bg.alpha_composite(grid_floor()); d=ImageDraw.Draw(bg)
d.rounded_rectangle([110,70,178,138],20,fill=(*ORG,255))
d.text((122,84),"BZ",font=f(34),fill=(255,255,255))
d.text((196,78),"BZmail",font=f(46),fill=INK)
d.text((110,182),"Email Marketing Without Limits",font=f(80),fill=INK)
d.text((110,286),"One engine, three surfaces: Website + Admin + PWA",font=f(34,False),fill=MUT)
x=110
x=chip(d,x,352,"Multi-SMTP rotation"); x=chip(d,x,352,"0% bounce",col=TEAL); x=chip(d,x,352,"44% open / click",col=ORG); x=chip(d,x,352,"LTR + RTL")
web=load('Website_Bzmail - Professional Email Sending tool.png')
web=web.crop((0,0,1366,2400)).resize((430,753),Image.LANCZOS)
ww,wh=web.size
qw=[(120,470),(120+ww,495),(120+ww,495+wh*0.60),(120,470+wh*0.60)]
body_around(bg,qw,10,(*DARK,255)); place(bg,web,qw,radius=8)
dash=load('admin_Bzmail Email Marketing Tool. (1).png',840)
dw,dh=dash.size
q=[(630,450),(630+dw,425),(630+dw,425+dh*1.05),(630,450+dh*1.05)]
body_around(bg,q,14,(*DARK,255)); place(bg,dash,q,radius=8)
login=phone_crop('website_Screenshot_7.png')
lw,lh=login.size
q3=[(1560,400),(1560+lw*0.88,425),(1560+lw*0.88,425+lh*0.88),(1560,400+lh*0.88)]
body_around(bg,q3,10,(*DARK,255)); place(bg,login,q3,radius=20)
d.text((130,940),"PUBLIC WEBSITE",font=f(26),fill=ORG)
d.text((650,920),"ADMIN CONTROL ROOM",font=f(26),fill=VIO2)
d.text((1560,940),"PWA USER PANEL",font=f(26),fill=TEAL)
credit(d)
bg.convert('RGB').save('/home/user/posters/poster-3-full-ecosystem.png',quality=95)
print('poster3 ok')
