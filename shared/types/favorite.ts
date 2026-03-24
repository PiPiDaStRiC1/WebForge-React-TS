export interface Favorite {
    likedUserId: number;
    timestamp?: Date;
}

export type FavoritesData = Record<string, Favorite>;

export interface FavoriteOrder {
    likedOrderId: number;
    timestamp?: Date;
}

export type FavoriteOrdersData = Record<string, FavoriteOrder>;