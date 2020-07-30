import BaseSevice from "./base";
import { LoginInterface, IUserInformation } from '../interfaces/interface';
// import { apiUri } from "../utils/constant";
// const { loginUrl } = apiUri;

export class AuthSevice extends BaseSevice {

    private static userData: IUserInformation | null;

    static async login(data: LoginInterface) {
        try {
            //const { data: result } = await postRequest(loginUrl, { data }, null, true)
            // Dummy service
            const result = await new Promise((resolve, reject) => {
                resolve({
                    result: {
                        data: {
                            token: 'test',
                            email: 'test',
                            role: 'test',
                            name: 'test'
                        }
                    }
                })
            })
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
        return this.userData || JSON.parse('' + localStorage.getItem('_u'));
    }

    static clearUser() {
        this.clearLocalStore();
        this.userData = null;
    }

}