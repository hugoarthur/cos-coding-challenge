import {Container} from "inversify";
import {ILogger} from "./utils/Logger/interface/ILogger";
import {Logger} from "./utils/Logger/classes/Logger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import { IHTTPClient } from "./utils/HTTP/interface/IHTTPClient";
import { AxiosHTTPClient } from "./utils/HTTP/classes/AxiosHTTPClient";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";

const BASE_COS_CLIENT_URL: string = process.env.BASE_COS_CLIENT_URL || "";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.COS_API_CLIENT).to(CarOnSaleClient);
container.bind<IHTTPClient>(DependencyIdentifier.AXIOS_HTTP_CLIENT).toConstantValue(new AxiosHTTPClient(BASE_COS_CLIENT_URL)).whenInjectedInto(CarOnSaleClient);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
