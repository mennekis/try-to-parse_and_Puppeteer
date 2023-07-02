const express = require('express');
const cors = require('cors');
const fs = require('fs');


const app = express()
let port = 5000;

app.use(cors());

app.use(express.json({limit: '60mb'}));

// let links = [
//     {
//         path:"Exemple path",
//         Title:"Example title"
//     },
//     {
//         path:"Exemple path-2",
//         Title:"Example title-2"
//     }
// ]
app.get('/links',(req,res)=>{
    let links = fs.readFileSync('links.json')
    return res.send(links)
})


app.post('/links',(req,res)=>{
    console.log(req.body);
    let links = fs.readFileSync('links.json')
    let data = JSON.parse(links)
console.log(data)
    let id;
    if(data.length === 0){
        id = 1;
    } else {
        id = data[data.length-1].id + 1;
    }

    data.push({
        id, 
        ...req.body});
        fs.writeFileSync('links.json',JSON.stringify(data))
        return res.send({message:"create data"})
    
})

app.listen(port, () => {
    console.log(`Сервер Express запущен на порту ${port}`);
  });