const scroller = document.getElementById("scrollindicator");
var windowsize = window.innerHeight
var bodysize = document.body.parentNode.offsetHeight
var sections = bodysize/windowsize
scroller.style.top = 0.8*(windowsize/sections) + "px"
var scrollsize = bodysize-windowsize
var lastsection = 1

document.querySelector("#scrollindicatorbox a").style.margin = (windowsize/sections)

function animatedMove(id, yStart, yEnd, secs)
{
    // Remove any CSS rules inserted by a previous call to this method
    let rulename = `AnimMove${id}`;
    let ss = document.styleSheets; // all stylesheets
    for (let i = 0; i < ss.length; ++i) { // for each stylesheet...
        for (let j = ss[i].cssRules.length - 1; j > 0; j--) { // for each rule...
            if (ss[i].cssRules[j].name === rulename) { // does the name match?
                ss[i].deleteRule(j);
            }
        }
    }

    // Insert a CSS rule for this animation
    document.styleSheets[0].insertRule(`@keyframes ${rulename} { 0% { top: ${yStart}px; width: 15px; } 50% { width: 10px; } 100% { top: ${yEnd}px width: 15px} }`, 1);

    // Remove any CSS rules inserted by a previous call to this method
    for (let i = 0; i < ss.length; ++i) { // for each stylesheet...
        for (let j = ss[i].cssRules.length - 1; j > 0; j--) { // for each rule...
            if (ss[i].cssRules[j].name === rulename) { // does the name match?
                ss[i].deleteRule(j);
            }
        }
    }

    // Insert a CSS rule for this animation
    document.styleSheets[0].insertRule(`@keyframes ${rulename} { 0% { top: ${yStart}px; width: 10px; height: 10px } 50% { width: 7.5px; height: 12.5px } 100% { top: ${yEnd}px width: 10px; height: 10px} }`, 1);

    // assign the animation to our element
    let el = document.getElementById(id);
    el.style.position = 'fixed';
    el.style.animation = `${rulename} ${secs}s`;

    // Make the element stay where the animation ends
    el.style.top = `${yEnd}px`;

    // Re-clone the element, to reset the animation
    el.parentNode.replaceChild(el.cloneNode(true), el);
}

function scrollind() {
    var y = window.scrollY;
    var sectionnumber = Math.round((y+windowsize)/windowsize)
    if (sectionnumber != lastsection) {
        console.log((windowsize/sections)*sectionnumber)
        animatedMove('scrollindicator', 0.8*(windowsize/sections)*lastsection + (11), 0.8*(windowsize/sections)*sectionnumber + (11), 0.4);
        lastsection = sectionnumber;
    }
  };



window.addEventListener("scroll", scrollind);