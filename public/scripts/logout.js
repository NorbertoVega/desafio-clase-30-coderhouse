const logoutTitle = document.getElementById('logout-title');

function logout() {
    fetch(`http://localhost:${PORT}/api/logout`)
        .then(response => response.json())
        .then(data => {
            console.log("data:", data);
            if (data.name)
                logoutTitle.innerHTML += data.name;
        })
}

logout();

setTimeout(() => {
    window.location.replace('login.html');
}, 2000);
