import{j as e,r as n}from"./index-0ac07c14.js";const i=t=>e.jsx("svg",{width:"1em",height:"1em",viewBox:"0 0 56 56",fill:"currentColor",...t,children:e.jsx("path",{d:"M47.1354 10.6769L42.4066 5.94808C41.5861 5.12761 40.4733 4.66667 39.313 4.66666L23.6252 4.66666C21.2089 4.66666 19.2502 6.62539 19.2502 9.04166V13.4167H11.9585C9.54222 13.4167 7.5835 15.3754 7.5835 17.7917V46.9583C7.5835 49.3746 9.54222 51.3333 11.9585 51.3333H32.3752C34.7914 51.3333 36.7502 49.3746 36.7502 46.9583V42.5833H44.0418C46.4581 42.5833 48.4168 40.6246 48.4168 38.2083V13.7705C48.4168 12.6102 47.9559 11.4974 47.1354 10.6769ZM31.8283 46.9583H12.5054C12.3603 46.9583 12.2212 46.9007 12.1187 46.7982C12.0161 46.6956 11.9585 46.5565 11.9585 46.4115V18.3385C11.9585 18.1935 12.0161 18.0544 12.1187 17.9518C12.2212 17.8493 12.3603 17.7917 12.5054 17.7917H19.2502V38.2083C19.2502 40.6246 21.2089 42.5833 23.6252 42.5833H32.3752V46.4115C32.3752 46.5565 32.3175 46.6956 32.215 46.7982C32.1124 46.9007 31.9733 46.9583 31.8283 46.9583ZM43.495 38.2083H24.172C24.027 38.2083 23.8879 38.1507 23.7853 38.0482C23.6828 37.9456 23.6252 37.8065 23.6252 37.6615V9.58854C23.6252 9.4435 23.6828 9.3044 23.7853 9.20184C23.8879 9.09928 24.027 9.04166 24.172 9.04166H33.8335V17.0625C33.8335 18.2706 34.8129 19.25 36.021 19.25H44.0418V37.6615C44.0418 37.8065 43.9842 37.9456 43.8817 38.0482C43.7791 38.1507 43.64 38.2083 43.495 38.2083V38.2083ZM44.0418 14.875H38.2085V9.04166H39.0864C39.2314 9.04166 39.3705 9.09927 39.4731 9.20181L43.8817 13.6103C43.9325 13.6611 43.9727 13.7214 44.0002 13.7878C44.0277 13.8541 44.0418 13.9253 44.0418 13.9971V14.875Z"})}),c=i;function d(){const[t,a]=n.useState(""),s=n.useMemo(()=>`${window.location.href}#/${t||"rothiotome"}`,[t]),r=o=>{a(o.target.value)},l=()=>{navigator.clipboard.writeText(s)};return e.jsxs("div",{className:"flex flex-col items-center gap-8 p-8 bg-slate-700/25 rounded-2xl",children:[e.jsxs("h1",{className:"text-4xl font-bold",children:["Numerica by ",e.jsx("span",{className:"underline",children:"RothioTome"})]}),e.jsx("div",{className:"relative rounded-md shadow-sm",children:e.jsx("input",{type:"text",name:"twitchUsername",className:"block w-full rounded-md border-0 py-3 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-400 text-2xl sm:leading-6",placeholder:"Nombre de twitch...",value:t,onChange:r})}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsxs("button",{className:"flex flex-row gap-2 items-center text-xl font-bold",onClick:l,children:[e.jsx(c,{className:"text-2xl"}),e.jsx("span",{children:s})]}),e.jsx("p",{className:"text-lg",children:"Copia este link on OBS para empezar a jugar."})]})]})}export{d as default};