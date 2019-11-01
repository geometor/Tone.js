import {Cymbal, Conga, Piano, Ping, Ring, Bass as Bass, Harmonics} from './instruments.js'

import * as presets from './presets/_index.js'

console.dir(presets.synths.FMSynth.thinSaws)

const audio = document.querySelector('audio');
const dest = Tone.context.createMediaStreamDestination();

//instruments must be connected to the stream dest for recording.
const cymbal = new Cymbal().toMaster();
// cymbal.connect(dest);

const conga  = new Conga().toMaster();
// conga.connect(dest);

const bass   = new Bass().toMaster();
bass.connect(dest);

const piano  = new Ping().toMaster();
piano.connect(dest);

var ping1Panner = new Tone.Panner(-1).toMaster();
const ping1  = new Ping();
// ping1.toMaster();
ping1.connect(ping1Panner);
ping1.connect(dest);

var ping2Panner = new Tone.Panner(1).toMaster();
const ping2  = new Ping();
// ping2.toMaster();
ping2.connect(ping2Panner);
ping2.connect(dest);

// let str = JSON.stringify(ping1)


const ring  = new Ring().toMaster();
ring.connect(dest);

const chunks = [];

const recorder = new MediaRecorder(dest.stream);

recorder.ondataavailable = evt => {
  console.log("recorder on data")
  chunks.push(evt.data);
}

recorder.onstop = evt => {
  console.log("recorder stop")
  console.dir(chunks)

  let blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
  audio.src = URL.createObjectURL(blob);
};

// when the Transport ends, stop the recorder
Tone.Transport.on("stop", () => {
  console.log("transport stop")
  recorder.stop();
});

var started = false;
document.documentElement.addEventListener('mousedown', () => {

  if (started) return;
  started = true;

  recorder.start();
  playMusic();

  Tone.Transport.start();
});


function playMusic() {

  Tone.Transport.bpm.value = 120;
  Tone.Transport.stop("2:0:0")

  setPoints(0)
  setPoints("0:2:0")

  // setCymbalPart2();
  // // setKickPart();
  // setBass("0:2:0");
  // // line
  // setLine("0:3:0");
  // // vesica
  // setCircle("1:1:0");
  // // fade
  // setBass("1:4:0");
  // // 4 lines
  // setLine("2:1:0");
  // // triangle
  // setCircle("2:3:0");
  // // 2 medians
  // setLine("3:2:0");
  // // main circle
  // setCircle("3:4:0");
  // // fill
  // setBass("4:4:0");
  // // first golden
  // setLine("5:2:0");
  // // second golden
  // setLine("5:4:0");
  //
  // //fill
  // setBass("7:1:0");

}

function setPoints(start) {

  var part = new Tone.Part(function(time, note) {
    ping1.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C6"],
  ]).start(start);

  var part = new Tone.Part(function(time, note) {
    ping2.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0:2", "E6"],
  ]).start(start);
}

function setBass(start) {
  var part = new Tone.Part(function(time, note) {
    bass.triggerAttackRelease(note, "1n", time);
  }, [
    ["0:0", "C3"],
  ]).start(start);
}

function setLine(start) {
  setPoints(start);

  var part = new Tone.Part(function(time, note) {
    ring.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "E4"],
  ]).start(start);
}

function setCircle(start) {
  setPoints(start);

  var part = new Tone.Part(function(time, note) {
    ring.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C4"],
    ["0:1", "G4"],
    ["0:2", "C4"],
  ]).start(start);
}


function setPianoPart1() {
  var part = new Tone.Part(function(time, note) {
    piano.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C2"],
    ["0:1", "E2"],
    ["0:2", "C2"],
    ["0:3", "G2"],
  ]).start("1:0:0");

}

function setPianoPart2() {
  var part2 = new Tone.Part(function(time, note) {
    piano.triggerAttackRelease(note, "8n", time);
  }, [
    ["0:0", "C3"],
    ["0:1", "E3"],
    ["0:2", "C3"],
    ["0:3", "G3"],
  ]).start("2:0:0");
}


function setCymbalPart() {

  var part = new Tone.Sequence(function(time, freq) {
    cymbal.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    cymbal.triggerAttack(time);
  }, [
    [300, null, 200],
    [null, 200, 200],
    [null, 200, null],
    [200, null, 200]
  ], "4n").start(0);

  return part;

}

function setCymbalPart2() {

  var part = new Tone.Sequence(function(time, freq) {
    cymbal.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    cymbal.triggerAttack(time);
  }, [
    [300, 200, ]
  ], "8n").start(0);

  return part;

}

function setCongaPart() {

  var congaPart = new Tone.Sequence(function(time, pitch) {
    conga.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
  }, ["G2", "D3", "D3", "D3"], "4n").start(0);

}

function setKickPart() {

  var congaPart = new Tone.Sequence(function(time, pitch) {
    conga.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
  }, ["G2"], "4n").start(0);

}




/////

// document.querySelector("tone-play-toggle").bind(Tone.Transport);
// document.querySelector("tone-metal-synth").bind(cymbal);
// document.querySelector("tone-membrane-synth").bind(conga);
// document.querySelector("tone-fm-synth").bind(bass);
