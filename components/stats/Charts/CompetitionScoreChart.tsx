"use client"

import ProgressBar from "./ProgressBar";
import { BIRDIE_COLOR, EAGLE_COLOR } from "../../../assets/colors";
import { GlobalStats } from "../../../types/stats";
import { useMemo } from "react";

type Props = {
    globalStats: GlobalStats,
}

export default function CompetitionScoreCharts({globalStats}: Props) {
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
        name: 'C1X Putting',
        color: BIRDIE_COLOR,
        value: globalStats.c2success,
        total: globalStats.c2total
    }];

    return (
        <div className="mt-8 h-90 w-full space-y-3">
            <ProgressBar data={scramble}></ProgressBar>
            <ProgressBar data={reg}></ProgressBar>
            <ProgressBar data={C1}></ProgressBar>
            <ProgressBar data={C2}></ProgressBar>
        </div>
    );
}