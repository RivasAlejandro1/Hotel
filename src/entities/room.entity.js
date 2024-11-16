import { EntitySchema } from "typeorm";


export default new EntitySchema({
    name: "Room",
    tableName: "Rooms",
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
        tipo: {
            type: "varchar"
        }

    }
})

