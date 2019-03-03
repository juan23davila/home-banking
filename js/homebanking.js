//Declaración de variables
const nombreUsuario = "Juan Dávila";
let saldoCuenta = 5000;
let limiteExtraccion = 1000;

const costoAgua  = 350;
const costoTele  = 425;
const costoLuz   = 210;
const costoInter = 570;

let cuentaAmiga1 = "1234567";
let cuentaAmiga2 = "7654321";

let codSeguridad = "1357";

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
    const inputLimitExtrc = prompt("Indique cual es el nuevo límite de extracción.");
        
    // Validaciones básicas de la información solicitada por el usuario
    if(validateNumberInput(inputLimitExtrc)){
        let newlimitExtracc = parseInt(inputLimitExtrc);
        limiteExtraccion = newlimitExtracc;
        actualizarLimiteEnPantalla();
        alert("Su nuevo límite de extracción es de $"+limiteExtraccion);
    }
    
}

//Encargada de disminuir el saldo de la cuenta de acuerdo al dinero retirado
function extraerDinero() {
    const inputDinerExtrc = prompt("Por favor ingrese el monto de dinero que desea extraer.");

    // Validaciones básicas de la información solicitada por el usuario
    if(validateNumberInput(inputDinerExtrc)){
        let dineroExtraer = parseInt(inputDinerExtrc);

        if(cumpleCondicionesExtracción(dineroExtraer))
        {
            let saldoAnterior = saldoCuenta;
            restarDinero(dineroExtraer);
            actualizarSaldoEnPantalla();
            alert(
                "Saldo anterior: $"+saldoAnterior+"\n"+
                "Retiro de: $"+dineroExtraer+"\n"+ 
                "Nuevo saldo: $"+ saldoCuenta
            );
        }
    }
}

//Incrementa el dinero que se tiene en la cuenta
function depositarDinero() {
    const iDineroDepositar = prompt("Por favor ingrese el monto de dinero que desea depositar.");

    // Validaciones básicas de la entrada
    if(validateNumberInput(iDineroDepositar)){
        let dineroDepositar = parseInt(iDineroDepositar);
        let saldoAnterior = saldoCuenta;
        sumarDinero(dineroDepositar);
        actualizarSaldoEnPantalla();
        alert(
            "Saldo anterior: $"+saldoAnterior+"\n"+
            "Deposito: $"+dineroDepositar+"\n"+ 
            "Nuevo saldo: $"+ saldoCuenta
        );
    }
}

/**
 * Función para realizar el pago del servicio según la entrada por consola.
 */
function pagarServicio() {
    const servicio = prompt(
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
    const iDineroTransf = prompt("Por favor ingrese la cantidad de dinero a transferir");

    // Validaciones básicas de la entrada
    if(validateNumberInput(iDineroTransf)){
        let dineroTransf = parseInt(iDineroTransf);

        if(suficienteDinero(dineroTransf)){
            let numeroCuenta = prompt("Número de cuenta a la que se hará la transferencia");
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
}

function iniciarSesion() {
    const inCod = prompt("Por favor ingrese el código de seguridad de su cuenta");
    // Se verifica que el código ingresado sea corecto
    if(inCod == codSeguridad){
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
    if(dineroTransac <= saldoCuenta){
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
    let saldoAnterior;

    if(suficienteDinero(costoServicio)){
        saldoAnterior = saldoCuenta;
        restarDinero(costoServicio);
        imprimirPago(servicio, saldoAnterior, costoServicio); 
    }else{
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
    }
}

// Ejecuta validaciones básicas del valor de entrada
function validateNumberInput(entrada){
    // Valida si se hizo clic en cancelar
    if(entrada!=null)
    {
        // Valida que no se reciba vacio
        if(entrada!=""){
            // Valida si el valor en numérico
            if(!isNaN(entrada)){
                return true;
            }
            else{
                alert("El valor ingresado no es numérico");
                return false;
            }
        }else{
            alert("La operación no puede recibir un monto vacio.");
            return false;
        }
    }else{
        return false;
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