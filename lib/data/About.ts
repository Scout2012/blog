import { getDataSource } from "../DataSource";
import { POSTS_LOCATION } from "../Global";

const DATA_SOURCE = getDataSource();
export async function getAboutContent() {
    return await DATA_SOURCE.getById(`${POSTS_LOCATION}/about.md`);
}