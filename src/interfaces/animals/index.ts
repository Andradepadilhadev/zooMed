export interface ICreateAnimalsRequest {
  id: string;
  name: string;
  birthDate: Date;
  breed: string;
  speciesId: string;
  user_id: string;
}

export interface IEspecies {
  id: string;
  name: string;
}
