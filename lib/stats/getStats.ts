import { getCompetitionData } from "./api.ts";
import { aggregateStats } from "./utils.ts";
import { getCompetitionStats } from "./statsGen.ts";

export async function getStats(PDGANum: number, division: string, competitionId: number) {
    const competition = await getCompetitionData(competitionId);
    const nbRounds = competition.data.Rounds;
    const roundStats = await getCompetitionStats(competitionId, division, PDGANum, nbRounds);
    if (roundStats.length === 0) {
        return;
    }
    
    const stats = aggregateStats(roundStats);

    return {
        competitionId: Number(competition.data.TournamentId),
        competitionName: competition.data.SimpleName.replace(/\s*(?:,\s*sponso|- \s*sponso).*$/i, ""),
        competitionDate: competition.data.EndDate,
        nbPlayers: competition.data.Divisions.find(x => x.Division === division).Players,
        stats,
    };
}
