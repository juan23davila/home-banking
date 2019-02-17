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
    var inputLimitExtrc = prompt("Indique cual es el nuevo límite de extracción.");
    // Valida que no se presione el boton cancelar
    if(inputLimitExtrc!=undefined)
    {
        // Valida que no se reciba vacio
        if(inputLimitExtrc!=""){
            var newlimitExtracc = parseInt(inputLimitExtrc);
            limiteExtraccion = newlimitExtracc;
            actualizarLimiteEnPantalla();
            alert("Su nuevo límite de extracción es de $"+limiteExtraccion);
        }else{
            alert("Debe ingresar un monto de Limite de Extracción.");
        }
        
    }
    
}

//Encargada de disminuir el saldo de la cuenta de acuerdo al dinero retirado
function extraerDinero() {
    var inputDinerExtrc = prompt("Por favor ingrese el monto de dinero que desea extraer.");
    var dineroExtraer;

    // Valida que no se presione el boton cancelar
    if(inputDinerExtrc!=undefined)
    {
        // Valida que no se reciba vacio
        if(inputDinerExtrc!=""){
            dineroExtraer = parseInt(inputDinerExtrc);
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
        }else{
            alert("Debe ingresar un monto de Retiro.");
        }
    }
}

//Incrementa el dinero que se tiene en la cuenta
function depositarDinero() {
    var iDineroDepositar = prompt("Por favor ingrese el monto de dinero que desea depositar.");
    var dineroDepositar;

    // Valida que no se presione el boton cancelar
    if(iDineroDepositar!=undefined)
    {
        // Valida que no se reciba vacio
        if(iDineroDepositar!=""){
            dineroDepositar = parseInt(iDineroDepositar);
            var saldoAnterior = saldoCuenta;
            sumarDinero(dineroDepositar);
            actualizarSaldoEnPantalla();
            alert(
                "Saldo anterior: $"+saldoAnterior+"\n"+
                "Deposito: $"+dineroDepositar+"\n"+ 
                "Nuevo saldo: $"+ saldoCuenta
            );
        }else{
            alert("Debe ingresar un monto de Deposito.");
        }
    }
}

/**
 * Función para realizar el pago del servicio según la entrada por consola.
 */
function pagarServicio() {
    var servicio = prompt(
                    "Ingrese el número que corresponde con el servicio que quiere pagar:\n"+
                    "1 - Agua\n"+
                    "2 - Luz\n"+
                    "3 - Internet\n"+
                    "4 - Teléfono"
                   );
    
    // Valida que no se presione el boton cancelar
    if(servicio!=undefined)
    {
        // Valida que no se reciba vacio
        if(servicio!=""){
            // Se valida servicio seleccionado
            switch(servicio){
                case "1": //Pago de Agua
                    transacciónServicio(costoAgua, "agua");
                    break;
                case "2": //Pago Luz
                    transacciónServicio(costoLuz, "luz");
                    break;
                case "3": //Pago Internet
                    transacciónServicio(costoInter, "internet");
                    break;
                case "4": //Pago Teléfono
                    transacciónServicio(costoTele, "teléfono");
                    break;
                default:
                    alert("El servicio seleccionado no existe");
            }
            actualizarSaldoEnPantalla();
        }else{
            alert("No se indicó servicio a pagar");
        }
    }
}

function transferirDinero() {
    var numeroCuenta;
    var iDineroTransf = prompt("Por favor ingrese la cantidad de dinero a transferir");
    var dineroTransf;

    // Valida que no se presione el boton cancelar
    if(iDineroTransf!=undefined)
    {
        // Valida que no se reciba vacio
        if(iDineroTransf!=""){
            dineroTransf = parseInt(iDineroTransf);
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
        }else{
            alert("Debe ingresar un monto a transferir.");
        }
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
 * Funciones creadas por Juan David 
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

// Ejecuta la transacción del pago del servicio
function transacciónServicio(costoServicio, servicio){
    var saldoAnterior;

    if(suficienteDinero(costoServicio)){
        saldoAnterior = saldoCuenta;
        restarDinero(costoServicio);
        imprimirPago(servicio, saldoAnterior, costoServicio); 
    }else{
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
    }
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