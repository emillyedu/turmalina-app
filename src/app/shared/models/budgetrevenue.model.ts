export class BudgetRevenue{
    budgetRevenueDescription!: number;
    budgetRevenueSource!: number;
    collectionAmount!: number;
    managementUnitID!: number;
    managementUnitName!: number;
    predictedAmount!: number;

    subCategoryNames: string[] = ["Rúbrica/Descrição", "Origem da Receita", "Valor Arrecadado", "Unidade Gestora Arrecadadora", "Valor Previsto"]
}