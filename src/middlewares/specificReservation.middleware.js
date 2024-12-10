export default function cleanBodySpecificReservation(req, res, next){

    
    const { 
        entryDate, 
        departureDate, 
        paid, 
        room, 
        user
    } = req.body;
    
    
    const info =  { 
        entryDate, 
        departureDate, 
        paid, 
        room, 
        user
    };

    const searchInfo = {}

    if(info.entryDate) searchInfo.entryDate = info.entryDate;
    if(info.departureDate) searchInfo.departureDate = info.departureDate;
    if(info.paid) searchInfo.paid = info.paid;
    if(info.room) searchInfo.room = {id: info.room};
    if(info.user) searchInfo.user = {id: info.user};

    req.body = searchInfo;

    next();


}