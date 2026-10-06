import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
    progressionData: any;
    compareToGlobal: boolean
}

export default function ProgressionChart({ progressionData, compareToGlobal }: Props) {
    return (
        <div className="mt-8 h-90 w-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart
                    data={progressionData}
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

                    {compareToGlobal && (
                        <Line
                            type="monotone"
                            dataKey="global"
                            name="Global"
                            stroke="#64748b"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                        />
                    )}

                    <Line
                        type="monotone"
                        dataKey="score"
                        name="Période sélectionnée"
                        stroke="#818cf8"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            strokeWidth: 2,
                            fill: "#0f172a",
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />

                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}