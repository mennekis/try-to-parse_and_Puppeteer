const creatButton = document.querySelector(".create-button");

const arrayOfObj = [];

function getData() {
  fetch("http://localhost:443/data")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.length);
      data.forEach((element) => {
        arrayOfObj.push(element);
      });
    });
}

async function sendObjectToServer(elem) {
  fetch("http://localhost:443/data", {
    method: "post",
    body: JSON.stringify(elem),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((link) => {
      console.log(link);
    });
}

getData();
creatButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(arrayOfObj.length);

  for (let i = 0; i <= arrayOfObj.length; i++) {
    try {setTimeout(sendObjectToServer(arrayOfObj[i]),100)}
    catch (error) {
        console.log("Mistake of data", error);
    } finally{
        continue
    }
    // console.log('added: ' + i);
  }
  // console.log(arrayOfObj);
  //    for(let obj of arrayOfObj){
  //     for (let items in obj){
  //         if( obj[items]==="object"){
  //             // try  {sendObjectToServer(obj[items])}
  //             // catch {console.log(error)}
  //             // finally{ continue}
  //         }
  //     }
  //    }
});
