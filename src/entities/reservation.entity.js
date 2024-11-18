import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Reservation",
    tableName: "reservations",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        entryDate: {
            type: "date"
        },
        departureDate: {
            type: "date"
        },
        paid: {
            type: "boolean"
        }
    },
    relations:{
        room:{
            target: "Room",
            type: "many-to-one",
            
        },
        user: {
            target: "User",
            type: "many-to-one"
        }
    }
})

