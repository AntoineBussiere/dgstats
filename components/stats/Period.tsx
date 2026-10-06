import { CompetitionData } from "../../types/competition";
import { PeriodSelection, PeriodType } from "../../types/period";
import { Player } from "../../types/player";

type Props = {
    selectedPlayer: Player,
    availableYears: number[],
    competitions: CompetitionData[],
    selectedPeriod: PeriodSelection,
    onPeriodSelection: (period: PeriodSelection) => void
}

const PERIOD_DISPLAY = [
    {
        value: PeriodType.global,
        label: "Global",
    },
    {
        value: PeriodType.year,
        label: "Année",
    },
    {
        value: PeriodType.competition,
        label: "Compétition",
    },
];

export default function Period({selectedPlayer, availableYears, competitions, selectedPeriod, onPeriodSelection}: Props) {
    function selectPeriod(period: PeriodType) {
        const newPeriod: PeriodSelection = {
            ...selectedPeriod,
            type: period,
        };

        switch (period) {
            case PeriodType.global:
                break;
            case PeriodType.year:
                newPeriod.year = newPeriod.year ?? availableYears[0];
                break;
            case PeriodType.competition:
                newPeriod.competition = newPeriod.competition ?? competitions[0];
                break;
            
        }

        onPeriodSelection(newPeriod);
    }

    function selectYear(year: number) {
        const newPeriod: PeriodSelection = {
            ...selectedPeriod,
            year,
        };

        onPeriodSelection(newPeriod);
    }

    function selectCompetition(competitionId: number) {
        const newPeriod: PeriodSelection = {
            ...selectedPeriod,
            competition: competitions.find(x => x.competitionId === competitionId),
        };

        onPeriodSelection(newPeriod);
    }

    function setCompareToGlobal(compareToGlobal: boolean) {
        const newPeriod: PeriodSelection = {
            ...selectedPeriod,
            compareToGlobal,
        };

        onPeriodSelection(newPeriod);
    }

    return (
        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4">
                <h2 className="font-semibold text-slate-100">
                    Période
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Choisissez la période sur laquelle analyser
                    les performances de {selectedPlayer?.firstname} {selectedPlayer?.lastname}.
                </p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex rounded-xl border border-slate-700 bg-slate-950 p-1">
                    { PERIOD_DISPLAY.map((period) => (
                        <button
                            key={period.value}
                            type="button"
                            onClick={ () => selectPeriod(period.value) }
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                selectedPeriod.type === period.value
                                    ? "bg-slate-800 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    {selectedPeriod.type === PeriodType.year && (
                        <select
                            value={selectedPeriod.year}
                            onChange={ (event) => selectYear(Number(event.target.value)) }
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-500"
                        >
                            {availableYears.map((year) => (
                                <option
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>
                            ))}
                        </select>
                    )}

                    {selectedPeriod.type === PeriodType.competition && (
                        <select
                            value={selectedPeriod.competition.name}
                            onChange={ (event) => selectCompetition(Number(event.target.value)) }
                            disabled={ competitions.length === 0 }
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {competitions.map(
                                (competition) => (
                                    <option
                                        key={competition.competitionId}
                                        value={competition.competitionId}
                                    >
                                        {competition.name}
                                    </option>
                                ),
                            )}
                        </select>
                    )}

                    {selectedPeriod.type !== PeriodType.global &&
                        competitions.length > 0 && (
                            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-800 px-4 py-2.5 text-sm text-slate-300 transition hover:border-slate-700">
                                <input
                                    type="checkbox"
                                    checked={ selectedPeriod.compareToGlobal }
                                    onChange={ (event) => setCompareToGlobal(event.target.checked) }
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
                                />

                                Comparer au global
                            </label>
                        )}
                </div>
            </div>
        </section>
    );
}