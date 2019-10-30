import {Cymbal, Conga, Piano, Bass} from './instruments.js'

const audio = document.querySelector('audio');
// const actx = Tone.context;
const dest = Tone.context.createMediaStreamDestination();

//instruments must be connected to the stream dest for recording.
const cymbal = new Cymbal().toMaster();
cymbal.connect(dest);

const conga  = new Conga().toMaster();
conga.connect(dest);

const bass   = new Bass().toMaster();
bass.connect(dest);

const piano  = new Piano().toMaster();
piano.connect(dest);

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
  Tone.Transport.stop("3:0:0")

  setCymbalPart();
  setKickPart();
  setPianoPart1();
  setPianoPart2();

}

function setPianoPart1() {
  var part = new Tone.Part(function(time, note) {
    piano.triggerAttackRelease(note, "8n", time);
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

  var cymbalPart = new Tone.Sequence(function(time, freq) {
    cymbal.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    cymbal.triggerAttack(time);
  }, [
    [300, null, 200],
    [null, 200, 200],
    [null, 200, null],
    [200, null, 200]
  ], "4n").start(0);

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
