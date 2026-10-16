import { getAPIStats, getCompetition, getCompetitionResult, getCompetitionRoundStat } from "./api.ts";
import { RoundStats, Stats } from "../../types/stats.ts";
import { RoundStatDTO, Score } from "../../types/competition.ts";

function genStats(stats: Stats[], scoreData: Score, roundStat: RoundStatDTO[]): RoundStats {
    const score = scoreData.Scores.split(",").filter(value => value !== "").map(Number);
    const par = scoreData.Pars.split(",").filter(value => value !== "").slice(0, score.length).map(Number);
    const totalScore = scoreData.ParThruRound;
    const bestRound = scoreData.RoundtoPar;
    const worstRound = scoreData.RoundtoPar;

    let nbEagle = 0;
    let nbBirdie = 0;
    let nbPar = 0;
    let nbBogey = 0;
    let nbDBogeyPlus = 0;
    let worstScore = -Infinity;

    for (let i = 0; i < score.length; i++) {
        const a = score[i];     // 4
        const b = par[i];       // 3
        if (a && b) {
            if (a === b - 2) {
                nbEagle++;
            } else if (a === b - 1) {
                nbBirdie++;
            } else if (a === b) {
                nbPar++;
            } else if (a === b + 1) {
                nbBogey++;
            } else {
                nbDBogeyPlus++;
            }

            if (a - b > worstScore) {
                worstScore = a - b;
            }
        }
    }

    let nbOB = 0;
    let nbHazard = 0;
    let nbMissMando = 0;
    let longestPutt = 0;
    let nbFullStats = 0;
    
    for (let stat of stats) {
        if (stat.holeBreakdown) {
            nbOB += stat.holeBreakdown.ob;
            nbHazard += stat.holeBreakdown.hazard;
            nbMissMando += stat.holeBreakdown.missedMando;

            longestPutt = stat.holeBreakdown.throwIn > longestPutt ? stat.holeBreakdown.throwIn : longestPutt;

            nbFullStats++;
        }
    }

    longestPutt = Math.round(longestPutt * 0.3048);
    


    return {
        fairwaysuccess:roundStat[0].statCount,
        fairwaytotal: roundStat[0].statOpportunityCount,
        c1xsuccess: roundStat[6].statCount,
        c1xtotal: roundStat[6].statOpportunityCount,
        c2success: roundStat[7].statCount,
        c2total: roundStat[7].statOpportunityCount,
        scramblesuccess: roundStat[4].statCount,
        scrambletotal: roundStat[4].statOpportunityCount,
        c1rsuccess: roundStat[1].statCount,
        c1rtotal: roundStat[1].statOpportunityCount,
        c2rsuccess: roundStat[2].statCount,
        c2rtotal: roundStat[2].statOpportunityCount,
        nbOB,
        nbHazard,
        nbMissMando,
        longestPutt,
        nbEagle,
        nbBirdie,
        nbPar,
        nbBogey,
        nbDBogeyPlus,
        rating: scoreData.Rating,
        roundRating: scoreData.RoundRating,
        totalScore,
        bestRound,
        worstRound,
        worstScore,
        tied: scoreData.Tied,
        position: scoreData.RunningPlace,
        nbFullStats
    }
}

export async function getRoundStats(competitionId: number, division: string, round: number, PDGANum: number): Promise<RoundStats | null> {
    const competition = await getCompetition(competitionId, division, round);

    const score = competition.data.scores.find(
        x => x.PDGANum === PDGANum
    );

    if (!score) {
        return null;
    }

    const competitionResult = await getCompetitionResult(score.ResultID);
    
    const roundStat = await getCompetitionRoundStat(competitionResult.playerRounds[round - 1]?.liveScore.scoreId);

    const stats = await getAPIStats(score.ScoreID);

    return genStats(stats, score, roundStat);
}

export async function getCompetitionStats(competitionId: number, division: string, playerId: number, nbRounds: number): Promise<RoundStats[]> {
    const results = await Promise.all(
        Array.from({ length: nbRounds }, (_, i) =>
            getRoundStats(competitionId, division, i + 1, playerId)
        )
    );

    return results.filter((stats): stats is RoundStats => stats !== null && stats !== undefined);
}
