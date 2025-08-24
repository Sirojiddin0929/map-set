function husbandWife(rounds) {
    let myWins = 0
    let spouseWins = 0

    for (let [round, scores] of rounds) {
        if (scores.me > scores.spouse) {
            myWins++;
        } else if (scores.spouse > scores.me) {
            spouseWins++;
        }
        
    }

    if (myWins > spouseWins) {
        return "MEN!"
    } else if (spouseWins > myWins) {
        return "TURMUSH O'RTOG'IM!"
    } else {
        return "HECH KIM!"
    }
}
let map1 = new Map([
    ["round1", { me: 10, spouse: 5 }],
    ["round2", { me: 5, spouse: 20 }],
    ["round3", { me: 10, spouse: 10 }],
])

alert(husbandWife(map1))
