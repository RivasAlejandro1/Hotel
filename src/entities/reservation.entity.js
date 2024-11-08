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
        fechaDeEntrada: {
            type: "date"
        },
        fechaDeSalida: {
            type: "date"
        },
        cancelado: {
            type: "boolean"
        }
    },
    relations:{
        habitaciones:{
            target: "Habitacion",
            type: "many-to-one",
            
        },
        users: {
            target: "User",
            type: "many-to-one"
        }
    }
})

