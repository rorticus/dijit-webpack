import win from "dojo/_base/window";
import dom from "dojo/dom";

declare const cjsRequire: any;

setTimeout(async () => {
    const { default: Hello } = cjsRequire('./widgets/Hello');

    function greet(name = 'World') {
        dom.byId<HTMLElement>("mainHeading").innerText = `Hello ${name}!`;
    }
    greet();
    
    (new Hello({
        onChange: function (name: string) {
            greet(name);
        }
    })).placeAt(win.body());    
}, 1000);
