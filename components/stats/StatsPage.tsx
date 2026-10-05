import { getStats } from "../../lib/stats/getStats";

export default async function StatsPage() {
    const a = await getStats();
    console.log(a);
    return (
        <main>
            
        </main>
    );
}