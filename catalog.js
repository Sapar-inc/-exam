let userIndex = JSON.parse(localStorage.getItem("login"))
let user = JSON.parse(localStorage.getItem("user"))
let userBlock = document.querySelector("#user")
let product = document.querySelector("#product")
let cartsDiv = document.querySelector("#carts_div")
let inputProduct = document.querySelector("#input_product")
let selectProduct = document.querySelector("#select_product")
let carts = JSON.parse(localStorage.getItem("carts")) || []

const drawUser = () =>{
    userBlock.innerHTML += `
    <p class='p_h1'>Добро пожаловать ${user[userIndex].name} ${user[userIndex].surname} !<p>
    <button class="btn" onclick="exit()">выйти</button>
    `
}
drawUser()

const exit = () =>{
    location.href = "index.html"
}

const drawProduct = async () =>{
    response = await fetch("https://dummyjson.com/products")
    data = await response.json()
    console.log(data.products)
    for(let item of data.products){
        product.innerHTML += 
        `
        <div border: 2px solid; text-align: center;">
        <h4>${item.title}</h4>
        <img style="width: 250px; height: 200px;" src="${item.images[0]}">
        <p >${item.price}$</p>
        <button class="btn" onclick="dataCarts('${item.title}','${item.images[0]}','${item.price}','${userIndex}')">Добавить в корзину</button>
        </div>
        `
    }
    let array = []
      for(let i = 0; i < data.products.length; i++){
        array.push(data.products[i].category)

      }
      function onlyUnique(value, index, self) {
        return self.indexOf(value) == index;
      }
      let unique = array.filter(onlyUnique);
      console.log(unique)
      for(let item of unique){
        selectProduct.innerHTML += `<option value="${item}">${item}</option>`
      }

    inputProduct.onkeyup = function() {
        product.innerHTML = ''
        let searchText = this.value.toLowerCase();
        let stringLength = searchText.length;
        if (stringLength > 1) {
          for (let i = 0; i < data.products.length; i++) {
            let userName = data.products[i].title.split('').slice(0, stringLength).join('').toLowerCase();
            if (userName == searchText) {
                    product.innerHTML += 
                    `
                    <div style=" border: 2px solid; text-align: center;">
                    <h4>${data.products[i].title}</h4>
                    <img style="width: 250px; height: 150px;" src="${data.products[i].images[0]}">
                    <p>${data.products[i].price}$</p>
                    <button class="btn" onclick="dataCarts('${data.products[i].title}','${data.products[i].images[0]}','${data.products[i].price}','${userIndex}')">Добавить в корзину</button>
                    </div>
                    `
            }
          }
        } else { 
            for (let i = 0; i < data.products.length; i++){
                if(inputProduct.value == "")
                product.innerHTML += 
                `
                <div style=" border: 2px solid; text-align: center;">
                <h4>${data.products[i].title}</h4>
                <img style="width: 250px; height: 150px;" src="${data.products[i].images[0]}">
                <p>${data.products[i].price}$</p>
                <button class="btn" onclick="dataCarts('${data.products[i].title}','${data.products[i].images[0]}','${data.products[i].price}','${userIndex}')">Добавить в корзину</button>
                </div>
                `

            }

        }
      };
      selectProduct.addEventListener('change', () =>{
        product.innerHTML = ''
        for(let item of data.products){
        if(selectProduct.value == item.category){
            product.innerHTML += 
            `
            <div style=" border: 2px solid; text-align: center;">
            <h4>${item.title}</h4>
            <img style="width: 250px; height: 150px;" src="${item.images[0]}">
            <p>${item.price}$</p>
            <button class="btn" onclick="dataCarts('${item.title}','${item.images[0]}','${item.price}','${userIndex}')">Добавить в корзину</button>
            </div>
            `
        }if(selectProduct.value == 'all') {
            product.innerHTML += 
            `
            <div style=" border: 2px solid; text-align: center;">
            <h4>${item.title}</h4>
            <img style="width: 250px; height: 150px;" src="${item.images[0]}">
            <p>${item.price}$</p>
            <button class="btn" onclick="dataCarts('${item.title}','${item.images[0]}','${item.price}','${userIndex}')">Добавить в корзину</button>
            </div>
            `
        }

    }
  })
      


        

}
drawProduct()
const dataCarts = (title,img,price,userId) =>{
objectCarts = {
    title: title,
    img: img,
    price: price,
    userId: userId,
    sum: 0

}

carts.push(objectCarts)
localStorage.setItem('carts', JSON.stringify(carts))
// console.log(carts)
}
let carts2 = []
const cartDraw = () =>{
    cartsDiv.innerHTML = ""

for(let item of carts){
    if(item.userId == userIndex){
        carts2.push(item)
    }
}
    const table = {};
    res = carts2.filter(({title}) =>(!table[title] && (table[title] = 1)),{});
 
    
    let arr2 = []

    for(let item of carts2){
        arr2.push(item.title)
    }
    let result = arr2.reduce(function(acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {});

    for(let item of carts2){
        for(key in result){
            if(item.title == key){
                item.sum = result[key]
            }
        }

    }
    let sumPrice = 0
    for(let item of carts2){
            sumPrice += +item.price
       
    }
    for(let i = 0; i < res.length; i++){
        if(res[i].userId == userIndex){
            cartsDiv.innerHTML += `
            <div style=" border: 2px solid; text-align: center;">
            <h4>${res[i].title}: ${res[i].sum} шт.</h4>
            <img style="width: 250px; height: 150px;" src=${res[i].img}>
            <p>${res[i].price}$
            </div>
            `
        }else{cartsDiv.innerHTML = ''}

    }  
        cartsDiv.innerHTML += `
        <div style="background-color:rgba(255, 68, 0, 0);">
            <h4 id="total">Итого: ${sumPrice}$</h4><button class="btn" onclick ="deleteCarts()">Удалить весь список</button>
            <button class="btn" onclick="buy()">Купить</button>
        </div>

`   
}


const buy = () =>{

   let arrBuy

   let EmailUser = user[userIndex].email

   for(let item of res){
    total += +item.price 
    arrBuy += `${item.title}: ${item.price}, ${item.sum} шт. \n`
    
   }
   let arrBuyStr = arrBuy.replaceAll("undefined","") + document.querySelector("#total").innerText
   alert("ты купил, молодец))) Твой чек на почте")
   sendEmail(EmailUser,"Мои покупки", arrBuyStr)
}


const deleteCarts = () =>{
    cartsDiv.innerHTML = ''
    localStorage.removeItem("carts")
    location.href ="index2.html"
}

const sendEmail = (email,subject, message) =>{
    const templateParams = {
        subject: subject,
        message: message,
        to_email: email,
    }
     
    emailjs.send('service_zzj0zf4', 'template_zfd5wi8', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text)
        }, function(error) {
           console.log('FAILED...', error)
        })
}