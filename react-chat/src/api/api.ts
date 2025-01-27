const BASE_URL: string = "https://vkedu-fullstack-div2.ru/api";

export default class API {
    private static async call<T>(
        url: string,
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
        body?: any,
        accessToken?: string
    ): Promise<T> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const options: RequestInit = {
            method,
            headers,
        };

        if (body) {
            options.body = body instanceof FormData ? body : JSON.stringify(body);
            if (body instanceof FormData) {
                delete headers["Content-Type"];
            }
        }

        const response = await fetch(url, options);
        if (response.ok) {
            if (response.status === 204) return null as unknown as T;
            return await response.json();
        }

        throw await response.json();
    }

    public static get<T>(url: string, data?: Record<string, any>, accessToken?: string): Promise<T> {
        const newUrl = data ? BASE_URL + url + "?" + new URLSearchParams(data).toString() : BASE_URL + url;
        return this.call<T>(newUrl, "GET", undefined, accessToken);
    }

    public static post<T>(url: string, body: any, accessToken?: string): Promise<T> {
        return this.call<T>(BASE_URL + url, "POST", body, accessToken);
    }

    public static put<T>(url: string, body: any, accessToken?: string): Promise<T> {
        return this.call<T>(BASE_URL + url, "PUT", body, accessToken);
    }

    public static patch<T>(url: string, body: any, accessToken?: string): Promise<T> {
        return this.call<T>(BASE_URL + url, "PATCH", body, accessToken);
    }

    public static delete(url: string, accessToken?: string): Promise<null> {
        return this.call<null>(BASE_URL + url, "DELETE", undefined, accessToken);
    }
}
