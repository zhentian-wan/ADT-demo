const {log} = require('./lib/log');
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

// Lens takes a getter and setter
/*
const name = R.lens(R.prop('name'), R.assoc('name'));
log('view:', R.view(name, band)); // K.M.F.D.M
log('set:', R.set(name, 'MDFMK', band));
*/

/*
const name = R.lensProp('name');
const makeLower = a => a.toLowerCase();
log('over lensProp: ', R.over(name, makeLower, band)); // name: "k.m.f.d.m"
log('over compose: ', R.compose(R.view(name), R.over(name, makeLower))(band)); // name: "k.m.f.d.m"
*/
const name = R.lensProp('name');
const currentMemebers = R.lensPath(['members', 'current']);
//log('view path', R.view(currentMemebers, band))
const makeLower = a => a.toLowerCase();
// Use two lens together
const lowerName = R.over(name, makeLower);
const lowerMembers = R.over(currentMemebers, R.map(lowerName));
//console.log('new lower name', lowerMembers(band).members.current);

const plays = R.lensProp('plays');
const first = R.lensIndex(0);
const firstPlay = R.compose(
    plays, first
);
const firstCurrentMember = R.compose(
    currentMemebers, first
)
const rainbows = R.compose(
    firstCurrentMember, firstPlay
)
const getFistCurrentMember = R.compose(
    R.view(first),
    R.view(currentMemebers)
)
console.log(R.view(rainbows, band)) // 'vocals'
//console.log(getFistCurrentMember(band)) // { name: 'Sascha Konictzko', plays: [ 'vocals', 'synth', 'guitar', 'bass' ] }


