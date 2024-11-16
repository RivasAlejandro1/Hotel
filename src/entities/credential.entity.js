import { EntitySchema } from "typeorm";


export default new EntitySchema({
    name: "Credential",
    tableName: "credentials",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "varchar",
            length: 50
        },
        password: {
            type: "varchar",
            length: 100
        }

    },
    relations: {
        user: {
            type: "one-to-one",
            target: "User",
            joinColumn: true,
            joinTable: true,
            cascade: true
        }
    }
})

