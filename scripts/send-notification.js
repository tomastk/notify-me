/* Notify Me: Recuerda qué hacias
    En esta parte del código, me encargaré de hacer todo lo necesario para recibir la notificación que se estableció
    e intentar enviar una notificación con PushJS.
    El flujo del programa es el siguiente: una vez que ingresen a View Notification, se establecerá
    un temporizador que va a enviar la notificación. 
*/


/* Declaración de Variables */

let notification;
localStorage.getItem("notification") != null ? notification = JSON.parse(localStorage.getItem("notification")) : notification = false;
let showNotificationButton = document.getElementById("show-notification")
let minutes = document.querySelector(".minutes")
let seconds = document.querySelector(".seconds")
/*

/* Funciones */ 

let notificationObject = {
    addNotification: function() {
        let time = notification.time * 60000;
        let message = notification.message;
        notificationObject.sendNotification(time, message)
    },
    sendNotification: function(time, message) {
        this.showNotification = setInterval(
            () => {
                Push.create("Hola! Esta es la noti que configuraste", {
                    body: message,
                    icon: '../img/favicon.png',
                    onClick: function () {
                        this.close();
                    }
                });
                document.querySelector(".popup").style.display = "flex"
                seconds.innerHTML = "Enviada"
                setTimeout(() => document.querySelector(".popup").style.display="none",1500)
            }
            , time
        )
        return true;
    },
    removeNotification: function() {
        seconds.innerHTML = `La notificación no se encuentra activa. Puedes activarla pulsando el botón.`
        clearInterval(this.showNotification)
    },
    showTimer: function() {
        let numberSeconds = notification.time * 60;
        seconds.innerHTML = numberSeconds + " segundos";
        this.timerInterval = setInterval (() => {
            seconds.innerHTML = numberSeconds + " segundos";
            numberSeconds--
            if (numberSeconds === 0) {
                numberSeconds = notification.time * 60;
            }
        },1000)
    },
    clearTimer: function() {

        clearInterval(this.timerInterval)

    }
}

function verifyCheckbox() {   
    if (showNotificationButton.checked) {
        return true; 
    } else {
        return false;
    }
}



/* Comenzando con el flujo del script)  */

document.addEventListener("DOMContentLoaded", () => {

    if (notification) {
        showNotificationButton.checked = true;
        notificationObject.addNotification()
        seconds.innerHTML = `${notification.time * 60} segundos`
        notificationObject.showTimer()

    } else {
        return document.querySelector("content").innerHTML = 
        `
            <div class="no-notification">
                <p class="no-notification-p"> Por favor añade una notification primero</p>
                <a class="no-notification-a" href="add-notification.html">Añadir</a>
            </div>
        `
    }



})

showNotificationButton.addEventListener("change", () => {
    if (verifyCheckbox()) {
        notificationObject.addNotification();
        notificationObject.showTimer()
    } else {
        notificationObject.removeNotification();
        notificationObject.clearTimer()        
    }
} )