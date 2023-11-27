import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-brand-50:#FF385C;
  --color-brand-100:#E00B41;
  --color-brand-200:#92174D;
  --color-brand-300:460479;

  --color-gray-0:#FFFFFF;
  --color-gray-50:#F7F6F2;
  --color-gray-100:#FFF8F6;
  --color-gray-200:#F7F7F7;
  --color-gray-300:#F5F1EA;
  --color-gray-400:#EBEBEB;
  --color-gray-500:#DDDDDD;
  --color-gray-600:#B0B0B0;
  --color-gray-700:#717171;
  --color-gray-800:#222222;
  --color-gray-900:#000000;

  --color-red-100:#C13515;
  --color-red-200:#B32505;

  --color-blue:#428BFF;
  --color-oragne:#E07912;
  --color-gren:#008A05;

  --gradiant-right-1:linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
  --gradiant-left-1:linear-gradient(to left,#E61E4D 0%,#E31C5F 50%,#D70466 100%);

  --gradiant-right-2:linear-gradient(to right,#BD1E59 0%,#92174D 50%,#861453 100%);
  --gradiant-left-2:linear-gradient(to left,#BD1E59 0%,#92174D 50%,#861453 100%);

  --gradiant-right-3:linear-gradient(to right,#59086E 0%,#460479 50%,#440589 100%);
  --gradiant-left-3:linear-gradient(to left,#59086E 0%,#460479 50%,#440589 100%);


  --border:1px solid var(--color-gray-500);

  --border-radius:8px;
  --border-radius-lg:30px;

  --shadow-sm: rgba(0, 0, 0, 0.1) 0px 2px 8px;
  --shadow-lg:rgba(0, 0, 0, 0.1) 0px 4px 12px;


  --font-family:"Nunito", sans-serif;


  --auto-grid-min-size: 26rem;
}

*,
*:after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

 body {
  font-family: var(--font-family);
  font-size: 1.4rem;
  color: var(--color-gray-800);
  background: var(--color-gray-0);


  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;

 }

 img {
  max-width: 100%;
 }

input{
padding:1rem 1.5rem;
}

 input,
 button,
 textarea,
 select {
   font: inherit;
   color: inherit;
 }


 button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;

  &:hover{
    text-decoration: none;
  }
}
div:has(input[type="checkbox]){
  color:red;
}

ul {
  list-style: none;
}


p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

`;

export default GlobalStyles;
