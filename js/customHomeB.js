/********************************
 ****** Variables Globales ******
 *******************************/
//Capacidad mínima que un usuario debe tener en la cuenta para adquirir una deuda
const montoMinimoPrestamo = 300;
let   interfaceText = "";
let   flagLean = true;
let   gPrestamo;
let   gLimitPrestamos;
const interesBancario = 0.01;
let   cuotaMes;
let   months;
let   stTableDetail = "";


/********************************
 ********** Funciones **********
 *******************************/
function prestarDinero(){
    if(flagLean){
        let montoPrestamos = cuantoPrestamos();
        gPrestamo = montoPrestamos;
        gLimitPrestamos = gPrestamo;

        if(montoPrestamos != 0){
            flagLean = false;
            generarPrestamo(montoPrestamos);
        }else{
            alert("Desafortunadamente su capacidad de endeudamiento no le "+ 
                "permite adquirir un crédito en este momento.");
        }
    }else{
        alert("Ya generó cálculo de préstamo.");
    }
    
}

/**
 * Indica el valor del prestamo que tiene aprobado un cliente
 */
function cuantoPrestamos(){
    let saldoPrestamos = 0;

    if(saldoCuenta > montoMinimoPrestamo){
        saldoPrestamos = saldoCuenta * 3; 
    }

    return saldoPrestamos;
}

/**
 * Genera visualmente la proyección del préstamo
 */
function generarPrestamo(montoPrestamos){
    addText("<div class=\"white-container\" id=\"secondSec\">");
    addText("   <div id=\"calArea\">");
    addText("   <div class=\"menu-container\">");
    addText("       <h1 class=\"objetivo\">Proyección de préstamo</h1>");
    createForm();
    addText("   </div>");
    addText("   <div class=\"green-container\">");
    addText("       <div class=\"cuenta-info\">");
    addText("           <p>Crédito aprobado</p>");
    addText("           <h3 id=\"saldo-prestamo\"></h3>")
    addText("           <button type=\"button\" class=\"verDetalle\" onclick=\"cambiarMontoPrestamo()\">Cambiar Monto</button>");
    addText("       </div>");
    addText("   </div>");
    addText("   </div>");
    addText("   <div id=\"proyecArea\"></div>")
    addText("</div>");
     
    document.getElementById("lend-container").innerHTML = interfaceText;
    document.getElementById("saldo-prestamo").innerHTML = "$"+montoPrestamos;
}

/**
 * Formulario para indicar a cuantos años quiere la deuda
 */
function createForm(){
    addText("       <div class=\"form-group\">");
    addText("           <label for=\"monthsId\">Meses del préstamo:</label>");
    addText("           <input class=\"form-control\" id=\"monthsId\" placeholder=\"número de meses\">");
    addText("       </div>");
    addText("       <button class=\"btn\" onclick=\"getSubmitmonthsLean()\">Consultar</button>");
}

/**
 * Cambia el monto que se le presta al usuario
 */
function cambiarMontoPrestamo(){
    let newSaldo = prompt("Solicite un prestamos de hasta $"+gLimitPrestamos);
    validateNumberInput(newSaldo);
    gPrestamo = parseInt(newSaldo);
    if(gPrestamo <= gLimitPrestamos){
        document.getElementById("saldo-prestamo").innerHTML = "$"+gPrestamo;
    }else{
        alert("El crédito solicitado supera el máximo permitido.")
        gPrestamo = gLimitPrestamos;
    }
}


/**
 * Concatena texto que será impreso en el área de prestamos
 */
function addText(texto){
    interfaceText = interfaceText + texto + "\n";
    console.log(interfaceText);
}

/**
 * Calcular la cuota mensual del prestamo dado meses indicado por el usuario"
 */
function getSubmitmonthsLean(){
    months = document.getElementById('monthsId').value;
    validateNumberInput(months);
    cuotaMes = cuotaMensual(gPrestamo, months);
    console.log(cuotaMes);
    mostrarCuota(cuotaMes);
}

/**
 * Retorna valor de la cuota mensual
 */
