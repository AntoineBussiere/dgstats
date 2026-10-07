import { BetterStats } from "../../types/stats.ts";

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
            nbBoggie: acc.nbBoggie + obj.nbBoggie,
            nbDBoggiePlus: acc.nbDBoggiePlus + obj.nbDBoggiePlus,
            rating: obj.rating,
            roundRatingSum: acc.roundRatingSum + obj.roundRating,
            roundRatingCount: acc.roundRatingCount + 1
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
            nbBoggie: 0,
            nbDBoggiePlus: 0,
            rating: 0,
            roundRatingSum: 0,
            roundRatingCount: 0
        }
    );

    const averageRoundRating = result.roundRatingCount > 0 ? result.roundRatingSum / result.roundRatingCount : 0;
    return {
        ...result,
        roundRating: averageRoundRating
    };
}