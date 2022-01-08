import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-extra-budget-revenue',
  templateUrl: './extra-budget-revenue.component.html',
  styleUrls: ['./extra-budget-revenue.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraBudgetRevenueComponent {

    instructions = `
    # Receitas Extraorçamentárias

    ## Tipo: ExtraBudgetRevenue
    
    O tipo ExtraBudgetRevenue possui diferentes propriedades para representação de informações referentes às receitas extraorçamentárias, provenientes de toda e qualquer arrecadação que não figure no orçamento público e não constitua renda do município. A seguir estão os nomes das propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | ManagementUnitName | text |  Campo texto contendo o nome da unidade gestora |
    | ManagementUnitID | text |  Campo texto contendo o código da unidade gestora |
    | RealizedAmount | number:float |  Campo monetário contendo o valor realizado receita extraorçamentária |
    | ExtraBudgetRevenueSource | text | Campo texto referente à classificação da origem da receita extraorçamentária |
    | ExtraBudgetRevenueDescription | text | Campo texto contendo a rúbrica ou descrição da receita extraorçamentária (o recurso precisa ser identificável) |
    | ExtraBudgetRevenueID | text |  Campo texto contendo o código da receita extraorçamentária |
    | Nomenclature | text |  Campo texto contendo a nomenclatura utilizada na extraorçamentária |
    | ExtraBudgetRevenueHistory | text |  Campo texto contendo o histórico receita extraorçamentária |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/ExtraBudgetRevenue">
        <caption>Descrição</caption>
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="ExtraBudgetRevenueID">Código</th>
            <th itemprop="ExtraBudgetRevenueDescription">Descrição</th>
            <th itemprop="ExtraBudgetRevenueSource">Origem</th>
            <th itemprop="ManagementUnitName">Nome da unidade gestora</th>
            <th itemprop="ManagementUnitID">Código da unidade gestora</th>
            <th itemprop="Nomenclature">Nomenclatura Utilizada</th>
            <th itemprop="ExtraBudgetRevenueHistory">Histórico</th>
            <th itemprop="RealizedAmount">Valor Realizado</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="ExtraBudgetRevenueID">218810108</td>
            <td itemprop="ExtraBudgetRevenueDescription">ISS</td>
            <td itemprop="ExtraBudgetRevenueSource">0192000000</td>
            <td itemprop="ManagementUnitName">Prefeitura Municipal de João Pessoa</td>
            <td itemprop="ManagementUnitID">08.778.326/0001-56</td>
            <td itemprop="Nomenclature">???</td>
            <td itemprop="ExtraBudgetRevenueHistory">Empenho referente contratação de serviços de consultoria e apoio ao gerenciamento do programa João Pessoa Sustentável, no município de João Pessoa/PB. Financiado com recursos do Contrato de Empréstimo nº 4444/OC-BR (BR-L 1421), firmado entre o município de João Pessoa e o Banco Interamericano de Desenvolvimento - BID. Conforme Contrato nº 02.003/2020 - UEP/GAPRE, da Seleção Baseada na Qualidade e Custo no 01/2018, Processo Administrativo nº 2019/033171.</td>
            <td itemprop="RealizedAmount">2527.07</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/ExtraBudgetRevenue">
      <!-- Cabeçalho da tabela  -->
      <div>
          <div itemprop="ExtraBudgetRevenueID">Código</div>
          <div itemprop="ExtraBudgetRevenueDescription">Descrição</div>
          <div itemprop="ExtraBudgetRevenueSource">Origem</div>
          <div itemprop="ManagementUnitName">Nome da unidade gestora</div>
          <div itemprop="ManagementUnitID">Código da unidade gestora</div>
          <div itemprop="Nomenclature">Nomenclatura Utilizada</div>
          <div itemprop="ExtraBudgetRevenueHistory">Histórico</div>
          <div itemprop="RealizedAmount">Valor Realizado</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
      <div>
        <div itemprop="ExtraBudgetRevenueID">218810108</div>
        <div itemprop="ExtraBudgetRevenueDescription">ISS</div>
        <div itemprop="ExtraBudgetRevenueSource">0192000000</div>
        <div itemprop="ManagementUnitName">Prefeitura Municipal de João Pessoa</div>
        <div itemprop="ManagementUnitID">08.778.326/0001-56</div>
        <div itemprop="Nomenclature">???</div>
        <div itemprop="ExtraBudgetRevenueHistory">Empenho referente contratação de serviços de consultoria e apoio ao gerenciamento do programa João Pessoa Sustentável, no município de João Pessoa/PB. Financiado com recursos do Contrato de Empréstimo nº 4444/OC-BR (BR-L 1421), firmado entre o município de João Pessoa e o Banco Interamericano de Desenvolvimento - BID. Conforme Contrato nº 02.003/2020 - UEP/GAPRE, da Seleção Baseada na Qualidade e Custo no 01/2018, Processo Administrativo nº 2019/033171.</div>
        <div itemprop="RealizedAmount">2527.07</div>
    </div>
    \`\`\`
    `
}
