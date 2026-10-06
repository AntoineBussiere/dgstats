import { useState } from "react";
import { CompetitionData } from "../../types/competition";

type Props = {
    initialCompetitions: CompetitionData[],
    onAddCompetitions: (competitions: CompetitionData[]) => void
}

export default function Competitions({initialCompetitions}: Props) {
    const [showAddCompetition, setShowAddCompetition] = useState(false);
    const [newCompetitionName, setNewCompetitionName] = useState("");
    const [newCompetitionUrl, setNewCompetitionUrl] = useState("");
    const [competitions, setCompetitions] = useState<CompetitionData[]>(initialCompetitions);
    const [selectedCompetition, setSelectedCompetition] = useState(initialCompetitions[0]?.competitionId ?? "");
    
    
    function handleAddCompetition() {
        if (!newCompetitionName.trim() || !newCompetitionUrl.trim()) {
            return;
        }

        const newCompetition: CompetitionData = {
            competitionId: 1,
            name: '',
            division: ''
        };

        setCompetitions((current) => [
            ...current,
            newCompetition,
        ]);

        // setSelectedCompetition(newCompetition.competitionId);

        setNewCompetitionName("");
        setNewCompetitionUrl("");
        setShowAddCompetition(false);
    }

    function handleDeleteCompetition(id: number) {
        const competition = competitions.find(
            (item) => item.competitionId === id,
        );

        if (!competition) {
            return;
        }

        const confirmed = window.confirm(
            `Supprimer la compétition "${competition.name}" ?`,
        );

        if (!confirmed) {
            return;
        }

        setCompetitions((current) =>
            current.filter((item) => item.competitionId !== id),
        );

        // if (selectedCompetition === id) {
        //     const remainingCompetition = competitions.find(
        //         (item) => item.id !== id,
        //     );

        //     setSelectedCompetition(
        //         remainingCompetition?.id ?? "",
        //     );

        //     setPeriodType("global");
        // }
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
                    onClick={() =>
                        setShowAddCompetition(
                            (current) => !current,
                        )
                    }
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
                    <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto] md:items-end">
                        <div>
                            <label
                                htmlFor="competition-name"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Nom
                            </label>

                            <input
                                id="competition-name"
                                type="text"
                                value={newCompetitionName}
                                onChange={(event) =>
                                    setNewCompetitionName(
                                        event.target.value,
                                    )
                                }
                                placeholder="French Open 2026"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

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
                                onChange={(event) =>
                                    setNewCompetitionUrl(
                                        event.target.value,
                                    )
                                }
                                placeholder="https://..."
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddCompetition(false);
                                    setNewCompetitionName("");
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
                                    !newCompetitionName.trim() ||
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
            {competitions.length > 0 && (
                <div className="space-y-2">
                    {Object.entries(
                        competitions.reduce<Record<number, CompetitionData[]>>((groups, competition) => {
                            if (!groups[competition.date.getFullYear()]) {
                                groups[competition.date.getFullYear()] = [];
                            }

                            groups[competition.date.getFullYear()].push(competition);

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
                                            <button
                                                onClick={() => setSelectedCompetition(competition.competitionId) }
                                                className="min-w-0 flex-1 text-left"
                                            >
                                                <div className="truncate text-sm text-slate-200">
                                                    {competition.name}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {competition.date.getFullYear()}
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => handleDeleteCompetition(competition.competitionId)}
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

            {competitions.length === 0 && (
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