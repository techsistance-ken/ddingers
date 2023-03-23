// src/types/Inaction.ts
export interface Games {
    games: Game[];
}

export interface Game {
    id: string
    seasonId: string
    created: Date
    result: GameResult
}

export interface GameResult {
    result: 'Win' | 'Loss' | 'DNF Win' | 'DNF Loss' | 'Other' | null,
    ratingBefore: number,
    ratingAfter: number,
    oppRatingBefore: number,
    oppRatingAfter: number,
}