
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let totale = document.getElementById('totale');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp ;
 function getTotale() {

    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        totale.innerHTML=result;
        totale.style.backgroundColor="green"

}else{
    totale.innerHTML='00';
    totale.style.backgroundColor="#b80f0f"
}
    
}

let dataPro;
if(localStorage.product != null){
 dataPro = JSON.parse(localStorage.product)
}else{
    dataPro=[];
}


 function create(){  
 let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totale:totale.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value !='' && price.value != '' && category.value != '' && count.value<100){
        if(mood === 'create')    
    if(newPro.count>1){
        for(let i=0 ; i<newPro.count ; i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
else{
    
    dataPro[tmp] = newPro ;
   mood = 'create';
   
   count.style.display='block'
}
    clearData()
    }

    localStorage.setItem('product' , JSON.stringify(dataPro) )
    
    showData();
 }
   
 function clearData(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        totale.innerHTML='';
        count.value='';
        category.value='';

}


//read
 function showData(){
    getTotale();
    let table = '';
    for(let i=0 ; i<dataPro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].totale}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
    
       </tr>`
    }

    document.getElementById("tbody").innerHTML=table;
    let bntDelete = document.getElementById("deleteAll")
    if(dataPro.length>0){
        bntDelete.innerHTML=`
        <button onclick='deleteAll()'>Delete All (${dataPro.length})</button>`
        bntDelete.style.margin="10px 0"
    }else{
        bntDelete.innerHTML=''
    }
}
 showData();


function deleteData(i){
dataPro.splice(i,1);
localStorage.product= JSON.stringify(dataPro)
showData();

}


function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

function updateData(i){
    tmp = i ;
    count.style.display="none";
    
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    getTotale();
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount; 
    category.value = dataPro[i].category;
    // submit.innerHTML = 'update';
    mood = 'update'
    scroll({
        top : 0,
        behavior:'smooth'
    })

}


//SEARCH
let searchMood='title';

function getSearchMood(id){

let search = document.getElementById('Search');

    if(id == 'searchTitle'){

    searchMood ='title';
    search.Placeholder = 'Search by title'
   
    }else{

    searchMood='category';
    search.Placeholder ='Search by category'
}

 
search.focus();
search.value = '';
showData();
}


function searchData(value){
let table = '';
for(let i=0 ; i<dataPro.length ; i++){
    if(searchMood == 'title'){
      
            if(dataPro[i].title.includes(value)){             
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].totale}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
       </tr>`  
                }
            }else{
             
                    if(dataPro[i].category.includes(value)){             
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].totale}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
               </tr>`  
            }

            }}
            document.getElementById("tbody").innerHTML=table; 
   
        }