/*
    Author: Edson Rodrigues
    Github: https://github.com/EDnotSheeran
*/
const BTN_POSITION = { bottom: "25px", left: "25px" };
const BTN_SIZE = { width: "", height: "" };
const DEFAULT_LANG = "pt-BR";
var canLog = true;

var synth = window.speechSynthesis;

document.body.innerHTML += `
            <style>
                .ed-modal-wrapper {
                    position: fixed;
                    bottom: ${BTN_POSITION.bottom};
                    left: ${BTN_POSITION.left};
                    width: fit-content;
                }
                .ed-modal {
                    position: relative;
                }
                .ed-speak-button {
                    z-index: 10000;
                    positon: absolute;
                    top: 0;
                    left: 0;
                    margin: 0;
                    padding: 0;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid #2A9DF4; 
                    border-radius: 50%;  
                    background: #2A9DF4;
                    transition: transform .2s;
                    cursor: pointer;
                    box-shadow: 0px 8px 15px #2A9DF488;
                }
                .ed-speak-button:hover {
                    transform: scale(1.5);
                }
                .ed-speak-button:focus {
                    outline: none;
                }
                .ed-speak-button:active {
                    background-color: #2A9DF4DD;
                    transform: translateY(4px);
                }
                .ed-speak-button svg {
                    color: #FFFFFF;
                }

                .ed-config-button {
                    z-index: 10;
                    position: absolute;
                    top: -30px;
                    left: -15px;
                    margin: 0;
                    padding: 0;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid #777777; 
                    border-radius: 50%;  
                    background: #777777;
                    transition: transform .2s;
                    cursor: pointer;
                    box-shadow: 0px 8px 15px #77777788;
                }
                .ed-config-button:hover {
                    transform: scale(1.5);
                }
                .ed-config-button:focus {
                    outline: none;
                }
                .ed-config-button:active {
                    background-color: #777777DD;
                    transform: translateY(4px);
                }
                .ed-config-button svg {
                    width: 18px;
                    color: #FFFFFF;
                }
                .ed-config-modal {
                    min-width: 230px;
                    position: absolute;
                    top: -300px;
                    left: 0px;
                    padding: 10px 10px 15px 10px;
                    border: 2px solid #D4D4D477;
                    border-radius: 8px;
                    background: #FFFFFF77;
                }
                .ed-config-modal form > div {
                    display: block;
                    margin: 0 auto;
                    font-family: sans-serif;
                    font-size: 16px;
                    padding: 5px;
                    min-height: 20px;
                }
                .ed-config-modal form > div label {
                    width: 100%;
                }
                .ed-config-modal form select {
                    max-width: 180px;
                    font-size: 14px;
                    padding: 5px;
                    border-radius: 7px;
                    border: 1px solid #777777;
                }
                .ed-config-modal form select:focus {
                    outline: none;
                }
                .ed-config-modal .clearfix {
                    clear: both;
                }
                .ed-config-modal .rate-value, .pitch-value {
                    float: right;
                    width: 5%;
                    line-height: 1.5;
                }
                #ed-modal-close {
                    padding: 0;
                    margin: 0;
                    cursor: pointer;
                    float: right;
                    border-radius: 50%;
                    border: none;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #ed-modal-close:hover {
                    background: #d4d4d4;
                } 
                #ed-modal-close svg {
                    color: #2A9DF4DD;
                }
            </style>`;

// Modal Wrapper
modal_wrapper = document.createElement("div");
modal_wrapper.classList.add("ed-modal-wrapper");

// modal
modal = document.createElement("div");
modal.classList.add("ed-modal");
modal_wrapper.appendChild(modal);

// Config Button
config_btn = document.createElement("button");
config_btn.classList.add("ed-config-button");
config_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
modal.appendChild(config_btn);

// Speak Button
speak_btn = document.createElement("button");
speak_btn.classList.add("ed-speak-button");
speak_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
speak_btn.addEventListener("click", readSelectedText);
modal.appendChild(speak_btn);

// Config Modal
config_modal = document.createElement("div");
config_modal.classList.add("ed-config-modal");
config_modal.setAttribute("hidden", true);
config_modal.innerHTML = `
        <button id="ed-modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <form>
        <div>
        </div>
        <div>
            <label for="rate">Ritmo</label><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate">
            <div class="rate-value">1</div>
            <div class="clearfix"></div>
        </div>
        <div>
            <label for="pitch">Tom</label><input type="range" min="0" max="2" value="1" step="0.1" id="pitch">
            <div class="pitch-value">1</div>
            <div class="clearfix"></div>
        </div>
        <select id="ed-voice-select" class="browser-default">

        </select>
        </form>
    `;
modal.appendChild(config_modal);

// Inserts the elemnt on the end of the body
document.body.appendChild(modal_wrapper);

// Config Elements
var voiceSelect = document.querySelector("#ed-voice-select");
var pitch = document.querySelector("#pitch");
var pitchValue = document.querySelector(".pitch-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector(".rate-value");

// Populate the voice list
populateVoiceList();

var voices = [];

var btn_close = document.querySelector("#ed-modal-close");
btn_close.addEventListener("click", () => {
  document.querySelector(".ed-config-modal").toggleAttribute("hidden");
});

var btn_config = document.querySelector(".ed-config-button");
btn_config.addEventListener("click", () => {
  document.querySelector(".ed-config-modal").toggleAttribute("hidden");
});

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
  var selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    if(voices[i].lang === DEFAULT_LANG){
        selectedIndex = i;
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

function selectVoice(lang){

}

function speak(text) {
  if (synth.speaking) {
    if (canLog) console.error("O texto ja esta sendo lido");
    synth.cancel();
    return;
  }
  if (text !== "") {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
      if (canLog) console.log("Teminou de ler o texto");
    };
    utterThis.onerror = function (event) {
      if (canLog) console.error("Erro ao ler o texto");
    };
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

function readSelectedText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
    if (text !== "") {
      speak(text);
    } else {
      if (canLog) console.error("Texto não selecionado");
    }
  } else {
    if (canLog) console.error("Texto não selecionado");
  }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
  rateValue.textContent = rate.value;
};
