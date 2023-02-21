const env = require("dotenv").config();

const config = {
    DEV: {
        HOST: env.parsed.DB_HOST,
        USER: env.parsed.DB_USER,
        PASSWORD: env.parsed.DB_PASSWORD,
        DB: env.parsed.DB_NAME,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    test: {
        HOST: env.parsed.DB_HOST,
        USER: env.parsed.DB_USER,
        PASSWORD: env.parsed.DB_PASSWORD,
        DB: env.parsed.DB_NAME,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    PROD: {
        HOST: env.DB_HOST,
        USER: env.DB_USERNAME,
        PASSWORD: env.DB_PASSWORD,
        DB: env.DB_NAME,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};

module.exports = { config };
