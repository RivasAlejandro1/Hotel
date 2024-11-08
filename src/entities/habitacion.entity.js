import { EntitySchema } from "typeorm";


export default new EntitySchema({
    name: "Habitacion",
    tableName: "Habitaciones",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        numero: {
            type: "int",
            unique: true
        },
        Tipo: {
            type: "varchar"
        }

    }
})

