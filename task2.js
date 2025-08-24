const students = new Set([
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob", scores: [75, 80, 85] },
  { name: "Charlie", scores: [90, 95, 85] },
  { name: "Jack", scores: [100, 100, 100] }
]);
let arr=[]

for(let i of students){
    arr.push({ism:i.name, average:(i.scores.reduce((a,b)=>(a+b),0))/i.scores.length})
}
let lst=[]
for(let i of arr){
    lst.push(i.average)

}
let lst1=[]
for(let i of arr){
    if(i.average===Math.max(...lst)){
        lst1.push(i)
    }

}
console.log(arr)