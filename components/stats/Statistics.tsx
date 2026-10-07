"use client";

import { ReactNode, useMemo, useState } from "react";
import { ChartTypes } from "../../types/charts";
import ShameCharts from "./Charts/ShameCharts";
import CompetitionScoreCharts from "./Charts/CompetitionScoreChart";
import ProgressionChart from "./Charts/ProgressionChart";
import { PeriodSelection, PeriodType } from "../../types/period";
import RepartitionCharts from "./Charts/RepartitionCharts";
import { CompetitionStats, GlobalStats } from "../../types/stats";
import { addPlusIfPositive } from "../../lib/stats/utils";

const scoreEvolution = [
    { round: "R1", score: -4 },
    { round: "R2", score: -7 },
    { round: "R3", score: -2 },
    { round: "R4", score: -8 },
];

const progressionData = [
    { round: "R1", score: -4, global: -3 },
    { round: "R2", score: -7, global: -4 },
    { round: "R3", score: -2, global: -3 },
    { round: "R4", score: -8, global: -4 },
];

const scoreDistribution = [
    {
        round: "Global",
        eagle: 1,
        birdie: 18,
        par: 54,
        bogey: 22,
        double: 5,
    },
    {
        round: "2026",
        eagle: 2,
        birdie: 21,
        par: 52,
        bogey: 20,
        double: 5,
    },
    {
        round: "French Open",
        eagle: 1,
        birdie: 16,
        par: 56,
        bogey: 22,
        double: 5,
    },
];

type Props = {
    periodSelection: PeriodSelection,
    globalStatistics: GlobalStats,
    statsPerCompetition: CompetitionStats[]
}

