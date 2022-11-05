import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
<<<<<<< HEAD
=======
        logging: true,
>>>>>>> 85cf5b8df907cb9e60b46251de750bca1e8e2910
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/migrations/*.js"]
            : ["src/migrations/*.ts"],
<<<<<<< HEAD
        ssl: true,
        extra: { ssl: { rejectUnauthorized: false } },
=======
>>>>>>> 85cf5b8df907cb9e60b46251de750bca1e8e2910
      }
);

export default AppDataSource;
//["dist/entities/*.js"] ||
//["dist/migrations/*.js"] ||
