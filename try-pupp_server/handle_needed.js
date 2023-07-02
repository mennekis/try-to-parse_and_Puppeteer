console.log("Goooo");

const notValidated = [];


function reciveArr(){
    fetch('../needed.js')
    .then((res)=> res.json())
    .then((resived)=>{
        getWrong(resived) 
    })
}
function getWrong(el){
    el.forEach(element => {
      if(element["verified"]===false){
        // notValidated.push(element)
        writeTofile(element)
      }
    });
    
}
// async function process(){
// await ;
// await writeTofile(notValidated)
// }

// reciveArr(getWrong)
// writeTofile(notValidated)


function writeTofile(elem){
    fetch("http://localhost:443/write",{
        method: "post",
        body: JSON.stringify(elem),
        headers:{
            "content-type":"application/json",
        },
    })
}

const writeButton = document.querySelector('#write');
writeButton.addEventListener('click',function(e){
    e.preventDefault()
    reciveArr(getWrong)
})