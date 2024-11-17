const onlyNumbers = /^\d+$/;
const numberLengthValidation = /^\d{1,3}$/;
const itsHasTwoDecimals = /^\d+(\.\d{1,2})?$/;
const types = [
    "single",
    "double",
    "triple"
]


export const validateRoomNumber = (number) =>{
    if(!onlyNumbers.test(number)) throw new Error("El numero de habitación debe ser un numero");
    if(!numberLengthValidation.test(number)) throw new Error("El numero de habitación debe tener entre 1 a 3 digitos");
}

export const validateRoomType = (type) =>{
    const ItisAValidType = types.includes(type);
    if(!ItisAValidType) throw new Error("El tipo de la habitación no es un tipo valido")
}

export const validatePrice = (price) =>{
    if(!itsHasTwoDecimals.test(price)) throw new Error("El precio debe ser un numero que tenga dos decimales");
    
}
