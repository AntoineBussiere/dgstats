import { getCompetitionData } from "./api.ts";
import { CompetitionData } from "../../types/competition.ts";
import { aggregateStats } from "./utils.ts";
import { CompetitionStats } from "../../types/stats.ts";
import { getCompetitionStats } from "./statsGen.ts";

export async function getStats(PDGANum: number, competitionDatas: CompetitionData[]) {
    const fullStats: CompetitionStats[] = [];

    for (const competitionData of competitionDatas) {
        const competition = await getCompetitionData(competitionData.competitionId);
        const nbRounds = competition.data.Rounds;
        const roundStats = await getCompetitionStats(competitionData.competitionId, competitionData.division, PDGANum, nbRounds);
        const stats = aggregateStats(roundStats);

        fullStats.push({
            competitionName: competition.data.SimpleName.replace(/\s*(?:,\s*sponso|- \s*sponso).*$/i, ""),
            competitionDate: competition.data.EndDate,
            nbPlayers: competition.data.Divisions.find(x => x.Division === competitionData.division).Players,
            stats,
        });
    }

    return fullStats;
}
