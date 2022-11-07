import createUserService from "../../services/user/createUser.service";
import { IAppointmentsRequest, IUserRequest } from "../../interfaces/users";
import updateUserService from "../../services/user/updateUser.service";
import userDeleteService from "../../services/user/deleteUser.service";
import { Request, Response } from "express";
import listAllUserService from "../../services/user/listAllUsers.service";
import createAppointmentsService from "../../services/user/appointments/createUserAppointments.service";
import listAllAnimalsUserService from "../../services/user/listAllUserAnimals.service";
import appointmentsDeleteService from "../../services/user/appointments/deleteUserAppointments.service";
import listAllUserAppointmentsService from "../../services/user/appointments/listAllAppointments.service";
import createUserReviewService from "../../services/user/reviews/createUserReview.service";
import updateUserReviewService from "../../services/user/reviews/updateUserReview.service";
import { instanceToPlain } from "class-transformer";
import listUsersReviewsService from "../../services/user/reviews/listUsersReviews.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

const listAllUserController = async (req: Request, res: Response) => {
  const users = await listAllUserService();
  return res.json(instanceToPlain(users));
};

const updateUserController = async (req: Request, res: Response) => {
  const userUpdate = req.body;
  const id = req.user.id;
  const updatedUser = await updateUserService(userUpdate, id);
  return res.json(instanceToPlain(updatedUser));
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const loggedId = req.user.id;
  const deletedUser = await userDeleteService(loggedId, userId);
  return res.status(200).json(instanceToPlain(deletedUser));
};

const listAllAnimalUserController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const listAnimals = await listAllAnimalsUserService(userId);
  return res.json(listAnimals);
};

const createUserAppointmentsController = async (
  req: Request,
  res: Response
) => {
  const { date, hour, animalId, clinicsDoctorsId }: IAppointmentsRequest =
    req.body;
  await createAppointmentsService({
    date,
    hour,
    animalId,
    clinicsDoctorsId,
  });

  return res.status(201).json({ message: "Successfully scheduled" });
};

const deleteUserAppointmentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const userId = req.user.id;

  await appointmentsDeleteService(id, userId);
  return res.status(200).json({
    message: "Appointment canceled successfully",
  });
};

const listAllUserAppointmentsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const appointmentsList = await listAllUserAppointmentsService(userId);
  return res.json(instanceToPlain(appointmentsList));
};

const createUserReviewsController = async (req: Request, res: Response) => {
  const { review, appointmentId } = req.body;
  const userId = req.user.id;
  const newReview = await createUserReviewService(
    review,
    appointmentId,
    userId
  );
  return res
    .status(201)
    .json({ message: "Review created Successfully", review: newReview });
};

const listUsersReviewsController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const usersReviews = await listUsersReviewsService(userId);

  return res.status(200).json(usersReviews);
};

const updatedUserReviewsController = async (req: Request, res: Response) => {
  const { review } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const updatedReviews = await updateUserReviewService(review, id, userId);

  return res.status(200).json(updatedReviews);
};

export {
  updatedUserReviewsController,
  createUserReviewsController,
  listUsersReviewsController,
  listAllUserAppointmentsController,
  deleteUserAppointmentsController,
  listAllAnimalUserController,
  createUserController,
  updateUserController,
  listAllUserController,
  deleteUserController,
  createUserAppointmentsController,
};
