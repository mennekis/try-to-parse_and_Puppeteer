const printButton = document.querySelector(".print-data");

function getArr(prom) {
  prom.forEach((element) => {
    
   console.log(element);

  });
}
const url = "http://localhost:5000/links"
function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((arrayOfLinks) => {
      getArr(arrayOfLinks);

      // console.dir(arrayOfLinks);

      // console.log(Array.isArray(arrayOfLinks));

      //    let ourDiv = document.querySelector('.list-users');
    });
}

printButton.addEventListener("click", function (e) {
  e.preventDefault();
  getData();

  // mylist.forEach(el=>console.log(el))
});
// getData()
// console.log(mylist);
// export default mylist;
