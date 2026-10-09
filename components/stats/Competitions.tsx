"use client";

import { useState } from "react";
import { CompetitionData } from "../../types/competition";
import { getCompetitionData } from "../../lib/stats/api";

type Props = {
    competitions: CompetitionData[],
    onAddCompetition: (competition: CompetitionData) => void
    onDeleteCompetition: (competitionId: number) => void
}

export default function Competitions({competitions, onAddCompetition, onDeleteCompetition}: Props) {
    const [showAddCompetition, setShowAddCompetition] = useState(false);
    const [newCompetitionUrl, setNewCompetitionUrl] = useState("");
    
    async function handleAddCompetition() {
        if (!newCompetitionUrl.trim()) {
            return;
        }

        const splittedUrl = newCompetitionUrl.split('/');
        const idDivision = splittedUrl[splittedUrl.length - 1].split('#');

        const competitionData = await getCompetitionData(Number(idDivision[0]));

        const newCompetition: CompetitionData = {
            competitionId: Number(idDivision[0]),
            name: competitionData.data.SimpleName.replace(/\s*(?:,\s*sponso|- \s*sponso).*$/i, ""),
            division: idDivision[1],
            date: competitionData.data.EndDate
        };
        console.log(newCompetition);
        

        onAddCompetition(newCompetition);

        setNewCompetitionUrl("");
        setShowAddCompetition(false);
    }

    function handleDeleteCompetition(competition: CompetitionData) {
        const confirmed = window.confirm(
            `Supprimer la compétition "${competition.name}" ?`,
        );

        if (confirmed) {
            onDeleteCompetition(competition.competitionId);
        }
    }


    return (
        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <h2 className="font-semibold text-slate-100">
                        Compétitions
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Ajoutez les compétitions à analyser
                        pour ce joueur.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={ () => setShowAddCompetition((current) => !current) }
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                >
                    <span className="text-lg leading-none">
                        +
                    </span>

                    Ajouter une compétition
                </button>
            </div>

            {/* Add competition form */}
            {showAddCompetition && (
                <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                            <label
                                htmlFor="competition-url"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                URL de la compétition
                            </label>

                            <input
                                id="competition-url"
                                type="url"
                                value={newCompetitionUrl}
                                autoComplete="off"
                                onChange={ (event) => setNewCompetitionUrl(event.target.value) }
                                placeholder="https://www.pdga.com/tour/event/103484#MA3"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddCompetition(false);
                                    setNewCompetitionUrl("");
                                }}
                                className="rounded-xl px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                onClick={handleAddCompetition}
                                disabled={
                                    !newCompetitionUrl.trim()
                                }
                                className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Competition list */}
            {competitions?.length > 0 && (
                <div className="space-y-2">
                    {Object.entries(
                        competitions.reduce<Record<number, CompetitionData[]>>((groups, competition) => {
                            if (!groups[(new Date(competition.date)).getFullYear()]) {
                                groups[(new Date(competition.date)).getFullYear()] = [];
                            }

                            groups[(new Date(competition.date)).getFullYear()].push(competition);

                            return groups;
                        }, {})
                    )
                        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                        .map(([year, yearCompetitions]) => (
                            <details
                                key={year}
                                open={year === String(new Date().getFullYear())}
                                className="group rounded-xl border border-slate-800 bg-slate-900/50"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-slate-200">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 transition-transform group-open:rotate-90">
                                            ▶
                                        </span>
                                        <span className="font-medium">
                                            {year}
                                        </span>
                                    </div>

                                    <span className="text-xs text-slate-500">
                                        {yearCompetitions.length}
                                    </span>
                                </summary>

                                <div className="border-t border-slate-800">
                                    {yearCompetitions.map((competition) => (
                                        <div
                                            key={competition.competitionId}
                                            className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/40"
                                        >
                                            <div
                                                
                                                className="min-w-0 flex-1 text-left"
                                            >
                                                <div className="truncate text-sm text-slate-200">
                                                    {competition.name}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDeleteCompetition(competition)}
                                                className="ml-3 rounded-md px-2 py-1 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                                                title="Supprimer"
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        ))}
                </div>
            )}

            {(!competitions || competitions.length === 0) && (
                <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center">
                    <p className="text-sm text-slate-400">
                        Aucune compétition enregistrée
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                        Ajoutez une compétition pour commencer à voir vos statistiques.
                    </p>
                </div>
            )}
        </section>
    );
}