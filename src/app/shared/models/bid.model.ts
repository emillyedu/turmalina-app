export class BidModel{
    bidID!: number;
    bidModality!: number;
    bidderName!: number;
    bidderProposalAmount!: number;
    identificationNumber!: number;
    managementUnitID!: number;
    managementUnitName!: number;
    notice!: number;
    object!: number;
    publicationDate!: number;
    realizationDate!: number;

    subCategoryNames: string[] = ["Número de Ordem/Série", "Modalidade de Licitação", "Nome dos Participantes", "Valores", "CNPJ/CPF", "Repartição/Setor Interessado", "Edital", "Objeto", "Data de Publicação", "Data de Realização"]
}