import { getTournament } from "./api.ts";
import { CompetitionData } from "../../types/competition.ts";
import { aggregateStats } from "./utils.ts";
import { TournamentStats } from "../../types/stats.ts";
import { getTournamentStats } from "./statsGen.ts";

const tournamentDatas: CompetitionData[] = [
    {competitionId: 103484, division: 'MA3'}
];

const PDGA_NUM = 268260;

export async function getStats() {
    const fullStats: TournamentStats[] = [];

    for (const tournamentData of tournamentDatas) {
        const tournament = await getTournament(tournamentData.competitionId, tournamentData.division, 1);
        const tournamentName = tournament.data.layouts[0]?.Name;
        const roundStats = await getTournamentStats(tournamentData.competitionId, tournamentData.division, PDGA_NUM);

        fullStats.push({
            tournamentName,
            stats: aggregateStats(roundStats)
        });
    }

    return fullStats;
}
