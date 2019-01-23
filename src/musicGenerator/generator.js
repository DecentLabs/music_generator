import Tone from 'tone'
import generateMelodies from './generateMelodies.js'

const MOODS = {
  soft: {
    pitches2: [48, 50, 55, 57, 58, 60, 62, 63, 65, 67, 72, 84],
    pitches1: [50, 64, 65, 69, 70]
  },
  vivid: {
    pitches2: [67, 69, 71, 74, 76, 79, 81, 83, 84, 85, 86],
    pitches1:  [53, 57, 58, 60, 62, 64]
  },
  dark: {
    pitches2: [48, 49, 54, 55, 56],
    pitches1: [36, 37, 45, 46]
  }
}

const numInterpolations = 12
const loopLen = 1 / numInterpolations
const melodiesModelCheckPoint = './data/mel_small'
const NUM_STEPS = 32; // DO NOT CHANGE.

let MOOD = MOODS['vivid'];
let INTENSITY = 1;
let MELODIES = generateMelodies(MOOD);
let seq1, seq2;
setSeqs()

let sequenceIndex = -1;
let stepIndex = -1;
let interpolatedNoteSequences1
let interpolatedNoteSequences2
let interval;

function setIntensity (intensity) {
  INTENSITY = intensity
  console.log(INTENSITY, 'INTENSITY');
}

function setMood (mood) {
  if ((MOOD !== MOODS[mood])) {
    MOOD = MOODS[mood]
    MELODIES = generateMelodies(MOOD)
    setSeqs()
  }
}

function setSeqs () {
  seq1 = new musicvae.MusicVAE(melodiesModelCheckPoint)
  .initialize()
  .then(function(musicVAE) {
    return musicVAE.interpolate([MELODIES.MELODY1, MELODIES.MELODY2], numInterpolations);
  })
  .then(function(noteSequences) {
    interpolatedNoteSequences1 = noteSequences;
    console.log("seq1 generated");
  });

  seq2 = new musicvae.MusicVAE(melodiesModelCheckPoint)
  .initialize()
  .then((musicVAE) => {
    return musicVAE.interpolate([MELODIES.MELODY3, MELODIES.MELODY4], numInterpolations);
  })
  .then((noteSequences) => {
    interpolatedNoteSequences2 = noteSequences;
    console.log("seq2 generated");
  });
}

setMood('vivid')

let reverb = new Tone.Convolver(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').
toMaster();

reverb.wet.value = 0.4;

let chorus = new Tone.Chorus(0.2, 2.5, 0.2).connect(reverb);
let phaser = new Tone.Phaser({
  "frequency": 0.1,
  "octaves": 2,
  "baseFrequency": 400
}).toMaster();

let synthA = new Tone.AMSynth( {
  "envelope": {
    attack: 0.5,
    decay: 0.1,
    sustain: 1,
    release: 16
  },
}).connect(chorus);

let synthB = new Tone.PolySynth(6, Tone.Synth, {
  "envelope": {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 2
  },
}).connect(chorus);

let synthC = new Tone.FMSynth({
  "harmonicity"  : 5 ,
  "modulationIndex"  : 20 ,
  "envelope": {
    attack: 0.1,
    decay: 3,
    sustain: 2,
    release: 3
  },
}).connect(chorus);

let synthAA = new Tone.AMSynth( {
  "envelope": {
    attack: 0.5,
    decay: 0.1,
    sustain: 1,
    release: 16
  },
}).connect(chorus);

let synthBB = new Tone.PolySynth(6, Tone.Synth, {
  "envelope": {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 2
  },
}).connect(chorus);

let synthCC = new Tone.FMSynth({
  "harmonicity"  : 10 ,
  "modulationIndex"  : 5 ,
  "envelope": {
    attack: 0.1,
    decay: 3,
    sustain: 2,
    release: 3
  },
}).connect(chorus);

let synthBase = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator": {
    "partials": [1, 2, 3, 4],
  },
  "envelope": {
    attack: 2,
    decay: 3,
    sustain: 2,
    release: 6
  }
}).connect(phaser);

let synthDrum = new Tone.MembraneSynth().toMaster();
let synthHigh = new Tone.MetalSynth({
  "envelope": {
    attack: 0.001,
    decay: 0.1,
    release: 0.1
  }
}).connect(phaser);

