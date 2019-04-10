import { get, post, auth, sso } from "@/util/request";


export async function getHospitalList() {
    return await get(auth + `/role/user/get/hospital/user/id`, {})
}

export async function getHospitalInfo(data) {
    return await get(sso + `/get/hospital/info`, data)
}



