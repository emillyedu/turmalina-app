import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-extra-budget-expenditure',
  templateUrl: './extra-budget-expenditure.component.html',
  styleUrls: ['./extra-budget-expenditure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraBudgetExpenditureComponent {

    instructions = `
    # Despesa Extraorçamentária

    ## Tipo: ExtraBudgetExpenditure
    
    O tipo ExtraBudgetExpenditure possui diferentes propriedades para representação de informações referentes às despesas extraorçamentárias, despesas que não precisam de autorização legislativa para serem realizadas, ou seja, que não integram o orçamento público. Também estão aqui inseridas as propriedades referentes aos empenhos dessas despesas, por meio do qual realiza-se reserva de valores monetários autorizados para atender um fim específico que cria para o município uma obrigação de pagamento pendente. A seguir estão os nomes das propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | PaymentAmount | number:float | Campo monetário contendo o valor pago da despesa extraorçamentária |
    | ManagementUnitName | text | Campo texto contendo o nome da unidade gestora |
    | ManagementUnitID | text | Campo texto contendo o código da unidade gestora |
    | ExtraBudgetExpenditureID | text |  Campo texto contendo o código adotado da despesa extraorçamentária |
    | ExtraBudgetExpenditureNomenclature | text |  Campo texto contendo a nomenclatura utilizada da despesa extraorçamentária |
    | MoveDate | date |  Data de movimentação da despesa extraorçamentária |
    | ExtraBudgetExpenditureDescription | text |  Campo texto contendo a descrição da despesa extraorçamentária |
    | TabID | text | Campo referente ao número da guia da despesa extraorçamentária licitada |
    | TabDate | date | Campo texto referente a data da guia da despesa extraorçamentária licitada (formato DD/MM/YYYY)|
    | CreditorName | text | Campo texto contendo o nome do credor |
    | IdentificationNumber | text | Campo texto contendo o CPF ou CNPJ do credor |
    | TabHistory | text | Campo texto contendo a descrição do histórico da guia |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/ExtraBudgetExpenditure">
        <caption>Descrição</caption>
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="ManagementUnitName">Nome da unidade gestora</th>
            <th itemprop="ManagementUnitID">Código da unidade gestora</th>
            <th itemprop="CreditorName">Favorecido</th>
            <th itemprop="IdentificationNumber">CPF/CNPJ do Favorecido</th>
            <th itemprop="PaymentAmount">Valor Pago</th>
            <th itemprop="TabID">Número da Guia</th>
            <th itemprop="TabDate">Data da Guia</th>
            <th itemprop="TabHistory">Histórico da Guia</th>
            <th itemprop="ExtraBudgetExpenditureID">Código Adotado</th>
            <th itemprop="ExtraBudgetExpenditureNomenclature">Nomenclatura Utilizada</th>
            <th itemprop="MoveDate">Data de Movimentação</th>
            <th itemprop="ExtraBudgetExpenditureDescription">Descrição</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="ManagementUnitName">Fundação Cultural de João Pessoa</td>
            <td itemprop="ManagementUnitID">XXXX</td>
            <td itemprop="CreditorName">01402285000150 - DENTAL GOLD ASSISTENCIA ODONTOLOGICA LTDA</td>
            <td itemprop="IdentificationNumber">01.402.285/0001-50</td>
            <td itemprop="PaymentAmount">59.63</td>
            <td itemprop="TabID">0018030/2021</td>
            <td itemprop="TabDate">19/02/2021</td>
            <td itemprop="TabHistory">VALOR REFERENTE A PAGAMENTO DE RETENÇÕES FEITAS DURANTE O MES DE JANEIRO 2021 - PP DE DENTAL GOLD</td>
            <td itemprop="ExtraBudgetExpenditureID">218810199</td>
            <td itemprop="ExtraBudgetExpenditureNomenclature">XXXX</td>
            <td itemprop="MoveDate">19/02/2021</td>
            <td itemprop="ExtraBudgetExpenditureDescription">120 - Dental Gold</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/ExtraBudgetExpenditure">
      <!-- Cabeçalho da tabela  -->
      <div>
        <div itemprop="ManagementUnitName">Nome da unidade gestora</div>
        <div itemprop="ManagementUnitID">Código da unidade gestora</div>
        <div itemprop="CreditorName">Favorecido</div>
        <div itemprop="IdentificationNumber">CPF/CNPJ do Favorecido</div>
        <div itemprop="PaymentAmount">Valor Pago</div>
        <div itemprop="TabID">Número da Guia</div>
        <div itemprop="TabDate">Data da Guia</div>
        <div itemprop="TabHistory">Histórico da Guia</div>
        <div itemprop="ExtraBudgetExpenditureID">Código Adotado</div>
        <div itemprop="ExtraBudgetExpenditureNomenclature">Nomenclatura Utilizada</div>
        <div itemprop="MoveDate">Data de Movimentação</div>
        <div itemprop="ExtraBudgetExpenditureDescription">Descrição</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
      <div>
        <div itemprop="ManagementUnitName">Fundação Cultural de João Pessoa</div>
        <div itemprop="ManagementUnitID">XXXX</div>
        <div itemprop="CreditorName">01402285000150 - DENTAL GOLD ASSISTENCIA ODONTOLOGICA LdivA</div>
        <div itemprop="IdentificationNumber">01.402.285/0001-50</div>
        <div itemprop="PaymentAmount">59.63</div>
        <div itemprop="TabID">0018030/2021</div>
        <div itemprop="TabDate">19/02/2021</div>
        <div itemprop="TabHistory">VALOR REFERENTE A PAGAMENTO DE RETENÇÕES FEITAS DURANTE O MES DE JANEIRO 2021 - PP DE DENTAL GOLD</div>
        <div itemprop="ExtraBudgetExpenditureID">218810199</div>
        <div itemprop="ExtraBudgetExpenditureNomenclature">XXXX</div>
        <div itemprop="MoveDate">19/02/2021</div>
        <div itemprop="ExtraBudgetExpenditureDescription">120 - Dental Gold</div>
    </div>
    \`\`\`
    `

}