function playSynth1(midiNote, numNoteHolds) {
  //let duration = Tone.Transport.toSeconds('8n') * (numNoteHolds || 1);
  if(MOOD == MOODS['soft']) {
    synthAA.volume.value = -10;
    synthAA.triggerAttackRelease(Tone.Frequency(midiNote, "midi"), "8n");
  }
  if(MOOD == MOODS['dark']) {
    synthCC.volume.value = -10;
    synthCC.triggerAttackRelease(Tone.Frequency(midiNote, "midi"), "8n");
  }
  if(MOOD == MOODS['vivid']) {
    synthBB.volume.value = -10;
    synthBB.triggerAttackRelease(Tone.Frequency(midiNote, "midi"), "8n");
  }
}

function playSynth2(midiNote, numNoteHolds) {
  //let duration = Tone.Transport.toSeconds('8n') * (numNoteHolds || 1);
  if(MOOD == MOODS['soft']) {
    synthA.volume.value = -10;
    synthA.triggerAttackRelease(Tone.Frequency(midiNote, "midi"), "8n");
  }
  if(MOOD == MOODS['dark']) {
    synthC.volume.value = -10;
    synthC.triggerAttackRelease(Tone.Frequency(midiNote, "midi"), "8n");
  }
  if(MOOD == MOODS['vivid']) {
    synthB.volume.value = -10;
    synthB.triggerAttackRelease(Tone.Frequency(midiNote, "midi"), "8n");
  }
}

function startSequence() {
  if (!interpolatedNoteSequences1) {
    return;
  }
  if (Tone.Transport.state === 'started') {
    Tone.Transport.stop();
  } else {
    Tone.Transport.start();
  }
  interval = setInterval(playSequence, 10);
}

function endSequence() {
  Tone.Transport.stop();
  clearInterval(interval);
}

function playSequence() {
  //here we calculate the percentage through melodies, between 0-1
  let totalPlayTime = (Tone.Transport.bpm.value * NUM_STEPS * numInterpolations) / 1000;
  // let percent = Tone.Transport.seconds / totalPlayTime % 1;

  // INTENSITY should be set between 0 - (1-loopLen)
  if (INTENSITY + loopLen >= 1) INTENSITY = INTENSITY - loopLen;
  let percent = (Date.now() % 6000 / 6000 / numInterpolations) + INTENSITY;
  // console.log(INTENSITY);

  //here we calculate the index of interpolatedNoteSequences
  //and currStepIndex is the note between 0-31 of that playback
  let currSequenceIndex = Math.floor(percent * numInterpolations);
  let currStepIndex = Math.floor((percent * numInterpolations - currSequenceIndex) * NUM_STEPS);
  function isCurrentStep(note) {
    return note.quantizedStartStep === currStepIndex;
  }

  if (Tone.Transport.state === 'started') { //playback started
    if (currStepIndex != stepIndex) {
      let notes1 = interpolatedNoteSequences1[currSequenceIndex].notes.filter(isCurrentStep);
      notes1.forEach(function(note) {
        let noteDuration = note.quantizedEndStep - note.quantizedStartStep;
        playSynth1(note.pitch);
        let r = Math.random();
        if (r > 0.4) {
          synthHigh.resonance = Math.random() * 2000 + 500;
          synthHigh.volume.value = -(Math.random() * 100) - 16;
          synthHigh.triggerAttackRelease("16n");
        }
      });
      let notes2 = interpolatedNoteSequences2[currSequenceIndex].notes.filter(isCurrentStep);
      notes2.forEach(function(note) {
        let noteDuration = note.quantizedEndStep - note.quantizedStartStep;
        playSynth2(note.pitch);

        let r = Math.random();
        if (r > 0.8) {
          synthDrum.volume.value = -11;
          synthDrum.triggerAttackRelease("C2", "8n");
        }

      });
      let r = Math.random();
      if (r > 0.9) {
        synthDrum.volume.value = -11;
        synthDrum.triggerAttackRelease("A1", "8n");
      }
    }
    sequenceIndex = currSequenceIndex;
    stepIndex = currStepIndex;
  }
}

export {startSequence, endSequence, setMood, setIntensity}
