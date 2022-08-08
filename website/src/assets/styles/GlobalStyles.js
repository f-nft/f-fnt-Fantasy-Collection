import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 

::-moz-selection {
    background: #2D65F8;
    text-shadow: none;
    color: #ffffff;
}
::selection {
    background: #2D65F8;
    text-shadow: none;
    color: #ffffff;
}
[class^="flaticon-"]:before,
[class*=" flaticon-"]:before,
[class^="flaticon-"]:after,
[class*=" flaticon-"]:after {
    margin: 0;
}

html,
body {
    font-size: 16px; 
    vertical-align: baseline;
    font-weight: 500;
    line-height: 1.6;
    font-weight: 500;
    overflow-x: hidden; 
    background-color: #040C12 !important;
}

img {
    max-width: 100%;
    height: auto;
}

p {
    margin: 0px;
    line-height: 1.8;  
}


h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0px;
    line-height: 1.35;
    font-family: 'Bakbak One', cursive;
}

a {
    text-decoration: none !important;
    outline: none;
    transition: all .4s;
}


ul, ol {
    list-style: outside none none;
    margin: 0px;
    padding: 0px;
}

html,
body, p, a{
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
} 

@media (min-width: 1400px){
    .container{
        max-width: 1200px;
        padding: 0px 20px;
    }
} 

`;

export default GlobalStyles;
