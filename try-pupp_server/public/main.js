let myForm = document.querySelector("#form-user");
let list = document.querySelector('.list-users'); 


function getUsers(){
    fetch('http://localhost:3000/users')
    .then (res => res.json())
    .then(users=> {
    
    console.log(users);
    let strMark = '';
    users.forEach((user) => {
        strMark +=`<div>
        <p>Name: ${user.name}</p>
        <p>Age: ${user.age}</p>
        <button data-id="${user.id}">Delete</button>
        <hr>
        </div>`;
    });
    list.innerHTML = strMark;
    list.addEventListener('click', nandleDelete);
    });
    
    
}

getUsers()

function nandleDelete(e){
console.dir(e.target);
if (e.target.tagName === 'BUTTON'){
    const id = e.target.getAttribute('data-id')
    const status = confirm("Delete item?")
    if(status){
        fetch(`http://localhost:3000/users/${id}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(()=>{
        'Удалили',
        getUsers();  
    })
} 
    }
   
}



myForm.addEventListener('submit',function(event){
    event.preventDefault();
   
    const elements = this.elements;

    fetch('http://localhost:3000/users', {
        method: 'post',
        body: JSON.stringify({
            name: elements['name'].value,
            age: elements['age'].value
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(user =>{
        console.log(user)
        getUsers();
    })
});