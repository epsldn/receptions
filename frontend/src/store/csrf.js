import Cookies from "js-cookie";

async function csrfFetch(url, options = {}) {
    if (!options.header) options.header = {};
    if (!options.method) options.method = "GET";

    if (options.method.toUpperCase() !== "GET") {
        if (!options.headers["Content-Type"]) options.headers["Content-Type"] = "application/json";
        options.headers["XSRF-Token"] = Cookies.get("XSRF-Token");
    }

    const response = await window.fetch(url, options);

    if (response.status > 400) throw response;
    else return response;
}