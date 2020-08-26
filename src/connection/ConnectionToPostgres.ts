import { createConnection } from "typeorm";

export const connectionToPostgres = createConnection({
    type: "postgres",
    host: "ec2-52-31-94-195.eu-west-1.compute.amazonaws.com",
    port:  5432,
    username: "nbvkxlunulvxsk",
    password: "a77c0640f55d41b9009d7fd7ba01905f076b3446c8c093cec403439178b5c453",
    database: "d41anu81hv9osp",
    ssl: { rejectUnauthorized : false },
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    synchronize: true,
    logging: false
})
