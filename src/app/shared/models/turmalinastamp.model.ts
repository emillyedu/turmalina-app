import { Evaluation } from "./evaluation.model";
import { managementUnit } from "./managementunit.model";

export class TurmalinaStamp{
    constructor(
        public endDateTime: Date[],
        public evaluation: Evaluation[],
        public evaluationId: number,
        public logpath: string,
        public managementUnit: managementUnit,
        public startDateTime: Date[],
        public status: boolean
    ){}
}