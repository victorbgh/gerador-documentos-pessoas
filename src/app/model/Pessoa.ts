import { Cidade } from "./Cidades";
import { Estado } from "./Estado";

export class Pessoa {
    nome: string;
    sobrenome: string;
    cpf: string;
    sexo: string;
    dataNascimento: string;
    estado: Estado;
    cidade: Cidade;
}