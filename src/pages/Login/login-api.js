import { get, sso } from "@/util/request";


export async function getData() {
    return await get(sso + `/get/rsakey`)
}



