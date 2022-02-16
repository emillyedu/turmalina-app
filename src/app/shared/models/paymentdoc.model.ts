export class PaymentDocument{
    bankAccountNumber!: number
    bankOperationID!: number
    creditorName!: number
    fundingSource!: number
    identificationNumber!: number
    managementUnitID!: number
    managementUnitName!: number
    paymentAmount!: number
    paymentDate!: number
    paymentHistory!: number

    subCategoryNames: string[] = ["Conta Bancária", "Número", "Favorecido", "Fonte de Recursos", "CPF do Favorecido", "Unidade Gestora Emitente", "Valor", "Data", "Histórico do Pagamento"]
}