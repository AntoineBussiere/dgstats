import StatsPage from "../components/stats/StatsPage";
import { getPlayers } from "../lib/player";

export default async function Home() {
    const players = await getPlayers();
    return <StatsPage initialPlayers={players}></StatsPage>;
}