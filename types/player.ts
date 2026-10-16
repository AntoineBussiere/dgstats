import { CompetitionStats } from "./stats";

export type Player = {
    firstname: string;
    lastname: string;
    pdgaNumber: number;
    competitions: CompetitionStats[];
};