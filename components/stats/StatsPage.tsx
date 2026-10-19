"use client";

import { useEffect, useMemo, useState } from "react";
import { Player } from "../../types/player";
import PlayerSelection from "./PlayerSelection";
import Competitions from "./Competitions";
import { PeriodSelection, PeriodType } from "../../types/period";
import Period from "./Period";
import Statistics from "./Statistics";
import { setDBPlayers } from "../../lib/player";
import { CompetitionStats } from "../../types/stats";
import { aggregateGlobalStats } from "../../lib/stats/utils";
import { mergeCompetitions } from "../../lib/competition";

export default function StatsPage({initialPlayers}: {initialPlayers: Player[]}) {
    const [periodSelection, setPeriodSelection] = useState<PeriodSelection>({type: PeriodType.global, compareToGlobal: false});
    const [players, setPlayers] = useState<Player[]>(initialPlayers);
    const [selectedPlayer, setSelectedPlayer] = useState<Player>();

    const availableYears = [
        ...new Set(selectedPlayer?.competitions?.map((competition) => (new Date(competition.competitionDate)).getFullYear())),
    ].sort((a, b) => b - a);
    

    const globalStatistics = useMemo(
        () => {
            if (selectedPlayer?.competitions){
                return aggregateGlobalStats(selectedPlayer.competitions)
            }
        },
        [selectedPlayer?.competitions]
    );

    useEffect(() => {
        const savedPdgaNumber = localStorage.getItem("selectedPlayer");

        if (savedPdgaNumber) {
            setSelectedPlayer(initialPlayers.find(x => x.pdgaNumber === Number(savedPdgaNumber)));
        } else {
            if (initialPlayers.length > 0) {
                setSelectedPlayer(initialPlayers[0]);
                localStorage.setItem("selectedPlayer", initialPlayers[0].pdgaNumber.toString());
            }
        }
    }, [initialPlayers]);

    async function addCompetitions(newCompetitions: CompetitionStats[]) {
        const competitions = mergeCompetitions(selectedPlayer.competitions, newCompetitions);
        const updatedPlayers = players.map((player) =>
            player.pdgaNumber === selectedPlayer.pdgaNumber
                ? {
                    ...player,
                    competitions
                }
                : player
        );
        setPlayers(updatedPlayers);

        setSelectedPlayer((currentPlayer) => {
            return {
                ...currentPlayer,
                competitions
            }
        });

        try {
            await setDBPlayers(updatedPlayers);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteCompetition(competitionId: number) {
        const updatedPlayer = {
            ...selectedPlayer,
            competitions: selectedPlayer.competitions.filter(
                (competition) => competition.competitionId !== competitionId
            ),
        };

        const updatedPlayers = players.map((p) =>
            p.pdgaNumber === updatedPlayer.pdgaNumber ? updatedPlayer : p
        );

        setPlayers(updatedPlayers);
        setSelectedPlayer(updatedPlayer);
        
        try {
            await setDBPlayers(updatedPlayers);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" data-tooltip-boundary>
                <header className="mb-8">
                    <p className="mb-2 text-sm font-medium text-indigo-400">
                        Disc Golf Stats
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Statistiques
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Analysez vos statistiques de Disc Golf !
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

                    {selectedPlayer && (
                        <>
                            <Competitions
                                selectedPlayer={selectedPlayer}
                                competitions={selectedPlayer.competitions}
                                onAddCompetition={addCompetitions}
                                onDeleteCompetition={deleteCompetition}
                            ></Competitions>

                            {selectedPlayer.competitions.length > 0 && (
                                <>
                                    <Period
                                        availableYears={availableYears}
                                        competitions={selectedPlayer.competitions}
                                        selectedPlayer={selectedPlayer}
                                        selectedPeriod={periodSelection}
                                        onPeriodSelection={(periodSelection: PeriodSelection) => setPeriodSelection(periodSelection)}
                                    ></Period>

                                    <Statistics
                                        periodSelection={periodSelection}
                                        globalStatistics={globalStatistics}
                                        statsPerCompetition={selectedPlayer.competitions}
                                    ></Statistics>
                                </>
                            )}
                        </>
                    )}
            </div>
        </main>
    );
}

