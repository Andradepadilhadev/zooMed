import { Router } from "express" 
import loginController from "../controllers/session/session.controllers"

const routes = Router()

export const loginRoutes = () => {
    routes.post("", loginController);
    return routes
}