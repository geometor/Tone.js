import * as AMSynth from './AMSynth/_index.js'
export {AMSynth}
// export * as AMSynth from './AMSynth/_index.js'
export * as FMSynth from './FMSynth/_index.js'
export * as MembraneSynth from './MembraneSynth/_index.js'
export * as MetalSynth from './MetalSynth/_index.js'
export * as MonoSynth from './MonoSynth/_index.js'
export * as NoiseSynth from './NoiseSynth/_index.js'
export * as Synth from './Synth/_index.js'


const synthList = new Map([
  ['Harmonic', AMSynth.AMSine2],
  ['Fat', AMSynth.FatSawtoothSquare],
]);

export function getSynth(name) {
  return new ( synthList.get(name) )()
}
// console.log(bar);
