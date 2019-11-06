import * as Instruments from './instruments/_index.js'
import * as Seqs from './Sequences/_index.js'
import * as Recorder from './Recorder/_index.js'

const cymbal = new Instruments.Cymbal().toMaster();
Recorder.addInstrument(cymbal)

const conga  = new Instruments.Conga().toMaster();
Recorder.addInstrument(conga)

const bass   = new Instruments.Bass().toMaster();
Recorder.addInstrument(bass)

const piano  = new Instruments.Ping().toMaster();
Recorder.addInstrument(piano)

const ring  = new Instruments.Ring().toMaster();
Recorder.addInstrument(ring)


// when the Transport ends, stop the recorder
Tone.Transport.on("stop", () => {
  console.log("transport stop")
  Recorder.stop();
});

var started = false;
document.documentElement.addEventListener('mousedown', () => {

  if (started) return;
  started = true;

  Recorder.start();
  playMusic();

  Tone.Transport.start();
});


function playMusic() {

  Tone.Transport.bpm.value = 120;
  Tone.Transport.cancel(0);


  // Seqs.setCymbalPart2(cymbal, "0:0");
  // setKickPart();
  Seqs.setBass(bass, "0:2:0");
  // line
  Seqs.setLine(piano, "0:3:0");
  // vesica
  Seqs.setCircle(ring, "1:1:0");
  // fade
  Seqs.setBass(bass, "1:4:0");
  // 4 lines
  Seqs.setLine(piano, "2:1:0");
  // triangle
  Seqs.setCircle(ring, "2:3:0");
  // 2 medians
  Seqs.setLine(piano, "3:2:0");
  // main circle
  Seqs.setCircle(ring, "3:4:0");
  // fill
  Seqs.setBass(bass, "4:4:0");
  // first golden
  Seqs.setLine(piano, "5:2:0");
  // second golden
  Seqs.setLine(ring, "5:4:0");

  //fill
  Seqs.setBass(bass, "7:1:0");
  Tone.Transport.stop("9:0:0")

  Tone.Transport.start();

}
