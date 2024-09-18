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

//transform outdated age to current age

//code thoughts:
//current date - birth date, reassign age property
const currentDate = getCurrentDate();
const currentDateSplit = currentDate.split("-");
const currentDateDMY = currentDateSplit[1];

const massageDate = date => {
  const dateSplit = date.split("/")
  const year = Number(dateSplit[2]);
  const month = Number(dateSplit[1]);
  const day = Number(dateSplit[0]);
  const newDate = { day: day, month: month, year: year };
  return newDate
}

const currentDateMassaged = massageDate(currentDateDMY);

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

console.log(randomPersonData[0]);
const personsMassaged = randomPersonData.map(updateAge);
console.log(personsMassaged[0]);


//findMatches function

const birthdayCandidate = "29/08/1987";
const zodiacArray = ["Aries", "Taurus", "Gemini", "Cancer,", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const fire = { fire: ["Aries", "Leo", "Sagittarius"] };
const earth = { earth: ["Taurus", "Virgo", "Capricorn"] };
const air = { air: ["Gemini", "Libra", "Aquarius"] };
const water = { water: ["Cancer", "Scorpio", "Pisces"] };
const matchList = []
const findMatches = (potentialMatches, candidateBirthday) => potentialMatches.forEach(person => {
  // determine zodiac
  const birthdayCandidate = massageDate(candidateBirthday);
  const birthdayMatch = massageDate(person.birthday.dmy);

  const determineZodiac = date => {
    if ((date.month === 3 && date.day >= 21) || (date.month === 4 && date.day < 21)) {
      const zodiac = zodiacArray[0];
    } if ((date.month === 4 && date.day >= 21) || (date.month === 5 && date.day < 22)) {
      const zodiac = zodiacArray[1];
    } if ((date.month === 5 && date.day >= 22) || (date.month === 6 && date.day < 22)) {
      const zodiac = zodiacArray[2];
    } if ((date.month === 6 && date.day >= 22) || (date.month === 7 && date.day < 24)) {
      const zodiac = zodiacArray[3];
    } if ((date.month === 7 && date.day >= 24) || (date.month === 8 && date.day < 24)) {
      const zodiac = zodiacArray[4];
    } if ((date.month === 8 && date.day >= 24) || (date.month === 9 && date.day < 24)) {
      const zodiac = zodiacArray[5];
    } if ((date.month === 9 && date.day >= 24) || (date.month === 10 && date.day < 24)) {
      const zodiac = zodiacArray[6];
    } if ((date.month === 10 && date.day >= 24) || (date.month === 11 && date.day < 23)) {
      const zodiac = zodiacArray[7];
    } if ((date.month === 11 && date.day >= 23) || (date.month === 12 && date.day < 22)) {
      const zodiac = zodiacArray[8];
    } if ((date.month === 12 && date.day >= 22) || (date.month === 1 && date.day < 21)) {
      const zodiac = zodiacArray[9];
    } if ((date.month === 1 && date.day >= 21) || (date.month === 2 && date.day < 20)) {
      const zodiac = zodiacArray[10];
    } if ((date.month === 2 && date.day >= 20) || (date.month === 3 && date.day < 21)) {
      const zodiac = zodiacArray[11];
    } return zodiac
  }

  const zodiacMatch = determineZodiac(birthdayMatch);
  const zodiacCandidate = determineZodiac(birthdayCandidate);
  const determineElement = zodiac => {
    // determine fire,earth,air or water
    if (zodiac in fire) {
      const element = "Fire";
    } if (zodiac in earth) {
      const element = "Earth";
    } if (zodiac in air) {
      const element = "Air";
    } if (zodiac in water) {
      const element = "Water";
      console.log(element);
    }
  }
  const elementMatch = determineElement(zodiacMatch);
  const elementCandidate = determineElement(zodiacCandidate);

  const determineMatch = (elementCandidate, elementMatch) => {
    if (elementCandidate === "Fire" && elementMatch === "Fire" || "Air") {
      matchList.push(person);
    } if (elementCandidate === "Earth" && elementMatch === "Fire" || "Air") {
      matchList.push(person);

    }

    // determine matches
    // compare element of candidate with elements of randomPersons



  });

findMatches(randomPersonData, birthdayCandidate);









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

