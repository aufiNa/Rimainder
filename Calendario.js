const calendario = document.querySelector(".calendario");
const Fecha = document.querySelector(".Fecha");
const ContenedorDias = document.querySelector(".Dias");
const diasSemana = document.querySelector(".DiasSemana");
const izquierda = document.querySelector(".Irizquierda");
const derecha = document.querySelector(".Irderecha");
const btnFechaActual = document.querySelector(".BtnFechaActual");
const BtnEntradaFecha = document.querySelector(".BtnEntradaFecha");
const EntradaFecha = document.querySelector(".EntradaFecha");
const eventoDia = document.querySelector(".eventoDia");
const FechaEvento = document.querySelector(".FechaEvento");
const contenedoreventos = document.querySelector(".eventos");
const agregar_evento_btn = document.querySelector(".agregar-evento-btn");
const MostrarEventos = document.querySelector(".MostrarEventos");
const BtnCerrarSesion = document.querySelector(".BtnCerrarSesion");

let FechaHoy = new Date();
let activeDia;
let mesActual = FechaHoy.getMonth();
let anioActual = FechaHoy.getFullYear();

const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const aarrEventos = [];

CargarEventos();

 




// funcion para agregar los dias 

function agregarDias(){
    const primerDia = new Date(anioActual, mesActual, 1);
    const ultimoDia = new Date(anioActual, mesActual + 1 , 0);
    const ultimodiaAnterior = new Date(anioActual, mesActual, 0);
    const DiasAnteriores = ultimodiaAnterior.getDate();
    const UltimaFecha = ultimoDia.getDate();
    const Dia = primerDia.getDay();
    const sigueitedias = 7 - ultimoDia.getDay() - 1 ;


    Fecha.innerHTML = mesesDelAño[mesActual] + " " + anioActual;
    let dias = "";
    for (let i = Dia; i > 0; i--) {        
        dias += `<div class=" dia dia-previo"> ${DiasAnteriores - i + 1} </div>`;

    }
    for (let x = 1; x <= UltimaFecha; x++) {
        let event = false;
        aarrEventos.forEach((eventoObj) => {
            if (eventoObj.day === x && eventoObj.month === mesActual + 1 && eventoObj.year === anioActual) {
                event = true;
            }
        });
        if (x === new Date().getDate() &&  anioActual===new Date().getFullYear() && mesActual === new Date().getMonth() ) {
           
            SeleccionarDia(x);
            mostarEventos(x);

           
            if (event) {
                dias += `<div class="dia hoy acive evento"> ${x} </div>`;
            } else {
                dias += `<div class="dia acive hoy"> ${x} </div>`;
            }
        } else {
            if (event) {
                dias += `<div class="dia evento"> ${x} </div>`;
            } else {
                dias += `<div class="dia "> ${x} </div>`;
            }
        }
    }

    for (let j = 1; j <= sigueitedias; j++) {
        dias += `<div class=" dia dia-siguiente"> ${j} </div>`;
    }
     ContenedorDias.innerHTML = dias; 
     MarcararDiaSeleccionado();
}

agregarDias();


function MesAnterior() {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        anioActual--;
    }
    Fecha.innerHTML = mesesDelAño[mesActual] + " " + anioActual;
    agregarDias();
}

function MesSiguiente() {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        anioActual++;
    }
    Fecha.innerHTML = mesesDelAño[mesActual] + " " + anioActual;
    agregarDias();
}

izquierda.addEventListener("click", MesAnterior);
derecha.addEventListener("click", MesSiguiente);


btnFechaActual.addEventListener("click", () => {
    FechaHoy = new Date();
    mesActual = FechaHoy.getMonth();
    anioActual = FechaHoy.getFullYear();
    console.log(mesActual + " " + anioActual);
    agregarDias();
});

EntradaFecha.addEventListener("input", (e) => {
    EntradaFecha.value=EntradaFecha.value.replace(/ [^0-9/]/g, "");
    if (EntradaFecha.value.length === 2) {
        EntradaFecha.value += "/";
        
    }
    if (EntradaFecha.value.length > 7) {
        EntradaFecha.value = EntradaFecha.value.slice(0, 7);
    }
    
    if (e.inputType === "deleteContentBackward") {
        if (EntradaFecha.value.length === 3) {
            EntradaFecha.value = EntradaFecha.value.slice(0, 2);
        }
    }
});


