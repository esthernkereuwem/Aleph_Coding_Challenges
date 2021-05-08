const _ = require('lodash');
const gcards = []
for(let k = 1; k < 8; k++) {
  gcards.push(Math.pow(2, k-1))
}

const sums = {};
let modeOfSums;
const maxReps = 1000;

for(let reps=1; reps < maxReps; reps++) {
  let cards = gcards;
  let sum = 0;

  while(sum <= 124) {
    const randIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randIndex];
    cards = cards.filter(num => num !== card);
    

    sum += card;
  }

  if(sums[sum]) {
    sums[sum]++
  } else {
    sums[sum] = 1
  }

  if(_.size(sums) === 1 || sums[sum] > sums[modeOfSums]) {
    modeOfSums = sum;
  }
}

console.log("Sums >>",sums);
console.log("Most probable sum >> ",modeOfSums);
