

export const itsANumber = (number, infoTexto = "Dato") =>{
    
    const onlyNumbers = /^\d+$/;
    
    if(!onlyNumbers.test(number)) throw new Error(`${infoTexto} debe ser tipo numerico`)
}
export const itsABoolean = ({boolean, infoTexto = "Dato", type = "boolean"}) =>{
    
    if(type == "string"){
        if(boolean != "true" && boolean != "false" ) throw new Error(`${infoTexto} debe ser true o false`)
        
    }
    if(type == "boolean") if(typeof boolean != "boolean" ) throw new Error(`${infoTexto} debe ser tipo booleano`)
}



export const itsADate = (date)=>{
    if(Number.isNaN(Date.parse(date))) throw new Error(`La fecha ${date} no es un formato de fecha valido`);
}