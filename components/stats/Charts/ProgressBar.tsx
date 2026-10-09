import { ProgressBarItem } from "../../../types/progressbar";

type Props = {
    data: ProgressBarItem[];
};

export default function ProgressBar({ data }: Props) {
    return (
        <div className="flex items-center gap-3 w-full">
            <div className="w-3/4 shrink-0 h-4 bg-slate-700 rounded-full overflow-hidden flex">
                {data.map((item) => {
                    const percentage = item.total > 0 ? (item.value / item.total) * 100 : 0;

                    return (
                        <div
                            key={item.name}
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: item.color,
                            }}
                        >
                            <p className="w-full text-right text-xs text-white pr-2 font-bold">
                                {Math.round(percentage)}%
                            </p>
                        </div>
                    );
                })}
            </div>

            <span className="whitespace-nowrap text-sm text-slate-300">
                {data.map((item) => (
                    <span className="mr-7" key={item.name}>
                        {item.value}/{item.total} {item.name}
                    </span>
                ))}
            </span>
        </div>
    );
}