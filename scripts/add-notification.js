/* 
    NotifyME: recuerda lo que hacías
    El programa será capaz de almacenar datos enviados por un usuario:
    - Tiempo: el tiempo que llevará cada notificación en ser enviada al usuario
    - Mensaje Personalizado: el mensaje que usará el usuario para recordarle que debe pensar.
     
    Una vez que se envien los datos desde el formulario, el programa
    va a procede a almacenarlos en el LocalStorage (por si cierra el navegador y lo vuelve a abrir),
    agregar el tiempo de espera a la notificación y añadir el mensaje de que la notificación ya fue enviada, para luego
    redirigir al usuario para que pueda ver su notificación configurada. 
    En esa página va a empezar a correr el tiempo y la notificación será enviada al dispositivo del usuario. 


    Si al momento de pulsar click en enviar formulario los datos son invalidos, se enviará un mensaje 
    al DOM e impedirá que se añada la notificación. 

*/



/* Declaración de las Variables */

const form = document.getElementById("form");
const timeInput = document.getElementById("time");
const messageInput = document.getElementById("message")
const container = document.getElementById("container")
const warning = document.querySelector(".warning")
const popup = document.querySelector(".popup")
/* Declaración de las Funciones */
function checkInputs() {


    /* Revisa si en el DOM encuentra un elemento que tenga de clase mensaje (que es el que va a mostrar 
     más adelante, si no lo encuentra)
    */
    let messageDOM = document.querySelector(".message")

    // Añado una función que va a verificar que todos los campos estén correctamente llenados. Si no lo están, retorna false.
    function isOK(){
        let time = timeInput.value;
        let message = messageInput.value;
        if (timeInput.value === ""){
            return false;
        } else {
            if (parseInt(timeInput.value) < 1) {
                return false;
            } else {
                return true;
            }
        };
    }

    // Verifico que el mensaje no se encuentre en el DOM

    if (messageDOM === null || messageDOM.style.display === "none"){
        // Si todos los campos están correctos, entonces la función general va a retornar true, sino, va a añadir un mensaje
        if (isOK()){
            return true;
        } else{
            // Añado el mensaje con dos parametros: texto y lugar (la clase del div padre)
            addMessage("Por favor incluye un tiempo correcto", "time")
        }

        // Si el mensaje ya fue publicado, entonces simplemente modifico su contenido.

    } else {
        if (isOK()){
            return true;
            messageDOM.innerHTML = "Todo correcto"
        } else{
            return false;
            messageDOM.innerHTML = "No está bien"
        }
    }
}

// Función para añadir una advertencia en caso de ser necesario: creo un div, le añado el texto, la clase y lo mando al DOM
function addWarning(message) {
    let warning = document.createElement("div");
    warning.classList.add("warning");
    warning.innerHTML = `<p> ${message} </p>`

    container.appendChild(warning)

    setTimeout(function(){
        warning.style.display = "none"
    },3000)

}

// Funcion que añade el Mensaje, con dos parametros: mensaje y lugar (nombre de la clase del padre)
function addMessage(message, place) {


    // Creo un elemento p, le añado la clase mensaje y le añado al DOM. Después de medio segundo, lo elimino. 

    let placeDOM = document.querySelector(`.${place}`)
    let messageDOM = document.createElement("p");
    

    messageDOM.classList.add("message")
    messageDOM.innerHTML = `${message}`

    placeDOM.appendChild(messageDOM)

    setTimeout(() => {
        messageDOM.style.display = "none"
    },500)

}

// Creo un objeto notificacion (que se va a usar cuando se envie el formulario)

function addNotificationInfo(time, message) {
    let notification = {
        time: time,
        message: message
    }
    // Añado la notificación al Local Storage

    addNotificationLS(notification)
}

// Añado la notificación al Local Storage
function addNotificationLS(notification){
    localStorage.setItem("notification", JSON.stringify(notification))
}

// Añado una función que se encargue de cerrar el popup en el momento en el que se encuentre disponible. Cuando pulse el boton de cerrar,
// el programa me mandará a ver la notificación.

function closePopup(e) {

    if (e.target.classList.contains("close-ico")) {
        document.location = "/pages/view-notification.html"
    }
}

// Empezando con el flujo del script

// Cuando se clickee en el popup, se va a verificar que se haya pulsado el boton de cerrar y se redirigirá a ver la notificación.
document.getElementById("popup").addEventListener("click", (e) => {
    closePopup(e)
})

// Cuando se envie el formulario, se va a checkear los inputs y se declararan las variables tiempo y mensaje. Se mostrará el 
// popup si todo va bien y se añadirá la notificación al Local Storage.

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()
    checkInputs()
    let time, message;
    if (checkInputs()) {
        time = timeInput.value;
        if (messageInput.value != "") {
            message = messageInput.value;
        } else {
            message = "¡Hola! ¿Qué es lo que pensaste los últimos minutos?"
        }
        form.reset()
        Notification.requestPermission()
        popup.style.display = "flex"
        addNotificationInfo(time, message)
    }
})