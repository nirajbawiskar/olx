import{c as $,u as d,b as B,d as h}from"./ThemeProvider-DDOiuAEa.js";import{r as C,j as N}from"./index-CcvC8-cw.js";function j({as:r,bsPrefix:s,className:c,...o}){s=d(s,"col");const p=B(),u=h(),e=[],f=[];return p.forEach(a=>{const n=o[a];delete o[a];let t,i,m;typeof n=="object"&&n!=null?{span:t,offset:i,order:m}=n:t=n;const l=a!==u?`-${a}`:"";t&&e.push(t===!0?`${s}${l}`:`${s}${l}-${t}`),m!=null&&f.push(`order${l}-${m}`),i!=null&&f.push(`offset${l}-${i}`)}),[{...o,className:$(c,...e,...f)},{as:r,bsPrefix:s,spans:e}]}const x=C.forwardRef((r,s)=>{const[{className:c,...o},{as:p="div",bsPrefix:u,spans:e}]=j(r);return N.jsx(p,{...o,ref:s,className:$(c,!e.length&&u)})});x.displayName="Col";export{x as C};
