let generateMelodies = (MOOD) => {
  console.log("generating melodies...")

  let seeds = {}
  let array = [8, 8, 6, 6]

  array.forEach((multiplier, index) => {
    seeds[`seed${index}`] = Math.floor(Math.random() * multiplier)
  })

  let MELODY1 = {
    notes: [{
        pitch: MOOD.pitches1[Math.floor(Math.random() * MOOD.pitches1.length - 1)],
        quantizedStartStep: 0,
        quantizedEndStep: seeds.seed0
      },
      {
        pitch: MOOD.pitches1[Math.floor(Math.random() * MOOD.pitches1.length - 1)],
        quantizedStartStep: seeds.seed0,
        quantizedEndStep: seeds.seed0 + seeds.seed1
      },
      {
        pitch: MOOD.pitches1[Math.floor(Math.random() * MOOD.pitches1.length - 1)],
        quantizedStartStep: seeds.seed0 + seeds.seed1,
        quantizedEndStep: seeds.seed0 + seeds.seed1 + 8
      },

    ]
  }

  let MELODY2 = {
    notes: [{
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 0,
        quantizedEndStep: 1
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 1,
        quantizedEndStep: 2
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 2,
        quantizedEndStep: 3
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 3,
        quantizedEndStep: 4
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 4,
        quantizedEndStep: 5
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 5,
        quantizedEndStep: 6
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 6,
        quantizedEndStep: 7
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 7,
        quantizedEndStep: 8
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 8,
        quantizedEndStep: 9
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 9,
        quantizedEndStep: 10
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 10,
        quantizedEndStep: 11
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 11,
        quantizedEndStep: 12
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 12,
        quantizedEndStep: 13
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 13,
        quantizedEndStep: 14
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 14,
        quantizedEndStep: 15
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 15,
        quantizedEndStep: 16
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 16,
        quantizedEndStep: 17
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 17,
        quantizedEndStep: 18
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 18,
        quantizedEndStep: 19
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 19,
        quantizedEndStep: 20
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 20,
        quantizedEndStep: 21
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 21,
        quantizedEndStep: 22
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 22,
        quantizedEndStep: 23
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 23,
        quantizedEndStep: 24
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 24,
        quantizedEndStep: 25
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 25,
        quantizedEndStep: 26
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 26,
        quantizedEndStep: 27
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 27,
        quantizedEndStep: 28
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 28,
        quantizedEndStep: 29
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 29,
        quantizedEndStep: 30
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 30,
        quantizedEndStep: 31
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 31,
        quantizedEndStep: 32
      }
    ]
  }

  let MELODY3 = {
    notes: [{
        pitch: MOOD.pitches1[Math.floor(Math.random() * MOOD.pitches1.length - 1)],
        quantizedStartStep: seeds.seed2,
        quantizedEndStep: seeds.seed2 + seeds.seed3
      },
      {
        pitch: MOOD.pitches1[Math.floor(Math.random() * MOOD.pitches1.length - 1)],
        quantizedStartStep: seeds.seed2 + seeds.seed3,
        quantizedEndStep: seeds.seed2 + seeds.seed3 + 16
      },
    ]
  }

  let MELODY4 = {
    notes: [{
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 0,
        quantizedEndStep: 2
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 2,
        quantizedEndStep: 4
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 4,
        quantizedEndStep: 6
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 6,
        quantizedEndStep: 8
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 8,
        quantizedEndStep: 10
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 10,
        quantizedEndStep: 12
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 12,
        quantizedEndStep: 14
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 14,
        quantizedEndStep: 16
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 16,
        quantizedEndStep: 18
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 18,
        quantizedEndStep: 20
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 20,
        quantizedEndStep: 22
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 22,
        quantizedEndStep: 24
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 24,
        quantizedEndStep: 26
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 26,
        quantizedEndStep: 28
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 28,
        quantizedEndStep: 30
      },
      {
        pitch: MOOD.pitches2[Math.floor(Math.random() * MOOD.pitches2.length - 1)],
        quantizedStartStep: 30,
        quantizedEndStep: 32
      }
    ]
  }

  return {
    MELODY1: MELODY1,
    MELODY2: MELODY2,
    MELODY3: MELODY3,
    MELODY4: MELODY4
  }
}

export default generateMelodies
