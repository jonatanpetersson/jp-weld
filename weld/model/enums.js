export const WeldConfig = './weldconfig.json';
export var Base;
(function (Base) {
    Base["Index"] = "index";
    Base["Root"] = "root";
    Base["Style"] = "style";
    Base["Script"] = "script";
})(Base || (Base = {}));
export var Dir;
(function (Dir) {
    Dir["Source"] = "src";
    Dir["Destination"] = "dist";
    Dir["Components"] = "Components";
    Dir["Assets"] = "assets";
})(Dir || (Dir = {}));
export var CatchType;
(function (CatchType) {
    CatchType["Warning"] = "warning";
    CatchType["Error"] = "error";
})(CatchType || (CatchType = {}));
export var FileFormat;
(function (FileFormat) {
    FileFormat["Html"] = "html";
    FileFormat["Css"] = "css";
    FileFormat["Js"] = "js";
})(FileFormat || (FileFormat = {}));
export var File;
(function (File) {
    File["Index"] = "index.html";
    File["Root"] = "root.html";
    File["Style"] = "style.css";
    File["Script"] = "script.js";
})(File || (File = {}));
export var RunOption;
(function (RunOption) {
    RunOption["Init"] = "init";
    RunOption["Build"] = "build";
    RunOption["Dev"] = "dev";
})(RunOption || (RunOption = {}));
export var Strings;
(function (Strings) {
    Strings["DivRoot"] = "<div class=\"root\">";
})(Strings || (Strings = {}));
export var Router;
(function (Router) {
    Router["LoadFunction"] = "function loadRouteComponent(event, component) {\n    event.preventDefault();\n\n    const getReplacementString = componentName => '<div data-routecomponent=\"' + componentName + '\" style=\"visibility: hidden;\"></div>';\n    const elements = document.querySelectorAll('[data-routecomponent]');\n\n    let componentsTempEl;\n    let currentEl;\n    elements.forEach(el => {\n      if (el.dataset.routecomponent === component) {\n        componentsTempEl = el;\n      }\n      if (el.style.visibility !== 'hidden') {\n        currentEl = el;\n      }\n    })\n\n    componentsTempEl.insertAdjacentHTML('beforebegin', routes[component]);\n    componentsTempEl.remove();\n    \n    if (currentEl) {\n      currentEl.insertAdjacentHTML('afterend', getReplacementString(currentEl.dataset.routecomponent));\n      currentEl.remove();\n    }\n  };\n  ";
})(Router || (Router = {}));
export var Init;
(function (Init) {
    Init["IndexHtml"] = "<!DOCTYPE html>\n  <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\" />\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n      <link rel=\"stylesheet\" href=\"style.css\" />\n      <title>New weld project</title>\n    </head>\n    <body>\n      <div class=\"root\"></div>\n      <script src=\"script.js\"></script>\n    </body>\n  </html>";
    Init["RootHtml"] = "<Base />";
    Init["StyleCss"] = "@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');\n  * {\n    margin: 0;\n    padding: 0;\n    font-family: 'Open Sans', sans-serif;\n  }\n  \n  html, body {\n    width: 100%;\n    height: 100%;\n    font-size: 10px;\n  }\n  \n  .root {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    font-size: 1.4rem;\n  }";
    Init["ScriptJs"] = "";
    Init["BaseHtml"] = "<div class=\"base\">\n  <Logo />\n  <h1>New weld project</h1>\n  <p>\n  So yeah, this is an example of how and what you can build with weld. Please have a look at the directory structure and how components are injected in each html file. This should give you an idea of how to use it. GL HF!\n  </p>\n</div>";
    Init["BaseCss"] = ".base {\n    min-width: 25rem;\n    width: 50%;\n    max-width: 50rem;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: justify;\n    text-justify: inter-word;\n  }";
    Init["BaseJs"] = "";
    Init["LogoHtml"] = "<div class=\"icon\">\n<img src=\"./assets/img/weld.svg\" alt=\"weld icon\" />\n</div>";
    Init["LogoCss"] = "";
    Init["LogoJs"] = "";
    Init["Svg"] = "<svg width=\"227\" height=\"188\" viewBox=\"0 0 227 188\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M152.054 64.7022C154.021 66.6404 157.187 66.6171 159.125 64.6501C161.063 62.6832 161.04 59.5175 159.073 57.5793L152.054 64.7022ZM5.69833 163.363C3.76012 165.33 3.78342 168.496 5.75035 170.434C7.71728 172.372 10.883 172.349 12.8212 170.382L5.69833 163.363ZM40.9844 153.91L44.5458 157.42L40.9844 153.91ZM22.1406 139.554L25.6501 135.992L22.1406 139.554ZM124.721 49.7L121.159 46.1906L124.721 49.7ZM140.301 53.121L152.054 64.7022L159.073 57.5793L147.32 45.9981L140.301 53.121ZM83.3607 98.797L128.282 53.2095L121.159 46.1906L76.2378 91.7781L83.3607 98.797ZM69.1669 91.8301L76.2898 98.849L83.3087 91.7261L76.1858 84.7072L69.1669 91.8301ZM25.6709 138.82L71.9953 91.8093L64.8724 84.7905L18.548 131.802L25.6709 138.82ZM76.2898 98.849L83.7681 106.218L90.787 99.0952L83.3087 91.7261L76.2898 98.849ZM83.7473 103.39L37.4229 150.401L44.5458 157.42L90.8702 110.409L83.7473 103.39ZM12.8212 170.382L32.825 150.082L25.7021 143.063L5.69833 163.363L12.8212 170.382ZM32.773 143.011L25.6501 135.992L18.6312 143.115L25.7541 150.134L32.773 143.011ZM40.2513 150.38L32.773 143.011L25.7541 150.134L33.2324 157.503L40.2513 150.38ZM37.4229 150.401C38.1982 149.614 39.4645 149.605 40.2513 150.38L33.2324 157.503C36.3795 160.604 41.4447 160.567 44.5458 157.42L37.4229 150.401ZM18.548 131.802C15.4468 134.949 15.4841 140.014 18.6312 143.115L25.6501 135.992C26.4368 136.767 26.4461 138.034 25.6709 138.82L18.548 131.802ZM76.1858 84.7072C73.0387 81.6061 67.9735 81.6434 64.8724 84.7905L71.9953 91.8093C71.22 92.5961 69.9537 92.6054 69.1669 91.8301L76.1858 84.7072ZM83.7681 106.218C82.9814 105.443 82.9721 104.177 83.7473 103.39L90.8702 110.409C93.9714 107.261 93.9341 102.196 90.787 99.0952L83.7681 106.218ZM147.32 45.9981C140.043 38.8272 128.33 38.9134 121.159 46.1906L128.282 53.2095C131.577 49.8661 136.958 49.8265 140.301 53.121L147.32 45.9981Z\" fill=\"black\"/>\n<path d=\"M171.99 94.3443C172.366 91.6085 170.453 89.0862 167.717 88.7105C164.981 88.3348 162.459 90.248 162.083 92.9838L171.99 94.3443ZM158.882 115.74C158.475 118.471 160.359 121.015 163.09 121.423C165.821 121.83 168.366 119.946 168.773 117.215L158.882 115.74ZM164.789 110.03L169.735 110.767L169.739 110.738L169.743 110.71L164.789 110.03ZM162.083 92.9838L159.836 109.349L169.743 110.71L171.99 94.3443L162.083 92.9838ZM159.844 109.292L158.882 115.74L168.773 117.215L169.735 110.767L159.844 109.292Z\" fill=\"black\"/>\n<circle cx=\"161.638\" cy=\"131.315\" r=\"5\" transform=\"rotate(97.7373 161.638 131.315)\" fill=\"black\"/>\n<circle cx=\"211.734\" cy=\"6.9016\" r=\"5\" transform=\"rotate(122.431 211.734 6.9016)\" fill=\"black\"/>\n<path d=\"M151.002 84.9067C153.593 83.9529 154.921 81.0789 153.967 78.4874C153.013 75.8959 150.139 74.5684 147.548 75.5222L151.002 84.9067ZM137.694 79.1491C135.103 80.103 133.775 82.9771 134.729 85.5685C135.683 88.1599 138.557 89.4874 141.149 88.5334L137.694 79.1491ZM145.052 81.7686L143.325 77.0764L143.325 77.0764L145.052 81.7686ZM147.548 75.5222L143.325 77.0764L146.779 86.4609L151.002 84.9067L147.548 75.5222ZM143.325 77.0764L137.694 79.1491L141.149 88.5334L146.779 86.4608L143.325 77.0764Z\" fill=\"black\"/>\n<path d=\"M119.745 91.1243C118.781 88.5366 120.097 85.6574 122.685 84.6935C125.273 83.7296 128.152 85.046 129.116 87.6337C130.08 90.2214 128.764 93.1006 126.176 94.0645C123.588 95.0284 120.709 93.7121 119.745 91.1243Z\" fill=\"black\"/>\n<path d=\"M221.941 67.4774C219.331 68.378 216.485 66.9918 215.584 64.3814C214.684 61.7709 216.07 58.9247 218.68 58.0241C221.291 57.1236 224.137 58.5097 225.038 61.1202C225.938 63.7307 224.552 66.5769 221.941 67.4774Z\" fill=\"black\"/>\n<path d=\"M207.035 22.8335C208.519 20.5048 207.834 17.4139 205.506 15.9297C203.177 14.4454 200.086 15.1299 198.602 17.4586L207.035 22.8335ZM186.187 36.7965C184.676 39.1078 185.325 42.2064 187.636 43.7175C189.947 45.2286 193.046 44.58 194.557 42.2687L186.187 36.7965ZM193.94 34.0761L198.124 36.8122L198.14 36.7879L198.156 36.7635L193.94 34.0761ZM198.602 17.4586L189.723 31.3886L198.156 36.7635L207.035 22.8335L198.602 17.4586ZM189.755 31.34L186.187 36.7965L194.557 42.2687L198.124 36.8122L189.755 31.34Z\" fill=\"black\"/>\n<path d=\"M186.827 54.0169C188.338 51.7056 187.689 48.6069 185.378 47.0958C183.067 45.5847 179.968 46.2334 178.457 48.5447L186.827 54.0169ZM174.627 54.4036C173.115 56.7149 173.764 59.8135 176.075 61.3246C178.387 62.8357 181.485 62.1871 182.996 59.8758L174.627 54.4036ZM179.896 55.4817L175.711 52.7456L175.711 52.7456L179.896 55.4817ZM178.457 48.5447L175.711 52.7456L184.08 58.2178L186.827 54.0169L178.457 48.5447ZM175.711 52.7456L174.627 54.4036L182.996 59.8758L184.08 58.2178L175.711 52.7456Z\" fill=\"black\"/>\n<path d=\"M201.56 63.5059C204.187 62.6562 207.006 64.0973 207.856 66.7248C208.705 69.3522 207.264 72.171 204.637 73.0207L201.56 63.5059ZM188.445 78.2569C185.818 79.1066 182.999 77.6655 182.149 75.0381C181.3 72.4106 182.741 69.5918 185.368 68.7421L188.445 78.2569ZM191.489 72.0178L193.027 76.7752L191.489 72.0178ZM204.637 73.0207L193.027 76.7752L189.95 67.2603L201.56 63.5059L204.637 73.0207ZM193.027 76.7752L188.445 78.2569L185.368 68.7421L189.95 67.2603L193.027 76.7752Z\" fill=\"black\"/>\n</svg>";
})(Init || (Init = {}));
export var WarningMessage;
(function (WarningMessage) {
    WarningMessage["WeldConfig"] = "Could not fint weldconfig.json in root directory. Default config values will be used.";
})(WarningMessage || (WarningMessage = {}));
