// import { json } from "express";

// import { response } from "express";

// import { response } from "express";

let createButton = document.querySelector(".create");

const myData = {};

function fetchHTML(url) {
  return fetch(url) // загружаем HTML-файл
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
function MyObject(path, desiredTitle) {
  this.path = path;
  this.desiredTitle = desiredTitle;
}

function parseTable(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const table = doc.querySelector(".waffle");

  const needToCheck = [];

  if (table) {
    const rows = table.querySelectorAll("tr");

    rows.forEach((item, index) => {
      const ourUrl = item.querySelector(".s2");
      const tdElements = item.querySelectorAll("td");
      if (tdElements.length > 0) {
        const lasteElement = tdElements[tdElements.length - 2];
        const desiredTitle = lasteElement.textContent;
        if (desiredTitle) {
          if (ourUrl !== null) {
            const path = ourUrl.textContent;
            if (path && path.match("^https:")) {
              const newObj = new MyObject(path, desiredTitle);
              myData[`item${index - 1}`] = newObj;
            }
          }
        }
      }
    });
  } else {
    console.log("Таблица не найдена.");
  }
  console.log(needToCheck);
  return needToCheck;
}

async function getOurArr() {
  const url = "../Page Titles Country Code Recommendations/AU.html";
  try {
    const html = await fetchHTML(url);
    const needToCheck = parseTable(html);
    return needToCheck;
  } catch (error) {
    console.log("Mistake of parsing", error);
  }
}

async function getOurArr() {
  const url = "../Page Titles Country Code Recommendations/SG.html";
  try {
    const html = await fetchHTML(url);
    const needToCheck = parseTable(html);
  } catch (error) {
    console.log("Mistake of parsing", error);
  }
}
async function sendObjectToServer() {
  fetch("http://localhost:5000/links", {
    method: "post",
    body: JSON.stringify(myData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((link) => {
    //   console.log(link);
    });
}

createButton.addEventListener("click", async function (e) {
  e.preventDefault();
  await getOurArr();
  //   console.log(myData);

  await sendObjectToServer();
});
