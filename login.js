const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.onclick = function (){
    container.className = 'active'
}

loginButton.onclick = function (){
    container.className = 'close'
}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sessionStorage.setItem('khoaiLaptopUser', this.querySelector('input[type="email"]').value);
    window.location.href = 'index.html';
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sessionStorage.setItem('khoaiLaptopUser', this.querySelector('input[type="email"]').value);
    window.location.href = 'index.html';
});