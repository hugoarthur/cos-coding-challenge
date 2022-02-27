
export interface IAuctionResponse {
    items: IAuction[];
    page: number;
    total: number;
}

export interface IAuction {
    numBids: number;
}