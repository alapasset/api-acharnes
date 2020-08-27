import { createConnection } from "typeorm";

export const connectionToPostgres = createConnection({
    type: "postgres",
    host: "ec2-54-217-206-236.eu-west-1.compute.amazonaws.com",
    port:  5432,
    username: "pmbiqnsbeynozg",
    password: "a777f0d776a49e5f6b63f1e3658f9205fa90c31e1e6eba6d54927b7d9a566fc7",
    database: "d2o6qso33kqu66",
    ssl: { rejectUnauthorized : false },
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    synchronize: true,
    logging: false
})
