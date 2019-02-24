const R = require('ramda');

const band = {
    name: 'K.M.F.D.M',
    members: {
        current: [
            {name: 'Sascha Konictzko', plays: ['vocals', 'synth', 'guitar', 'bass']},
            {name: 'Lucia Cifarelli', plays: ['vocals', 'synth']},
            {name: 'Jules Hodgson', plays: ['guitar', 'bass', 'synth']},
            {name: 'Steve While', plays: ['guitar']}
        ],
        past: [
            {name: 'Raymond Watts', plays: ['vocals', 'synth']},
            {name: 'En Esch', plays: ['vocals', 'drums', 'guitar', 'synth']},
            {name: 'Gunter', plays: ['guitar', 'synth']}
        ]
    }
};

/**
 * 1. Lowercase the name
 * 2. Omit the plays from the past
 * 3. Lowercase the current name
 */
 // makeLower :: s -> s
 const makeLower = s => s.toLowerCase();
 // lowerName :: obj a -> obj b
 const lowerName  = R.compose(makeLower, R.prop('name'));
 const name = R.lensProp('name');
 const pastMemebers = R.lensPath(['members', 'past']);
 const currentMemebers = R.lensPath(['members', 'current']);

 // Mapping over NAME lens, make string to lowercase
 const lowerBandName = R.over(
     name, makeLower
 );
 // Mapping over 'memebers.past' Lens, omit 'plays' prop
 const omitPastPlays = R.over(
     pastMemebers, R.map(R.omit(['plays']))
 );
 // Mapping over 'members.current' Lens, for each 'name' prop, make string to lowercase
 const lowerCurrentMemebersName = R.over(
     currentMemebers, R.map(
         R.over(name, makeLower)
     )
 );

 /**
  * 4. Create 'all' under members combine 'current' & 'past'
  * 5. Pick get name and to lowercase for 'members.all'
  */
 const allMemebers = R.lensPath(['members', 'all']);
 // lensConcat :: (Lens t, Lens s) -> a -> [b]
 const lensConcat = (targetLen, srcLen) => data =>
        R.over(targetLen, R.concat(R.view(srcLen, data)))(data);

// A set of tranforms over prop 'members.all'
// Set 'all' to []
// concat 'past' to 'all'
// concat 'current' to 'all'
// pick name and conver to lowercase
const createAllMembers = [
    R.over(allMemebers, R.map(lowerName)),
    lensConcat(allMemebers, currentMemebers),
    lensConcat(allMemebers, pastMemebers),
    R.set(allMemebers, [])
 ];

 const mods = [
    ...createAllMembers,
    lowerCurrentMemebersName,
    omitPastPlays,
    lowerBandName,
 ]
 const transform = R.compose(
    ...mods
 );
 const res = transform(band);
 console.log(JSON.stringify(res, null, 2));
 /**
  * {
  "name": "k.m.f.d.m",
  "members": {
    "current": [
      {
        "name": "sascha konictzko",
        "plays": [
          "vocals",
          "synth",
          "guitar",
          "bass"
        ]
      },
      {
        "name": "lucia cifarelli",
        "plays": [
          "vocals",
          "synth"
        ]
      },
      {
        "name": "jules hodgson",
        "plays": [
          "guitar",
          "bass",
          "synth"
        ]
      },
      {
        "name": "steve while",
        "plays": [
          "guitar"
        ]
      }
    ],
    "past": [
      {
        "name": "Raymond Watts"
      },
      {
        "name": "En Esch"
      },
      {
        "name": "Gunter"
      }
    ],
    "all": [
      "sascha konictzko",
      "lucia cifarelli",
      "jules hodgson",
      "steve while",
      "raymond watts",
      "en esch",
      "gunter"
    ]
  }
}
  */