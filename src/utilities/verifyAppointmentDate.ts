import { ClinicsDoctors } from "./../entities/clinicsDoctors.entity";
import { AppError } from "../errors/appError";
import { appointmentsRepository } from "./repositories";

const verifyAppointmentDate = (date: string, hour: string): void => {
  const validatedHour = Number(hour.split(":")[0]);

  if (validatedHour < 7 || validatedHour >= 18) {
    throw new AppError("Invalid hour. Office hours are from 7h to 18h", 400);
  }

  const dateArray = date.split("/");
  const validatedDate = new Date(dateArray.join("-"));

  if (validatedDate.getDay() === 0) {
    throw new AppError(
      "Invalid date. Office days are from Monday to Saturday",
      400
    );
  }
};

export { verifyAppointmentDate };
