export interface Tournament {
    data: {
        scores: Array<Score>;
        layouts: Array<{Name: string}>
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

export interface TournamentData {
    tournamentId: number;
    division: string;
}