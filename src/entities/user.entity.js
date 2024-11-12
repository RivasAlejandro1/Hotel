import { EntitySchema } from "typeorm";




export default new EntitySchema({
   
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 50
        },
        lastName: {
            type: "varchar",
            length: 50
        },
        birthdate: {
            type: "date"
        },
        cedula: {
            type: "int",
            unique: true
        },
        administrador: {
            type: "boolean"
        }

    }
})

