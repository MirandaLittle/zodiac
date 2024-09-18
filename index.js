// Ignore this for now
const randomPersonData = require("./data.js")['randomPersonData'];
console.log(randomPersonData[0]);
// Use this function as you want.
function getCurrentDate() {
  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  var rawDate = Date.now()
  return rawDate + '-' + date;
};

//current date - birth date, reassign age property
const currentDate = getCurrentDate();
const currentDateSplit = currentDate.split("-");
const currentDateDMY = currentDateSplit[1];

// massage Date 

const massageDate = date => {
  const dateSplit = date.split("/")
  const year = Number(dateSplit[2]);
  const month = Number(dateSplit[1]);
  const day = Number(dateSplit[0]);
  const newDate = { day: day, month: month, year: year };
  return newDate
}

const currentDateMassaged = massageDate(currentDateDMY);

// transform age to current age 

const updateAge = person => {
  const dateOfBirthMatch = person.birthday.dmy;
  const massagedBirthdayMatch = massageDate(dateOfBirthMatch);
  let age = currentDateMassaged.year - massagedBirthdayMatch.year;
  if (currentDateMassaged.month < massagedBirthdayMatch.month) {
    age = age - 1;
    person.age = age
  } if (currentDateMassaged.month === massagedBirthdayMatch.month && currentDateMassaged.day < massagedBirthdayMatch.day) {
    age = age - 1
    person.age = age;
  } else
    person.age = age;
  return person
};


