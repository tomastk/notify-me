/* Notify Me: Recuerda qué hacías
    En esta parte del programa, esta el código que va a cargar
    la notificación actual que tengas configurada. En caso de que no haya ninguna, 
    va a mostrar un mensaje de error.
    Las notificaciones las obtiene del local Storage.
*/

/* Declaración de variables */

const timeInput = document.getElementById("time");
const messageInput = document.getElementById("message")
const container = document.querySelector(".content")
/* Declaración de funciones */ 

function initNotifications(){

    if(notificationInLs()) {
        loadNotifications()
    } else {
        addMessage()
    }

}

function notificationInLs() {
    if (localStorage.getItem("notification") != null) {
        return true;
    } else {
        return false;
    }
}

function loadNotifications() {
    let notification = JSON.parse(localStorage.getItem("notification"))

    let time = notification.time;
    let message = notification.message;

    timeInput.innerHTML = `${time}`
    messageInput.innerHTML = `${message}`

}

function addMessage() {

    container.innerHTML = 
    `
        <div class="warning">
            <p>Por favor añade una notificación primero</p>
            <a href="add-notification.html">Añadir</a>
        </div>
    `

}

/* Empezando con el flujo del script */ 

document.addEventListener("DOMContentLoaded", initNotifications)