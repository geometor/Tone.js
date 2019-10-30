export class Bass extends Tone.FMSynth {

  constructor() {
    super({
      "harmonicity": 1,
      "modulationIndex": 3.5,
      "carrier": {
        "oscillator": {
          "type": "custom",
          "partials": [0, 1, 0, 2]
        },
        "envelope": {
          "attack": 0.08,
          "decay": 0.3,
          "sustain": 0,
        },
      },
      "modulator": {
        "oscillator": {
          "type": "square"
        },
        "envelope": {
          "attack": 0.1,
          "decay": 0.2,
          "sustain": 0.3,
          "release": 0.01
        },
      }
    })
  }
}
