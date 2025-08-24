function hell(str){
    let a=str.split(' ')
    let b=''
    for(let i of a){
        
        if(i.length<=2){
            b+=i+' '
        }
        if(i.length>=3){
            b+=`${i[0]}${i.length-2}${i[i.length-1]}`+' '

        }
    }
    return b

}
let str=prompt("Stringni kirit")
alert(hell(str))