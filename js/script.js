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

document.getElementById('enf-viz-wrapper').style.display = "none";

function openTab(evt, divName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" shown", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(divName).style.display = "block";
    evt.currentTarget.className += " shown";
  }

var controller = new ScrollMagic.Controller();
    
new ScrollMagic.Scene({
  triggerHook: 1,
  triggerElement: "#viz-1",
  duration: 0,
})
  .setClassToggle("#viz-1", "active")
  .addTo(controller);


new ScrollMagic.Scene({
  triggerHook: 0.25,
  triggerElement: "#viz-1",
  duration: $("#text-1").height(),
})
  .setPin("#viz-1")
  .addTo(controller);


new ScrollMagic.Scene({
  triggerHook: 1,
  triggerElement: "#viz-2",
  duration: 0,
})
  .setClassToggle("#viz-2", "active")
  .addTo(controller);


new ScrollMagic.Scene({
  triggerHook: 0.25,
  triggerElement: "#viz-2",
  duration: $(".scroll-2").height()/2,
})
  .setPin("#viz-2")
  .addTo(controller);


new ScrollMagic.Scene({
                        triggerHook: 1,
                        triggerElement: "#viz-3",
                        duration: 0
                    })
    .setClassToggle("#viz-3", "active") 
    .addTo(controller);
                
new ScrollMagic.Scene({
  triggerHook: 0.25,
  triggerElement: "#viz-3",
  duration: $(".scroll-3").height() / 2,
})
  .setPin("#viz-3")
  .addTo(controller);


// 2. CODE EXECUTED SECOND


