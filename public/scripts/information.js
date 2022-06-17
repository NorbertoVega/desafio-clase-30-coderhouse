const argEntrada = document.getElementById('argEntrada');
const argEntradaSueltos = document.getElementById('argEntradaSueltos');
const pathEjec = document.getElementById('pathEjec');
const os = document.getElementById('os');
const processId = document.getElementById('processId');
const nodeVersion = document.getElementById('nodeVersion');
const carpetaProy = document.getElementById('carpetaProy');
const memoryUse = document.getElementById('memoryUse');
const numCpus = document.getElementById('numCpus');

function formatObject(object) {
    let stringObject = '<ul>';
    for (const property in object) {
        stringObject += `<li>${property} : ${object[property]}</li>`
      } 
    if (stringObject === '<ul>')
        return "No hay argumentos de entrada en forma de propiedades."

    return stringObject += '</ul>';
}

function formatArray(array) {
    if (array.length === 0)
        return "No hay argumentos de entrada sueltos."
    else
        return array.join(", ")
}

function getInfo() {
    fetch(`http://localhost:${PORT}/api/info`)
        .then(response => response.json())
        .then(data => {
            console.log("data:", data);
            argEntradaSueltos.innerHTML += formatArray(data.argEntrada._);
            delete data.argEntrada._;
            argEntrada.innerHTML += formatObject(data.argEntrada);
            pathEjec.innerHTML += data.pathEjec;
            os.innerHTML += data.os;
            processId.innerHTML += data.processId;
            nodeVersion.innerHTML += data.nodeVersion;
            carpetaProy.innerHTML += data.carpetaProy;
            memoryUse.innerHTML += data.memoryUse + ' bytes';
            numCpus.innerHTML += data.numCpus;
        })
}

getInfo();