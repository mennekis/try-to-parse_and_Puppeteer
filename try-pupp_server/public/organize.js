import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { error } from 'console';


const app = express()
let port = 443;

app.use(cors());

app.use(express.json({limit: '50mb'}));

app.get('/data',(req,res)=>{
    let lines = fs.readFileSync('../linkidinki.json')
    return res.send(lines)
})

app.post('/data',(req,res)=>{
    // try{
let lines = fs.readFileSync('../data.json')
let data = JSON.parse(lines)

data.push({...req.body})
fs.writeFileSync('../data.json',JSON.stringify(data))
return res.send({message: "rewrite data"})
//     } catch(e){
// console.error(error);
//     } 
})

app.post('/write',(req,res)=>{
    let struct = fs.readFileSync('../needToCheck.json')
    let data = JSON.parse(struct)
// console.log(req);
    data.push({...req.body})
    fs.writeFileSync('../needToCheck.json',JSON.stringify(data))
    return res.send({message:"Data was written"})
})



app.listen(port, ()=>{
    console.log('Сервер запущен на порту : ' + port);
});