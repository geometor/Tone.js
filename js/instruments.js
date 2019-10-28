// from Tonejs bembe example
// <a href="https://tonejs.github.io/docs/MetalSynth">Tone.MetalSynth</a>
// creates metallic, inharmonic sounds using 6
// <a href="https://tonejs.github.io/docs/FMOscillator">Tone.FMOscillators</a>
// with a tuning based on the TR-808 Cymbal.
class Cymbal extends Tone.MetalSynth{
  constructor(){
    super({
      "harmonicity" : 12,
      "resonance" : 800,
      "modulationIndex" : 20,
      "envelope" : {
        "decay" : 0.4,
      },
      "volume" : -15
    })  }
}

// from Tonejs bembe example
// <a href="https://tonejs.github.io/docs/MembraneSynth">Tone.MembraneSynth</a>
// makes kick and tom-like sounds using a frequency envelope which is triggered on notes attack.
class Conga extends Tone.MembraneSynth{
  constructor(){
    super({
			"pitchDecay" : 0.008,
			"octaves" : 2,
			"envelope" : {
				"attack" : 0.0006,
				"decay" : 0.5,
				"sustain" : 0
			}
		})  }
}