function cuotaMensual(montoPrestamos, months){
    var superior = interesBancario * montoPrestamos;
    inferior = 1 - Math.pow(1+interesBancario, -months);
    return Math.round(superior / inferior);
}

/**
 * Muestra la Cuota mensual a pagar por el usuario
 */
function mostrarCuota(cuotaMes){
    let   interfaceCuota = "";
    interfaceCuota = "<p class=\"info\">Su couta mensual será de:</p>\n";
    interfaceCuota += "<h3 class=\"valor\">$"+cuotaMes+"</h3>\n";
    interfaceCuota += "<div id=\"det\"></div>\n";
    interfaceCuota += "</div>\n";
    document.getElementById("proyecArea").innerHTML = interfaceCuota;
    document.getElementById("det").innerHTML = "   <button type=\"button\" class=\"verDetalle\" onclick=\"crDetailTable()\">Ver detalle.</button>\n";
}

/**
 * Crea detalle
 */
function crDetailTable(){
    stTableDetail += "<table class=\"table\">\n";
    stTableDetail += "  <thead>\n";
    stTableDetail += "      <tr>\n";
    stTableDetail += "          <th scope=\"col\" class=\"thLean\">Cuota</th>\n";
    stTableDetail += "          <th scope=\"col\" class=\"thLean\">Deuda</th>\n";
    stTableDetail += "          <th scope=\"col\" class=\"thLean\">Abono a Interés</th>\n";
    stTableDetail += "          <th scope=\"col\" class=\"thLean\">Abono a Capital</th>\n";
    stTableDetail += "          <th scope=\"col\" class=\"thLean\">Pago</th>\n";
    stTableDetail += "      </tr>\n";
    stTableDetail += "  </thead>\n";
    createPayDetail();
    stTableDetail += "</table>\n";
    stTableDetail += "<br>\n";
    stTableDetail += "<button type=\"button\" class=\"verDetalle\" onclick=\"finalizar()\">Solicitar</button>\n";
    document.getElementById("det").innerHTML = stTableDetail;
}

/**
 * interesBancario = 0.01;
    cuotaMes;
    months;
    gPrestamo
 */
function createPayDetail(){
    let deuda = gPrestamo;
    let pagoInteres = deuda*interesBancario;
    let pagoCapital = cuotaMes - pagoInteres;

    stTableDetail += "  <tbody>\n";
    stTableDetail += "      <tr>\n";
    stTableDetail += "      <th scope=\"row\">1</th>\n";
    stTableDetail += "      <td>"+deuda+"</td>\n";
    stTableDetail += "      <td>"+pagoInteres+"</td>\n";
    stTableDetail += "      <td>"+pagoCapital+"</td>\n";
    stTableDetail += "      <td>"+cuotaMes+"</td>\n";
    stTableDetail += "      </tr>\n";

    for (let index = 1; index < months; index++) {
        console.log("deuda: "+deuda);
        deuda = Math.round(deuda + pagoInteres - cuotaMes);
        console.log("deuda: "+deuda);
        pagoInteres = Math.round(deuda*interesBancario);
        pagoCapital = cuotaMes - pagoInteres;

        stTableDetail += "      <tr>\n";
        stTableDetail += "      <th scope=\"row\">"+(index+1)+"</th>\n";
        stTableDetail += "      <td>"+deuda+"</td>\n";
        stTableDetail += "      <td>"+pagoInteres+"</td>\n";
        stTableDetail += "      <td>"+pagoCapital+"</td>\n";
        stTableDetail += "      <td>"+cuotaMes+"</td>\n";
        stTableDetail += "      </tr>\n";
    }

    stTableDetail += "  </tbody>\n";
}

/**
 * Finaliza ejecución del préstamo;
 */
function finalizar(){
    alert("Un gerente de cuenta se contactará con usted en las próximas 24 horas para coordinar el desembolso.");
    document.getElementById("lend-container").innerHTML = "";
    flagLean = true;
    interfaceText = "";
    gPrestamo = 0;
    gLimitPrestamos = 0;
    cuotaMes = 0;
    months = 0;
    stTableDetail = "";
}