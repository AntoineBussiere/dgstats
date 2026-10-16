export interface CompetitionDTO {
    data: {
        scores: Array<Score>;
        layouts: Array<{Name: string}>
    }
}

export interface CompetitionDataDTO {
    data: {
        EndDate: string;
        SimpleName: string;
        Divisions: {
            Division: string,
            Players: number
        }[],
        Rounds: number;
        TournamentId: string;
    }
}

export interface Score {
    ScoreID: number;
    ResultID: number;
    PDGANum: number;
    Rounds: string;
    Holes: number;
    Pars: string;
    Scores: string;
    Rating: number;
    RoundRating: number;
    ParThruRound: number;
    RoundtoPar: number;
    Tied: boolean;
    RunningPlace: number;
}

export interface RoundResultDTO {
    playerRounds: {
        liveRoundResult: {
            overallPlace: number;
            roundPlace: number;
            score: number;
            roundId: number;
        },
        liveScore: {
            scoreId: number;
        },
        roundScoreToPar: number
    }[]
    
}

export interface RoundStatDTO {
    statCount: number;
    statId: number;
    statOpportunityCount: number;
    statValue : number;
}