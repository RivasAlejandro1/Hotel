import { itsADate } from "./typeValidation";
import { itsABoolean, itsANumber } from "./typeValidation";

export const SearchSRValidation  =  (infoDate) => {
 
    const {
        entryDate,
        departureDate,
        paid,
        room,
        user
    } = infoDate;

    itsADate(entryDate);
    itsADate(departureDate);
    itsANumber(room);
    itsANumber(user);
    itsABoolean({
        boolean: paid,
        type: "string"
    })
    
    paid

}   