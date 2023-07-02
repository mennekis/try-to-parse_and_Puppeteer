// import fs from "./node_modules/fs";

// const data = {
//     path: examplePath,
//     title: exampleTitle,
//     id: id
//   };



function fetchHTML(url) {
  console.log(" fetch");
    return fetch(url) // Загружаем HTML-файл
      .then(response => response.text()) // Извлекаем текст ответа
      .catch(error => {
        console.log("Ошибка при загрузке HTML:", error);
        throw error;
      });
  }
  function MyObject(path, desiredTitle) {
    this.path = path;
    this.desiredTitle = desiredTitle;
  }
  
  function parseTable(html) {
    console.log("PArse table");
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const table = doc.querySelector(".waffle");
    const rows = doc.querySelectorAll("tr");
  
    const needToCheck = [];
  
    if (table) {
      const rows = table.querySelectorAll("tr");
  
      rows.forEach(row => {
        const ourUrl = row.querySelector(".s2");
        const tdElements = row.querySelectorAll("td");
  
        if (tdElements.length > 0) {
          const lasteElement = tdElements[tdElements.length - 2];
          const desiredTitle = lasteElement.textContent;
          if (desiredTitle) {
            if (ourUrl !== null) {
              const path = ourUrl.textContent;
              if (path && path.match("^https:")) {
                const newObj = new MyObject(path, desiredTitle);
                needToCheck.push(newObj);
              }
            }
          }
        }
      });
    } else {
      console.log("Таблица не найдена.");
    }
  
    return needToCheck;
  }
  
  async function getOurArr() {
    console.log('get arr');
    const url = "../Page Titles Country Code Recommendations/AU.html"; // Замените на путь к вашему HTML-файлу
    try {
      const html = await fetchHTML(url);
      const needToCheck = parseTable(html);
      return needToCheck;
    } catch (error) {
      console.log("Ошибка:", error);
      return [];
    }
  }

  async function checkingObj(item){
    await new Promise(res=>setTimeout(res, 100));

    // const jsonData = JSON.stringify(item);

    // fs.writeFile('output.json', jsonData, 'utf8', (err) => {
    //     if (err) {
    //       console.log('Ошибка при записи файла:', err);
    //     } else {
    //       console.log('Данные успешно записаны в файл output.json');
    //     }
    //   });
    console.log(`
        my path:${item.path},
         and decr.:${item.desiredTitle}`)
  }
  
 export async function processData() {
  
    const dataArr = await getOurArr();
    
  

    
    for (let i = 0; i<dataArr.length;i++){
      const item = dataArr[i];
      return {...await checkingObj(item)};

    }
  }



