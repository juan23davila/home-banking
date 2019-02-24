/********************************
 ****** Variables Globales ******
 *******************************/
//Capacidad mínima que un usuario debe tener en la cuenta para adquirir una deuda
const montoMinimoPrestamo = 300;
let interfaceText = "";
let flagLean = true;


/********************************
 ********** Funciones **********
 *******************************/
function prestarDinero(){
    if(flagLean){
        const respuesta = confirm("¿Desea saber si le podemos prestar dinero?");

        if(respuesta){
            let montoPrestamos = cuantoPrestamos();

            if(montoPrestamos != 0){
                flagLean = false;
                generarPrestamo(montoPrestamos);
            }else{
                alert("Desafortunadamente su capacidad de endeudamiento no le "+ 
                    "permite adquirir un crédito en este momento.");
            }
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
    addText("<div class=\"white-container\">");
    addText("   <div class=\"menu-container\">");
    addText("       <h1 class=\"objetivo\">Proyección de préstamo</h1>");
    createForm();
    addText("   </div>");
    addText("   <div class=\"green-container\">");
    addText("       <div class=\"cuenta-info\">");
    addText("           <p>Crédito aprobado</p>");
    addText("           <h3 id=\"saldo-cuenta\">$"+montoPrestamos+"</h3>")
    addText("       </div>");
    addText("   </div>");
    addText("</div>");
     
    document.getElementById("lend-container").innerHTML = interfaceText;
}

/**
 * Formulario para indicar a cuantos años quiere la deuda
 */
function createForm(){
    addText("       <h1 class=\"objetivo\">Proyección de préstamo</h1>");
    addText("       <div class=\"form-group\">");
    addText("           <label for=\"exampleInputEmail1\">Años del préstamo:</label>");
    addText("           <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"5\">");
    addText("       </div>");
    addText("       <button class=\"btn\" onclick=\"getSubmitYearsLean()\">Consultar</button>");
}


/**
 * Concatena texto que será impreso en el área de prestamos
 */
function addText(texto){
    interfaceText = interfaceText + texto + "\n";
    console.log(interfaceText);
}

/**
 * Metodo para obtener el submit de "yearsLean"
 */
function getSubmitYearsLean(){
    alert("Ya funciona el submit Button");
}