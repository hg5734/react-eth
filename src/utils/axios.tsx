import queryString from 'qs';
import axios from "axios";
import { constant } from './constant';

export const BASE_URL = constant.serverUrl;

const DEFAULT_OPTIONS = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

function _fetch(method: string, path: string, { qs = null, data = {} } = {}, token: any, isFormData?: boolean, isFile?: boolean) {

    let url = BASE_URL + path;

    if (qs) {
        url += `?${queryString.stringify(qs)}`;
    }

    const fileHeader = isFile ?
        {
            headers: {
                ...DEFAULT_OPTIONS.headers,
                'Content-Type': 'multipart/form-data',
            },
        }
        : null;

    const authHeader = token
        ? {
            headers: {
                ...DEFAULT_OPTIONS.headers,
                'x-access-token': `${token}`,
            },
        }
        : null;

    const req: any = {
        method,
        url,
        ...DEFAULT_OPTIONS,
        ...fileHeader,
        ...authHeader,
        ...data,
    };

    if (method !== 'GET' && data) {
        req.data = isFormData ? data : JSON.stringify(data);
    }

    return axios(req);
}


export function getRequest(path: any, { qs = null, data = {} } = {}, token: any) {
    return _fetch('GET', path, { qs, data }, token);
}

export function postRequest(path: any, { qs = null, data = {} } = {}, token: any, isFormData: any, isFile = false) {
    return _fetch('POST', path, { qs, data }, token, isFormData, isFile);
}

export function patchRequest(path: any, { qs = null, data = {} } = {}, token: any) {
    return _fetch('PATCH', path, { qs, data }, token);
}

export function putRequest(path: any, { qs = null, data = {} } = {}, token: any) {
    return _fetch('PUT', path, { qs, data }, token);
}

export function deleteRequest(path: any, { qs = null, data = {} } = {}, token: any) {
    return _fetch('DELETE', path, { qs, data }, token);
}


