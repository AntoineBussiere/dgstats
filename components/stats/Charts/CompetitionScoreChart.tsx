"use client"

import ProgressBar from "./ProgressBar";
import { BIRDIE_COLOR, EAGLE_COLOR } from "../../../assets/colors";
import { GlobalStats } from "../../../types/stats";
import { useMemo } from "react";
import { StatCard } from "../Statistics";

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
            <ProgressBar data={fairway} height="h-4"></ProgressBar>
            <ProgressBar data={scramble} height="h-4"></ProgressBar>
            <ProgressBar data={reg} height="h-4"></ProgressBar>
            <ProgressBar data={C1} height="h-4"></ProgressBar>
            <ProgressBar data={C2} height="h-4"></ProgressBar>
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