import { Usuarios } from "./Usuarios.js";

const usuarioAdmin = new Usuarios("admin", "123", "admin@admin");



 const btn = document.getElementById("btn--InicioSecion");
 const btn2 = document.getElementById("btn--Registro");
 const btn3 = document.getElementById("btnInicioSecion");
 const btn4 = document.getElementById("btnRegistro");
const contenedor = document.querySelector(".contenedor");


btn.addEventListener("click", ()=>{
    contenedor.classList.remove("Cambio");
});

btn2.addEventListener("click", ()=>{
    contenedor.classList.add("Cambio");
}); 

btn3.addEventListener("click", ()=>{
    const correoIngresado = document.querySelector(".Mail").value;
    const contrasenaIngresada = document.querySelector(".Contrasena").value;

    // Validar que el correo y contraseña no estén vacíos
    if (correoIngresado.trim() === "" || contrasenaIngresada.trim() === "") {
      alert("Por favor, ingresa ambos el correo y la contraseña.");
      return;
    }

    // Obtener la lista de usuarios guardados en localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar si existe un usuario que coincida con el correo y la contraseña ingresados
    const usuarioEncontrado = usuariosGuardados.find(usuario => 
      usuario.mailUsuario === correoIngresado && usuario.contrasenaUsuario === contrasenaIngresada
    );

    if (usuarioEncontrado) {
        window.location.href = "Calendario.html";
      alert(`Bienvenido, ${usuarioEncontrado.nombreUsuario}`);
      localStorage.setItem("usuarioingresado", usuarioEncontrado.nombreUsuario);
      
    } else {
      alert("Correo o contraseña incorrectos. Por favor, intenta de nuevo.");
    }
  });

  
btn4.addEventListener("click", ()=>{
    const correo = document.querySelector(".Mail1").value;
    const usuario = document.querySelector(".UsuarioIngresado").value;
    const contrasena1 = document.querySelector(".Contrasena1").value;
    
    // Validación de los campos
    if (!correo.includes("@")) {
      alert("El correo debe ser un correo valido.");
      return;
    }
    if (usuario.trim() === "") {
      alert("El nombre de usuario no puede estar vacío.");
      return;
    }
    if (contrasena1.length < 3) {
      alert("La contraseña debe tener al menos 3 caracteres.");
      return;
    }

    // Crear una nueva instancia de la clase Usuarios
    const nuevoUsuario = new Usuarios(usuario, contrasena1, correo);

    // Guardar en localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosGuardados.push(nuevoUsuario.toJSON()); // Convertimos a JSON
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    alert("Registro exitoso");
  });



