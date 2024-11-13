export class Usuarios {
    #idUsuario;
    #nombreUsuario;

    #contrasenaUsuario;
    #mailUsuario;
    static aux = 0;

    constructor(nombreUsuario,  contrasenaUsuario, mailUsuario){
        this.#idUsuario = Usuarios.aux ++;
        this.#nombreUsuario = nombreUsuario;
        this.#contrasenaUsuario = contrasenaUsuario;
        this.#mailUsuario = mailUsuario;
    }
    get idUsuario(){
        return this.#idUsuario;
    }
    get nombreUsuario(){
        return this.#nombreUsuario;
    }

    get contrasenaUsuario(){
        return this.#contrasenaUsuario;
    }
    get mailUsuario(){
        return this.#mailUsuario;
    }

    set mailUsuario(mailUsuario){
        this.#mailUsuario = mailUsuario;
    }
    set nombreUsuario(nombreUsuario){
        this.#nombreUsuario = nombreUsuario;
    }

    set contrasenaUsuario(contrasenaUsuario){
        this.#contrasenaUsuario = contrasenaUsuario;
    }
    toJSON() {
        return {
          idUsuario: this.#idUsuario,
          nombreUsuario: this.#nombreUsuario,
          contrasenaUsuario: this.#contrasenaUsuario,
          mailUsuario: this.#mailUsuario
        };
      }
}