export default function Statistics({ periodSelection, globalStatistics, statsPerCompetition }: Props) {
    const [activeStat, setActiveStat] = useState(ChartTypes.progression);

    const progressionData = useMemo(() => {
        if ([PeriodType.global, PeriodType.year].includes(periodSelection.type)) {
            let filteredStats: CompetitionStats[];
            switch(periodSelection.type) {
                case PeriodType.global:
                    filteredStats = statsPerCompetition;
                    break;
                case PeriodType.year:
                    filteredStats = statsPerCompetition.filter(x => (new Date(x.competitionDate)).getFullYear() === periodSelection.year)
                    break;
            }
            return filteredStats.sort((a, b) => new Date(a.competitionDate).getTime() - new Date(b.competitionDate).getTime()).map(x => {
                return {
                    name: x.competitionName,
                    roundRating: x.stats.roundRating,
                    rating: x.stats.rating
                };
            });
        }
    }, [periodSelection, globalStatistics, statsPerCompetition]);

    return (
        <>
            <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
                <StatCard
                    label="Score moyen"
                    value={addPlusIfPositive(globalStatistics.meanScore)}
                    detail="par rapport au par"
                />

                <StatCard
                    label="Meilleur score"
                    value={addPlusIfPositive(globalStatistics.bestRound)}
                    detail="sur un round"
                />

                <StatCard
                    label="Birdies (ou mieux)"
                    value={(Math.round((globalStatistics.nbBirdie + globalStatistics.nbEagle) / (globalStatistics.nbBirdie + globalStatistics.nbEagle + globalStatistics.nbPar + globalStatistics.nbBoggie + globalStatistics.nbDBoggiePlus) * 1000) / 10) + '%'}
                    detail="des trous joués"
                />

                <StatCard
                    label="Putt le plus long"
                    value={globalStatistics.longestPutt + 'm'}
                    detail=""
                />

                <StatCard
                    label="Rounds"
                    value={globalStatistics.nbRounds.toString()}
                    detail="comptabilisés"
                />
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
                <div className="flex flex-col md:flex-row">
                    <nav className="border-b border-slate-800 p-3 md:w-56 md:border-b-0 md:border-r">
                        <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Statistiques
                        </p>

                        { [PeriodType.global, PeriodType.year].includes(periodSelection.type) && (
                            <StatTab
                                active={ activeStat === ChartTypes.progression }
                                onClick={() => setActiveStat(ChartTypes.progression)}
                                title={ ChartTypes.progression }
                                description="Évolution du rating"
                                icon={
                                    <svg
                                        className="text-indigo-400 scale-80" fill="currentColor" height="200px" width="200px" version="1.1" id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="-45.5 -45.5 546.00 546.00" stroke="currentColor" strokeWidth="0.00455" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="7.279999999999999"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M415,102.509c-22.091,0-40,17.909-40,40c0,5.542,1.128,10.821,3.166,15.62l-83.791,83.792 c-4.799-2.038-10.078-3.167-15.621-3.167s-10.822,1.129-15.621,3.167l-50.053-50.053c2.038-4.799,3.166-10.078,3.166-15.621 c0-22.091-17.909-40-40-40c-22.091,0-40,17.909-40,40c0,5.542,1.128,10.821,3.166,15.62l-83.792,83.791 c-4.799-2.038-10.078-3.167-15.621-3.167c-22.091,0-40,17.909-40,40s17.909,40,40,40s40-17.909,40-40 c0-5.542-1.128-10.821-3.166-15.62l83.792-83.791c4.799,2.038,10.078,3.166,15.621,3.166c5.542,0,10.821-1.128,15.62-3.166 l50.054,50.054c-2.038,4.799-3.166,10.078-3.166,15.62c0,22.091,17.909,40,40,40c22.091,0,40-17.909,40-40 c0-5.542-1.128-10.821-3.166-15.62l83.791-83.792c4.799,2.038,10.078,3.166,15.621,3.166c22.091,0,40-17.909,40-40 S437.091,102.509,415,102.509z"></path>
                                        </g>
                                    </svg>
                                }
                            />
                        )}

                        <StatTab
                            active={ activeStat === ChartTypes.repartition }
                            onClick={() => setActiveStat(ChartTypes.repartition)}
                            title={ ChartTypes.repartition }
                            description="Birdies, pars, bogeys..."
                            icon={
                                <svg className="text-indigo-400 scale-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15 5V10M9 14V19M4.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V6.6C21 6.03995 21 5.75992 20.891 5.54601C20.7951 5.35785 20.6422 5.20487 20.454 5.10899C20.2401 5 19.9601 5 19.4 5H4.6C4.03995 5 3.75992 5 3.54601 5.10899C3.35785 5.20487 3.20487 5.35785 3.10899 5.54601C3 5.75992 3 6.03995 3 6.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10ZM4.6 19H19.4C19.9601 19 20.2401 19 20.454 18.891C20.6422 18.7951 20.7951 18.6422 20.891 18.454C21 18.2401 21 17.9601 21 17.4V15.6C21 15.0399 21 14.7599 20.891 14.546C20.7951 14.3578 20.6422 14.2049 20.454 14.109C20.2401 14 19.9601 14 19.4 14H4.6C4.03995 14 3.75992 14 3.54601 14.109C3.35785 14.2049 3.20487 14.3578 3.10899 14.546C3 14.7599 3 15.0399 3 15.6V17.4C3 17.9601 3 18.2401 3.10899 18.454C3.20487 18.6422 3.35785 18.7951 3.54601 18.891C3.75992 19 4.03995 19 4.6 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            }
                        />

                        <StatTab
                            active={activeStat === ChartTypes.competitionScore}
                            onClick={() => setActiveStat(ChartTypes.competitionScore)}
                            title={ ChartTypes.competitionScore }
                            description="Performance par round"
                            icon={
                                <svg className="text-indigo-400 scale-80" viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                            }
                        />

                        <StatTab
                            active={activeStat === ChartTypes.shame}
                            onClick={() => setActiveStat(ChartTypes.shame)}
                            title={ ChartTypes.shame }
                            description="Meh"
                            icon={
                                <svg className="text-indigo-400 scale-80" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" 
                                    width="28px" height="28px" fill="currentColor" viewBox="0 0 512 512">
                                    <g>
                                        <path d="M437.914,74.078C392.43,27,326.117,0,255.992,0C185.883,0,119.57,27,74.102,74.063
                                            c-42.5,44-64.703,102.828-62.531,165.688l6.609,83.875c6.031,84.75,55.234,93.906,76.094,93.906c7.563,0,15.531-1.094,23.625-3.188
                                            c1.094,7.938,1,21.859,0.922,32.688l-0.078,15.063c-0.141,10.938-0.359,27.5,11.234,39.234c4.797,4.875,13.563,10.672,28,10.672
                                            h196.047c14.438,0,23.188-5.797,28-10.656c11.578-11.75,11.375-28.297,11.234-39.25l-0.094-15.031
                                            c-0.063-10.844-0.172-24.781,0.938-32.719c8.172,2.109,16.094,3.188,23.625,3.188c20.859,0,70.047-9.156,76.094-93.75l6.563-83.156
                                            l0.047-0.875C502.602,176.891,480.398,118.063,437.914,74.078z M459.961,237.906l-6.516,82.844
                                            c-2.672,37.344-14.703,56.281-35.719,56.281c-4.844,0-10.266-0.891-16.297-2.688c-14.406-4.156-26.891-1.375-35.703,7.5
                                            c-13.406,13.5-13.266,35.313-13.047,65.5l0.078,15.281c0.031,2.5,0.078,6.188-0.141,8.875h-42.75v-50.016h-32.406V471.5h-42.938
                                            v-50.016h-32.391V471.5h-42.766c-0.203-2.688-0.156-6.375-0.125-8.906l0.078-15.297c0.219-30.156,0.359-51.953-13.047-65.453
                                            c-8.766-8.844-20.953-11.75-35.875-7.453c-5.859,1.75-11.281,2.641-16.125,2.641c-21.031,0-33.031-18.938-35.719-56.438
                                            l-6.531-82.688c-1.656-51.609,16.5-99.781,51.203-135.688C141.117,63,196.805,40.5,255.992,40.5
                                            c59.203,0,114.891,22.5,152.781,61.719C443.477,138.125,461.648,186.297,459.961,237.906z"/>
                                        <path d="M256.008,309.656c-9.719,0-31.125,46.688-35.031,54.469c-3.875,7.781,3.906,19.469,15.578,15.563
                                            c11.672-3.875,19.453-13.609,19.453-13.609s7.781,9.734,19.453,13.609c11.656,3.906,19.453-7.781,15.563-15.563
                                            C287.117,356.344,265.742,309.656,256.008,309.656z"/>
                                        <path d="M171.586,183.281c-30.891-3.25-58.578,19.188-61.828,50.094l-4.188,29.422
                                            c-3.25,30.922,19.188,58.578,50.078,61.828c30.922,3.25,58.609-19.172,61.844-50.094l4.188-29.422
                                            C224.914,214.188,202.508,186.531,171.586,183.281z"/>
                                        <path d="M402.242,233.375c-3.234-30.906-30.938-53.344-61.828-50.094c-30.922,3.25-53.328,30.906-50.094,61.828
                                            l4.172,29.422c3.25,30.922,30.938,53.344,61.844,50.094s53.344-30.906,50.094-61.828L402.242,233.375z"/>
                                    </g>
                                </svg>
                            }
                        />
                    </nav>

                    <div className="min-w-0 flex-1 p-5 sm:p-7">
                        {activeStat === ChartTypes.progression && (
                            <div>
                                <ChartHeader
                                    title={ ChartTypes.progression }
                                    description="Évolution de vos scores sur la période sélectionnée."
                                />
                                <ProgressionChart compareToGlobal={periodSelection.compareToGlobal} progressionData={progressionData} ></ProgressionChart>
                            </div>
                        )}

                        {activeStat === ChartTypes.repartition && (
                            <div>
                                <ChartHeader
                                    title={ ChartTypes.repartition }
                                    description="Répartition de vos résultats par type de score."
                                />
                                <RepartitionCharts scoreDistribution={scoreDistribution} periodSelection={periodSelection}></RepartitionCharts>
                            </div>
                        )}

                        {activeStat === ChartTypes.competitionScore && (
                            <div>
                                <ChartHeader
                                    title={ ChartTypes.competitionScore }
                                    description="Visualisez rapidement la performance de chaque round."
                                />
                                <CompetitionScoreCharts scoreEvolution={scoreEvolution}></CompetitionScoreCharts>
                            </div>
                        )}

                        {activeStat === ChartTypes.shame && (
                            <div>
                                <ChartHeader
                                    title={ ChartTypes.shame }
                                    description="Les stats où vous ne serez pas très fier."
                                />
                                <ShameCharts></ShameCharts>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{label}</p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-100">
                {value}
            </p>

            <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </div>
    );
}

function StatTab({ active, onClick, title, description, icon }: { active: boolean; onClick: () => void; title: string; description: string; icon: string | ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                active
                    ? "bg-indigo-500/10 text-indigo-300"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            }`}
        >
            <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg ${
                    active
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-slate-800 text-slate-500"
                }`}
            >
                {icon}
            </span>

            <span className="min-w-0">
                <span className="block text-sm font-medium">
                    {title}
                </span>

                <span className="mt-0.5 block truncate text-xs text-slate-500">
                    {description}
                </span>
            </span>
        </button>
    );
}

function ChartHeader({ title, description }: { title: string; description: string }) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-slate-100">
                {title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
                {description}
            </p>
        </div>
    );
}