// import {processData} from "./parse.js";
let createButton = document.querySelector('.create');
import {getOurArr, parsetable, fetchHTML, processData} from "./parse-links.js"


function getData(){
fetch('http://localhost:5000/links')
.then (res=> res.json())
.then(links=>{
    // console.log({...links});


})
}
getData()

createButton.addEventListener('click',function(e){
    e.preventDefault();
    processData()


    fetch('http://localhost:5000/links',{
        method: 'post',
        body: JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then (res => res.json())
    .then (link=>{
        console.log({...link})
        getData();
    })
})
