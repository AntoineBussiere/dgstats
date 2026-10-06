import { useState } from "react";
import { Player } from "../../types/player";
import { setPlayers } from "../../lib/player";

type Props = {
    players: Array<Player>,
    selectedPlayer: Player,
    onSelectedPlayer: (player: Player) => void,
    onAddPlayer: (player: Player) => void
}

export default function PlayerSelection({players, selectedPlayer, onSelectedPlayer, onAddPlayer}: Props) {
    const [showAddPlayer, setShowAddPlayer] = useState(false);
    const [newPlayerFirstname, setNewPlayerFirstname] = useState("");
    const [newPlayerLastname, setNewPlayerLastname] = useState("");
    const [newPlayerPDGANumber, setNewPlayerPDGANumber] = useState("");

    function selectPlayer(PDGANum: number) {
        onSelectedPlayer(players.find(x => x.pdgaNumber === PDGANum))
    }

    async function handleAddPlayer() {
        const PDGANum = Number(newPlayerPDGANumber);
        if (!newPlayerFirstname.trim() || !newPlayerLastname.trim() || PDGANum <= 0) {
            return;
        }

        const newPlayer: Player = {
            firstname: newPlayerFirstname,
            lastname: newPlayerLastname,
            pdgaNumber: PDGANum
        }

        try {
            await setPlayers([...players, newPlayer]);
            onAddPlayer(newPlayer);
            resetForm();
        } catch (e) {
            console.error(e);
        }


    }

    function resetForm() {
        setShowAddPlayer(false);
        setNewPlayerFirstname("");
        setNewPlayerLastname("");
        setNewPlayerPDGANumber(null);
    }

    return (
        <section className="mb-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1">
                    <label
                        htmlFor="player"
                        className="mb-2 block text-sm font-medium text-slate-300"
                    >
                        Joueur
                    </label>
                    <div className="relative">
                        <select
                            id="player"
                            value={selectedPlayer?.pdgaNumber}
                            onChange={(event) =>
                                selectPlayer(Number(event.target.value))
                            }
                            className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 pr-10 text-sm text-slate-200"
                        >
                            {players.map((item) => (
                                <option
                                    key={item.pdgaNumber}
                                    value={item.pdgaNumber}
                                >
                                    {item.firstname} {item.lastname} - PDGA{" "}
                                    {item.pdgaNumber}
                                </option>
                            ))}
                        </select>

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                            ▼
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 text-sm font-semibold text-white transition hover:bg-indigo-400 active:scale-[0.98]"
                    onClick={() => setShowAddPlayer((previous) => !previous)}
                >
                    <span className="text-lg leading-none">
                        +
                    </span>

                    Ajouter un joueur
                </button>
            </div>

            {/* Add player form */}
            {showAddPlayer && (
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="grid gap-4 md:grid-cols-[2fr_2fr_1fr_auto] md:items-end">
                        <div>
                            <label
                                htmlFor="competition-name"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Prénom
                            </label>

                            <input
                                id="competition-name"
                                type="text"
                                value={newPlayerFirstname}
                                onChange={ (event) => setNewPlayerFirstname(event.target.value) }
                                placeholder="Jean"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="competition-name"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Nom
                            </label>

                            <input
                                id="competition-name"
                                type="text"
                                value={newPlayerLastname}
                                onChange={ (event) => setNewPlayerLastname(event.target.value) }
                                placeholder="Dupont"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="competition-url"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Numéro PDGA
                            </label>

                            <input
                                id="competition-url"
                                type="number"
                                value={newPlayerPDGANumber}
                                onChange={ (event) => setNewPlayerPDGANumber(event.target.value) }
                                placeholder="123456"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-xl px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                onClick={handleAddPlayer}
                                disabled={
                                    !newPlayerFirstname.trim() ||
                                    !newPlayerLastname.trim() ||
                                    Number(newPlayerPDGANumber) <= 0
                                }
                                className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}