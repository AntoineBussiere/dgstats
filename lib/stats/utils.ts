import { BIRDIE_COLOR } from "../../assets/colors.ts";
import { ProgressBarItem } from "../../types/progressbar.ts";
import { BetterStats, CompetitionStats, GlobalStats } from "../../types/stats.ts";

export function aggregateStats(stats: Array<BetterStats>): BetterStats {
    const result = stats.reduce(
        (acc, obj) => ({
            c1xsuccess: acc.c1xsuccess + obj.c1xsuccess,
            c1xtotal: acc.c1xtotal + obj.c1xtotal,
            c2success: acc.c2success + obj.c2success,
            c2total: acc.c2total + obj.c2total,
            scramblesuccess: acc.scramblesuccess + obj.scramblesuccess,
            scrambletotal: acc.scrambletotal + obj.scrambletotal,
            c1rsuccess: acc.c1rsuccess + obj.c1rsuccess,
            c1rtotal: acc.c1rtotal + obj.c1rtotal,
            c2rsuccess: acc.c2rsuccess + obj.c2rsuccess,
            c2rtotal: acc.c2rtotal + obj.c2rtotal,
            nbOB: acc.nbOB + obj.nbOB,
            nbHazard: acc.nbHazard + obj.nbHazard,
            nbMissMando: acc.nbMissMando + obj.nbMissMando,
            longestPutt: Math.max(acc.longestPutt, obj.longestPutt),
            nbEagle: acc.nbEagle + obj.nbEagle,
            nbBirdie: acc.nbBirdie + obj.nbBirdie,
            nbPar: acc.nbPar + obj.nbPar,
            nbBogey: acc.nbBogey + obj.nbBogey,
            nbDBogeyPlus: acc.nbDBogeyPlus + obj.nbDBogeyPlus,
            rating: obj.rating,
            roundRatingSum: acc.roundRatingSum + obj.roundRating,
            roundRatingCount: acc.roundRatingCount + 1,
            nbRounds: acc.nbRounds + 1,
            totalScore: obj.totalScore,
            bestRound: Math.min(acc.bestRound, obj.bestRound)
        }),
        {
            c1xsuccess: 0,
            c1xtotal: 0,
            c2success: 0,
            c2total: 0,
            scramblesuccess: 0,
            scrambletotal: 0,
            c1rsuccess: 0,
            c1rtotal: 0,
            c2rsuccess: 0,
            c2rtotal: 0,
            nbOB: 0,
            nbHazard: 0,
            nbMissMando: 0,
            longestPutt: 0,
            nbEagle: 0,
            nbBirdie: 0,
            nbPar: 0,
            nbBogey: 0,
            nbDBogeyPlus: 0,
            rating: 0,
            roundRatingSum: 0,
            roundRatingCount: 0,
            nbRounds: 0,
            totalScore: 0,
            bestRound: 999
        }
    );

    const averageRoundRating = result.roundRatingCount > 0 ? result.roundRatingSum / result.roundRatingCount : 0;
    return {
        ...result,
        roundRating: Math.round(averageRoundRating)
    };
}


export function aggregateGlobalStats(stats: CompetitionStats[]): GlobalStats {
    const aggregate = stats.reduce(
        (acc, obj) => ({
            c1xsuccess: acc.c1xsuccess + obj.stats.c1xsuccess,
            c1xtotal: acc.c1xtotal + obj.stats.c1xtotal,
            c2success: acc.c2success + obj.stats.c2success,
            c2total: acc.c2total + obj.stats.c2total,
            scramblesuccess: acc.scramblesuccess + obj.stats.scramblesuccess,
            scrambletotal: acc.scrambletotal + obj.stats.scrambletotal,
            c1rsuccess: acc.c1rsuccess + obj.stats.c1rsuccess,
            c1rtotal: acc.c1rtotal + obj.stats.c1rtotal,
            c2rsuccess: acc.c2rsuccess + obj.stats.c2rsuccess,
            c2rtotal: acc.c2rtotal + obj.stats.c2rtotal,
            nbOB: acc.nbOB + obj.stats.nbOB,
            nbHazard: acc.nbHazard + obj.stats.nbHazard,
            nbMissMando: acc.nbMissMando + obj.stats.nbMissMando,

            longestPutt: Math.max(acc.longestPutt, obj.stats.longestPutt),

            nbEagle: acc.nbEagle + obj.stats.nbEagle,
            nbBirdie: acc.nbBirdie + obj.stats.nbBirdie,
            nbPar: acc.nbPar + obj.stats.nbPar,
            nbBogey: acc.nbBogey + obj.stats.nbBogey,
            nbDBogeyPlus: acc.nbDBogeyPlus + obj.stats.nbDBogeyPlus,

            nbRounds: acc.nbRounds + obj.stats.nbRounds,

            totalScoreSum: acc.totalScoreSum + obj.stats.totalScore,
            totalScoreRounds: acc.totalScoreRounds + obj.stats.nbRounds,

            bestRound: Math.min(acc.bestRound, obj.stats.bestRound)
        }),
        {
            c1xsuccess: 0,
            c1xtotal: 0,
            c2success: 0,
            c2total: 0,
            scramblesuccess: 0,
            scrambletotal: 0,
            c1rsuccess: 0,
            c1rtotal: 0,
            c2rsuccess: 0,
            c2rtotal: 0,
            nbOB: 0,
            nbHazard: 0,
            nbMissMando: 0,
            longestPutt: 0,
            nbEagle: 0,
            nbBirdie: 0,
            nbPar: 0,
            nbBogey: 0,
            nbDBogeyPlus: 0,
            nbRounds: 0,

            totalScoreSum: 0,
            totalScoreRounds: 0,

            bestRound: Infinity
        }
    );

    const result = {
        ...aggregate,
        meanScore: Math.round((aggregate.totalScoreSum / aggregate.totalScoreRounds) * 10) / 10
    };

    delete result.totalScoreSum;
    delete result.totalScoreRounds;

    return result;
}

export function addPlusIfPositive(score: number): string {
    return (score > 0 ? '+' : '') + score;
}
