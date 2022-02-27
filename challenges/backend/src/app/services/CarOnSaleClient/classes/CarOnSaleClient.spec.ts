import { expect } from "chai";
import { CarOnSaleClient } from "./CarOnSaleClient";
import nock from "nock";
import { AxiosRequestConfig } from "axios";
import { AxiosHTTPClient } from "../../../utils/http/classes/AxiosHTTPClient";
import { UserType } from "../models/User";
import { IAuctionResponse } from "../models/Auction";
import { IAuthenticationRequest } from "../models/Authentication";

const BASE_COS_CLIENT_URL: string = process.env.BASE_COS_CLIENT_URL || "";
const USERMAIL: string = process.env.USERMAIL || "";
const PASSWORD: string = process.env.PASSWORD || "";
const TOKEN: string = "AUTHENTICATED_TOKEN";

const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_COS_CLIENT_URL
}

describe("Test CarOnSaleClient - PUT Authenticate", () => {

    it("should authenticate user successfully", async () => {
        const authenticationReq: IAuthenticationRequest = {
            password: PASSWORD
        }

        nock(BASE_COS_CLIENT_URL)
            .put(`/v1/authentication/${USERMAIL}`, { password: PASSWORD })
            .reply(201, {
                authenticated: true,
                token: TOKEN,
                userId: "buyer-challenge@caronsale.de",
                type: UserType.BUYER
            });

        const response = await new CarOnSaleClient(new AxiosHTTPClient(axiosConfig)).authenticate(USERMAIL, authenticationReq);
        expect(response.authenticated).to.be.true;
        expect(response.token).to.be.not.empty;
    });

    it("should throw 401 Unauthorized", async () => {
        const WRONG_PASSWORD = "Test123";
        const authenticationReq: IAuthenticationRequest = {
            password: WRONG_PASSWORD
        }

        nock(BASE_COS_CLIENT_URL)
            .put(`/v1/authentication/${USERMAIL}`, { password: WRONG_PASSWORD })
            .reply(401, { status: 401 });

        try {
            const response = await new CarOnSaleClient(new AxiosHTTPClient(axiosConfig)).authenticate(USERMAIL, authenticationReq);
            expect(response.authenticated).to.be.false;
        } catch (error: any) {
            expect(error.status).to.be.equals(401);
        }

    });

});

describe("Test CarOnSaleClient - GET Running Auctions fom Buyer", () => {

    it("list all running auctions", async () => {
        const reqHeaders = {
            "authtoken": TOKEN,
            "userid": USERMAIL
        }

        const auctionsResponse: IAuctionResponse = {
            items: [],
            page: 1,
            total: 0
        };

        nock(BASE_COS_CLIENT_URL)
            .get(`/v2/auction/buyer/`)
            .matchHeader("authtoken", TOKEN)
            .matchHeader("userid", USERMAIL)
            .reply(200, auctionsResponse);

        const auctions: IAuctionResponse = await new CarOnSaleClient(new AxiosHTTPClient(axiosConfig)).getRunningAuctions({ headers: reqHeaders });
        expect(auctions.items).to.be.empty;
        expect(auctions.total).to.be.equals(0);
    });

});
