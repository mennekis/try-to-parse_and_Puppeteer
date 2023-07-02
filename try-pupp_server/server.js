const express = require('express');
const cors = require('cors');
const fs = require('fs');

// const puppeteer = require('puppeteer');

const app = express();
let port = 3000;

app.use(cors());

app.use(express.json());

// let users = [{name:'User 1', age: 30},
// {name:'User 2', age: 40},
// {name:'User 3', age: 50}]

app.get('/users',(req,res)=>{
   let users = fs.readFileSync('user.json')
  
  return res.send(users)  
})

app.post('/users',(req,res)=>{
 
    let users = fs.readFileSync('user.json')
    let data = JSON.parse(users)
    let id;
    if(data.length === 0){
      id = 1;  
    } else{
        id = data[data.length-1].id + 1;
    }
  
  
    data.push({
        id,
        ...req.body});
    fs.writeFileSync('user.json',JSON.stringify(data))
    return res.send({message:'add user'})
});

app.delete('/users/:id', (req,res)=>{
    console.log(req.params['id']);
    const id = +req.params['id'];

    
    let data = fs.readFileSync('user.json')
    let users = JSON.parse(data)
    const index = users.findIndex(user => user.id ===id);
    if (index !== -1){
        users.splice(index,1);
        fs.writeFileSync('user.json',JSON.stringify(users));
        return res.send({})
    }
    else{
       return res.status(400).send(`Suck suck suck ${id}`) 
    }
})

// Маршрут для обработки POST-запроса с данными для Puppeteer
// app.post('/run-puppeteer', async (req, res) => {
//   const { data } = req.body;

//   try {
//     // Здесь выполняйте ваш код с использованием Puppeteer и переданными данными
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Пример использования переданных данных
//     await page.goto(data.url);
//     const title = await page.title();

//     await browser.close();

//     res.json({ success: true, title });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

app.listen(port, () => {
  console.log(`Сервер Express запущен на порту ${port}`);
});