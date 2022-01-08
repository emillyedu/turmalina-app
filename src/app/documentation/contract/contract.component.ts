import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent  {

  instructions = `
  # Contrato

  ## Tipo: Contract
  
  O tipo Contract possui diversas propriedades que representam as informações básicas que compõem um contrato administrativo, por meio do qual partes que tenham interesses diversos realizam acordos ou ajustes, transferindo entre si algum direito ou se sujeitando a alguma obrigação. A seguir estão os nomes das propriedades definidas do tipo:
  
  | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
  | ------------- | ------------- | ------------- |
  | ManagementUnitName | text | Campo texto contendo o nome da unidade gestora contratante interessado |
  | ManagementUnitID | text | Campo texto contendo o código da unidade gestora contratante interessado |
  | ContractorName | text | Campo texto contendo o nome do contratado |
  | IdentificationNumber | text | Campo numérico contendo o CPF/CNPJ do contratado |
  | PublicationDate | date | Data referente à publicação do extrato de contrato (formato DD/MM/YYYY) |
  | ValidityDate | date | Data de vigência do contrato (formação DD/MM/YYYY) |
  | ContractAmount | number:float | Campo monetário contendo o valor contratado |
  | Object | text | Campo referente à descrição do objeto do contrato |
  | ContractID | text | Campo texto contendo o código de identificação do contrato |
  
  Esse é um exemplo em HTML utilizando table
  
  \`\`\`html
  <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/Contract">
      <!-- Cabeçalho da tabela  -->
      <tr>
          <th itemprop="ManagementUnitName">Nome da unidade gestora</th>
          <th itemprop="ManagementUnitID">Código da unidade gestora</th>
          <th itemprop="ContractID">Código do contrato</th>
          <th itemprop="ContractorName">Nome do contratado</th>
          <th itemprop="IdentificationNumber">CPF/CNPJ do contratado</th>
          <th itemprop="Object">Objeto do Contrato</th>
          <th itemprop="PublicationDate">Data da publicação</th>
          <th itemprop="ValidityDate">Início Vigência</th>
          <th itemprop="ValidityDate">Fim Vigência</th>
          <th itemprop="ContractAmount">Valor Contratado</th>
      </tr>
  
      <!-- Dados referentes a cada linha da tabela  -->
      <tr>
          <td itemprop="ManagementUnitName">Secretaria Municipal de Saúde - SMS</td>
          <td itemprop="ManagementUnitID">2030</td>
          <td itemprop="ContractID">106982021</td>
          <td itemprop="ContractorName">ANTONIO CAVALCANTE PINTO NETO EIRELI</td>
          <td itemprop="IdentificationNumber">32.127.100/0001-70</td>
          <td itemprop="Object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE ANTIBIÓTICOS DA REDE HOSPITALAR DO MUNICIPIO</td>
          <td itemprop="PublicationDate">21/09/2021</td>
          <td itemprop="ValidityDate">21/09/2021</td>
          <td itemprop="ValidityDate">31/12/2021</td>
          <td itemprop="ContractAmount">239280.00</td>
      </tr>
  </table>
  \`\`\`
  
  Esse é um exemplo em HTML utilizando div
  
  \`\`\`html
  <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/Contract">
    <!-- Cabeçalho da tabela  -->
    <div>
      <div itemprop="ManagementUnitName">Nome da unidade gestora</div>
      <div itemprop="ManagementUnitID">Código da unidade gestora</div>
      <div itemprop="ContractID">Código do contrato</div>
      <div itemprop="ContractorName">Nome do contratado</div>
      <div itemprop="IdentificationNumber">CPF/CNPJ do contratado</div>
      <div itemprop="Object">Objeto do contrato</div>
      <div itemprop="PublicationDate">Data da publicação</div>
      <div itemprop="ValidityDate">Início da vigência</div>
      <div itemprop="ValidityDate">Fim da Vigência</div>
      <div itemprop="ContractAmount">Valor Contratado</div>
    </div>
    <!-- Dados referentes a certa linha da tabela  -->
    <div>
      <div itemprop="ManagementUnitName">Secretaria Municipal de Saúde - SMS</div>
      <div itemprop="ManagementUnitID">2030</div>
      <div itemprop="ContractID">106982021a</div>
      <div itemprop="ContractorName">ANTONIO CAVALCANTE PINTO NETO EIRELI</div>
      <div itemprop="IdentificationNumber">32.127.100/0001-70</div>
      <div itemprop="Object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE ANTIBIÓTICOS DA REDE HOSPITALAR DO MUNICIPIO</div>
      <div itemprop="PublicationDate">21/09/2021</div>
      <div itemprop="ValidityDate">21/09/2021</div>
      <div itemprop="ValidityDate">31/12/2021</div>
      <div itemprop="ContractAmount">239280.00</div>
    </div>
  </div>
  \`\`\`
  `
}
