import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiddingComponent {

    instructions = `
    # Procedimentos Licitatórios

    ## Tipo: Bidding
    
    O tipo referente aos procedimentos licitatórios (Bidding) possui diferentes propriedades para representação de informações sobre as licitações públicas, por meio do qual o munícipio pode realizar contratações de obras, serviços, compras e alienações. A seguir estão os nomes de todas as propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------------- | ------------- | ------------- |
    | Notice | URL | Campo contendo o link do documento referente ao edital do procedimento licitatório |
    | BidModality | text | Campo texto contendo o nome da modalidade de licitação |
    | ManagementUnitName | text | Campo texto contendo o nome da unidade gestora do setor interessado |
    | ManagementUnitID | text | Campo texto contendo o código da unidade gestora do setor interessado |
    | PublicationDate | date | Data referente à publicação do edital de licitação (formato DD/MM/YYYY) |
    | RealizationDate | date | Data de realização da licitação (formato DD/MM/YYYY) |
    | BidID | text | Campo texto contendo o número da licitação |
    | Object | text | Campo texto referente à descrição do objeto da licitação |
    | BidderName | text | Campo texto contendo o nome do licitante (vencedor ou perdedor) |
    | IdentificationNumber | text | Campo numérico contendo o CPF/CNPJ do licitante (vencedor ou perdedor) |
    | BidderProposalAmount | number:float | Campo monetário contendo o valor do último lance da proposta do licitante (vencedor ou perdedor) |
    
    Esse é um exemplo em HTML utilizando table
    
    \`\`\`html
    <table itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/Bidding">
      <!-- Cabeçalho da tabela  -->
      <tr>
        <th itemprop="ManagementUnitName">Nome da unidade gestora</th>
        <th itemprop="ManagementUnitID">Código da unidade gestora</th>
        <th itemprop="BidID">Número da licitação</th>
        <th itemprop="BidModality">Modalidade de licitação</th>
        <th itemprop="Object">Objeto da licitação</th>
        <th itemprop="PublicationDate">Data da publicação</th>
        <th itemprop="RealizationDate">Data de realização</th>
        <th itemprop="BidderName">Nome do Participante</th>
        <th itemprop="IdentificationNumber">CNPJ do paricipante</th>
        <th itemprop="BidderProposalAmount">Valor da proposta</th>
        <th itemprop="Notice">Edital</th>
      </tr>
      <!-- Dados referentes a certa linha da tabela  -->
      <tr>
        <td itemprop="ManagementUnitName">Secretaria de Administração</td>
        <td itemprop="ManagementUnitID">201151</td>
        <td itemprop="BidID">000012021</td>
        <td itemprop="BidModality">Pregão Eletrônico</td>
        <td itemprop="Object">
            REGISTRO DE PREÇOS PARA EVENTUAL CONTRATAÇÃO DE EMPRESA ESPECIALIZADA SERVIÇO DE CONTRATAÇÃO DE SEGURO PARA ESTAGIÁRIOS, PARA ATENDER AS NECESSIDADES DA SECRETARIA DE ADMINISTRAÇÃO – SEAD.
        </td>
        <td itemprop="PublicationDate">08/07/2021</td>
        <td itemprop="RealizationDate">20/08/2021</td>
        <td itemprop="BidderName">BRASILSEG COMPANHIA DE SEGUROS</td>
        <td itemprop="IdentificationNumber">28.196.889/0001-43</td>
        <td itemprop="BidderProposalAmount">1440.00</td>
        <td itemprop="Notice"><a href="https://transparencia.joaopessoa.pb.gov.br:8080/licitacoes/visualizar-arquivo?id=37710">Edital</a></td>
      </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://app-turmalina.herokuapp.com/documentation/Bidding">
      <!-- Cabeçalho da tabela  -->
      <div>
        <div itemprop="ManagementUnitName">Nome da unidade gestora</div>
        <div itemprop="ManagementUnitID">Código da unidade gestora</div>
        <div itemprop="BidID">Número da licitação</div>
        <div itemprop="BidModality">Modalidade de licitação</div>
        <div itemprop="Object">Objeto da licitação</div>
        <div itemprop="PublicationDate">Data da publicação</div>
        <div itemprop="RealizationDate">Data de realização</div>
        <div itemprop="BidderName">Nome do Participante</div>
        <div itemprop="IdentificationNumber">CNPJ do paricipante</div>
        <div itemprop="BidderProposalAmount">Valor da proposta</div>
        <div itemprop="Notice">Edital</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
      <div>
        <div itemprop="ManagementUnitName">Secretaria de Administração</div>
        <div itemprop="ManagementUnitID">201151</div>
        <div itemprop="BidID">000012021</div>
        <div itemprop="BidModality">Pregão Eletrônico</div>
        <div itemprop="Object">
          REGISTRO DE PREÇOS PARA EVENTUAL CONTRATAÇÃO DE EMPRESA ESPECIALIZADA SERVIÇO DE CONTRATAÇÃO DE SEGURO PARA ESTAGIÁRIOS, PARA ATENDER AS NECESSIDADES DA SECRETARIA DE ADMINISTRAÇÃO – SEAD.
        </div>
        <div itemprop="PublicationDate">08/07/2021</div>
        <div itemprop="RealizationDate">20/08/2021</div>
        <div itemprop="BidderName">BRASILSEG COMPANHIA DE SEGUROS</div>
        <div itemprop="IdentificationNumber">28.196.889/0001-43</div>
        <div itemprop="BidderProposalAmount">1440.00</div>
        <div itemprop="Notice"><a href="https://transparencia.joaopessoa.pb.gov.br:8080/licitacoes/visualizar-arquivo?id=37710">Edital</a></div>
      </div>
    </div>
    \`\`\`
    `
}
