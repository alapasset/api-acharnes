import { createConnection } from "typeorm"

const connectionString = process.env.DATABASE_URL || "postgres://pmbiqnsbeynozg:a777f0d776a49e5f6b63f1e3658f9205fa90c31e1e6eba6d54927b7d9a566fc7@ec2-54-217-206-236.eu-west-1.compute.amazonaws.com:5432/d2o6qso33kqu66"

export const connectionToPostgres = createConnection({
    type: "postgres",
    url: connectionString,
    ssl: { rejectUnauthorized : false },
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    synchronize: true,
    logging: false
})
