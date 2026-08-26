importScripts(
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "TU_API_KEY",
    authDomain: "tender-automatico.firebaseapp.com",
    projectId: "tender-automatico",
    storageBucket: "tender-automatico.firebasestorage.app",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

    console.log(
        "[firebase-messaging-sw.js] Mensaje recibido:",
        payload
    );

    const titulo =
        payload.notification?.title ||
        "Tender Automático";

    const opciones = {
        body:
            payload.notification?.body ||
            "Se detectó lluvia.",
        icon: "/icon.png"
    };

    self.registration.showNotification(
        titulo,
        opciones
    );
});
