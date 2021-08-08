export let domain = "http://localhost:8000";
export const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
}


export async function Fetch(params) {
    const options = {
        method: "POST",
        headers: header,
        body: JSON.stringify(params)
    };

    try {
        let result = await fetch(`${domain}/maps`, options);

        return result
    } catch (e) {
        return e;
    }
}