import { Express } from "express";
import { loginRoutes } from "./session.routes";

const appRoutes = (app: Express) => {
    app.use("/login", loginRoutes)
    
};

export default appRoutes;
