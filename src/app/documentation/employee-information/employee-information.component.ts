import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInformationComponent  {

    instructions = `
    # Pessoal

    ## Tipo: EmployeeInformation
    
    O tipo EmployeeInformation possui diversas propriedades que representam as informações básicas sobre o quadro de servidores do município, agregando informações que abrangem cargos, salários e tipo de vínculo. A seguir estão os nomes das propriedades definidas do tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | EmployeeName | text | Campo texto contendo o nome do servidor |
    | IdentificationNumber | text |  Campo texto contendo o CPF do servidor |
    | EmploymentContractType | text | Campo texto contendo o tipo de contrato do servidor |
    | EmployeePosition | text | Campo texto contendo o tipo de cargo/função do servidor |
    | EmployeeSalary | number:float | Campo monetário contendo o valor do salário do servidor |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/EmployeeInformation">
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="EmployeeName">Nome do Servidor</th>
            <th itemprop="IdentificationNumber">CPF</th>
            <th itemprop="EmploymentContractType">Tipo de vínculo</th>
            <th itemprop="EmployeePosition">Cargo</th>
            <th itemprop="EmployeeSalary">Salário</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="EmployeeName">ABDENE FRANCISCO DA SILVA</td>
            <td itemprop="IdentificationNumber">XXX.582.004-XX</td>
            <td itemprop="EmploymentContractType">Contratação por excepcional interesse público</td>
            <td itemprop="EmployeePosition">INSTRUTOR DE BANDA</td>
            <td itemprop="EmployeeSalary">1439.17</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/EmployeeInformation">
      <!-- Cabeçalho da tabela  -->
      <div>
        <div itemprop="EmployeeName">Nome do Servidor</div>
        <div itemprop="IdentificationNumber">CPF</div>
        <div itemprop="EmploymentContractType">Tipo de vínculo</div>
        <div itemprop="EmployeePosition">Cargo</div>
        <div itemprop="EmployeeSalary">Salário</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
      <div>
        <div itemprop="EmployeeName">ABDENE FRANCISCO DA SILVA</div>
        <div itemprop="IdentificationNumber">XXX.582.004-XX</div>
        <div itemprop="EmploymentContractType">Contratação por excepcional interesse público</div>
        <div itemprop="EmployeePosition">INSTRUTOR DE BANDA</div>
        <div itemprop="EmployeeSalary">1439.17</div>
      </div>
    </div>
    \`\`\`
    `
}
