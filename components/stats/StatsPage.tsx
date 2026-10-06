"use client";

import { useEffect, useState } from "react";
import { Player } from "../../types/player";
import PlayerSelection from "./PlayerSelection";
import { CompetitionData } from "../../types/competition";
import Competitions from "./Competitions";
import { PeriodSelection, PeriodType } from "../../types/period";
import Period from "./Period";
import Statistics from "./Statistics";
import { getPlayers } from "../../lib/player";

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
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player>(null);

    const availableYears = [
        ...new Set(competitions.map((competition) => competition.date.getFullYear())),
    ].sort((a, b) => b - a);

    useEffect(() => {
        async function loadPlayers() {
            const players = await getPlayers();

            setPlayers(players);

            if (players.length > 0) {
                setSelectedPlayer(players[0]);
            }
        }

        loadPlayers();
    }, []);

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
                    onAddPlayer={(newPlayer: Player) => {
                        setPlayers((current) => [
                            ...current,
                            newPlayer
                        ]);
                        setSelectedPlayer(newPlayer);
                    }}
                ></PlayerSelection>

                <Competitions
                    competitions={competitions}
                    onAddCompetition={(newCompetition: CompetitionData) => setCompetitions((current) => [
                        ...current,
                        newCompetition,
                    ])}
                    onDeleteCompetition={(competitionId: number) => setCompetitions((current) => current.filter((item) => item.competitionId !== competitionId))}
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

