var gallery = document.querySelector("#gallery");

var iconTemplate = document.querySelector("#galleryIcon");


var i = 0;
for(i = 0; i < 6; i++) {

    //create and customize element
    let newIcon = document.createElement("div");
    newIcon.classList.add("icon");
    newIcon.style.animationDelay = i*.25 + "s";
    
    //events
    newIcon.addEventListener("mouseover", onIconOver);
    newIcon.addEventListener("mouseout", onIconOut);
    newIcon.addEventListener("click", onIconClick);
    
    //append to page
    gallery.appendChild(newIcon);
    
}


function onIconOver(event) {
  event.target.style.animationDelay = "0s";
  event.target.classList.add("iconOver");
  event.target.classList.remove("iconOut");
}
function onIconOut(event) {
  event.target.classList.add("iconOut");
  event.target.classList.remove("iconOver");
}
function onIconClick(event) {
    event.target.classList.remove("iconOut");
    event.target.classList.remove("iconOver");
    event.target.classList.add("iconClick");
}