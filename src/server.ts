import app from "./app";
import dotenv from "dotenv";
import AppDataSource from "./data-source";
import "dotenv/config";

dotenv.config();

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor executando");
  });
})();
