import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

// const BASE_COS_CLIENT_URL = process.env.BASE_COS_CLIENT_URL || '';

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.COS_API_CLIENT) private client: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);
        // TODO: Retrieve auctions and display aggregated information (see README.md)
        try {
            const authenticatedUser = await this.client.authenticate(process.env.USERMAIL || "", { password: process.env.PASSWORD || "" });
            const auctions = await this.client.getRunningAuctions({ headers: { "userid": authenticatedUser.userId, "authtoken": authenticatedUser.token } });
            this.logger.log(auctions?.total?.toString());
            process.exit(0);
        } catch (error: any) {
            this.logger.error(error?.data?.message, error?.data);
            process.exit(1);
        }
    }

}
