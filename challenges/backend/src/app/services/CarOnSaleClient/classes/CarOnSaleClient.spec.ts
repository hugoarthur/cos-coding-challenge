import { expect } from "chai";
import nock from "nock";
import "reflect-metadata";

import { CarOnSaleClient } from "./CarOnSaleClient";
import { AxiosHTTPClient } from "../../../utils/http/classes/AxiosHTTPClient";
import { UserType } from "../models/User";
import { IAuctionResponse } from "../models/Auction";
import { IAuthenticationRequest } from "../models/Authentication";
import { Logger } from "../../Logger/classes/Logger";

const BASE_COS_CLIENT_URL: string = process.env.BASE_COS_CLIENT_URL || "";
const USERMAIL: string = process.env.USERMAIL || "";
const PASSWORD: string = process.env.PASSWORD || "";
const TOKEN: string = "AUTHENTICATED_TOKEN";

const logger = new Logger();
const client = new AxiosHTTPClient(BASE_COS_CLIENT_URL);

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

        const response = await new CarOnSaleClient(logger, client).authenticate(USERMAIL, authenticationReq);
        expect(response.authenticated).to.be.true;
        expect(response.token).to.be.not.empty;
    });

    it("should throw 401 Unauthorized", async () => {
        const WRONG_EMAIL = "buyer@caronsale.de";
        const WRONG_PASSWORD = "Test123";
        const authenticationReq: IAuthenticationRequest = {
            password: WRONG_PASSWORD
        }

        nock(BASE_COS_CLIENT_URL)
            .put(`/v1/authentication/${WRONG_EMAIL}`, { password: WRONG_PASSWORD })
            .reply(401, { status: 401 });

        try {
            const response = await new CarOnSaleClient(new Logger(), new AxiosHTTPClient(BASE_COS_CLIENT_URL)).authenticate(WRONG_EMAIL, authenticationReq);
            expect(response.authenticated).to.be.false;
        } catch (error: any) {
            expect(error.status).to.be.equals(401);
        }

    });

});

describe("Test CarOnSaleClient - GET Running Auctions from Buyer", () => {

    it("list all running auctions from logged Buyer", async () => {
        const reqHeaders = {
            "authtoken": TOKEN,
            "userid": USERMAIL
        }

        const auctionsResponse: IAuctionResponse = {
            items: [{
                "id": 18013,
                "label": "BMW QUATTRO",
                "minimumRequiredAsk": 16735,
                "currentHighestBidValue": 511,
                "numBids": 1
            }],
            page: 1,
            total: 1
        };

        nock(BASE_COS_CLIENT_URL)
            .get(`/v2/auction/buyer/`)
            .matchHeader("authtoken", TOKEN)
            .matchHeader("userid", USERMAIL)
            .reply(200, auctionsResponse);

        const auctions: IAuctionResponse = await new CarOnSaleClient(new Logger(), new AxiosHTTPClient(BASE_COS_CLIENT_URL)).getRunningAuctions({ headers: reqHeaders });
        expect(auctions.items).to.be.not.empty;
        expect(auctions.total).to.be.equals(1);
    });

    it("list all running auctions without passing token", async () => {

        nock(BASE_COS_CLIENT_URL)
            .get(`/v2/auction/buyer/`)
            .reply(401, { msgKey: "user.not-authenticated" });

        try {
            await new CarOnSaleClient(new Logger(), new AxiosHTTPClient(BASE_COS_CLIENT_URL)).getRunningAuctions();
        } catch (error: any) {
            expect(error?.status).to.be.equals(401);
        }
    });

});
