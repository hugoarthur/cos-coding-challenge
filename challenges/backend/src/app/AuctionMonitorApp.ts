import { inject, injectable } from "inversify";
import { ILogger } from "./utils/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuctionResponse } from "./services/CarOnSaleClient/domains/Auction";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.COS_API_CLIENT) private client: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.info(`Auction Monitor started.`);
        try {
            const authenticatedUser = await this.client.authenticate(process.env.USERMAIL || "", { password: process.env.PASSWORD || "" });
            const auctions: IAuctionResponse = await this.client.getRunningAuctions({ headers: { "userid": authenticatedUser.userId, "authtoken": authenticatedUser.token } });

            const average: number = auctions.items.reduce((sum, next) => sum + next.numBids, 0) / auctions.total;
            const sumProgressRatio = auctions.items.reduce((sum, next) => sum + (next.currentHighestBidValue / next.minimumRequiredAsk), 0);
            const averageProgressAuction: string = (sumProgressRatio / auctions.total * 100).toFixed(2);

            this.logger.log(`Total number of auctions: ${auctions.total}`);
            this.logger.log(`Average number of bids for the auctions: ${average}`);
            this.logger.log(`Average percentage of the auctions progress: ${averageProgressAuction}%`);

            process.exit(0);
        } catch (error: any) {
            this.logger.error(error?.data?.message, error?.data);
            process.exit(1);
        }
    }

}
