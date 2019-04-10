import { get, post, sso } from "@/util/request";


export async function getRsakey() {
    return await get(sso + `/get/rsakey`)
}

export async function login(data) {
    return await post(sso + `/login`, { data })
}



