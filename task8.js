function nameScores(name, scores) {
    let sum = 0

    
    for (let char of name.toUpperCase()) {
        for (let [letter, value] of scores) {
            if (char === letter) {
                sum += value
            }
        }
    }

    if (sum <= 60) {
        return "Not too good"
    } else if (sum >= 61 && sum <= 300) {
        return "Pretty good"
    } else if (sum >= 301 && sum <= 599) {
        return "Very good"
    } else {
        return "The Best"
    }
}

const scores = new Set([
    ["A", 100], ["B", 14], ["C", 9], ["D", 28], ["E", 145],
    ["F", 12], ["G", 3], ["H", 10], ["I", 200], ["J", 100],
    ["K", 114], ["L", 100], ["M", 25], ["N", 450], ["O", 80],
    ["P", 2], ["Q", 12], ["R", 400], ["S", 113], ["T", 405],
    ["U", 11], ["V", 10], ["W", 10], ["X", 3], ["Y", 210],
    ["Z", 23],
])

let ism = prompt("Ismni kirit")
alert(nameScores(ism, scores))
