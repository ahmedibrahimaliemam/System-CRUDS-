let title=document.getElementById("title") ;
let price=document.getElementById("price") ;
let taxes=document.getElementById("taxes") ;
let ads=document.getElementById("ads") ;
let discount=document.getElementById("discount") ;
let total=document.getElementById("total") ;
let count=document.getElementById("count") ;
let category=document.getElementById("category") ;
let creat=document.getElementById("creat") ;
let search=document.getElementById("search") ;
let search_title=document.getElementById("search-title") ;
let search_category=document.getElementById("search-category") ;
let tbody=document.getElementById("tbody") ;
let all=document.getElementById("deletAll") ;
let temp ;
//define my functions 
let data;
(localStorage.getItem("product"))?data=JSON.parse(localStorage.getItem("product")): data=[] ;
    
function addData(){
let obj={
title:title.value.toLowerCase() ,
price:price.value ,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML ,
category:category.value.toLowerCase(),
count:count.value
} ;
if(title.value==""||price.value==""||taxes.value==""||ads.value==""||discount.value==""||category.value==""){
    window.alert("You Must Fill All Data!!") ;
}
else
{
if(creat.innerHTML==="Creat"){
if(obj.count>1){
for(let i=0 ; i<obj.count ; i++){
data.push(obj) ;
}
}
else{
data.push(obj) ;

}
}
else{
data[temp]=obj ;
creat.innerHTML="Creat" ;
count.style.display="block" ;       
}
}

    localStorage.setItem("product",JSON.stringify(data)) ;
    console.log(count.value) ;
    title.value="" ;
    price.value="" ;
    taxes.value="" ;
    ads.value="" ;
    count.value="" ;
    discount.value="" ;
    total.innerHTML="" ;
    category.value="" ;
    total.style.backgroundColor="red" ;
    tbody.innerHTML="" ;
    drawData() ;
    deleteAll() ;
    
   
}

//
creat.addEventListener("click",addData) ;
//calc total
function calcTotal(){
    total.innerHTML=(+price.value + +taxes.value + +ads.value) - +discount.value ;
    total.style.backgroundColor="green" ;
}
price.addEventListener("keyup",calcTotal) ;
taxes.addEventListener("keyup",calcTotal) ;
ads.addEventListener("keyup",calcTotal) ;
discount.addEventListener("keyup",calcTotal) ;
//function drawdata
function drawData(){
    for(let i=0 ;i<data.length ; i++){
        tbody.innerHTML+=`  <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="Updat(${i})">update</button></td>
        <td><button onclick="deleteProduct(${i})">delete</button></td>
    </tr>`
    }
}
window.onload=function(){
    drawData() ;
    deleteAll() ;
}

//delete function
function deleteProduct(id){
data.splice(id,1) ;
localStorage.product=JSON.stringify(data) ;
tbody.innerHTML="" ;
drawData() ;

}
//delete all 
function deleteAll(){
    if(data.length>0){
       all.style.display="block" ;
       document.getElementById("all").innerHTML=`Delete (${data.length}) product` ;
    }
    else{
        all.style.display="none" ;
    }
}
all.addEventListener("click",function(){
    data.splice(0)
    console.log(data) ;
    localStorage.product=JSON.stringify(data) ;
    title.value="" ;
    price.value="" ;
    taxes.value="" ;
    ads.value="" ;
    count.value="" ;
    discount.value="" ;
    total.innerHTML="" ;
    category.value="" ;
    total.style.backgroundColor="red" ;
    tbody.innerHTML="" ;
    drawData() ;
    all.style.display="none" ;
})
//updat function
function Updat(id){
    temp=id ;
    title.value=data[id].title;
    price.value=data[id].price;
    taxes.value=data[id].taxes;
    ads.value=data[id].ads;
    count.value=data[id].count;
    discount.value=data[id].discount;
    total.innerHTML=data[id].total;
    category.value=data[id].category;
    count.style.display="none" ;
    creat.innerHTML="Update" ;
    calcTotal() ;
    window.scrollTo({
        top:0 ,
        behavior:'smooth'
    })
}
//function to get type of search
function getTypeOfSearch(id){
    search.value="" ;
    tbody.innerHTML="" ;
    drawData() ;
if(id===search_title.id){
search.placeholder=search_title.id ;
}
else{
search.placeholder=search_category.id;
}
}
//function to search
function Search(){
    if(search.placeholder===search_title.id){
        tbody.innerHTML="" ;
      for(let i=0 ; i<data.length ; i++)
      {
        if(data[i].title.includes(search.value.toLowerCase())){
        tbody.innerHTML+=`  <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="Updat(${i})">update</button></td>
        <td><button onclick="deleteProduct(${i})">delete</button></td>
    </tr>`
}
}
}
    else{
        tbody.innerHTML="" ;
        for(let i=0 ; i<data.length ; i++){
          if(data[i].category.includes(search.value.toLowerCase())){
          tbody.innerHTML+=`  <tr>
          <td>${i}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button onclick="Updat(${i})">update</button></td>
          <td><button onclick="deleteProduct(${i})">delete</button></td>
      </tr>`
}
}
}

}

