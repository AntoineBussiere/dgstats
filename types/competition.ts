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
    HoleScores: Array<string>;
    ScoreID: number;
    PDGANum: number;
    Rounds: string;
    Holes: number;
    Pars: string;
    Scores: string;
}

export interface CompetitionData {
    competitionId: number;
    division: string;
    name?: string;
    date?: Date;
}