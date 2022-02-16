export class BudgetExpenditure{
    bidID!: number;
    bidModality!: number;
    budgetExpenditureAction!: number;
    budgetExpenditureElement!: number;
    budgetExpenditureFunction!: number;
    budgetExpenditureModality!: number;
    budgetExpenditureProgram!: number;
    budgetExpenditureSubfunction!: number;
    budgetNature!: number;
    comittedExpenditureDate!: number;
    comittedExpenditureHistory!: number;
    comittedExpenditureID!: number;
    comittedValue!: number;
    creditorName!: number;
    economicCategory!: number;
    fixedAmount!: number;
    identificationNumber!: number;
    managementUnitID!: number;
    managementUnitName!: number;
    paymentAmount!: number;

    subCategoryNames: string[] = ["Número da Licitação", "Modalidade da Licitação", "Ação", "Elemento da Despesa", "Função", "Modalidade de Aplicação", "Programa", "Subfunção", "Natureza da Despesa", "Data do Empenho", "Histórico do Empenho", "Número do Empenho", "Valor do Empenho", "Favorecido do Empenho", "Categoria Econômica", "Valor fixado", "CNPJ/CPF do Favorecido", "Valor pago"]
}