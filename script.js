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
