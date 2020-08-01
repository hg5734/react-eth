import BaseSevice from "./base";
import { postRequest } from '../utils/axios'
import { LoginInterface, IUserInformation } from '../interfaces/interface';
import { apiUri } from "../utils/constant";
const { loginUrl } = apiUri;

export class AuthSevice extends BaseSevice {

    private static userData: IUserInformation | null;

    static async login(data: LoginInterface) {
        try {
            const { data: result } = await postRequest(loginUrl, { data }, null, true)
            return result;
        } catch (error) {
            throw error;
        }
    }

    static setUserData(userData: IUserInformation): void {
        localStorage.setItem('_u', JSON.stringify(userData));
        this.userData = userData;
    }

    static getUserData(): IUserInformation {
        return this.userData || JSON.parse(''+localStorage.getItem('_u'));
    }

    static clearUser() {
        this.clearLocalStore();
        this.userData = null;
    }

}