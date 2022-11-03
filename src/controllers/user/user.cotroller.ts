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

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

const listAllUserController = async (req: Request, res: Response) => {
  const users = await listAllUserService();
  return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const userUpdate = req.body;
  const id = req.user.id;
  const updatedUser = await updateUserService(userUpdate, id);
  return res.json(instanceToPlain(updatedUser));
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const deletedUser = await userDeleteService(id);
  return res.status(204).json(instanceToPlain(deletedUser));
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
  const { date, hour, animalsId, doctorId }: IAppointmentsRequest = req.body;
  const createdAppointment = await createAppointmentsService({
    date,
    hour,
    animalsId,
    doctorId,
  });

  return res.status(201).json({ message: "Successfully scheduled" });
};

const deleteUserAppointmentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  await appointmentsDeleteService(id);
  return res.status(204).json({
    message: "Appointments successfully",
  });
};

const listAllUserAppointmentsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const list = await listAllUserAppointmentsService(userId);
  return res.json(list);
};

const createUserReviewsController = async (req: Request, res: Response) => {
  const { review, appointmentsId } = req.body;
  const userId = req.user.id;
  const newReview = createUserReviewService(review, appointmentsId, userId);
  return res
    .status(201)
    .json({ message: "Successfully review", review: review });
};

const updatedUserReviewsController = async (req: Request, res: Response) => {
  const { review } = req.body;
  const { id } = req.params;
  const updatedReviews = updateUserReviewService(review, id);
  return res.json(updatedReviews);
};

export {
  updatedUserReviewsController,
  createUserReviewsController,
  listAllUserAppointmentsController,
  deleteUserAppointmentsController,
  listAllAnimalUserController,
  createUserController,
  updateUserController,
  listAllUserController,
  deleteUserController,
  createUserAppointmentsController,
};
