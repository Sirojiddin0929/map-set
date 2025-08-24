function afterNYears(obj,n){
    
    for(let key in obj){
        obj[key]+=n
    }
    return obj

}
let obj={}
let a=+prompt("Nechta elementdan iborat")
for(let i=0; i<a; i++){
    let ism=prompt(`${i+1}-ismni kiriting`)
    let age=+prompt(`${ism}-yoshini kirit`)
    obj[ism]=age

}

let n=+prompt("Necha yildan song")
alert(afterNYears(obj,n))