//redirect to homepage if user logged in
window.onload = () => {
    if(sessionStorage.user){
        user=JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');

// select inputs
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notifications') || null;

submitBtn.addEventListener('click', () =>{ // su=ign up page
    if(name != null){
        if(name.value.length < 3){
            showAlert('name must be 3 letters long');
        }else if(!email.value.length){
            showAlert("enter your email");
        }else if(password.value.length < 8){
            showAlert('password should be 8 letter long ');
        }else if(!number.value.length){
            showAlert('enter your mobile number');
        }else if(!Number(number.value) || number.value.length < 10){
            showAlert(' Invalid number, plaese enter valid one');
        }else if(!tac.checked){
            showAlert('you must agree to our terms and conditions');
        }else{
            loader.style.display = 'block';
            sendData('/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked,
                notification: notification.checked,
                seller: false
            })
        }
    }else{
        // login page
        if(!email.value.length || !password.value.length){
            showAlert('fill all the inputs');
        }else{
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    }
})

