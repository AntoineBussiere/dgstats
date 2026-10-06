"use client";

import { useState } from "react";
import { Player } from "../../types/player";
import PlayerSelection from "./PlayerSelection";
import { CompetitionData } from "../../types/competition";
import Competitions from "./Competitions";
import { PeriodSelection, PeriodType } from "../../types/period";
import Period from "./Period";
import Statistics from "./Statistics";


const players: Array<Player> = [
    {
        firstname: "Antoine",
        lastname: "Bussière",
        pdgaNumber: 268260,
    },
    {
        firstname: "Jean",
        lastname: "Dupond",
        pdgaNumber: 654321,
    },
];

const initialCompetitions: CompetitionData[] = [
    {
        competitionId: 1,
        name: "BDO 2026",
        date: new Date('10/10/2026'),
        division: 'MA3',
    },
    {
        competitionId: 2,
        name: "Tract'Open 2026",
        date: new Date('09/09/2026'),
        division: "MPO",
    },
    {
        competitionId: 3,
        name: "Tract'Open 2025",
        date: new Date('10/10/2025'),
        division: "MA1",
    },
];

export default function StatsPage() {

    const [competitions, setCompetitions] = useState<CompetitionData[]>(initialCompetitions);

    const [periodSelection, setPeriodSelection] = useState<PeriodSelection>({type: PeriodType.global, compareToGlobal: false});

    const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0]);

    const availableYears = [
        ...new Set(competitions.map((competition) => competition.date.getFullYear())),
    ].sort((a, b) => b - a);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-medium text-indigo-400">
                        Disc Golf Stats
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Statistiques
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Analysez les performances de vos joueurs.
                    </p>
                </header>

                <PlayerSelection
                    players={players}
                    selectedPlayer={selectedPlayer}
                    onSelectedPlayer={(player: Player) => setSelectedPlayer(player)}
                ></PlayerSelection>

                <Competitions
                    initialCompetitions={initialCompetitions}
                    onAddCompetitions={(competitions: CompetitionData[]) => setCompetitions(competitions)}
                ></Competitions>

                <Period
                    availableYears={availableYears}
                    competitions={competitions}
                    selectedPlayer={selectedPlayer}
                    selectedPeriod={periodSelection}
                    onPeriodSelection={(periodSelection: PeriodSelection) => setPeriodSelection(periodSelection)}
                ></Period>

                <Statistics periodSelection={periodSelection}></Statistics>
            </div>
        </main>
    );
}

