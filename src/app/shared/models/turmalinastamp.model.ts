import { Evaluation } from "./evaluation.model";
import { managementUnit } from "./managementunit.model";

export class TurmalinaStamp{
    constructor(
        public endDateTime: string,
        public evaluation: Evaluation[],
        public evaluationId: number,
        public logpath: string,
        public managementUnit: managementUnit,
        public startDateTime: string,
        public status: boolean
    ){}
}