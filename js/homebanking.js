//Declaración de variables
var nombreUsuario = "Juan Dávila";
var saldoCuenta = 5000;
var limiteExtraccion = 1000;

var costoAgua  = 350;
var costoTele  = 425;
var costoLuz   = 210;
var costoInter = 570;

var cuentaAmiga1 = "1234567";
var cuentaAmiga2 = "7654321";

var codSeguridad = "1357";

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}


/*** Funciones que tenes que completar ***/
//Se modifica el límite de dinero que un usuario puede extraer
function cambiarLimiteDeExtraccion() {
    var newlimitExtracc = parseInt(prompt("Indique cual es el nuevo límite de extracción."));
    limiteExtraccion = newlimitExtracc;
    actualizarLimiteEnPantalla();
    alert("Su nuevo límite de extracción es de $"+limiteExtraccion);
}

//Encargada de disminuir el saldo de la cuenta de acuerdo al dinero retirado
function extraerDinero() {
    var dineroExtraer = parseInt(prompt("Por favor ingrese el monto de dinero que desea extraer."));

    if(cumpleCondicionesExtracción(dineroExtraer))
    {
        var saldoAnterior = saldoCuenta;
        restarDinero(dineroExtraer);
        actualizarSaldoEnPantalla();
        alert(
            "Saldo anterior: $"+saldoAnterior+"\n"+
            "Retiro de: $"+dineroExtraer+"\n"+ 
            "Nuevo saldo: $"+ saldoCuenta
        );
    }
}

//Incrementa el dinero que se tiene en la cuenta
function depositarDinero() {
    var dineroDepositar = parseInt(prompt("Por favor ingrese el monto de dinero que desea depositar."));
    var saldoAnterior = saldoCuenta;
    sumarDinero(dineroDepositar);
    actualizarSaldoEnPantalla();
    alert(
        "Saldo anterior: $"+saldoAnterior+"\n"+
        "Deposito: $"+dineroDepositar+"\n"+ 
        "Nuevo saldo: $"+ saldoCuenta
    );
}

function pagarServicio() {
    var saldoAnterior;
    var servicio = parseInt(prompt(
                    "Ingrese el número que corresponde con el servicio que quiere pagar:\n"+
                    "1 - Agua\n"+
                    "2 - Luz\n"+
                    "3 - Internet\n"+
                    "4 - Teléfono"
                   ));

    // Se valida servicio seleccionado
    switch(servicio){
        case 1: //Pago de Agua
            if(suficienteDinero(costoAgua)){
                saldoAnterior = saldoCuenta;
                restarDinero(costoAgua);
                imprimirPago("agua", saldoAnterior, costoAgua); 
            }else{
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
            }
            break;
        case 2: //Pago Luz
            if(suficienteDinero(costoLuz)){
                saldoAnterior = saldoCuenta;
                restarDinero(costoLuz);
                imprimirPago("luz", saldoAnterior, costoLuz); 
            }else{
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
            }
            break;
        case 3: //Pago Internet
            if(suficienteDinero(costoInter)){
                saldoAnterior = saldoCuenta;
                restarDinero(costoInter); 
                imprimirPago("internet", saldoAnterior, costoInter); 
            }else{
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
            }
            break;
        case 4: //Pago Teléfono
            if(suficienteDinero(costoTele)){
                saldoAnterior = saldoCuenta;
                restarDinero(costoTele); 
                imprimirPago("teléfono", saldoAnterior, costoTele); 
            }else{
                alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
            }
            break;
        default:
            alert("El servicio seleccionado no existe");
    }

    actualizarSaldoEnPantalla();
}

function transferirDinero() {
    var numeroCuenta;
    var dineroTransf = parseInt(prompt(
        "Por favor ingrese la cantidad de dinero a transferir"
    ));

    if(suficienteDinero(dineroTransf)){
        numeroCuenta = prompt("Número de cuenta a la que se hará la transferencia");
        // Se valida si la cuenta ingresada corresponde a una cuenta amiga
        if(numeroCuenta == cuentaAmiga1 || numeroCuenta == cuentaAmiga2){
            restarDinero(dineroTransf);
            actualizarSaldoEnPantalla();
            alert("Se han transferido $"+dineroTransf+"\n"+
                  "Cuenta destino: "+numeroCuenta);
        }else{
            alert("Solo se puede transferir dinero a una cuenta amiga");
        }
    }else{
        alert("Saldo insuficiente en la cuenta.");
    }
}

function iniciarSesion() {
    numeroCuenta = prompt("Por favor ingrese el código de seguridad de su cuenta");
    // Se verifica que el código ingresado sea corecto
    if(numeroCuenta == codSeguridad){
        alert("Bienvenido/a "+nombreUsuario+" ya puedes comenzar a realizar operaciones.");
    }else{
        saldoCuenta = 0;
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
        actualizarSaldoEnPantalla();
    }
}

/*** 
 * Funciones nuevas solicitadas por el curso 
 */
//Funcion para sumar dinero
function sumarDinero(dinero){
    saldoCuenta += dinero;
}

//Funcion para restar dinero
function restarDinero(dinero){
    saldoCuenta -= dinero;
}

/*** 
 * Funciones creadas por cuentra propia
 */
function cumpleCondicionesExtracción(dineroExtraer){
    //Valida si su saldo es suficiente para el monto que quiere retirar
    if(suficienteDinero(dineroExtraer)){
        //Valida que el monto a retirar no exeda el límite de extracción fijado.
        if (dineroExtraer <= limiteExtraccion) {
            //Valida si el dinero solicitado se puede entregar con billetes de 100
            if(dineroExtraer%100 == 0){
                return true;
            }
            else{
                alert(
                    "El monto que se quiere extraer no puede ser entregado porque Home Banking "+
                    "solo entrega billetes de 100, por favor ajusta el valor solicitado.");
                return false;
            }
        }else{
            alert("La cantidad de dinero que desea extraer es mayor al límite de extracción configurado.");
            return false;
        }
    }else{
        alert("No hay saldo dispoible en su cuenta para extraer esa cantidad de dinero.")
        return false;
    }
}

// Valida si existe suficiente dinero en la cuenta para realizar la transacción
function suficienteDinero(dineroTransac){
    if(dineroTransac < saldoCuenta){
        return true;
    }else{
        return false;
    }
}

// Muestra mensaje de pago exitoso
function imprimirPago(servicio, saldoAnterior, costoServicio){
    alert(
        "Has pagado el servicio "+servicio+".\n"+
        "Saldo anterior: $"+saldoAnterior+"\n"+
        "Dinero descontado: $"+costoServicio+"\n"+ 
        "Saldo actual: $"+ saldoCuenta
    );
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