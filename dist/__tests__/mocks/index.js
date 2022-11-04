"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedReview = exports.mockedAppointment = exports.mockedClinicTwo = exports.mockedClinic = exports.mockedSpeciality = exports.mockedDoctor = exports.mockedWrongId = exports.mockedAnimal = exports.mockedSpeciesUpdated = exports.mockedSpecies = exports.mockedUserUpdated = exports.mockedUser = void 0;
exports.mockedUser = {
    name: "Kenzinho",
    email: "kenzinho@email.com",
    password: "1234",
    birthDate: "1995/4/25",
};
exports.mockedUserUpdated = {
    email: "kenzie@mail.com",
    birthDate: "1995/2/14",
};
exports.mockedSpecies = {
    name: "Gato",
};
exports.mockedSpeciesUpdated = {
    name: "Rato",
};
exports.mockedAnimal = {
    name: "Bob",
    birthDate: "2020/12/6",
    breed: "sem raça definida",
    species: "",
};
exports.mockedWrongId = "130236f0-4e0c-40e0-9000-3d68dcc6f9a9";
exports.mockedDoctor = {
    name: "Veterinário",
    email: "vet@email.com",
    password: "1234",
    birthDate: "1988/07/19",
    crmv: "123456",
};
exports.mockedSpeciality = {
    name: "Cardiologista",
};
exports.mockedClinic = {
    name: "Clínica Vet",
    contact: "27123456789",
    address: {
        zipCode: "12345678",
        number: "100",
        complement: "sala 2",
        district: "Bairro",
        city: "Cidade",
        state: "ES",
    },
};
exports.mockedClinicTwo = {
    name: "ZooClínica",
    contact: "31987654321",
    address: {
        zipCode: "87654321",
        number: "3",
        district: "Outro Bairro",
        city: "Outra Cidade",
        state: "RJ",
    },
};
exports.mockedAppointment = {
    date: "2020/11/7",
    hour: "10:30",
    animalsId: "",
    clinicsDoctorsId: "",
};
exports.mockedReview = {
    review: "Avaliação da consulta",
    appointmentId: "",
};
