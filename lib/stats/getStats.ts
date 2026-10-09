import { getCompetitionData } from "./api.ts";
import { CompetitionData } from "../../types/competition.ts";
import { aggregateStats } from "./utils.ts";
import { CompetitionStats } from "../../types/stats.ts";
import { getCompetitionStats } from "./statsGen.ts";

export async function getStats(PDGANum: number, competitionDatas: CompetitionData[]) {
    const fullStats: CompetitionStats[] = [];

    for (const competitionData of competitionDatas) {
        const competition = await getCompetitionData(competitionData.competitionId);
        const roundStats = await getCompetitionStats(competitionData.competitionId, competitionData.division, PDGANum);

        fullStats.push({
            competitionName: competition.data.SimpleName.replace(/\s*(?:,\s*sponso|- \s*sponso).*$/i, ""),
            competitionDate: competition.data.EndDate,
            stats: aggregateStats(roundStats)
        });
    }

    return fullStats;
}
