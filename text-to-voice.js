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
                  width: 30px;
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
                .ed-config-modal .form > div {
                    display: block;
                    margin: 0 auto;
                    font-family: sans-serif;
                    font-size: 16px;
                    padding: 5px;
                    min-height: 20px;
                }
                .ed-config-modal .form > div label {
                    width: 100%;
                }
                .ed-config-modal .form select {
                    max-width: 180px;
                    font-size: 14px;
                    padding: 5px;
                    border-radius: 7px;
                    border: 1px solid #777777;
                }
                .ed-config-modal .form select:focus {
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
              .ed-config-modal {
                  width: 230px;
              }
              .ed-config-button:active,
              .ed-config-button:focus{
                  outline: none;
                  background-color: #777777DD !important;
                  transform: translateY(4px);
              }
              .ed-speak-button:focus,
              .ed-speak-button:active {
                  outline: none;
                  background-color: #2A9DF4DD;
                  transform: translateY(4px);
              }
              .ed-config-modal {
                  background: #FFFFFFee !important;
              }
              .ed-info p {
                position: relative;
                color: #2A9DF4;
                width: fit-content;
                cursor: pointer;
              }
              .ed-info div {
                background: #D4D4D4;
                border: 1px solid #D4D4D4;
                padding: 5px 10px;
                display: none;
                position: absolute;
                border-radius: 7px;
                top: 100px;
                left: 240px; 
                width: 200px;
              }
              .ed-info:hover div {
                display: block;
              }
              .ed-info svg {
                color: #2A9DF4;
              }
              .warning-modal-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: #0003;
                z-index: 999999;
              }
              .warning-modal {
                background-color: #f5f5f5;
                position: relative;
                margin: 0 auto;
                margin-top: 15%;
                width: 350px;
                padding: 25px;
                border-radius: 20px;
              }
              .warning-modal p {
                color: #2a9df4;
              }
              .warning-modal .btn-close {
                position: absolute;
                top: 0px;
                right: 0px;
                padding: 5px;
                cursor: pointer;
                color: #888;
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .warning-modal .btn-close:hover {
                background-color: #3332;
              }
            </style>`;

document.body.innerHTML += `
  <div class="warning-modal-wrapper" hidden>
        <div class="warning-modal">
          <span
            class="btn-close"
            onclick="document.querySelector('.warning-modal-wrapper').setAttribute('hidden','hidden')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
          <p>
            Selecione algum texto e então aperte este botão para ouvir o conteudo.
          </p>
        </div>
        </div>
  `;

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
speak_btn.innerHTML = `<svg
version="1.1"
xmlns="http://www.w3.org/2000/svg"
stroke="#FFF" 
viewBox="0 0 295.928 295.928"
fill="#FFF"
>
<g>
  <path
    d="M193.686,68.762c-3.907,3.902-3.909,10.234-0.005,14.141c26.269,26.287,26.252,69.074-0.037,95.379
c-3.904,3.908-3.902,10.238,0.004,14.143c1.953,1.951,4.511,2.928,7.069,2.928c2.561,0,5.12-0.979,7.073-2.932
c34.079-34.1,34.096-89.57,0.037-123.654C203.925,64.86,197.592,64.856,193.686,68.762z"
  />
  <path
    d="M156.301,97.448c-3.907,3.902-3.909,10.234-0.005,14.141c10.472,10.48,10.471,27.533-0.002,38.014
c-3.904,3.906-3.902,10.238,0.005,14.143c1.952,1.951,4.511,2.926,7.068,2.926c2.561,0,5.121-0.976,7.073-2.932
c18.263-18.275,18.264-48.012,0.002-66.287C166.54,93.544,160.207,93.542,156.301,97.448z"
  />
  <path
    d="M252.097,24.471c-3.904-3.908-10.235-3.91-14.142-0.006c-3.907,3.904-3.909,10.236-0.005,14.143
c50.671,50.703,50.649,133.225-0.052,183.951c-3.904,3.906-3.902,10.238,0.004,14.143c1.953,1.951,4.511,2.928,7.069,2.928
c2.56,0,5.12-0.979,7.073-2.932C310.536,178.175,310.559,82.97,252.097,24.471z"
  />
  <path
    d="M72.751,195.087c25.71-1.771,46.091-23.264,46.091-49.447c0-27.338-22.217-49.578-49.524-49.578
c-27.309,0-49.526,22.24-49.526,49.578c0,26.182,20.381,47.674,46.092,49.447c-19.25,0.74-36.203,7.695-48.019,19.789
C5.726,227.3-0.443,244.501,0.025,264.622c0.126,5.43,4.564,9.768,9.997,9.768h118.582c5.433,0,9.871-4.338,9.997-9.77
c0.467-20.123-5.703-37.326-17.843-49.75C108.945,202.78,91.997,195.827,72.751,195.087z"
  />
</g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
<g></g>
</svg>
`;
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
        <div class="form">
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
        <div>
        <label for="auto-speak">Fala automatica</label><input type="checkbox" checked name="auto-speak" id="auto-speak">
        </div>
        <div class="ed-info">
            <p>como usar?</p>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <p>Selecione com o mouse algum texto e então clique no botão de play</p>
            </div>
        </div>
        </div>
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

    if (voices[i].lang === DEFAULT_LANG) {
      selectedIndex = i;
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

function selectVoice(lang) {}

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
      document
        .querySelector(".warning-modal-wrapper")
        .removeAttribute("hidden");
    }
  } else {
    document.querySelector(".warning-modal-wrapper").removeAttribute("hidden");
  }
}

function autoSpeak(text) {
  if (document.querySelector("#auto-speak").checked) {
    speak(text);
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
