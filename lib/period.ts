import { ChartTypes } from "../types/charts";
import { allowedGraphsByPeriod, PeriodSelection } from "../types/period";

export const isGraphAllowed = (graph: ChartTypes, period: PeriodSelection) => allowedGraphsByPeriod[period.type].includes(graph);