"use client"

import ProgressBar from "./ProgressBar";
import { BIRDIE_COLOR, EAGLE_COLOR } from "../../../assets/colors";
import { GlobalStats } from "../../../types/stats";
import { useMemo } from "react";
import { StatCard } from "../Statistics";
import InfoTooltip from "../../InfoTooltip";

type Props = {
    globalStats: GlobalStats,
}

export default function CompetitionScoreCharts({globalStats}: Props) {
    const fairway = [{
        name: 'Fairway',
        color: BIRDIE_COLOR,
        value: globalStats.fairwaysuccess,
        total: globalStats.fairwaytotal
    }];

    const scramble = [{
        name: 'Scramble',
        color: BIRDIE_COLOR,
        value: globalStats.scramblesuccess,
        total: globalStats.scrambletotal
    }];

    const reg = [{
        name: 'C1R',
        color: BIRDIE_COLOR,
        value: globalStats.c1rsuccess,
        total: globalStats.c1rtotal
    }, {
        name: 'C2R',
        color: EAGLE_COLOR,
        value: globalStats.c2rsuccess,
        total: globalStats.c2rtotal
    }];

    const C1 = [{
        name: 'C1X Putting',
        color: BIRDIE_COLOR,
        value: globalStats.c1xsuccess,
        total: globalStats.c1xtotal
    }];

    const C2 = [{
        name: 'C2 Putting',
        color: BIRDIE_COLOR,
        value: globalStats.c2success,
        total: globalStats.c2total
    }];

    return (
        <div className="mt-8 h-110 w-full space-y-3">
            <div className="flex items-center">
                <ProgressBar data={fairway} height="h-4"></ProgressBar>
                <InfoTooltip text="Pourcentage de trous où le lancer de départ (et le lancer suivant dans le cas d'un par 5) atteint le fairway, sans finir hors de la zone prévue." />
            </div>
            <div className="flex items-center">
                <ProgressBar data={scramble} height="h-4"></ProgressBar>
                <InfoTooltip text="Capacité à sauver le par en étant sorti de la zone prévue lors d'un lancer." />
            </div>
            <div className="flex items-center">
                <ProgressBar data={reg} height="h-4"></ProgressBar>
                <InfoTooltip text="Pourcentage de trous où le disque atteri dans les 10m(C1)/20m(C2) pour le birdie." />
            </div>
            <div className="flex items-center">
                <ProgressBar data={C1} height="h-4"></ProgressBar>
                <InfoTooltip text="Putts réalisés entre 3m et 10m." />
            </div>
            <div className="flex items-center ">
                <ProgressBar data={C2} height="h-4"></ProgressBar>
                <InfoTooltip text="Putts réalisés entre 10m et 20m." />
            </div>
            <div className="mt-10">
                <section className="mt-3 mb-6 grid grid-cols-3 gap-3">
                    <StatCard
                        label="Nombre de OB"
                        value={globalStats.nbOB.toString()}
                        detail=""
                    />
    
                    <StatCard
                        label="Nombre de hazard"
                        value={globalStats.nbHazard.toString()}
                        detail=""
                    />
    
                    <StatCard
                        label="Nombre de missed mando"
                        value={globalStats.nbMissMando.toString()}
                        detail=""
                    />
                </section>
            </div>
        </div>
    );
}