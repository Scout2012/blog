import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { DataSource, IBlogPost } from "../DataSource";

export class FsDataSource implements DataSource {

    async getById<T extends IBlogPost>(path: string, id: string): Promise<T | null> {
          try {
            const fullPath = join(path, `${id}.md`);
            const content = await readFile(fullPath).then(fileBuff => fileBuff.toString("utf-8"));
            const stats = await stat(fullPath);

            return {
                body: content,
                last_modified: stats.mtime,
            } as T;
          } catch (e) {
            console.error(`Error fetching post content for ${id}: `, e);
            return null;
          }
    }

    async getAllIds<T>(path: string): Promise<Array<T>> {
        let ids: Array<T> = [];
        try {
            ids = await readdir(path).then(files => files.map(file => file.replace(/\.md$/, ""))) as Array<T> ?? [] ;
        } catch (e) {
            console.error("Error while fetching posts", e);
        }

        return ids;
    }
};