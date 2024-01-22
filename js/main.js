//========================== Inputs =============================
var productNameInput =document.getElementById('productNameInput'); // بعرف القيم اللي عملتها اي دي في التيكست هنا عن اني بندها بي ال اي دي 
var productPriceInput =document.getElementById('productPriceInput');
var productCatInput =document.getElementById('productCatInput');
var productDescInput =document.getElementById('productDescInput');
var tableBody = document.getElementById('tableBody');
var addbtn= document.getElementById('addbtn');
var updatebtn= document.getElementById('updatebtn');
//========================== local Storage ==============================
var contaner; 
if(localStorage.getItem("my Products") !=null)
{
    contaner =JSON.parse(localStorage.getItem("my Products"));
    displayProduct(contaner);
}
else{
    var contaner = [];
}
//========================== create function ============================
function addProduct(){
    if(validateProudct(productNameInput.value))
    {
        var product={
            productName:productNameInput.value,   
            productPrice:productPriceInput.value,
            productCate:productCatInput.value,
            productDesc:productDescInput.value,
        }
        contaner.push(product);
        localStorage.setItem("my Products" ,JSON.stringify(contaner));
        console.log(contaner);   
        clearProduct();       
        displayProduct(contaner); 
    }
    else{
        alert("Not Valid Name Input Should be like:Nokia");
    }
}
//========================== clear function =============================
function clearProduct()
{
 var product={
        productName:productNameInput.value ='', 
        productPrice:productPriceInput.value='',
        productCate:productCatInput.value='',
        productDesc:productDescInput.value='',
    }
}
//========================== Display function =============================
function displayProduct(arr){  
    var cartonaa = ``;  
    for (var i = 0; i <arr.length; i++) {
        cartonaa+=`
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].productName}</td>
            <td>${arr[i].productPrice}</td>
            <td>${arr[i].productCate}</td>
            <td>${arr[i].productDesc}</td>
            <td><button onclick="setUpdateProudcts(${i})" class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    tableBody.innerHTML=cartonaa;
}
//========================== Search function =============================
function serchProducts(searchterm){

    var searchRessult = [];
    for(var i = 0 ; i < contaner.length ; i++)
    {
        if(contaner[i].productName.toLowerCase().includes(searchterm.toLowerCase()))
        {
            searchRessult.push(contaner[i]);
        }
    }
   displayProduct(searchRessult);
}
//========================== Delete function =============================

function deleteProduct(deleteIndex){
    contaner.splice(deleteIndex,1);
    localStorage.setItem("my Products" ,JSON.stringify(contaner));
    displayProduct(contaner);
}

//========================== Update function =============================
var update = 0 ; 
function setUpdateProudcts(updateIndex){
    updateIndex = update ; 
    productNameInput.value = contaner[updateIndex].productName;
    productPriceInput.value= contaner[updateIndex].productPrice;
    productCatInput.value= contaner[updateIndex].productCate;
    productDescInput.value= contaner[updateIndex].productDesc;

    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

function getUpdateProudcts(){
    contaner[update].productName=productNameInput.value; 
    contaner[update].productPrice=productPriceInput.value; 
    contaner[update].productCate=productCatInput.value; 
    contaner[update].productDesc=productDescInput.value; 
    localStorage.setItem("my Products" ,JSON.stringify(contaner));
    console.log(contaner);   
    clearProduct();       
    displayProduct(contaner);
    addbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');
}

//========================== Validation =============================
function validateProudct(name){
    var regex =/^[A-Z]{1}[a-z]{3}\s?\S{0,}$/;
    if(regex.test(name)){
        productNameInput.classList.replace('is-invalid','is-valid');
        return true ; 
    }
    else 
    {
        productNameInput.classList.add('is-invalid');
    return false ; 
    }
}