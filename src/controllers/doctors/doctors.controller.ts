import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createDoctorService from "../../services/doctors/createDoctor.service";
import deleteDoctorService from "../../services/doctors/deleteDoctor.service";
import doctorListAppointmentService from "../../services/doctors/doctorListAppointment.service";
import listDoctorsService from "../../services/doctors/listDoctors.service";
import updateDoctorService from "../../services/doctors/updateDoctor.service";

const createDoctorController = async (req: Request, res: Response) => {
  const { name, email, password, birthDate, crmv } = req.body;
  const newDoctor = await createDoctorService({
    name,
    email,
    password,
    birthDate,
    crmv,
  });

  return res.status(201).json(instanceToPlain(newDoctor));
};

const listDoctorsController = async (req: Request, res: Response) => {
  const allDoctors = await listDoctorsService();
  return res.status(200).json(instanceToPlain(allDoctors));
};

const doctorListAppointmentController = (req: Request, res: Response) => {
  const { id } = req.params;
  const listAppointments = doctorListAppointmentService(id);
  return res.status(200).send(listAppointments);
};

const updateDoctorController = async (req: Request, res: Response) => {
  const { name, email, password, birthDate } = req.body;
  const doctorUpdated = await updateDoctorService({
    name,
    email,
    password,
    birthDate,
  });

  return res.status(200).json(instanceToPlain(doctorUpdated));
};

const deleteDoctorController = async (req: Request, res: Response) => {
  const id = req.user.id;
  await deleteDoctorService(id);
  return res.status(200).json({ message: "Doctor deleted successfully" });
};

export {
  createDoctorController,
  listDoctorsController,
  doctorListAppointmentController,
  updateDoctorController,
  deleteDoctorController,
};
