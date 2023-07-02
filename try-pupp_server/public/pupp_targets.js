import puppeteer from "puppeteer";
import * as fs from "fs";
import { error } from "console";

async function appendObjectToFile(obj) {
  return new Promise((resolve, reject) => {
    let myObj = fs.readFileSync('../data.json')
    let data = JSON.parse(myObj)
    data.push({obj,...resolve.body})
    fs.writeFileSync("../data.json", JSON.stringify(data));
  })
}

function pupp(obj) {
  if (obj?.path) {
    (async () => {
      try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        const url = obj.path;

        await page.goto(url);

        const pageTitle = await page.title();

        await page.waitForTimeout(1000);

        if (pageTitle === obj.desiredTitle) {
          obj.verified = true;
          console.log(obj);
        } else {
          obj.verified = false;
          console.log(obj);
          
        }
        await page.close();
        await browser.close();
        await page.waitForTimeout(2000);
        appendObjectToFile(obj)
        // let data = JSON.parse(...obj)
        // data.push({...obj})
        
        // fs.appendFile('../data.json',JSON.stringify(obj,null,2))
      } catch (error) {
        error;
      }
    })();
  }

  // console.log("наш путь: " + obj?.path);
  // console.log("нужно сверить: " + obj?.desiredTitle);
}

// import mylist from 'printData.js';

// async function findItemObject(obj) {
//   await myFunc(obj);
//   writetoJSON(obj)
//   // console.dir(obj)
// }
// function writetoJSON(element){
//   fs.writeFileSync(
//     "../linkidinki.json",
//     JSON.stringify(element))
// }
// async function myFunc(obj) {
//   obj.forEach((element) => {

//     for (const key in element) {
//       if (key.startsWith("item") && typeof element[key] === "object") {
//         // console.log(element[key].desiredTitle)
//         let url = element[key].path;
//         let desiredTitle = element[key].desiredTitle;

//         // (async (element, url, desiredTitle) => {
//         //     const browser = await puppeteer.launch();
//         //     const page = await browser.newPage();
//         //     // const url = element.path;
//         //     // debugger
//         //     await page.goto(url);

//         //     const pageTitle = await page.title();
//         //     if (pageTitle === desiredTitle) {
//         //       element[key].verified = true;
//         //     } else {
//         //       element[key].verified = false;
//         //     }
//         //     await page.waitForTimeout(3000);
//         //     await page.close();

//         //     await browser.close();
//         //     fs.writeFilesSync(
//         //       "../links.json",
//         //       JSON.stringify(element, null, 2)
//         //     );
//         //   }
//         // )();

//         //  for (let keys in element[key]){
//         //   console.log(keys["path"]);
//         //  }
//         //   for (const obj of objects){
//       }
//     }
//   });
//   // for (const key in obj){
//   //     console.dir(key);
//   // }
// }

(async () => {
  try {
    const fileData = fs.readFileSync("../data.json");
    const objects = JSON.parse(fileData);
    console.log(objects.length);
    for (let i = 0; i <= 5; i++) {
      setTimeout(() => pupp(objects[i]), 3000 * (i + 1));
    }

    // await findItemObject(objects);

    console.log("Перевірка завершена. Результати збережено в файлі links.json");
  } catch (error) {
    console.error("Сталася помилка:", error);
  }
})();
