import { get, post, auth, sso, follow } from "@/util/request";

// 获取菜单
export async function getMenuLists() {
    return await get(auth + `/role/menu/get`)
}
// 获取人群类型
export async function getPopulationType(data) {
    return await get(follow + `/population/get/population/list`, data)
}