const birthdayCandidate = "29/08/1987";
const zodiacArray = ["Aries", "Taurus", "Gemini", "Cancer,", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const fire = ["Aries", "Leo", "Sagittarius"];
const earth = ["Taurus", "Virgo", "Capricorn"];
const air = ["Gemini", "Libra", "Aquarius"];
const water = ["Cancer", "Scorpio", "Pisces"];
let matches = [];
let zodiac = "";
let element = "";

//findMatches function

const findMatches = (potentialMatches, candidateBirthday) => {
  const matches = [];
  potentialMatches.forEach(person => {

    const birthdayCandidate = massageDate(candidateBirthday);
    const birthdayMatch = massageDate(person.birthday.dmy);

    const determineZodiac = date => {
      if ((date.month === 3 && date.day >= 21) || (date.month === 4 && date.day < 21)) {
        zodiac = zodiacArray[0];
      } else if ((date.month === 4 && date.day >= 21) || (date.month === 5 && date.day < 22)) {
        zodiac = zodiacArray[1];
      } else if ((date.month === 5 && date.day >= 22) || (date.month === 6 && date.day < 22)) {
        zodiac = zodiacArray[2];
      } else if ((date.month === 6 && date.day >= 22) || (date.month === 7 && date.day < 24)) {
        zodiac = zodiacArray[3];
      } else if ((date.month === 7 && date.day >= 24) || (date.month === 8 && date.day < 24)) {
        zodiac = zodiacArray[4];
      } else if ((date.month === 8 && date.day >= 24) || (date.month === 9 && date.day < 24)) {
        zodiac = zodiacArray[5];
      } else if ((date.month === 9 && date.day >= 24) || (date.month === 10 && date.day < 24)) {
        zodiac = zodiacArray[6];
      } else if ((date.month === 10 && date.day >= 24) || (date.month === 11 && date.day < 23)) {
        zodiac = zodiacArray[7];
      } else if ((date.month === 11 && date.day >= 23) || (date.month === 12 && date.day < 22)) {
        zodiac = zodiacArray[8];
      } else if ((date.month === 12 && date.day >= 22) || (date.month === 1 && date.day < 21)) {
        zodiac = zodiacArray[9];
      } else if ((date.month === 1 && date.day >= 21) || (date.month === 2 && date.day < 20)) {
        zodiac = zodiacArray[10];
      } else if ((date.month === 2 && date.day >= 20) || (date.month === 3 && date.day < 21)) {
        zodiac = zodiacArray[11];
      } return zodiac
    };

    const zodiacMatch = determineZodiac(birthdayMatch);
    const zodiacCandidate = determineZodiac(birthdayCandidate);
    // console.log(zodiacMatch);
    // console.log("zodiac candidate:" + zodiacCandidate);

    const determineElement = zodiac => {
      if (fire.includes(zodiac)) {
        element = "Fire";
      } if (earth.includes(zodiac)) {
        element = "Earth";
      } if (air.includes(zodiac)) {
        element = "Air";
      } if (water.includes(zodiac)) {
        element = "Water";
      } return element
    }

    const elementMatch = determineElement(zodiacMatch);
    const elementCandidate = determineElement(zodiacCandidate);
    // console.log(elementMatch);
    // console.log("element candidate " + elementCandidate);

    // determine matches
    // compare element of candidate with elements of randomPersons

    const determineMatch = (elementCandidate, elementMatch) => {
      if ((elementCandidate === "Fire") && (elementMatch === "Fire" || "Air")) {
        matches.push({ "first_name": person.name, "last_name": person.surname, "zodiac": zodiacMatch, "age": person.age });
      } else if ((elementCandidate === "Earth") && (elementMatch === "Earth" || "Water")) {
        matches.push({ "first_name": person.name, "last_name": person.surname, "zodiac": zodiacMatch, "age": person.age });
      } else if ((elementCandidate === "Air") && (elementMatch === "Air" || "Fire")) {
        matches.push({ "first_name": person.name, "last_name": person.surname, "zodiac": zodiacMatch, "age": person.age });
      } else if ((elementCandidate === "Water") && (elementMatch === "Earth" || "Water")) {
        matches.push({ "first_name": person.name, "last_name": person.surname, "zodiac": zodiacMatch, "age": person.age });
      } return matches
    };
    determineMatch(elementCandidate, elementMatch);

  });

  return matches;

};

const birthdayCandidateMassaged = massageDate(birthdayCandidate);
const determineAge = birthday => {
  let age = currentDateMassaged.year - birthday.year;
  if (currentDateMassaged.month < birthday.month) {
    age = age - 1;

  } else if (currentDateMassaged.month === birthday.month && currentDateMassaged.day < birthday.day) {
    age = age - 1

  } return age
};

const personsMassaged = randomPersonData.map(updateAge);
// console.log(personsMassaged);
// console.log(matches);
const matchesUnsorted = findMatches(personsMassaged, birthdayCandidate);
// console.log("Matchesunsorted " + matchesUnsorted)
const candidateAge = determineAge(birthdayCandidateMassaged);


// compare age difference function 

const compareAgeDifference = (matchA, matchB) => {
  let ageDifferenceMatchA = candidateAge - matchA.age;
  let ageDifferenceMatchB = candidateAge - matchB.age;
  if (ageDifferenceMatchA < 0) {
    ageDifferenceMatchA = ageDifferenceMatchA * -1;
  } if (ageDifferenceMatchB < 0) {
    ageDifferenceMatchB = ageDifferenceMatchB * -1;
  } if (ageDifferenceMatchA > ageDifferenceMatchB) {
    return 1
  } if (ageDifferenceMatchA < ageDifferenceMatchB) {
    return -1
  }
  return 0
};

// const matchA = { "name": "Jake", "age": 33 };
// const matchB = { "name": "Vanessa", "age": 42 };
// console.log(compareAgeDifference(matchA, matchB)); // -1 matchA difference is smaller

// console.log(matchesUnsorted.sort(compareAgeDifference));
const matchesSorted = matchesUnsorted.sort(compareAgeDifference)


const first20Matches = matchesSorted.slice(0, 20);

const printPerson = person => {
  console.log(`Name: ${person.first_name} ${person.last_name}`);
  console.log(`Zodiac: ${person.zodiac}`);
  console.log(`Age: ${person.age}`);
  console.log("-------------------------------------------");


};

first20Matches.forEach(printPerson);





// "find matches" function that takes randomPersonsData and the birthday of the candidate
// determine zodiac of candidate
// determine the zodiac sign for every person in randomPersonData
//    birth month = certain zodiac sign
//    use split to split("/"), index and convert to number 
//    compare zodiac of candidate with potential matches 
//    use oprah info, use .filter
//    if zodiac is a match compare ages
// sort potential maches on smallest age difference
//    use .sort
// seperate displayMatches function: print max 20 potential matches, name, zodiac and calculated current age
//    use slice to get first 20

