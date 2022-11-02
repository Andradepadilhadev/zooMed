import { AppError } from "../errors/appError";

const verifyAppointmentDate = (
  date: string,
  hour: string,
): void => {
    const validatedHour = Number(hour.split(":")[0])

    if(validatedHour < 7 || validatedHour >= 18){
        throw new AppError("Invalid hour", 400)
    }

    const validatedDate = new Date(date)

    if(validatedDate.getDay() < 1 || validatedDate.getDay() > 5){
        throw new AppError("Invalid date", 400)
    }
};

export { verifyAppointmentDate };

