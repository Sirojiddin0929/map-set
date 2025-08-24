function mostSpokenLanguages(countries, n) {
  
  let arr = []
  for (let obj of countries) {
    for (let key in obj) {
      arr.push({ language: key, count: obj[key] })
    }
  }

  
  arr.sort((a, b) => b.count - a.count)


  return arr.slice(0, n)
}

let countries = [
  { Russian: 9 },
  { English: 91 },
  { French: 45 },
  { Spanish: 24 },
  { Portuguese: 9 },
  { Dutch: 8 },
  { German: 7 },
  { Arabic: 25 },
  { Chinese: 5 },
  { Swahili: 4 },
  { Serbian: 4 }
];

let n = +prompt("Nechta element top bo'lgan")
console.log(mostSpokenLanguages(countries, n))
