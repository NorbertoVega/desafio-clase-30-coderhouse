const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginUrl = `http://localhost:${PORT}/api/registro`;

function registerUser() {
    const data = {
        email: emailInput.value,
        password: passwordInput.value
    }

    fetch(loginUrl, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("data:", data);
        if (data.result === "SUCCESS") {
            window.location.href = 'login.html';
        }
        else if (data.result === "ERROR"){
            window.location.href = 'registro-error.html';
        }
    })
}

function redirectToLogin() {
    window.location.href = 'login.html';
}