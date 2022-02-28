
export interface IAuctionResponse {
    items: IAuction[];
    page: number;
    total: number;
}

export interface IAuction {
    id: number;
    label: string;
    numBids: number;
    currentHighestBidValue: number;
    minimumRequiredAsk: number;
}