export class RankingModel{
    constructor(
        public end_datetime: string,
        public position: string,
        public name: string,
        public public_entity: string,
        public url: string,
        public score: string
    ){}
}