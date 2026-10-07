"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PeriodSelection } from "../../../types/period";

type Props = {
    scoreDistribution: any;
    periodSelection: PeriodSelection
}

export default function RepartitionCharts({scoreDistribution, periodSelection}: Props) {
    return (
        <div className="mt-8 h-90 w-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart
                    data={
                        periodSelection.compareToGlobal
                            ? scoreDistribution
                            : scoreDistribution.slice(
                                    -1,
                                )
                    }
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1e293b"
                    />

                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        stroke="#64748b"
                        tickLine={false}
                        axisLine={false}
                        unit="%"
                    />

                    <YAxis
                        type="category"
                        dataKey="round"
                        stroke="#64748b"
                        tickLine={false}
                        axisLine={false}
                        width={90}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor:
                                "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "12px",
                            color: "#f8fafc",
                        }}
                    />

                    <Legend />

                    <Bar
                        dataKey="eagle"
                        name="Eagle"
                        stackId="score"
                    />

                    <Bar
                        dataKey="birdie"
                        name="Birdie"
                        stackId="score"
                    />

                    <Bar
                        dataKey="par"
                        name="Par"
                        stackId="score"
                    />

                    <Bar
                        dataKey="bogey"
                        name="Bogey"
                        stackId="score"
                    />

                    <Bar
                        dataKey="double"
                        name="Double bogey+"
                        stackId="score"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}