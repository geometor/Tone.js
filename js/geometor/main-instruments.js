import {Cymbal, Conga, Piano, Ping, Ring, Bass as Bass, Harmonics} from './instruments/_index.js'

import * as presets from './presets/_index.js'


// const synth = new presets.Synths.AMSynth.AMSine2();
const synth = presets.Synths.getSynth("Harmonic");
const polySynth = new presets.Synths.AMSynth.PolyAMSine2();

synth.toMaster();
polySynth.toMaster();

//bind the interface
document.querySelector("tone-piano").bind(synth);
document.querySelector("tone-am-synth").bind(synth);
document.querySelector("#demo1").onclick = playMusic;

// playMusic()

function playMusic() {

  console.log("play")
  Tone.Transport.bpm.value = 120;
  Tone.Transport.stop("3:0:0")

  setPoints(0)
  setPoints("0:2")
  setPianoPart1("1:0")
  setPianoPart2("2:0")

  Tone.Transport.start(0)

}

function setPoints(start) {

  var part1 = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C6"],
  ]).start(start);

  var part2 = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0:2", "E6"],
  ]).start(start);
}

function setBass(start) {
  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "1n", time);
  }, [
    ["0:0", "C3"],
  ]).start(start);
}

function setLine(start) {
  setPoints(start);

  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "E4"],
  ]).start(start);
}

function setCircle(start) {
  setPoints(start);

  var part = new Tone.Part(function(time, note) {
    polySynth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C4"],
    ["0:1", "G4"],
    ["0:2", "C4"],
  ]).start(start);
}


function setPianoPart1(start) {
  var part = new Tone.Part(function(time, note) {
    polySynth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C2"],
    ["0:1", "E2"],
    ["0:2", "C2"],
    ["0:3", "G2"],
  ]).start(start);

}

function setPianoPart2(start) {
  var part2 = new Tone.Part(function(time, note) {
    polySynth.triggerAttackRelease(note, "8n", time);
  }, [
    ["0:0", "C3"],
    ["0:1", "E3"],
    ["0:2", "C3"],
    ["0:3", "G3"],
  ]).start(start);
}


function setCymbalPart() {

  var part = new Tone.Sequence(function(time, freq) {
    synth.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    synth.triggerAttack(time);
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
    synth.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    synth.triggerAttack(time);
  }, [
    [300, 200, ]
  ], "8n").start(0);

  return part;

}

function setCongaPart() {

  var part = new Tone.Sequence(function(time, pitch) {
    synth.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
  }, ["G2", "D3", "D3", "D3"], "4n").start(0);

  return part;

}

function setKickPart() {

  var part = new Tone.Sequence(function(time, pitch) {
    synth.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
  }, ["G2"], "4n").start(0);

  return part;

}




/////

// document.querySelector("tone-play-toggle").bind(Tone.Transport);
// document.querySelector("tone-metal-synth").bind(cymbal);
// document.querySelector("tone-membrane-synth").bind(conga);
// document.querySelector("tone-fm-synth").bind(bass);
