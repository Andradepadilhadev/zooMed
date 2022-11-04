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
import ensureForbiddenFieldsMiddleware from "../middlewares/ensureForbiddenFieldsMiddleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("", createUserController);

  routes.patch("", ensureAuthTokenMiddleware, deleteUserController);

  routes.patch(
    "",
    ensureAuthTokenMiddleware,
    ensureForbiddenFieldsMiddleware,
    updateUserController
  );

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

  routes.patch(
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
