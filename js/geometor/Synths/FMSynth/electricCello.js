export const settings = {
    "harmonicity": 3.01,
    "modulationIndex": 14,
    "oscillator": {
        "type": "triangle"
    },
    "envelope": {
        "attack": 0.2,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "type": "square"
    },
    "modulationEnvelope" : {
        "attack": 0.01,
        "decay": 0.5,
        "sustain": 0.2,
        "release": 0.1
    }
}

export class ElectricCello extends Tone.FMSynth {

  constructor() {
    super(settings)
  }

}
