import { useState } from "react";
import { Player } from "../../types/player";

type Props = {
    players: Array<Player>,
    selectedPlayer: Player,
    onSelectedPlayer: (player: Player) => void
}

export default function PlayerSelection({players, selectedPlayer, onSelectedPlayer}: Props) {
    function selectPlayer(PDGANum: number) {
        onSelectedPlayer(players.find(x => x.pdgaNumber === PDGANum))
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
                            value={selectedPlayer.pdgaNumber}
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
                >
                    <span className="text-lg leading-none">
                        +
                    </span>

                    Ajouter un joueur
                </button>
            </div>
        </section>
    );
}