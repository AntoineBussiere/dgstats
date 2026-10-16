import { ChartTypes } from "./charts";
import { CompetitionStats } from "./stats";

export enum PeriodType {"global", "year", "competition"};

export interface PeriodSelection {
    type: PeriodType;
    year?: number;
    competition?: CompetitionStats;
    compareToGlobal: boolean;
}

export const allowedGraphsByPeriod: Record<PeriodType, ChartTypes[]> = {
    [PeriodType.global]: [
        ChartTypes.progression,
        ChartTypes.repartition,
        ChartTypes.competitionScore,
        ChartTypes.performance,
        ChartTypes.shame
    ],
    [PeriodType.year]: [
        ChartTypes.progression,
        ChartTypes.repartition,
        ChartTypes.competitionScore,
        ChartTypes.performance,
        ChartTypes.shame
    ],
    [PeriodType.competition]: [
        ChartTypes.repartition,
        ChartTypes.competitionScore
    ],
};