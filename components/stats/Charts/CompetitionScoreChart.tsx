"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
    scoreEvolution: any
}

export default function CompetitionScoreCharts({scoreEvolution}: Props) {
    return (
        <div className="mt-8 h-90 w-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart
                    data={scoreEvolution}
                    margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1e293b"
                    />

                    <XAxis
                        dataKey="round"
                        stroke="#64748b"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        stroke="#64748b"
                        tickLine={false}
                        axisLine={false}
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

                    <Bar
                        dataKey="score"
                        name="Score"
                        radius={[
                            6,
                            6,
                            0,
                            0,
                        ]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}