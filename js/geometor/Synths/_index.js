import * as AMSynth from './AMSynth/_index.js'
export {AMSynth}
// export * as AMSynth from './AMSynth/_index.js'
export * as FMSynth from './FMSynth/_index.js'
export * as MembraneSynth from './MembraneSynth/_index.js'
export * as MetalSynth from './MetalSynth/_index.js'
export * as MonoSynth from './MonoSynth/_index.js'
export * as NoiseSynth from './NoiseSynth/_index.js'
export * as Synth from './Synth/_index.js'


export const synthList = new Map([
  ['AMSine2', AMSynth.AMSine2],
  ['FatSawtoothSquare', AMSynth.FatSawtoothSquare],
  ['PulseSquare', AMSynth.PulseSquare],
  ['SawtoothSine', AMSynth.SawtoothSine],
  ['SawtoothTriangle', AMSynth.SawtoothTriangle],
  ['SquareSquare6', AMSynth.SquareSquare6],
]);

export function getSynth(name) {
  return new ( synthList.get(name) )()
}

export function getPolySynth(name) {
  return new Tone.PolySynth(4, synthList.get(name) )
}
// console.log(bar);
