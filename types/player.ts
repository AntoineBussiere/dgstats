import { CompetitionData } from "./competition";

export type Player = {
    firstname: string;
    lastname: string;
    pdgaNumber: number;
    competitions: CompetitionData[];
};