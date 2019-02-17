//Declaración de variables
var nombreUsuario = "Juan Dávila";
var saldoCuenta = 5000;
var limiteExtraccion = 1000;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


/*** Funciones que tenes que completar ***/
//Se modifica el límite de dinero que un usuario puede extraer
function cambiarLimiteDeExtraccion() {
    var newlimitExtracc = parseInt(prompt("Indique cual es el nuevo límite de extracción."));
    limiteExtraccion = newlimitExtracc;
    actualizarLimiteEnPantalla();
    alert("Su nuevo límite de extracción es de: "+limiteExtraccion);
}

//Encargada de disminuir el saldo de la cuenta de acuerdo al dinero retirado
function extraerDinero() {
    var dineroExtraer = parseInt(prompt("Por favor ingrese el monto de dinero que desea extraer."));
    var saldoAnterior = saldoCuenta;
    restarDinero(dineroExtraer);
    actualizarSaldoEnPantalla();
    alert(
        "Saldo anterior: "+saldoAnterior+"\n"+
        "Retiro de: "+dineroExtraer+"\n"+ 
        "Nuevo saldo: "+ saldoCuenta
    );
}

//Incrementa el dinero que se tiene en la cuenta
function depositarDinero() {
    var dineroDepositar = parseInt(prompt("Por favor ingrese el monto de dinero que desea depositar."));
    var saldoAnterior = saldoCuenta;
    sumarDinero(dineroDepositar);
    actualizarSaldoEnPantalla();
    alert(
        "Saldo anterior: "+saldoAnterior+"\n"+
        "Deposito: "+dineroDepositar+"\n"+ 
        "Nuevo saldo: "+ saldoCuenta
    );
}

function pagarServicio() {

}

function transferirDinero() {

}

function iniciarSesion() {

}

/*** Funciones nuevas solicitadas por el curso ***/
//Funcion para sumar dinero
function sumarDinero(dinero){
    saldoCuenta += dinero;
}

//Funcion para restar dinero
function restarDinero(dinero){
    saldoCuenta -= dinero;
}

/*** Funciones que actualizan el valor de las variables en el HTML ***/
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}