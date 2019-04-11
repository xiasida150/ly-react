import { get, post, auth, sso } from "@/util/request";


export async function getMenuLists() {
    return await get(auth + `/role/menu/get`)
}

export async function getHospitalInfo(data) {
    return await get(sso + `/get/hospital/info`, data)
}



