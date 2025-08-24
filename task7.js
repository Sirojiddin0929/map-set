function pepeandlolo(obj){
    if(obj[n]!==undefined){
        delete obj[n]
        
    }
    return obj
}
let obj={}
let a=+prompt("Nechta elementdan iborat")
for(let i=0; i<a; i++){
    let ism=prompt(`${i+1}-nomini kiriting`)
    let age=+prompt(`${ism}`)
    obj[ism]=age

}
let n=prompt("Qaysi nomni o'chirasiz")
alert(pepeandlolo(obj))