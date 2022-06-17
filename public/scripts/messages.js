const email = document.getElementById('email');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const alias = document.getElementById('alias');
const avatar = document.getElementById('avatar');
const texto = document.getElementById('texto');

function renderMessages(data) {
    const html = data.map((elem, index) => {
        return (`<div>
            <strong style="color:blue;">${elem.author.email}</strong>
            <span style="color:brown;">[${elem.time}]</span>:
            <em style="color:green;">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('render-all-messages', function (data) {
    renderMessages(data);
});

function addMessage(e) {
    fetch(`http://localhost:${PORT}/api/sessionstatus`)
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                if (email.value != '' && nombre.value != '' && apellido.value != '' &&
                    edad.value != '' && alias.value != '' && avatar.value != '' && texto.value != '') {

                    const mensaje = {
                        author: {
                            email: email.value,
                            nombre: nombre.value,
                            apellido: apellido.value,
                            edad: Number(edad.value),
                            alias: alias.value,
                            avatar: avatar.value,
                        },
                        text: texto.value
                    };
                    texto.value = '';
                    socket.emit('add-new-message', mensaje);
                }
            }
            else {
                window.location.replace('login.html');
            }
        });

}

