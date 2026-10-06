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

export interface HoleStats {
    scoreThrows: Array<{
        holeThrows: Array<{
            liveScoreThrow: {
                zoneId: number
            }
        }>,
        liveLayoutDetail: {
            par: number
        }
    }>
}

export interface BetterStats {
    c1xsuccess: number;
    c1xtotal: number;
    c2success: number;
    c2total: number;
    scramblesuccess: number;
    scrambletotal: number;
    c1rsuccess: number;
    c1rtotal: number;
    c2rsuccess: number;
    c2rtotal: number;
    nbOB: number;
    nbHazard: number;
    nbMissMando: number;
    longestPutt: number;
    nbEagle: number;
    nbBirdie: number;
    nbPar: number;
    nbBoggie: number;
    nbDBoggiePlus: number;
}

export interface CompetitionStats {
    competitionName: string;
    competitionDate: Date;
    stats: BetterStats;
}