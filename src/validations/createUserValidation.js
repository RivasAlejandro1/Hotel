import { compareAsc } from 'date-fns';

const lengthValidation = /^[A-Za-z]{5,50}$/;
const containsASpecialCharaterValidation = /[^\w\s]/;
const itHasANumberValidation = /\d/;

const cedulaLengthValidation = /^\d{7,8}$/;
const onlyNumbers = /^\d+$/;

function validateName(name, text){
    if(itHasANumberValidation.test(name)) throw new Error(`El ${text} no puede contener numeros`)
    if(containsASpecialCharaterValidation.test(name)) throw new Error(`El ${text} no puede contener un caracter especial`)
    if(!lengthValidation.test(name)) throw new Error(`El ${text} debe contener entre 5 a 50 letras`)
                
}
            
function validateCedula(cedula){
    if(!onlyNumbers.test(cedula)) throw new Error(`La cedula solo debe contener numeros`)
    if(!cedulaLengthValidation.test(cedula)) throw new Error(`La cedula debe contener entre 7 y 8 numeros`)           
}

function validateBirthdate(infoDate){
    if(Number.isNaN(Date.parse(infoDate))) throw new Error(`La fecha ${infoDate} no es un formato de fecha valido`);
    const date = new Date(infoDate);
    const current = new Date();
    const oldMayor = new Date(`${current.getFullYear-18}-${current.getMonth()}-${current.getDate()}`);
    if( compareAsc(date, new Date()) == 1 ) throw new Error(`La fecha no puede ser posterior a hoy`);
    if( compareAsc(date, oldMayor) == 1) throw new Error(`La persona que se registra debe ser mayor de edad`);

}   


export default function validateUser(name, lastName, birthdate, cedula){
    validateName(name, "nombre");
    validateName(lastName, "apellido");
    validateCedula(cedula);
    validateBirthdate(birthdate);

    return true;
}