export interface IDoctorRequest {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  crmv: string;
  clinics_id?: string;
}

export interface IDoctorUpdate {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}
