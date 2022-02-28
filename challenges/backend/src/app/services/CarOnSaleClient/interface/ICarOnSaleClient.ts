import { IAuctionResponse } from "../domains/Auction";
import { IAuthenticationRequest, IAuthenticationResult } from "../domains/Authentication";
import { IHTTPRequest } from "../../../utils/HTTP/domains/HTTPRequest";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    authenticate(userMailId:string, authReq: IAuthenticationRequest): Promise<IAuthenticationResult>;

    getRunningAuctions(request?: IHTTPRequest): Promise<IAuctionResponse>

}
