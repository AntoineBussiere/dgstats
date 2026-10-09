import { getAPIHoleStats, getAPIStats, getCompetition } from "./api.ts";
import { BetterStats, HoleStats, Stats } from "../../types/stats.ts";

function genStats(stats: Stats[], s: string, p: string, holeStats: HoleStats, rating: number, roundRating: number, totalScore: number, bestRound: number): BetterStats {
    const score = s.split(",").filter(value => value !== "").map(Number);
    const par = p.split(",").filter(value => value !== "").slice(0, score.length).map(Number);

    let nbEagle = 0;
    let nbBirdie = 0;
    let nbPar = 0;
    let nbBogey = 0;
    let nbDBogeyPlus = 0;

    for (let i = 0; i < score.length; i++) {
        const a = score[i];
        const b = par[i];
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
        }
    }

    let c1xsuccess = 0;
    let c1xtotal = 0;
    let c2success = 0;
    let c2total = 0;
    let scramblesuccess = 0;
    let scrambletotal = 0;
    let c1rsuccess = 0;
    let c1rtotal = 0;
    let c2rsuccess = 0;
    let c2rtotal = 0;
    let nbOB = 0;
    let nbHazard = 0;
    let nbMissMando = 0;
    let longestPutt = 0;

    if (holeStats) {
        for (let i = 0; i < stats.length; i++) {
            const stat = stats[i];
            const holeStat = holeStats.scoreThrows[i];
            if (stat && holeStat) {
                // C1X
                c1xsuccess += stat.holeBreakdown.throwIn > 10 && stat.holeBreakdown.c1x ? 1 : 0;    // 10ft ~= 3m
                c1xtotal += stat.holeBreakdown.c1x;
    
                // C2
                c2success += stat.holeBreakdown.throwIn > 30 && stat.holeBreakdown.c2 ? 1 : 0;      // 30ft ~= 10m
                c2total += stat.holeBreakdown.c2;
    
                // SCRAMBLE
                scramblesuccess += stat.holeBreakdown.scramble === "success" ? 1 : 0;
                scrambletotal += stat.holeBreakdown.scramble !== "" ? 1 : 0;
    
                // C1 reg
                const regulationThrow = holeStat.holeThrows[holeStat.liveLayoutDetail.par - 3];
                c1rsuccess += regulationThrow?.liveScoreThrow.zoneId === 3 || regulationThrow?.liveScoreThrow.zoneId === 5 ? 1 : 0;
                c1rtotal += 1;
    
                // C2 reg
                c2rsuccess += [3, 4, 5].includes(
                    holeStat.holeThrows[holeStat.liveLayoutDetail.par - 3]?.liveScoreThrow.zoneId ?? -1
                ) ? 1 : 0;
                c2rtotal += 1;
                
                nbOB += stat.holeBreakdown.ob;
                nbHazard += stat.holeBreakdown.hazard;
                nbMissMando += stat.holeBreakdown.missedMando;
    
                longestPutt = stat.holeBreakdown.throwIn > longestPutt ? stat.holeBreakdown.throwIn : longestPutt;
            }
        }
    
        longestPutt = Math.round(longestPutt * 0.3048);
    }


    return {
        c1xsuccess,
        c1xtotal,
        c2success,
        c2total,
        scramblesuccess,
        scrambletotal,
        c1rsuccess,
        c1rtotal,
        c2rsuccess,
        c2rtotal,
        nbOB,
        nbHazard,
        nbMissMando,
        longestPutt,
        nbEagle,
        nbBirdie,
        nbPar,
        nbBogey,
        nbDBogeyPlus,
        rating,
        roundRating,
        totalScore,
        bestRound
    }
}

export async function getRoundStats(competitionId: number, division: string, round: number, PDGANum: number): Promise<BetterStats | null> {
    const competition = await getCompetition(competitionId, division, round);

    const score = competition.data.scores.find(
        x => x.PDGANum === PDGANum
    );

    if (!score) {
        return null;
    }

    const stats = await getAPIStats(score.ScoreID);
    let holeStats: HoleStats;

    if (stats[0]?.holeBreakdown) {
        holeStats = await getAPIHoleStats(score.ScoreID);
    }

    return genStats(stats, score.Scores, score.Pars, holeStats, score.Rating, score.RoundRating, score.ParThruRound, score.RoundtoPar);
}

export async function getCompetitionStats(competitionId: number, division: string, playerId: number): Promise<BetterStats[]> {
    const firstRound = await getCompetition(competitionId, division, 1);

    const nbRounds = firstRound.data.scores[0]?.Rounds.split(",").filter(value => value !== "").map(Number).length ?? 0;

    const roundStats: BetterStats[] = [];

    for (let round = 1; round <= nbRounds; round++) {
        const stats = await getRoundStats(competitionId, division, round, playerId);

        if (stats) {
            roundStats.push(stats);
        }
    }

    return roundStats;
}
