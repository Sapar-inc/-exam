let loginBlock = document.querySelector("#login_block")
let localUser =JSON.parse(localStorage.getItem("user")) || []
let codeEmail = JSON.parse(localStorage.getItem("code")) || []

const drawLogin = () =>{
    loginBlock.innerHTML = ""
    loginBlock.innerHTML += 
    `   <p class="p_input">Введите имя</p>
        <input id="registration_name" type="text" placeholder="Имя">
        <p class="p_input">Введите фамилию</p>
        <input id="registration_surname" type="text" placeholder="Фамилия">
        <p class="p_input">Введите почту</p>
        <input id="registration_email" type="text" placeholder="Почта">
        <p class="p_input">Введите пароль</p>
        <input id="registration_password" type="password" placeholder="Пароль">
        <p class="p_input">Введите снова пароль</p>
        <input id="registration_password_repeat" type="password" placeholder="Пароль">
        <div style="display:flex;">
        <button class="btn" onclick="registrationBtn()">Зарегистрироваться</button>
        <button class="btn" onclick="drawLogin2()">У меня есть аккаунт</button>
        </div>


    `
}
drawLogin()
const registrationBtn = () =>{
    let inputName = document.querySelector("#registration_name").value
    let inputSurname = document.querySelector("#registration_surname").value
    let inputEmail = document.querySelector("#registration_email").value
    let inputPassword = document.querySelector("#registration_password").value
    let inputPasswordRepeat = document.querySelector("#registration_password_repeat").value
    let findUsers = localUser.findIndex(item => item.email == inputEmail)
    loginBlock.innerHTML = ""
    objectUser = {
        name: inputName,
        surname: inputSurname,
        email: inputEmail,
        password: inputPassword,
    }
    if(findUsers == -1 && inputPassword == inputPasswordRepeat && inputPassword != "" && inputName != "" && inputSurname != "" && inputEmail != ""){
        loginBlock.innerHTML += `
        <h4 style="margin-top:180px; font-family: Impact, Charcoal, sans-serif; font-size: 30px;">Вам вышлен кода на email, потвердите</h4>
        <input style="margin-top:180px;" id="code" type="text">
        <button style="margin-top:180px;" class="btn" onclick="prove()">Потвердить</button>`
        let code = Math.floor(Math.random() * 10000)
        localStorage.setItem("code",JSON.stringify(code))
        sendEmail(inputEmail,"Tema", codeEmail)
    }else{alert
        ("Такая почта уже есть, либо пароли не совпалдают, либо поля пустые")
        drawLogin()}
}
const prove = () =>{
    let inputCode = document.querySelector("#code").value
    if(codeEmail == inputCode){
        localUser.push(objectUser)
        localStorage.setItem("user", JSON.stringify(localUser)) 
        drawLogin2()
    }else{alert("Неправельный код")}
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

const drawLogin2 = () =>{
    loginBlock.innerHTML = ""
    loginBlock.innerHTML += 
    `
    <p class="p_input" style="margin-top:130px;">Введите почту</p>
    <input style="margin-top:130px;" id="login_email" type="text" placeholder="Почта">
    <p style="margin-top:130px;" class="p_input">Введите пароль</p>
    <input style="margin-top:130px;"  id="login_password" type="password" placeholder="Пароль">
    <div style="margin-top:130px;">
    <button  class="btn" onclick="login()">Войти</button>
    <button  class="btn" onclick="drawLogin()">назад к регистрации</button>
    </div>
   
    `
}
const login = () =>{
    let loginEmail = document.querySelector("#login_email").value
    let loginPassword = document.querySelector("#login_password").value
    let userEmail = localUser.findIndex(item =>item.email == loginEmail && item.password == loginPassword)
    if(userEmail != -1){
        localStorage.setItem("login", userEmail)
        location.href = "index2.html"
    }else{alert("Неправельно введен логин, либо пароль")}
}
// let userEmail = loginSave.findIndex(item =>item.login == text.value && item.password == password.value)
// if(userEmail != -1){
//     location.href = "index2.html"
// }
// else{alert("Нет такого логина")}


// btn.addEventListener("click", () =>{
//     sendEmail("sapar36000@gmail.com","Tema", "Здарова, che kavo?")
// })

// let arr = [5,7,4,6]
// arr.sort((a,b) =>{
// })


// Math.floor(Math.random() * 10000)
