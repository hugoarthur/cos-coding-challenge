import { IAuctionResponse } from "../models/Auction";
import { IAuthenticationRequest, IAuthenticationResult } from "../models/Authentication";
import { IHTTPClient } from "../../../utils/http/interface/IHTTPClient";
import { IHTTPRequest } from "../../../utils/http/models/http";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AXIOS_HTTP_CLIENT) private httpClient: IHTTPClient) {
    }

    authenticate(userMailId: string, authReq: IAuthenticationRequest): Promise<IAuthenticationResult> {
        this.logger.debug(`Authenticating user '${userMailId}' at CarOnSale API`);
        return this.httpClient.put<IAuthenticationResult, IAuthenticationRequest>(`/v1/authentication/${userMailId}`,
        { data: authReq });
    }

    getRunningAuctions(request?: IHTTPRequest): Promise<IAuctionResponse> {
        this.logger.debug(`Retrieving running auctions from buyer at CarOnSale API`, request?.headers);
        return this.httpClient.get<IAuctionResponse>(`/v2/auction/buyer/`, request);
    }
}