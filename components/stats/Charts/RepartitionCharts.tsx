"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BIRDIE_COLOR, BOGEY_COLOR, DBOGEY_COLOR, EAGLE_COLOR, PAR_COLOR } from "../../../assets/colors";

type Props = {
    scoreDistribution: any;
}

export default function RepartitionCharts({scoreDistribution}: Props) {
    function formatTooltip(value, name, props) {
        const { eagle, birdie, par, bogey, double } = props.payload;

        const values = {
            Eagle: eagle,
            Birdie: birdie,
            Par: par,
            Bogey: bogey,
            'Double bogey+': double,
        };

        return [
            `${values[name]} (${value.toFixed(1)} %)`,
            name,
        ];
    }

    return (
        <div className="mt-8 h-90 w-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart
                    data={scoreDistribution}
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
                        dataKey="name"
                        stroke="#64748b"
                        tickLine={false}
                        axisLine={false}
                        width={250}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor:
                                "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "12px",
                            color: "#f8fafc",
                        }}
                        itemSorter={null}
                        formatter={formatTooltip}
                    />

                    <Legend itemSorter={null} />

                    <Bar
                        dataKey="eaglepercent"
                        name="Eagle"
                        stackId="score"
                        fill={EAGLE_COLOR}
                    />

                    <Bar
                        dataKey="birdiepercent"
                        name="Birdie"
                        stackId="score"
                        fill={BIRDIE_COLOR}
                    />

                    <Bar
                        dataKey="parpercent"
                        name="Par"
                        stackId="score"
                        fill={PAR_COLOR}
                    />

                    <Bar
                        dataKey="bogeypercent"
                        name="Bogey"
                        stackId="score"
                        fill={BOGEY_COLOR}
                    />

                    <Bar
                        dataKey="doublepercent"
                        name="Double bogey+"
                        stackId="score"
                        fill={DBOGEY_COLOR}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}