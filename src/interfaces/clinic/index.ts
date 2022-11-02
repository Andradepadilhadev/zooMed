import { IAdress } from "../adress";

export interface IClinicRequest {
  name: string;
  contact: string;
  crmv_pj?: string;
  address: IAdress;
}
export interface IClinic {
  id: string;
  name: string;
  contact: string;
  crmv_pj?: string;
  address: IAdress;
  createdAt: string;
  updatedAt: string;
}

export interface IClinicUpdate {
  name?: string;
  contact?: string;
  crmv_pj?: string;
  address?: IAdress;
  clinicsDoctors?: [];
}
