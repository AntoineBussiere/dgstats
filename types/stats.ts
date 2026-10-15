export interface Stats {
    holeOrdinal: number;
    holeBreakdown: {
        driving: 'hit' | 'parked' | 'short' | 'c2' | 'ob' | 'off' | 'hazard' | 'c1';
        scramble: '' | 'fail' | 'success';
        green: '' | 'c2' | 'c1' | 'parked';
        c1x: number;
        c1: number;
        c2: number;
        throwIn: number;
        ob: number;
        hazard: number;
        missedMando: number;
        lostDisc: number;
        penalty: number;
    }
}

export interface CommonStats {
    fairwaysuccess?: number;
    fairwaytotal?: number;
    c1xsuccess?: number;
    c1xtotal?: number;
    c2success?: number;
    c2total?: number;
    scramblesuccess?: number;
    scrambletotal?: number;
    c1rsuccess?: number;
    c1rtotal?: number;
    c2rsuccess?: number;
    c2rtotal?: number;
    nbOB?: number;
    nbHazard?: number;
    nbMissMando?: number;
    longestPutt?: number;
    nbEagle: number;
    nbBirdie: number;
    nbPar: number;
    nbBogey: number;
    nbDBogeyPlus: number;
    nbRounds?: number;
    bestRound: number;
    worstRound: number;
    worstScore: number;
    position: number;
    tied: boolean;
    nbFullStats: number;
}

export interface RoundStats extends CommonStats {
    rating: number;
    roundRating: number;
    bestRoundRating?: number;
    worstRoundRating?: number;
    totalScore: number;
}

export interface GlobalStats extends CommonStats {
    meanScore: number;
}

export interface CompetitionStats {
    competitionName: string;
    competitionDate: string;
    nbPlayers: number;
    stats: RoundStats;
}

export interface ShameStats {
    worstScore: number;
    nbPenalties: number;
    nbCompetitions: number;
    nbBogey: number;
    nbDouble: number;
    nbBirdie: number;
    nbHole: number;
    nbFailedC1: number;
}

export interface PerformanceStats {
    top25: number;
    betterThan: number;
    biggestRatingDifference: number;
    ratingStandardDeviation: number;
}