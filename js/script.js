// 1. CODE EXECUTED FIRST
// define variables
// define functions

// PARSE DATA
// load csv data
// d3.csv("./data.csv", d3.autoType)
// .then(function(data) {
//     // 3. CODE EXECUTED THIRD
//     // use data in functions here
// })

var controller = new ScrollMagic.Controller();
    
new ScrollMagic.Scene({
                        triggerHook: 0.8,
                        triggerElement: ".scroll-1",
                        duration: "80%"
                    })
    .setClassToggle(".scroll-1", "active") 
    .addTo(controller);

new ScrollMagic.Scene({
                        triggerHook: 0.8,
                        triggerElement: ".scroll-2",
                        duration: "80%"
                    })
    .setClassToggle(".scroll-2", "active") 
    .addTo(controller);
                
new ScrollMagic.Scene({
                        triggerHook: 0.8,
                        triggerElement: ".scroll-3",
                        duration: "80%"
                    })
    .setClassToggle(".scroll-3", "active") 
    .addTo(controller);

// 2. CODE EXECUTED SECOND
