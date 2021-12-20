import { polygon } from 'leaflet';


export class Municipio{
    nome!: string;
    dataAtualizacao: any;
    urlPrefeitura!: string;
    urlPortal!: string;
    codSepro!: string;
    pontuacao!: number;
    polygon: any;
    pontuacaoMaxima!: number;
    posicao!: number;
    rankingColor: string;
    qtd_itens_pesquisados!: number;

    constructor() {
        this.rankingColor = 'rgb(165, 204, 228)';
        this.polygon = null;
    }



    public setRankingColor(color: string){
        this.rankingColor = color;
    }

}
