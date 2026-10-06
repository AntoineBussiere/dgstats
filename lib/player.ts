"use server";

import { Player } from "../types/player";
import { redisSuffix } from "./env";
import { redis } from "./redis";

export async function getPlayers() {
    const users = await redis.get('DGSTATS-player' + redisSuffix) as Player[];
    return users;
}

export async function setPlayers(players: Player[]) {
    await redis.set('DGSTATS-player' + redisSuffix, players);
}