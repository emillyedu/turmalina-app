export class Contract{
    contractAmount!: number;
    contractID!: number;
    contractorName!: number;
    identificationNumber!: number;
    managementUnitID!: number;
    managementUnitName!: number;
    object!: number;
    publicationDate!: number;
    validityDate!: number;

    subCategoryNames: string[] = ["Valor Pactuado", "Número do Contrato", "Nome do Contratado", "CNPJ/CPF do Contratado", "Unidade Gestora", "Concedente" , "Objeto","Data da Publicação","Vigência"]
}