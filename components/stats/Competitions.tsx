"use client";

import { useState } from "react";
import { CompetitionStats } from "../../types/stats";
import { getStats } from "../../lib/stats/getStats";
import { Player } from "../../types/player";
import Loader from "../ui/Loader";

type Props = {
    selectedPlayer: Player,
    competitions: CompetitionStats[],
    onAddCompetition: (competitions: CompetitionStats[]) => void
    onDeleteCompetition: (competitionId: number) => void
}

export default function Competitions({selectedPlayer, competitions, onAddCompetition, onDeleteCompetition}: Props) {
    const [showAddCompetition, setShowAddCompetition] = useState(false);
    const [newCompetitionUrl, setNewCompetitionUrl] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handleAddCompetition() {
        if (!newCompetitionUrl.trim()) {
            return;
        }
        setLoading(true);

        const newCompetitionsPromise: Promise<CompetitionStats>[] = [];
        
        for (const newCompetition of newCompetitionUrl.split(';')) {
            if (newCompetition.trim() && /^https:\/\/www\.pdga\.com\/tour\/event\/\d+#.+$/.test(newCompetition)) {
                const splittedUrl = newCompetition.split('/');
                const idDivision = splittedUrl[splittedUrl.length - 1].split('#');
                
                if (!selectedPlayer.competitions.map(x => x.competitionId).includes(Number(idDivision[0]))) {
                    newCompetitionsPromise.push(getStats(selectedPlayer.pdgaNumber, idDivision[1], Number(idDivision[0])));
                }
            }
        }
        const newCompetitions = await Promise.all(newCompetitionsPromise);
        
        onAddCompetition(newCompetitions.filter((competition): competition is CompetitionStats => competition !== undefined));

        setNewCompetitionUrl("");
        setShowAddCompetition(false);
        setLoading(false);
    }

    function handleDeleteCompetition(competition: CompetitionStats) {
        const confirmed = window.confirm(
            `Supprimer la compétition "${competition.competitionName}" ?`,
        );

        if (confirmed) {
            onDeleteCompetition(competition.competitionId);
        }
    }
    
    async function copyCommand() {
        await navigator.clipboard.writeText(`copy([...new Set([...document.querySelectorAll("a")].map(a => a.href).filter(href => /^https:\\/\\/www\\.pdga\\.com\\/tour\\/event\\/\\d+#.+$/.test(href)))].join(";"));`);
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
                                placeholder="https://www.pdga.com/tour/event/123456#MPO"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={copyCommand}
                                className="rounded-xl bg-gray-800 px-2 py-2.5 transition hover:bg-gray-700 inline-flex items-center justify-center cursor-pointer"
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-400 w-5 h-5">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 1.25H10.9436C9.10583 1.24998 7.65019 1.24997 6.51098 1.40314C5.33856 1.56076 4.38961 1.89288 3.64124 2.64124C2.89288 3.38961 2.56076 4.33856 2.40314 5.51098C2.24997 6.65019 2.24998 8.10582 2.25 9.94357V16C2.25 17.8722 3.62205 19.424 5.41551 19.7047C5.55348 20.4687 5.81753 21.1208 6.34835 21.6517C6.95027 22.2536 7.70814 22.5125 8.60825 22.6335C9.47522 22.75 10.5775 22.75 11.9451 22.75H15.0549C16.4225 22.75 17.5248 22.75 18.3918 22.6335C19.2919 22.5125 20.0497 22.2536 20.6517 21.6517C21.2536 21.0497 21.5125 20.2919 21.6335 19.3918C21.75 18.5248 21.75 17.4225 21.75 16.0549V10.9451C21.75 9.57754 21.75 8.47522 21.6335 7.60825C21.5125 6.70814 21.2536 5.95027 20.6517 5.34835C20.1208 4.81753 19.4687 4.55348 18.7047 4.41551C18.424 2.62205 16.8722 1.25 15 1.25ZM17.1293 4.27117C16.8265 3.38623 15.9876 2.75 15 2.75H11C9.09318 2.75 7.73851 2.75159 6.71085 2.88976C5.70476 3.02502 5.12511 3.27869 4.7019 3.7019C4.27869 4.12511 4.02502 4.70476 3.88976 5.71085C3.75159 6.73851 3.75 8.09318 3.75 10V16C3.75 16.9876 4.38624 17.8265 5.27117 18.1293C5.24998 17.5194 5.24999 16.8297 5.25 16.0549V10.9451C5.24998 9.57754 5.24996 8.47522 5.36652 7.60825C5.48754 6.70814 5.74643 5.95027 6.34835 5.34835C6.95027 4.74643 7.70814 4.48754 8.60825 4.36652C9.47522 4.24996 10.5775 4.24998 11.9451 4.25H15.0549C15.8297 4.24999 16.5194 4.24998 17.1293 4.27117ZM7.40901 6.40901C7.68577 6.13225 8.07435 5.9518 8.80812 5.85315C9.56347 5.75159 10.5646 5.75 12 5.75H15C16.4354 5.75 17.4365 5.75159 18.1919 5.85315C18.9257 5.9518 19.3142 6.13225 19.591 6.40901C19.8678 6.68577 20.0482 7.07435 20.1469 7.80812C20.2484 8.56347 20.25 9.56458 20.25 11V16C20.25 17.4354 20.2484 18.4365 20.1469 19.1919C20.0482 19.9257 19.8678 20.3142 19.591 20.591C19.3142 20.8678 18.9257 21.0482 18.1919 21.1469C17.4365 21.2484 16.4354 21.25 15 21.25H12C10.5646 21.25 9.56347 21.2484 8.80812 21.1469C8.07435 21.0482 7.68577 20.8678 7.40901 20.591C7.13225 20.3142 6.9518 19.9257 6.85315 19.1919C6.75159 18.4365 6.75 17.4354 6.75 16V11C6.75 9.56458 6.75159 8.56347 6.85315 7.80812C6.9518 7.07435 7.13225 6.68577 7.40901 6.40901Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                            </button>

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
                        competitions.reduce<Record<number, CompetitionStats[]>>((groups, competition) => {
                            if (!groups[(new Date(competition.competitionDate)).getFullYear()]) {
                                groups[(new Date(competition.competitionDate)).getFullYear()] = [];
                            }

                            groups[(new Date(competition.competitionDate)).getFullYear()].push(competition);

                            return groups;
                        }, {})
                    )
                        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                        .map(([year, yearCompetitions]) => (
                            <details
                                key={year}
                                // open={year === String(new Date().getFullYear())}
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
                                                    {competition.competitionName}
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
            <Loader show={loading} text="Génération des stats..." />
        </section>
    );
}