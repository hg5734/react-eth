import BaseSevice from "./base";
import { postRequest, getRequest } from '../utils/axios'
import { Asset } from '../interfaces/interface';
import { apiUri } from "../utils/constant";
const { assetList, addAsset, logsList } = apiUri;


export class DashboardSevice extends BaseSevice {

    static async addAsset(data: Asset) {
        try {
            const { data: result } = await postRequest(addAsset, { data }, this.getToken(), false)
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async assetLogsList(query: any) {
        try {
            const { data: result } = await getRequest(logsList, {
                qs: query
            }, this.getToken())
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async assetList() {
        try {
            const { data: result } = await getRequest(assetList, {
            }, this.getToken())
            return result;
        } catch (error) {
            throw error;
        }
    }

}