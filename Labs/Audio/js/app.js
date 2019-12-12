var sounds = [ 
    "chimes_long.mp3", "click_clock_loop.mp3",
    "pop_10.mp3", "puff_.mp3", "rustle_5.mp3"
];

var soundButtons = document.getElementById("soundButtons");

var soundElements = [];

//loop through sounds and create audio tag for each
sounds.forEach((soundURL, idx) => {
    
    //sounds
    var newSound = new Audio( "sounds/" + soundURL);
    console.log(newSound);
    soundElements.push(newSound);

    //button text
    //get index from the sounds array
    var soundText = sounds[idx];
    //split the strings at the underscores
    buttonText = soundText.split("_");

    //sound buttons
    var newButton = document.createElement("button");
    newButton.innerHTML = buttonText[0];//first index of the split string

    //store sound index
    newButton.setAttribute("data-sound-id", idx);

    //add it to the page
    soundButtons.appendChild(newButton);

    //event listener for each button
    newButton.addEventListener("click", playSoundInArray);
})

//listen for button click


function playSoundInArray(event) {
    //get sound index
    var soundIndex = Number( event.target.getAttribute("data-sound-id"));

    //get sound
    var selectedSound = soundElements[soundIndex];

    //play selected sound
    selectedSound.play();
}


/*
var audio = document.getElementById("audio");

function playAudio() {
    audio.play();
}
function stopMainAudio() {
    audio.pause();
}
*/