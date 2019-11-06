import * as Instruments from './instruments/_index.js'
import * as Seqs from './Sequences/_index.js'
import * as Effects from './Effects/_index.js'
import * as Synths from './Synths/_index.js'
import * as Demos from './Demos/_index.js'

//bind the interface
const picker = document.querySelector("#synthPicker")
const poly = document.querySelector("#poly")

function addSynthListToPicker(value, key, map) {
  var el = document.createElement("option");
  el.textContent = key;
  el.value = key;
  picker.appendChild(el);
}

Synths.synthList.forEach(addSynthListToPicker);

picker.onchange = setSynth;
poly.onchange = setSynth;

var synth;
setSynth();
// Effects.addFreeverb(synth);

function setSynth() {
  var pick = picker.options[picker.selectedIndex].value
  console.log("set: " + pick)

  if (poly.checked) {
    synth = Synths.getPolySynth(pick);

    document.querySelector("tone-piano").bind(synth);
    // document.querySelector("tone-am-synth").unbind();
  } else {
    synth = Synths.getSynth(pick);

    document.querySelector("tone-piano").bind(synth);
    document.querySelector("tone-am-synth").bind(synth);
  }
  synth.toMaster();
}

document.querySelector("#demo1").onclick = demo1;
document.querySelector("#demo2").onclick = demo2;
document.querySelector("#fib1").onclick = fib1;
document.querySelector("#fib2").onclick = fib2;

function demo1() {
  console.log("demo1")
  Demos.demo1(synth)
}

function demo2() {
  console.log("demo2")
  Demos.demo2(synth)
}

function fib1() {
  console.log("fib1")
  var pick = picker.options[picker.selectedIndex].value

  Demos.Airports.musicForFibonacci(pick)
}
function fib2() {
  console.log("fib2")
  var pick = picker.options[picker.selectedIndex].value

  Demos.Airports.musicForFibonacci2(pick)
}




Tone.Transport.on("stop", () => {
  console.log("transport stop")
  Tone.context.close();
});
Tone.Transport.on("start", () => {
  console.log("transport start")
});


/////

// document.querySelector("tone-play-toggle").bind(Tone.Transport);
// document.querySelector("tone-metal-synth").bind(cymbal);
// document.querySelector("tone-membrane-synth").bind(conga);
// document.querySelector("tone-fm-synth").bind(bass);
