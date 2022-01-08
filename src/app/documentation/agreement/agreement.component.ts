import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgreementComponent {
    instructions = `
    # Convênios/Termos de Parceria/Contratos de Repasse/Termos de Cooperação

    O tipo Convênios/Termos de Parceria/Contratos de Repasse/Termos de Cooperação possui diversas propriedades que representam as informações básicas que compõe um convênio administrativo. A seguir estão os nomes das propriedades definidas do tipo:
    
    ## Tipo: Agreement
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | AgreementID | text | Campo referente ao número de identificação do convênio |
    | GrantorName | text |  Campo texto contendo o nome do concedente do convênio |
    | ContractorName | text | Campo texto contendo o nome do convenente do convênio |
    | CelebrationDate | date (DD/MM/YYYY) | Data referente à celebração do convênio |
    | PublicationDate | date (DD/MM/YYYY) | Data referente à publicação do convênio |
    | ValidityDate | date (DD/MM/YYYY) | Data de vigência do convênio |
    | Object | text | Campo texto referente à descrição do objeto do convênio |
    | AgreementAmount | number:float | Campo monetário referente ao valor pactuado do convênio |
    | CounterpartAmount | text | Campo monetário referente a parcela de colaboração financeira do convenente para execução do objeto do convênio |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/Agreement">
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="AgreementID">Número do Convênio</th>
            <th itemprop="GrantorName">Concedente</th>
            <th itemprop="ContractorName">Convenente</th>
            <th itemprop="CelebrationDate">Data da Celebração</th>
            <th itemprop="PublicationDate">Data da Publicação</th>
            <th itemprop="ValidityDate">Início da Vigência</th>
            <th itemprop="ValidityDate">Fim da Vigência</th>
            <th itemprop="Object">Objeto</th>
            <th itemprop="AgreementAmount">Valor Pactuado</th>
            <th itemprop="CounterpartAmount">Valor da Contrapartida</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="AgreementID">903322</td>
            <td itemprop="GrantorName">Ministério do Turismo - Unidades com vínculo direto</td>
            <td itemprop="ContractorName">MUNICIPIO DE JOAO PESSOA</td>
            <td itemprop="CelebrationDate">21/12/2020</td>
            <td itemprop="PublicationDate">18/12/2020</td>
            <td itemprop="ValidityDate">21/12/2020</td>
            <td itemprop="ValidityDate">21/12/2023</td>
            <td itemprop="Object">Construcao de centro de apoio turistico adaptado no municipio de joao pessoa/pb.</td>
            <td itemprop="AgreementAmount">R$ 22.087,74</td>
            <td itemprop="CounterpartAmount">2.388,56</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/Agreement">
        <!-- Cabeçalho da tabela  -->
        <div>
            <div itemprop="AgreementID">Número do Convênio</div>
            <div itemprop="GrantorName">Concedente</div>
            <div itemprop="ContractorName">Convenente</div>
            <div itemprop="CelebrationDate">Data da Celebração</div>
            <div itemprop="PublicationDate">Data da Publicação</div>
            <div itemprop="ValidityDate">Início da Vigência</div>
            <div itemprop="ValidityDate">Fim da Vigência</div>
            <div itemprop="Object">Objeto</div>
            <div itemprop="AgreementAmount">Valor Pactuado</div>
            <div itemprop="CounterpartAmount">Valor da Contrapartida</div>
        </div>
        <!-- Dados referentes a certa linha da tabela  -->
        <div>
            <div itemprop="AgreementID">903322</div>
            <div itemprop="GrantorName">Ministério do Turismo - Unidades com vínculo direto</div>
            <div itemprop="ContractorName">MUNICIPIO DE JOAO PESSOA</div>
            <div itemprop="CelebrationDate">21/12/2020</div>
            <div itemprop="PublicationDate">18/12/2020</div>
            <div itemprop="ValidityDate">21/12/2020</div>
            <div itemprop="ValidityDate">21/12/2023</div>
            <div itemprop="Object">Construcao de centro de apoio turistico adaptado no municipio de joao pessoa/pb</div>
            <div itemprop="AgreementAmount">22087.74</div>
            <div itemprop="CounterpartAmount">2388.56</div>
        </div>
    </div>
    \`\`\`
    `
}
