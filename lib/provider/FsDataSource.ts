import { readFile, readdir, stat } from "node:fs/promises";
import { DataSource } from "../DataSource";
import { BLOG_POSTS_LOCATION, DATA_LOCATION } from "../Global";

export class FsDataSource implements DataSource {
    async getById<T>(id: string): Promise<T | null> {
        let fullPath = `${DATA_LOCATION}/${id}`;

        try {
            const content = await readFile(fullPath).then(fileBuff => fileBuff.toString("utf-8"));
            const stats = await stat(fullPath);

            return {
                body: content,
                last_modified: stats.mtime,
            } as T;
          } catch (e) {
            console.error(`Error fetching content for ${fullPath}: `, e);
            return null;
          }
    }

    async getAllIds<T>(prefix: string): Promise<Array<T>> {
        let ids: Array<T> = [];
        try {
            ids = await readdir(`${DATA_LOCATION}/${prefix}`).then(files => files.map(file => `${BLOG_POSTS_LOCATION}/${file.replace(/\.md$/, "")}`)) as Array<T> ?? [] ;
        } catch (e) {
            console.error("Error while fetching content", e);
        }

        return ids;
    }
};