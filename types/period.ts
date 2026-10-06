import { CompetitionData } from "./competition";

export enum PeriodType {"global", "year", "competition"};

export interface PeriodSelection {
    type: PeriodType;
    year?: number;
    competition?: CompetitionData;
    compareToGlobal: boolean;
}