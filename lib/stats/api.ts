'use server'

import { CompetitionDTO, CompetitionDataDTO, RoundResultDTO, RoundStatDTO } from "../../types/competition.ts";
import { Stats } from "../../types/stats.ts";


function getCompetitionURL(competitionId: number, division: string, round: number): string {
    return `https://www.pdga.com/apps/tournament/live-api/live_results_fetch_round?TournID=${competitionId}&Division=${division}&Round=${round}`;
}

function getCompetitionDataURL(competitionId: number): string {
    return `https://www.pdga.com/apps/tournament/live-api/live_results_fetch_event?TournID=${competitionId}`;
}

function getCompetitionResultURL(resultId: number): string {
    return `https://www.pdga.com/api/v1/feat/live-result-overview/${resultId}`;
}

function getCompetitionRoundStatURL(resultId: number): string {
    return `https://www.pdga.com/api/v1/feat/live-scores/${resultId}/round-stats`;
}

function getStatsURL(scoreId: number): string {
    return `https://www.pdga.com/api/v1/feat/live-scores/${scoreId}/hole-breakdowns`;
}

export async function getCompetition(competitionId: number, division: string, round: number): Promise<CompetitionDTO> {
    const response = await fetch(
        getCompetitionURL(competitionId, division, round)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const competition: CompetitionDTO = await response.json();
    return competition;
}

export async function getCompetitionData(competitionId: number): Promise<CompetitionDataDTO> {
    const response = await fetch(
        getCompetitionDataURL(competitionId)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const competition: CompetitionDataDTO = await response.json();
    return competition;
}

export async function getCompetitionResult(resultId: number): Promise<RoundResultDTO> {
    const response = await fetch(
        getCompetitionResultURL(resultId)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const competition: RoundResultDTO = await response.json();
    return competition;
}

export async function getCompetitionRoundStat(liveScoreId: number): Promise<RoundStatDTO[]> {
    const response = await fetch(
        getCompetitionRoundStatURL(liveScoreId)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const competition: RoundStatDTO[] = await response.json();
    return competition;
}

export async function getAPIStats(scoreId: number): Promise<Array<Stats>> {
    const response = await fetch(
        getStatsURL(scoreId)
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const competition: Array<Stats> = await response.json();
    return competition;
}
