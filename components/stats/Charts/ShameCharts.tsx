"use client"

import { BIRDIE_COLOR } from "../../../assets/colors";
import { addPlusIfPositive } from "../../../lib/stats/utils";
import { ShameStats } from "../../../types/stats";
import { StatCard } from "../Statistics";
import ProgressBar from "./ProgressBar";

type Props = {
    stats: ShameStats,
    nbFullStats: number
}

export default function ShameCharts({stats, nbFullStats}: Props) {
    return (
        <div className="mt-8 h-110 w-full">
            <section className="mt-3 mb-6 grid grid-cols-3 gap-3">
                <StatCard
                    label="Pire trou"
                    value={addPlusIfPositive(stats.worstScore)}
                    detail="Une belle catastrophe"
                />

                <StatCard
                    label="Pénalités cumulées"
                    value={stats.nbPenalties.toString()}
                    detail={`${Math.round(stats.nbPenalties/nbFullStats*10)/10} par rounds en moyenne`}
                />

                <StatCard
                    label="Nombre de putts C1 ratés"
                    value={stats.nbFailedC1.toString()}
                    detail={`${Math.round(stats.nbFailedC1/nbFullStats*10)/10} par rounds en moyenne`}
                />
            </section>
            <section className="mt-3 mb-6 grid grid-cols-2 gap-3">
                <StatCard
                    label="Trous au dessus du par"
                    value={Math.round(((stats.nbBogey + stats.nbDouble) / stats.nbHole) * 100) + '%'}
                    detail="Bogey ou pire"
                    progressbar={{color: "#e8794f", height: 'h-2'}}
                />

                <StatCard
                    label="Double bogey ou pire"
                    value={Math.round((stats.nbDouble / stats.nbHole) * 100) + '%'}
                    detail="Des trous qui coûtent cher"
                    progressbar={{color: "#c084fc", height: 'h-2'}}
                />
            </section>
            <section>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm text-slate-400">
                            Birdies contre bogeys
                        </h3>
                        <span className="text-xs text-slate-400">
                            Sur la période sélectionnée
                        </span>
                    </div>

                    <ProgressBar
                        data={[{value: stats.nbBirdie, total: stats.nbBirdie + stats.nbBogey + stats.nbDouble, color: BIRDIE_COLOR, name:'birdie'}, {value: stats.nbBogey + stats.nbDouble, total: stats.nbBirdie + stats.nbBogey + stats.nbDouble, color: "#e8794f", name: 'bogey+'}]}
                        height="h-4"
                        showPercent={false}
                    ></ProgressBar>

                    <div className="flex items-center justify-between text-xs">
                        <span className={`text-[#038266]`}>
                            {stats.nbBirdie} birdies
                        </span>
                        <span className="text-[#e8794f]">
                            {stats.nbBirdie + stats.nbBogey} bogeys ou pire
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}