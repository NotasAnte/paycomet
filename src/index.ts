import { createHash, Hash } from "crypto";
import fetch from "node-fetch";
import { OperationData } from "./operationData.class";

export type Language = "ES" | "EN" | "FR" | "DE" | "IT";
export enum Operation {
    PURCHASE = 1,
    PREAUTHORIZATION_CREATE_USER = 3,
    PREAUTHORIZATION_CANCEL_USER = 4,
    PREAUTHORIZATION_CONFIRM_USER = 6,
    SUBSCRIPTION_CREATE_USER = 9,
    PREAUTHORIZATION_CREATE_DEFERED_USER = 13,
    PREAUTHORIZATION_CANCEL_DEFERED_USER = 14,
    PREAUTHORIZATION_CONFIRM_DEFERED_USER = 16,
    ADD_USER = 107,
    PURCHASE_USER_TOKEN = 109,
    SUBSCRIPTION_CREATE_USER_TOKEN = 110,
    PREAUTHORIZATION_CREATE_USER_TOKEN = 111,
} 

export enum Algorithm {
    SHA_256 = "sha256",
    SHA_512 = "sha512",
    MD5 = "md5"
}

export interface IResponseAddUserUrl {
    errorId: number;
    result: boolean;
    urlRedirect: string;
}

export class BankStore {

    private readonly endPoint: string = "https://api.paycomet.com/gateway/xml-bankstore?wsdl";
    private readonly endPointUrl: string = "https://api.paycomet.com/gateway/ifr-bankstore?";

    constructor(
        private merchantCode: string,
        private terminal: string,
        private password: string,
    ) {

    }

    public async AddUserUrl(transference: string, lang: Language = "ES", urlOk: string | undefined, urlKo: string | undefined, secure3d: boolean = false): Promise<IResponseAddUserUrl> {
        try {

            const operationData: OperationData = new OperationData(Operation.ADD_USER, transference, lang, secure3d, urlOk, urlKo);
            operationData.setHash(this.generateHash(operationData, Algorithm.SHA_512));

            const requestParams = this.formatUrl(operationData);
            const response = await this.sendRequest(requestParams);

            return {
                errorId: response,
                result: true,
                urlRedirect: this.endPointUrl + requestParams,
            };
        } catch (error) {
            return {
                errorId: 1011,
                result: false,
                urlRedirect: "",
            };
        }
    }


    public generateHash(od: OperationData | string, algorithm: Algorithm): string {
        try {
            const hashAlg: Hash = createHash(algorithm);
            const hashMd5: Hash = createHash(Algorithm.MD5);
            if (od instanceof OperationData) {
                switch (od.getOperation()) {
                    case Operation.ADD_USER:
                        hashAlg.update(this.merchantCode + this.terminal + od.getOperation() + od.getReference() + hashMd5.update(this.password).digest("hex"))
                        break;
                
                    default:
                        break;
                }
            } else {
                hashAlg.update(od);
            }
            return hashAlg.digest("hex");
        } catch (error) {
            return "";
        }
    }

    private formatUrl(od: OperationData) {
        const data: Map<string, string> = new Map();

        data.set("MERCHANT_MERCHANTCODE", this.merchantCode);
        data.set("MERCHANT_TERMINAL", this.terminal);
        data.set("OPERATION", Operation[od.getOperation()]);
        data.set("LANGUAGE", od.getLanguage());
        data.set("MERCHANT_MERCHANTSIGNATURE", od.getHash());
        data.set("URLOK", od.getUrlOk());
        data.set("URLKO", od.getUrlKo());
        data.set("MERCHANT_ORDER", od.getReference());
        data.set("MERCHANT_AMOUNT", od.getAmount().toString());
        if(od.getSecure3D()) {
            data.set("3DSECURE", "1");
        }
        if(od.getConcept() && od.getConcept() !== "") {
            data.set("MERCHANT_PRODUCTDESCRIPTION", od.getConcept());
        }

        const content = Object.keys(data).map(key => {
            let uri = encodeURIComponent(key) + "=";
            const str = data.get(key);
            if (str) {
                uri += encodeURIComponent(str);
            }
            return uri;
        }).join("&");
        data.set("VHASH", this.generateHash(this.generateHash(content + this.generateHash(this.password, Algorithm.MD5), Algorithm.MD5), Algorithm.SHA_512));

        return Object.keys(data).map(key => {
            let uri = encodeURIComponent(key) + "=";
            const str = data.get(key);
            if (str) {
                uri += encodeURIComponent(str);
            }
            return uri;
        }).join("&");
    }

    private async sendRequest(requestParams: string) : Promise<number> {
        const url: string = this.endPointUrl + requestParams;
        try {
            const response = await fetch(url);
            const data: string = await response.text();
            if (data.indexOf("Error") >= 0) {
                return parseInt(data.replace("<!-- Error: ", "").replace("Error: ", "").replace("-->", ""), 0);
            } else {
                return 0;
            }
        } catch (error) {
            return 1021;
        }
    }

}


