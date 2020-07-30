
class BaseSevice {
    static token: string;

    static localStore(name: string) {
        return '' + localStorage.getItem(name)
    }

    static clearLocalStore() {
        localStorage.clear();
    }

    static getToken(): string {
        return this.token || (JSON.parse(this.localStore('_u')) ? JSON.parse(this.localStore('_u')).token : '');
    }

    static commonErrorHandler(errorObject: any, ) {
        if (errorObject && errorObject.response && errorObject.response.status) {
            if (errorObject.response.status === 401 || errorObject.response.status === 403) {
                // Redirect to login
            }
        }
    }
}

export default BaseSevice;