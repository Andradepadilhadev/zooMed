export interface ICreateAnimalsResponse {
  id: string;
  name: string;
  birthDate: Date;
  breed: string;
  user: any;
  species: IEspecies;
}
export interface ICreateAnimalsRequest {
  id: string;
  name: string;
  birthDate: Date;
  breed: string;
  speciesId: string;
}

export interface IEspecies {
  id: string;
  name: string;
}
