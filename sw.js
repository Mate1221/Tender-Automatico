self.addEventListener("install", () => {
    console.log("Service Worker instalado");
});

self.addEventListener("activate", () => {
    console.log("Service Worker activado");
});

self.addEventListener("push", (event) => {
    const datos = event.data
        ? event.data.json()
        : {
            title: "Tender Automático",
            body: "Se recibió una notificación."
        };

    event.waitUntil(
        self.registration.showNotification(datos.title, {
            body: datos.body,
            icon: "/icon.png"
        })
    );
});
