import { CompetitionStats } from "../types/stats";

export function mergeCompetitions(existingCompetitions: CompetitionStats[], newCompetitions: CompetitionStats[]) {
    return [...existingCompetitions, ...newCompetitions.filter(comp => !existingCompetitions.map(x => x.competitionId).includes(comp.competitionId))];
}