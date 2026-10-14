import numpy as np
from PIL import Image, ImageDraw, ImageFilter
W,H=1920,1080
DARK=(11,14,26)
def bbox(im,name):
    a=np.array(im)[:,:,3]; ys,xs=np.nonzero(a>10)
    if len(xs)==0: print(name,'empty'); return
    print(name,'bbox x:',xs.min(),xs.max(),' y:',ys.min(),ys.max())
def body_layer(quad,pad,fill):
    cx=sum(p[0] for p in quad)/4; cy=sum(p[1] for p in quad)/4
    pts=[((p[0]-cx)*1.0+ (pad if p[0]>cx else -pad), (p[1]-cy)+(pad if p[1]>cy else -pad)) for p in quad]
    lv=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lv)
    d.polygon(pts,fill=fill)
    return lv
dash_q=[(880,250),(1880,215),(1880,687),(880,722)]
srv_q=[(1400,640),(1920,610),(1920,852),(1400,883)]
bbox(body_layer(dash_q,16,(*DARK,255)),'body dash')
bbox(body_layer(srv_q,10,(*DARK,255)),'body srv')
