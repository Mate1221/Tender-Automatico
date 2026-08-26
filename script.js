import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getMessaging,
    getToken,
    onMessage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";


const firebaseConfig = {
    apiKey: "AIzaSyCxRb2S1VGQFv3RJl0epfIa4aNVYWnR73U",
    authDomain: "tender-automatico.firebaseapp.com",
    projectId: "tender-automatico",
    storageBucket: "tender-automatico.firebasestorage.app",
    messagingSenderId: "97815083485",
    appId: "1:97815083485:web:d9e052b9993917bd9b1e344"
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


// ============================
// NOTIFICACIONES
// ============================

async function activarNotificaciones() {

    try {

        const permiso = await Notification.requestPermission();

        console.log("Permiso:", permiso);

        if (permiso !== "granted") {
            console.log("Notificaciones rechazadas.");
            return;
        }

        const token = await getToken(messaging, {
            vapidKey: "BHk4yzBKWjlMb4IEb3LEh3QVDcBHLeT1ixUaBVEqiry9lCxjLNLpFBtCgiE0OiamSZ9PsVG-cOXwwxKdXTuQvDg"
        });

        console.log("TOKEN DEL DISPOSITIVO:");
        console.log(token);

    } catch (error) {

        console.error(
            "Error obteniendo el token:",
            error
        );
    }
}


// ============================
// MENSAJES CON LA WEB ABIERTA
// ============================

onMessage(messaging, (payload) => {

    console.log(
        "Notificación recibida:",
        payload
    );

});


activarNotificaciones();

const estadoTender = document.querySelector(".estado_tender");
const btnColor = document.querySelector(".btn_color");
const broker = "wss://d95554d0e6434a35b9a224e50b0525ed.s1.eu.hivemq.cloud:8884/mqtt";

const opciones = {
    username: "TenderWeb",
    password: "ETecnica1"
};

const cliente = mqtt.connect(broker, opciones);

cliente.on("connect", () => {
    console.log("Conectado a HiveMQ");
    cliente.subscribe("tender/lluvia");
});

cliente.on("message", (topic, mensaje) => {
    const estado = mensaje.toString();
    console.log("Mensaje recibido:", estado);
    estadoTender.textContent = estado;

    btnColor.classList.remove(
        "btn_color_rojo",
        "btn_color_verde",
        "btn_color_azul"
    );

    if (estado === "Mojado") {
        btnColor.classList.add("btn_color_rojo");
    } else if (estado === "Seco") {
        btnColor.classList.add("btn_color_verde");
    } else {
        btnColor.classList.add("btn_color_azul");
    }
});
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => {
            console.log("Service Worker registrado");
        })
        .catch((error) => {
            console.error("Error registrando Service Worker:", error);
        });
}

if ("Notification" in window) {
    Notification.requestPermission()
        .then((permiso) => {
            console.log("Permiso de notificaciones:", permiso);
        });
}
