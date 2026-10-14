import numpy as np
from PIL import Image, ImageDraw, ImageFilter
W,H=1920,1080
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
    cx=sum(p[0] for p in quad)/4; cy=sum(p[0] and p[1] for p in quad)/4
    pts=[( (p[0]-cx)*1.05+cx, (p[1]-cy)*1.05+cy+off ) for p in quad]
    d.polygon(pts,fill=(0,0,0,alpha))
    return lv.filter(ImageFilter.GaussianBlur(blur))

dash=Image.open('/home/user/uploads/admin_Bzmail Email Marketing Tool. (1).png').convert('RGBA').resize((1000,445),Image.LANCZOS)
dw,dh=dash.size
q=[(880,250),(880+dw,215),(880+dw,215+dh*1.06),(880,250+dh*1.06)]
dash=rounded(dash,8)
coeffs=find_coeffs([(0,0),(dw,0),(dw,dh),(0,dh)],q)
tr=dash.transform((W,H),Image.PERSPECTIVE,coeffs,Image.BICUBIC)
tr.save('/home/user/scripts/dbg_tr.png')
shadow_layer(q).save('/home/user/scripts/dbg_shadow.png')
# where is tr opaque?
a=np.array(tr)[:,:,3]
ys,xs=np.nonzero(a>10)
print('tr opaque bbox x:',xs.min(),xs.max(),' y:',ys.min(),ys.max())
