
const backend_url = "http://localhost:8080/api"


export const get_coins_list = async () => {
    return fetch(backend_url + "/data/list")
    .then(res => res.json())
}

export const get_coin_records = async (coin) => {

    return fetch(backend_url + "/data/records" + "?coin=" + coin)
    .then(res => res.json())
}

export const post_export_changes = async () => {
    return fetch('http://localhost:8080/api/data/export', { method: 'POST'})
}