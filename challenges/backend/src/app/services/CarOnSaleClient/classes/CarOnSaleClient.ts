import { IAuctionResponse } from "../models/Auction";
import { IAuthenticationRequest, IAuthenticationResult } from "../models/Authentication";
import { IHTTPClient } from "../../../utils/http/interface/IHTTPClient";
import { IHTTPRequest } from "../../../utils/http/models/http";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

const BASE_COS_CLIENT_URL: string = process.env.BASE_COS_CLIENT_URL || "";

export class CarOnSaleClient implements ICarOnSaleClient {

    constructor(private httpClient: IHTTPClient) {
    }

    authenticate(userMailId: string, authReq: IAuthenticationRequest): Promise<IAuthenticationResult> {
        return this.httpClient.put<IAuthenticationResult, IAuthenticationRequest>(BASE_COS_CLIENT_URL + `/v1/authentication/${userMailId}`,
        { data: authReq });
    }

    getRunningAuctions(request: IHTTPRequest): Promise<IAuctionResponse> {
        return this.httpClient.get<IAuctionResponse>(BASE_COS_CLIENT_URL + `/v2/auction/buyer/`, request);
    }
}