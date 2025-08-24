function forgive(employees){
    if(employees.length===0){
        return "Xatolik"

    }
    let sum=0
    let count=0
    let sum1=0
    let count1=0
    for(let i of employees){
        if(i.department==="HR"){
            sum+=i.salary
            count++

        }
        if(i.department==="IT"){
            sum1+=i.salary
            count1++

        }
    }
    
    if(sum/count>sum1/count1){
        return {department:"HR",average: parseInt(sum/count)}

    }
    if(sum/count<sum1/count1){
        return {department:"IT",average: parseInt(sum1/count1)}

    }


}
const employees = new Set([
  { name: "John", salary: 50000, department: "IT" },
  { name: "Jane", salary: 60000, department: "HR" },
  { name: "Bob", salary: 55000, department: "IT" },
  { name: "Sophie", salary: 75000, department: "HR" },
  { name: "Mike", salary: 65000, department: "IT" },
  { name: "Emily", salary: 80000, department: "HR" },
  { name: "David", salary: 70000, department: "IT" },
])
alert(forgive(employees))