//instruments must be connected to the stream dest for recording.


export function setPoints(synth, start) {

  //TODO: set up Panner
  var part1 = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C6"],
  ]).start(start);

  var part2 = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0:1", "E6"],
  ]).start(start);
}

export function setBass(synth, start) {
  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "1n", time);
  }, [
    ["0:0", "C3"],
  ]).start(start);
}

export function setLine(synth, start) {
  setPoints(synth, start);

  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "E4"],
  ]).start(start);
}

export function setCircle(synth, start) {
  setPoints(synth, start);

  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C4"],
    ["0:1", "G4"],
    ["0:2", "C4"],
  ]).start(start);
}


export function setPianoPart1(synth, start) {
  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "4n", time);
  }, [
    ["0:0", "C2"],
    ["0:1", "E2"],
    ["0:2", "C2"],
    ["0:3", "G2"],
  ]).start(start);

}

export function setPianoPart2(synth, start) {
  var part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note, "8n", time);
  }, [
    ["0:0", "C3"],
    ["0:1", "E3"],
    ["0:2", "C3"],
    ["0:3", "G3"],
  ]).start(start);

  return part;

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
