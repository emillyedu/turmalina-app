export class ExtraBudgetExpenditureModel{
    creditorName!: number
    extraBudgetExpenditureDescription!: number
    extraBudgetExpenditureID!: number
    extraBudgetExpenditureNomenclature!: number
    identificationNumber!: number
    managementUnitID!: number
    managementUnitName!: number
    moveDate!: number
    paymentAmount!: number
    tabDate!: number
    tabHistory!: number
    tabID!: number

    subCategoryNames: string[] = ["Credor", "Descrição", "Código adotado", "Nomenclatura", "CNPJ/CPF do Credor", "Órgão/Unidade Orçamentária", "Data de movimentação", "Valor pago", "Data da Guia", "Histórico", "Número da Guia"]
}