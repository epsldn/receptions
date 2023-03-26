import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
    if (!options.headers) options.headers = {};
    if (!options.method) options.method = "GET";

    if (options.method.toUpperCase() !== "GET") {
        if (!options.headers["Content-Type"]) options.headers["Content-Type"] = "application/json";
        options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
    }

    const response = await window.fetch(url, options);

    if (response.status > 400) throw response;
    else return response;
}

export function restoreCSRF() {
    return csrfFetch("/api/csrf/restore");
}