BtnEntradaFecha.addEventListener("click", () => {
    const arrfechaIngresada = EntradaFecha.value.split("/");
    
    if (arrfechaIngresada.length === 2) {
        if (arrfechaIngresada[0] > 0 && arrfechaIngresada[0] < 13 && arrfechaIngresada[1].length === 4) {
            mesActual = parseInt(arrfechaIngresada[0]) - 1;
            anioActual = parseInt(arrfechaIngresada[1]);
            agregarDias(); 
            return;
            
        }
    }else{
        alert("Ingresa un formato correcto");
    }
});



const agregar_evento_wrapper = document.querySelector(".agregar-evento-wrapper");
const agregar_evento_header = document.querySelector(".agregar-evento-header");
const cerrar = document.querySelector(".cerrar");
const AgregarEventoBtn = document.querySelector(".AgregarEventoBtn");
const evento_titulo = document.querySelector(".evento-titulo");
const evento_hora = document.querySelector(".evento-hora");



AgregarEventoBtn.addEventListener("click", () => {
    agregar_evento_wrapper.classList.add("active");
});
cerrar.addEventListener("click", () => {
    agregar_evento_wrapper.classList.remove("active");
    evento_titulo.value = "";
    evento_hora.value = "";
});

document.addEventListener("click", (e) => {
    if (e.target !== AgregarEventoBtn && !agregar_evento_wrapper.contains(e.target)) {
            agregar_evento_wrapper.classList.remove("active");
            evento_titulo.value = "";
            evento_hora.value = "";
    }
});


evento_titulo.addEventListener("input", () => {
    evento_titulo.value = evento_titulo.value.slice(0, 30);
});

evento_hora.addEventListener("input", (e) => {
     evento_hora.value = evento_hora.value.replace(/[^0-9:]/g, ""); 
    if (evento_hora.value.length === 2) {
        evento_hora.value += ":";
    }

     if (evento_hora.value.length > 5) {
        evento_hora.value = evento_hora.value.slice(0, 5);
    }
    if (e.inputType === "deleteContentBackward") {
        if (evento_hora.value.length === 3) {
            evento_hora.value = evento_hora.value.slice(0, 2);
        }
    } 
});

function MarcararDiaSeleccionado(){
    const dias = document.querySelectorAll(".dia");
    dias.forEach((dia) => {
        dia.addEventListener("click", (e) => {
        activeDia = Number(e.target.innerHTML); 

            mostarEventos(e.target.innerHTML);
            SeleccionarDia(e.target.innerHTML);

        dias.forEach((dia) => {
            dia.classList.remove("acive");
            
            
        });

        if (e.target.classList.contains("dia-previo")) {
            MesAnterior();
            setTimeout(() => {
                const dias = document.querySelectorAll(".dia");
                dias.forEach((dia) => {
                    if (!dia.classList.contains("dia-previo") && dia.innerHTML === e.target.innerHTML) {
                        dia.classList.add("acive");   
                    }
                });
            }, 100);
        } else if (e.target.classList.contains("dia-siguiente")) {
            MesSiguiente();
            setTimeout(() => {
                const dias = document.querySelectorAll(".dia");
                dias.forEach((dia) => {
                    if (!dia.classList.contains("dia-siguiente") && dia.innerHTML === e.target.innerHTML) {
                        dia.classList.add("acive");
                    }
                });
            }, 100);
        }

else {
    e.target.classList.add("acive");
}
    });
});
}



function SeleccionarDia(Fecha){
    const dia = new Date(anioActual, mesActual, Fecha);
    const NombreDia = dia.toLocaleDateString('es-ES', { weekday: 'long' });
    eventoDia.innerHTML = NombreDia;
    FechaEvento.innerHTML = Fecha + " " + mesesDelAño[mesActual] + " " + anioActual;
}


