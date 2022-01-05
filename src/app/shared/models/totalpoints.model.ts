
import { AgreementModel } from "./agreement.model";
import { BidModel } from "./bid.model";
import { BudgetExpenditure } from "./budgetexpenditure.model";
import { BudgetRevenue } from "./budgetrevenue.model";
import { Contract } from "./contract.model";
import { EmployeeInformation } from "./employeeinformation.model";
import { ExtraBudgetExpenditureModel } from "./extrabudgetexp.model";
import { ExtraBudgetRevenueModel } from "./extrabudgetrevenue.model";
import { PaymentDocument } from "./paymentdoc.model";
import { PlanningInstrumentModel } from "./planning.model";

export interface TotalPoints{
    Agreement: AgreementModel;
    Bid: BidModel;
    BudgetExpenditure: BudgetExpenditure;
    BudgetRevenue: BudgetRevenue;
    Contract: Contract;
    EmployeeInformation: EmployeeInformation;
    ExtraBudgetExpenditure: ExtraBudgetExpenditureModel;
    ExtraBudgetRevenue: ExtraBudgetRevenueModel;
    PaymentDocument: PaymentDocument;
    PlanningInstrument: PlanningInstrumentModel;
    total_points: number;
}