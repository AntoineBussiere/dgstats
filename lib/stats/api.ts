import { Tournament } from "../../types/tournament.ts";
import { HoleStats, Stats } from "../../types/stats.ts";


function getTournamentURL(tournamentId: number, division: string, round: number): string {
    return `https://www.pdga.com/apps/tournament/live-api/live_results_fetch_round?TournID=${tournamentId}&Division=${division}&Round=${round}`;
}

function getStatsURL(scoreId: number): string {
    return `https://www.pdga.com/api/v1/feat/live-scores/${scoreId}/hole-breakdowns`;
}

function getHoleStatsURL(scoreId: number): string {
    return `https://www.pdga.com/api/v1/feat/live-scores/${scoreId}/throw-timelines`;
}

export async function getTournament(tournamentId: number, division: string, round: number): Promise<Tournament> {
    const response = await fetch(
        getTournamentURL(tournamentId, division, round)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const tournament: Tournament = await response.json();
    return tournament;
}

export async function getAPIStats(scoreId: number): Promise<Array<Stats>> {
    const response = await fetch(
        getStatsURL(scoreId)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const tournament: Array<Stats> = await response.json();
    return tournament;
}

export async function getAPIHoleStats(scoreId: number): Promise<HoleStats> {
    const response = await fetch(
        getHoleStatsURL(scoreId)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const tournament: HoleStats = await response.json();
    return tournament;
}