function mostarEventos(Fecha){
    Fecha = Number(Fecha);
    let eventos = "";
    aarrEventos.forEach((eventoObj) => {
        
        
        
        if (eventoObj.day === Fecha && eventoObj.month === mesActual + 1 && eventoObj.year === anioActual) {
            eventoObj.eventos.forEach((evento) => {
                eventos += `<div class="evento">
                <div class="evento-titulo">
                <ion-icon name="alert-circle-outline"></ion-icon>
                    <div class="TituloEvento">${evento.titulo}</div>
                    
                </div>
                <div class="evento-hora">${evento.hora}</div>
                </div>`;
            });
    }
    });
    if (eventos === "") {
        eventos = `<div class="no-evento">
        <h3>No hay eventos para este día</h3>
        </div>`;
    }
    contenedoreventos.innerHTML = eventos;

    GuardarEventos();

}



    agregar_evento_btn.addEventListener("click", () => {
        const TituloEvento = evento_titulo.value;
        const HoraEvento = evento_hora.value;

        if (TituloEvento === "" || HoraEvento === "") {
            alert("Debe ingresar un titulo y una hora");
            return;
        }

        const HoraEventoSplit = HoraEvento.split(":");

        if (HoraEventoSplit.length !== 2 || HoraEventoSplit[0] > 23 || HoraEventoSplit[1] > 59 ){
            alert("formato de hora invalido")
        }

        const Hora = CambiarFormatoHora(HoraEvento);

        const NuevoEvento = {
            titulo: TituloEvento,
            hora: Hora,
        };

        let EventoAgregado = false;

        if (aarrEventos.length > 0) {
            aarrEventos.forEach((item) => {
                if (item.day === activeDia && item.month === mesActual + 1 && item.year === anioActual) {
                    item.eventos.push(NuevoEvento);
                    EventoAgregado = true;
                }
            });
        }


        if (!EventoAgregado) {
            
            aarrEventos.push({
                day: activeDia,
                month: mesActual + 1,
                year: anioActual,
                eventos: [NuevoEvento],
            });
        }

        agregar_evento_wrapper.classList.remove("active");
        evento_titulo.value = "";
        evento_hora.value = "";

        mostarEventos(activeDia);

        const muetraQueHayevento = document.querySelector(".dia.acive");
        if(!muetraQueHayevento.classList.contains("evento")){
            muetraQueHayevento.classList.add("evento");
        }

    });


    function CambiarFormatoHora(HoraEvento){
        let HoraEventoSplit = HoraEvento.split(":");
        let Hora = HoraEventoSplit[0];
        let Minuto = HoraEventoSplit[1];

        let formatoHora = Hora >= 12 ? "PM" : "AM";
        Hora = Hora % 12 || 12;
        HoraEvento = Hora + ":" + Minuto + " " + formatoHora;
        return HoraEvento;
    }

    contenedoreventos.addEventListener("click", (e) => {

        if (e.target.classList.contains("evento")) {
            const TituloEvent = e.target.children[0].children[1].innerHTML;
            const confirmacion = confirm("¿Estás seguro de eliminar este evento?");
            if (!confirmacion) {
                return;
            } else {
            aarrEventos.forEach((eventoObj) => {
                if (eventoObj.day === activeDia && eventoObj.month === mesActual + 1 && eventoObj.year === anioActual) {
                    eventoObj.eventos.forEach((item, index) => {
                        if (item.titulo === TituloEvent) {
                            eventoObj.eventos.splice(index, 1);
                        }
                    });

                    if (eventoObj.eventos.length === 0) {
                        aarrEventos.splice(aarrEventos.indexOf(eventoObj), 1);
                        
                        const activeDiaelemento = document.querySelector(".dia.acive");
                        if (activeDiaelemento.classList.contains("evento")) {
                            activeDiaelemento.classList.remove("evento");
                        }
                    }
                }
            });

            mostarEventos(activeDia);
        }
    }
    });

function GuardarEventos(){
        localStorage.setItem("eventos", JSON.stringify(aarrEventos));
}

function CargarEventos(){
if (localStorage.getItem("eventos") === null) {
    return;
}
    aarrEventos.push(...JSON.parse(localStorage.getItem("eventos")));
}

BtnCerrarSesion.addEventListener("click", () => {
    window.location.href = "Regishtml.html";
    alert("Hasta luego, " + localStorage.getItem("usuarioingresado"));
});