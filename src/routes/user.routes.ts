import {
  createUserAppointmentsController,
  createUserController,
  createUserReviewsController,
  deleteUserAppointmentsController,
  deleteUserController,
  listAllAnimalUserController,
  listAllUserAppointmentsController,
  listAllUserController,
  listUsersReviewsController,
  updatedUserReviewsController,
  updateUserController,
} from "../controllers/user/user.cotroller";
import { Router } from "express";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureForbiddenFieldsMiddleware from "../middlewares/ensureForbiddenFieldsMiddleware";
import ensureUserMiddleware from "../middlewares/ensureUser.middleware";
import listSelfController from "../controllers/session/listSelf.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("", createUserController);

  routes.get("/profile", ensureAuthTokenMiddleware, listSelfController);

  routes.patch(
    "/:id",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    deleteUserController
  );

  routes.patch(
    "",
    ensureAuthTokenMiddleware,
    ensureForbiddenFieldsMiddleware,
    ensureUserMiddleware,
    updateUserController
  );

  routes.get("", ensureAuthTokenMiddleware, listAllUserController);

  routes.get(
    "/animals",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    listAllAnimalUserController
  );

  routes.post(
    "/appointments",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    createUserAppointmentsController
  );

  routes.patch(
    "/appointments/:id",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    deleteUserAppointmentsController
  );

  routes.get(
    "/appointments",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    listAllUserAppointmentsController
  );

  routes.post(
    "/reviews",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    createUserReviewsController
  );

  routes.get(
    "/reviews",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    listUsersReviewsController
  );

  routes.patch(
    "/reviews/:id",
    ensureAuthTokenMiddleware,
    ensureUserMiddleware,
    updatedUserReviewsController
  );

  return routes;
};
