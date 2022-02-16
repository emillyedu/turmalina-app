export class ExtraBudgetRevenueModel{
    extraBudgetRevenueDescription!: number;
    extraBudgetRevenueHistory!: number;
    extraBudgetRevenueID!: number;
    extraBudgetRevenueSource!: number;
    managementUnitID!: number;
    managementUnitName!: number;
    nomenclature!: number;
    realizedAmount!: number;

    subCategoryNames: string[] = ["Rúbrica/Descrição", "Histórico", "Código adotado", "Origem da receita", "Unidade Gestora Arrecadadora", "Nomeclatura utilizada", "Valor Realizado"]
}