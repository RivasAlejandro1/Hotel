
const checkIdNumber = async  (req, res, next)=>{
    const validarNumero = /^\d+$/ 
    
    if(!validarNumero.test(req.params.id)) {
        res.status(400).send("El id debe ser un numero");
    } else{
        next();
    }
}

export default checkIdNumber;
