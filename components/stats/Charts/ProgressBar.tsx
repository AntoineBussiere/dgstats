import { ProgressBarItem } from "../../../types/progressbar";

type Props = {
    data: ProgressBarItem[];
    showPercent?: boolean;
    height: string;
};

export default function ProgressBar({ data, showPercent = true, height }: Props) {
    return (
        <div className="flex items-center gap-3 w-full">
            <div className={`${showPercent ? 'w-3/4' : 'w-full'} shrink-0 ${height} bg-slate-700 rounded-full overflow-hidden flex`}>
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
                            {showPercent && (
                                <p className="w-full text-right text-xs text-white pr-2 font-bold">
                                    {Math.round(percentage)}%
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            {showPercent && (
                <span className="whitespace-nowrap text-sm text-slate-300">
                    {data.map((item) => (
                        <span className="mr-7" key={item.name}>
                            {item.value}/{item.total} {item.name}
                        </span>
                    ))}
                </span>
            )}
        </div>
    );
}