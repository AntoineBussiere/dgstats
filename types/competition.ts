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
    }
}

interface Score {
    ScoreID: number;
    PDGANum: number;
    Rounds: string;
    Holes: number;
    Pars: string;
    Scores: string;
    Rating: number;
    RoundRating: number;
    ParThruRound: number;
    RoundtoPar: number;
}

export interface CompetitionData {
    competitionId: number;
    division: string;
    name?: string;
    date?: string;
}