import AppDataSource from "../../data-source";
import { Clinics } from "../../entities/clinics.entity";
import { AppError } from "../../errors/appError";
import { IClinicUpdate } from "../../interfaces/clinic";

const clinicUpdateService = async (
  id: string,
  { name, contact, crmv_pj, address, clinicsDoctors }: IClinicUpdate
) => {
  const clinicsRepository = AppDataSource.getRepository(Clinics);
  const findClinic = await clinicsRepository.findOne({ where: { id: id } });
  if (!findClinic) {
    throw new AppError("Clinic not found", 404);
  }
  const updatedAt = await new Date();
  await clinicsRepository.update(
    { id },
    {
      name,
      contact,
      crmv_pj,
      address,
      updatedAt,
      clinicsDoctors,
    }
  );
  const updatedClinic = await clinicsRepository.findOne({
    where: { id: id },
  });

  return {
    message: "Clinic updated!",
    clinic: updatedClinic,
  };
};
export default clinicUpdateService;
