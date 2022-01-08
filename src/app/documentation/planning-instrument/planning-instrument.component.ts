import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-planning-instrument',
  templateUrl: './planning-instrument.component.html',
  styleUrls: ['./planning-instrument.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningInstrumentComponent {

    instructions = `
    # Instrumentos de Planejamento

    O tipo referente aos instrumentos de planejamento possui diferentes propriedades para representação dos documentos do Plano Plurianual, da Lei de Diretrizes Orçamentárias e da Lei Orçamentária Anual do município. A seguir estão os nomes das propriedades definidas do tipo:
    
    ## Tipo: PlanningInstrument
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | MultiyearPlan | URL | Campo contendo o link do documento referente ao Plano Plurianual (PPA) do município |
    | BudgetGuidelinesLaw | URL |  Campo contendo o link do documento referente à Lei de Diretrizes Orçamentárias (LDO) do município |
    | AnnualBudgetLaw | URL |  Campo contendo o link do documento referente à Lei Orçamentária Anual (LOA) do município |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/PlanningInstrument">
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="MultiyearPlan">Plano Plurianual (PPA)</th>
            <th itemprop="BudgetGuidelinesLaw">Lei de Diretrizes Orçamentárias (LDO)</th>
            <th itemprop="AnnualBudgetLaw">Lei Orçamentária Anual (LOA)</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="MultiyearPlan"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LDO-2021-1.pdf">Lei de Diretrizes Orçamentárias 2021</a></td>
            <td itemprop="BudgetGuidelinesLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/PPA-Plano-Plurianual-2018-2021.pdf">Lei de PPA – Plano Plurianual 2018-2021</a></td>
            <td itemprop="AnnualBudgetLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LOA-2021.pdf">LOA – Lei Orçamentária Anual 2021</a></td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/PlanningInstrument">
      <!-- Cabeçalho da tabela  -->
      <div>
        <div itemprop="MultiyearPlan">Plano Plurianual (PPA)</div>
        <div itemprop="BudgetGuidelinesLaw">Lei de Diretrizes Orçamentárias (LDO)</div>
        <div itemprop="AnnualBudgetLaw">Lei Orçamentária Anual (LOA)</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
      <div>
        <div itemprop="MultiyearPlan"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LDO-2021-1.pdf">Lei de Diretrizes Orçamentárias 2021</a></div>
        <div itemprop="BudgetGuidelinesLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/PPA-Plano-Plurianual-2018-2021.pdf">Lei de PPA – Plano Plurianual 2018-2021</a></div>
        <div itemprop="AnnualBudgetLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LOA-2021.pdf">LOA – Lei Orçamentária Anual 2021</a></div>
      </div>
    </div>
    \`\`\`
    `

}
