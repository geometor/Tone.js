import * as Synths from '../Synths/_index.js'
import * as Effects from '../Effects/_index.js'

var airports = ["F4", "Ab4", "C5", "Db5", "Eb5", "F5", "Ab5"]
var solfege = ["F4", "Ab4", "C5", "Db5", "Eb5", "F5", "Ab5"]

export function musicForFibonacci(synthType) {

  var F1 = 1
  var F2 = 1

  Tone.Transport.cancel(0)
  Tone.Transport.bpm.value = 120;

  // const synthType = "SquareSquare6"
  const synths = []

  airports.forEach( function(item){

    var F3 =  F1 + F2
    var noteDuration = F1 + "m"
    var loopDuration = F3 + "m"

    synths[item] = Synths.getSynth(synthType);
    // synths[item].volume.value=-F2/2;
    synths[item].volume.value=-12;

    var reverb = new Tone.JCReverb(.9);
    // var delay = new Tone.FeedbackDelay(0);
    // var panner = new Tone.Panner(0);
    var panner = new Tone.AutoPanner({
			"frequency" : loopDuration,
			"depth" : 1
		}).start(noteDuration);

    synths[item].chain( reverb, panner, Tone.Master)

    var loop = new Tone.Loop(function(time){
      synths[item].triggerAttackRelease(item, noteDuration, time);
    }, loopDuration).start(noteDuration);

    F1 = F2
    F2 = F3

  } )



  Tone.Transport.start(Tone.now())

}

export function musicForFibonacci2(synthType) {

  var F1 = 1
  var F2 = 1

  Tone.Transport.cancel(0)
  Tone.Transport.bpm.value = 240;

  const synths = []

  airports.reverse().forEach( function(item){

    var F3 =  F1 + F2
    var noteDuration = F1 + "m"
    var loopDuration = F3 + "m"

    synths[item] = Synths.getSynth(synthType);
    synths[item].volume.value=-12;

    var reverb = new Tone.JCReverb(.9);
    var panner = new Tone.AutoPanner({
			"frequency" : loopDuration,
			"depth" : 1
		}).start(noteDuration);

    synths[item].chain( reverb, panner, Tone.Master)

    var loop = new Tone.Loop(function(time){
      synths[item].triggerAttackRelease(item, noteDuration, time);
    }, loopDuration).start(noteDuration);

    F1 = F2
    F2 = F3

  } )



  Tone.Transport.start(Tone.now())

}
