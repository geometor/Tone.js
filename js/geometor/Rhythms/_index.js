//https://teropa.info/blog/2016/07/28/javascript-systems-music.html#the-notes-and-intervals-in-music-for-airports
var airports = ["F4", "Ab4", "C5", "Db5", "Eb4", "F5", "Ab5"]

export function padMaj(synth, start, root = "A4") {
  synth.volume.value=-12;
  var progression = Tone.Frequency(root).harmonize([0, 5, 7, 5])
  // console.dir(progression)

  var seq = new Tone.Sequence(function(time, note){
    var chord = Tone.Frequency(note).harmonize([0, 4, 7 ]);
    // console.dir(chord)
    synth.triggerAttackRelease(chord, "1m", time);

  }, progression, "1m").start(start);
  seq.loop = 1;
}


export function setCymbalPart(synth, start) {

  var part = new Tone.Sequence(function(time, freq) {
    synth.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    synth.triggerAttack(time);
  }, [
    [300, null, 200],
    [null, 200, 200],
    [null, 200, null],
    [200, null, 200]
  ], "4n").start(start);

  return part;

}

export function setCymbalPart2(synth, start) {

  var part = new Tone.Sequence(function(time, freq) {
    synth.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
    synth.triggerAttack(time);
  }, [
    [300, 200, ]
  ], "8n").start(0);

  return part;

}

export function setCongaPart(synth, start) {

  var part = new Tone.Sequence(function(time, pitch) {
    synth.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
  }, ["G2", "D3", "D3", "D3"], "4n").start(start);

  return part;


}

export function setKickPart(synth, start) {

  var part = new Tone.Sequence(function(time, pitch) {
    synth.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
  }, ["G2"], "4n").start(start);

  return part;


}
