import * as Instruments from './instruments/_index.js'
import * as Seqs from './Sequences/_index.js'
import * as Effects from './Effects/_index.js'
import * as Synths from './Synths/_index.js'

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

// playMusic()

function demo1() {

  console.log("demo1")
  // Tone.Transport.position=0
  Tone.Transport.cancel(0)
  Tone.Transport.bpm.value = 120;


  Seqs.setPoints(synth, "0:0")
  Seqs.setPoints(synth, "0:1")
  Seqs.setPianoPart1(synth, "1:1")
  Seqs.setPianoPart2(synth, "2:1")
  Tone.Transport.stop("3:0")

  Tone.Transport.start(Tone.now())

}

function demo2() {

  console.log("demo2")
  // Tone.Transport.position=0
  Tone.Transport.cancel(0)
  Tone.Transport.bpm.value = 120;

  setPing1(synth, "0:1")
  setPing2(synth, "0:2")
  setPing2(synth, "0:3")
  setPing2(synth, "0:4")

  setPing1(synth, "1:1")
  setPing2(synth, "1:2")
  setPing2(synth, "1:3")
  setPing2(synth, "1:4")


  Tone.Transport.stop("2:0")

  Tone.Transport.start(Tone.now())

}

function setPing1(synth, start) {

  var part1 = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "8n", time);
  }, [
    ["0:0", "C6"],
  ]).start(start);
}
function setPing2(synth, start) {

  var part1 = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "8n", time);
  }, [
    ["0:0", "C5"],
  ]).start(start);
}



Tone.Transport.on("stop", () => {
  console.log("transport stop")
});
Tone.Transport.on("start", () => {
  console.log("transport start")
});


/////

// document.querySelector("tone-play-toggle").bind(Tone.Transport);
// document.querySelector("tone-metal-synth").bind(cymbal);
// document.querySelector("tone-membrane-synth").bind(conga);
// document.querySelector("tone-fm-synth").bind(bass);
