import { IAuctionResponse } from "../models/Auction";
import { IAuthenticationRequest, IAuthenticationResult } from "../models/Authentication";
import { IHTTPRequest } from "../../../utils/http/models/http";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    authenticate(userMailId:string, authReq: IAuthenticationRequest): Promise<IAuthenticationResult>;

    getRunningAuctions(request: IHTTPRequest): Promise<IAuctionResponse>

}
