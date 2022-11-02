import {
  createUserAppointmentsController,
  createUserController,
  createUserReviewsController,
  deleteUserAppointmentsController,
  deleteUserController,
  listAllAnimalUserController,
  listAllUserAppointmentsController,
  listAllUserController,
  updatedUserReviewsController,
  updateUserController,
} from "../controllers/user/user.cotroller";
import { Router } from "express";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("", createUserController);
  routes.delete("", ensureAuthTokenMiddleware, deleteUserController);
  routes.patch("", ensureAuthTokenMiddleware, updateUserController);
  routes.get("", ensureAuthTokenMiddleware, listAllUserController);
  routes.get(
    "/animals",
    ensureAuthTokenMiddleware,
    listAllAnimalUserController
  );
  routes.post(
    "/appointments",
    ensureAuthTokenMiddleware,
    createUserAppointmentsController
  );
  routes.delete(
    "/appointments/:id",
    ensureAuthTokenMiddleware,
    deleteUserAppointmentsController
  );
  routes.get(
    "/appointments",
    ensureAuthTokenMiddleware,
    listAllUserAppointmentsController
  );
  routes.post(
    "/reviews",
    ensureAuthTokenMiddleware,
    createUserReviewsController
  );
  routes.patch(
    "/reviews/:id",
    ensureAuthTokenMiddleware,
    updatedUserReviewsController
  );

  return routes;
};
