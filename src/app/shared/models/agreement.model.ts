export class AgreementModel{
    constructor(
    private agreementAmount: number,
    private agreementID: number,
    private celebrationDate: number,
    private contractorName: number,
    private counterpartAmount: number,
    private grantorName: number,
    private object: number,
    private publicationDate: number,
    private validityDate: number,
    public subCategoryNames: any[],
    ){
        subCategoryNames = ["Valor Pactuado", "Número do Convênio", "Data da Celebração", "Convenente", "Valor da Contrapartida", "Concedente", "Objeto", "Data da Publicação", "Vigência"]
    }
    
    getNames(){
        return this.subCategoryNames;
    }
}