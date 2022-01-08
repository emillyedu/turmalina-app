import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-payment-document',
  templateUrl: './payment-document.component.html',
  styleUrls: ['./payment-document.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentDocumentComponent {

    instructions = `
    # Documento de Pagamento

    ## Tipo: PaymentDocument
    
    O tipo PaymentDocument possui diversas propriedades que representam as informações básicas que compõem um documento de pagamento, estágio da despesa pública em que a unidade pública efetua o pagamento ao ente responsável pela prestação do serviço ou fornecimento do bem, recebendo a devida quitação. A seguir estão os nomes das propriedades definidas do tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | ManagementUnitName | text | Campo texto contendo o nome da unidade gestora emitente|
    | ManagementUnitID | text |  Campo texto contendo o código da unidade gestora emitente|
    | BankOperationID | text | Campo texto contendo a identificação da operação bancária realizada |
    | BankAccountNumber | text | Campo texto contendo o número da conta bancária |
    | PaymentDate | date | Campo contendo a data do pagamento (formato DD/MM/YYYY)|
    | IdentificationNumber | text | Campo texto contendo o CPF ou CNPJ do favorecido do pagamento |
    | CreditorName | text | Campo texto contendo o nome do favorecido do pagamento |
    | PaymentAmount | number:float | Campo monetário contendo o valor do pagamento |
    | FundingSource | text | Campo texto contendo a fonte de recursos do pagamento |
    | PaymentHistory | text | Campo texto contendo a descrição do histórico do pagamento |
    
    Esse é um exemplo em HTML utilizando table
    
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/PaymentDocument">
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="ManagementUnitName">Nome da unidade gestora</th>
            <th itemprop="ManagementUnitID">Código da unidade gestora</th>
            <th itemprop="BankOperationID">Número da operação bancária</th>
            <th itemprop="BankAccountNumber">Número da conta bancária</th>
            <th itemprop="PaymentDate">Data do Pagamento</th>
            <th itemprop="IdentificationNumber">CNPJ</th>
            <th itemprop="CreditorName">Nome do favorecido</th>
            <th itemprop="PaymentAmount">Valor do Pagamento</th>
            <th itemprop="FundingSource">Fonte do recurso</th>
            <th itemprop="PaymentHistory">Histórico do pagamento</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="ManagementUnitName">FUNDO MUNICIPAL DE SAUDE</td>
            <td itemprop="ManagementUnitID">03011</td>
            <td itemprop="BankOperationID">005131 - PAGAMENTO</td>
            <td itemprop="BankAccountNumber">000000134600 - BB C/C 13.460-0 FUNDO M. DE SAUDE</td>
            <td itemprop="PaymentDate">15/07/2021</td>
            <td itemprop="IdentificationNumber">02708218000120</td>
            <td itemprop="CreditorName">GILDO JOSE DA SILVA ME</td>
            <td itemprop="PaymentAmount">22087.74</td>
            <td itemprop="FundingSource">211 - Receitas de Impostos e de Transferência de Imposto</td>
            <td itemprop="PaymentHistory">VALOR QUE ORA SE EMPENHA P ATENDER DESPESA COM AQUISIÇÃO DE MEDICAMENTOS PARA DISTRIBUIÇÃO COM A POPULAÇAO ATRAVES DE ORDEM JUDICIAL</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/PaymentDocument">
      <!-- Cabeçalho da tabela  -->
      <div>
        <div itemprop="ManagementUnitName">Nome da unidade gestora</div>
        <div itemprop="ManagementUnitID">Código da unidade gestora</div>
        <div itemprop="BankOperationID">Número da operação bancária</div>
        <div itemprop="BankAccountNumber">Número da conta bancária</div>
        <div itemprop="PaymentDate">Data do Pagamento</div>
        <div itemprop="IdentificationNumber">CNPJ</div>
        <div itemprop="CreditorName">Nome do favorecido</div>
        <div itemprop="PaymentAmount">Valor do Pagamento</div>
        <div itemprop="FundingSource">Fonte do recurso</div>
        <div itemprop="PaymentHistory">Histórico do pagamento</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
      <div>
        <div itemprop="ManagementUnitName">FUNDO MUNICIPAL DE SAUDE</div>
        <div itemprop="ManagementUnitID">03011</div>
        <div itemprop="BankOperationID">005131 - PAGAMENTO</div>
        <div itemprop="BankAccountNumber">000000134600 - BB C/C 13.460-0 FUNDO M. DE SAUDE</div>
        <div itemprop="PaymentDate">15/07/2021</div>
        <div itemprop="IdentificationNumber">02708218000120</div>
        <div itemprop="CreditorName">GILDO JOSE DA SILVA ME</div>
        <div itemprop="PaymentAmount">22087.74</div>
        <div itemprop="FundingSource">211 - Receitas de Impostos e de Transferência de Imposto</div>
        <div itemprop="PaymentHistory">VALOR QUE ORA SE EMPENHA P ATENDER DESPESA COM AQUISIÇÃO DE MEDICAMENTOS PARA DISTRIBUIÇÃO COM A POPULAÇAO ATRAVES DE ORDEM JUDICIAL</div>
      </div>
    </div>
    \`\`\`
    `

}
