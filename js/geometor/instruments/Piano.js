export class Piano extends Tone.Synth {

  constructor() {

    super({
      "oscillator" : {
        "type" : "fmsine4",
        "modulationType" : "square"
      }
    })

  }

}
