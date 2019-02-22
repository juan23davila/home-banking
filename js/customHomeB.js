/********************************
 ****** Variables Globales ******
 *******************************/
//Capacidad mínima que un usuario debe tener en la cuenta para adquirir una deuda
var montoMinimoPrestamo = 300;


/********************************
 ********** Funciones **********
 *******************************/
function prestarDinero(){
    var respuesta = confirm("¿Desea saber le podemos prestar dinero?");

    if(respuesta){
        var montoPrestamos = cuantoPrestamos();

        if(montoPrestamos != 0){
            var quieroPrestamo = confirm("Puedes adquirir un prestamo de $"+montoPrestamos+"\n"+
                                         "¿Deseas hacer una proyección?");

            //Se muestra proyección del prestamo si el usuario decidió adquirir prestamo.
            if(quieroPrestamo){
                generarPrestamo(montoPrestamos);
            }
        }else{
            alert("Desafortunadamente su capacidad de endeudamiento no le "+ 
                "permite adquirir un crédito en este momento");
        }
    }
}

/**
 * Indica el valor del prestamo que tiene aprobado un cliente
 */
function cuantoPrestamos(){
    var saldoPrestamos = 0;

    if(saldoCuenta > montoMinimoPrestamo){
        saldoPrestamos = saldoCuenta * 3; 
    }

    return saldoPrestamos;
}

/**
 * Genera visualmente la proyección del préstamo
 */
function generarPrestamo(montoPrestamos){
    alert("Ya le voy a prestar");
}