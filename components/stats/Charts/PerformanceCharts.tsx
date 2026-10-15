"use client"

import { PerformanceStats } from "../../../types/stats";
import { StatCard } from "../Statistics";

type Props = {
    stats: PerformanceStats
}

export default function PerformanceCharts({stats}: Props) {
    return (
        <div className="mt-8 h-110 w-full">
            <section className="mt-3 mb-6 grid grid-cols-2 gap-3">
                <StatCard
                    label="Joueurs devancés"
                    value={stats.betterThan + '%'}
                    detail="En moyenne"
                />

                <StatCard
                    label="Top 25%"
                    value={stats.top25 + '%'}
                    detail="Des compétitions"
                />

                <StatCard
                    label="Pire écart de rating"
                    value={stats.biggestRatingDifference.toString()}
                    detail="Entre le meilleur et le pire round"
                />

                <StatCard
                    label="Régularité du rating"
                    value={stats.ratingStandardDeviation.toString()}
                    detail='Écart-type des compétitions'
                />
            </section>
        </div>
    );
}