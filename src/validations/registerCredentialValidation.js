
export function validateEmail(email){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(email)) throw new Error("El email no es valido"); 
}

export function validatePassword(password){
    const withoutSpaceRegex = /^[^\s]*$/;
    const lengthRegex = /^.{8,50}$/;
    const containCapitalLetterRegex = /[A-Z]/;
    const containNumberRegex = /\d/;
    const containSpecialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if(!withoutSpaceRegex.test(password)) throw new Error("La contraseña no puede contener espacios");
    if(!lengthRegex.test(password)) throw new Error("La contraseña debe tener entre 8 a 50 caracteres");
    if(!containCapitalLetterRegex.test(password)) throw new Error("La contraseña debe tener almenos una mayuscula");
    if(!containNumberRegex.test(password)) throw new Error("La contraseña debe tener almenos un numero");
    if(!containSpecialCharRegex.test(password)) throw new Error("La contraseña debe tener almenos un caracter especial");

}