import{l as a,m as l,a as d,b as o,k as x,j as e}from"./index-CcvC8-cw.js";import{C as m}from"./Container-AEDfiAQj.js";import{R as h,C as s}from"./Row-C0po-6st.js";import"./ThemeProvider-DDOiuAEa.js";const w=()=>{const{id:r}=a(),{data:t}=l(r),i=d(),{user:n}=o(c=>c.auth);return x(),e.jsx(e.Fragment,{children:e.jsx(m,{children:e.jsx(h,{children:t&&e.jsxs(e.Fragment,{children:[e.jsx(s,{className:"my-3",children:e.jsxs(s.Body,{children:[e.jsx(s.Title,{children:"Product details:"}),e.jsx(s.Img,{height:400,width:400,src:t.productImg[0]}),e.jsxs(s.Text,{children:["Product id: ",t._id]}),e.jsxs(s.Text,{children:["Product name: ",t.name]}),e.jsxs(s.Text,{children:["Product price: ",t.price]}),e.jsxs(s.Text,{children:["Product price: ",t.description]}),e.jsx(s.Title,{children:"Owner details:"}),e.jsxs(s.Text,{children:["Owner Id: ",t.seller._id]}),e.jsxs(s.Text,{children:["Owner Name: ",t.seller.name]}),e.jsxs(s.Text,{children:["Owner email: ",t.seller.email]}),e.jsxs(s.Text,{children:["Owner Mobile: ",t.seller.mobile]})]})}),e.jsxs("div",{className:"gap-2",children:[e.jsx("button",{className:"btn btn-secondary w-50 mt-3 ",onClick:()=>i(`/product-details/${r}`),children:"Back"}),n._id===t.seller._id?e.jsx("button",{className:"btn btn-secondary w-50 mt-3 ",children:"You cannot buy this product"}):e.jsx("button",{className:"btn btn-secondary w-50 mt-3 ",onClick:()=>i(`/user/Checkout/${r}`),children:"Buy Now"})]})]})})})})};export{w as default};
