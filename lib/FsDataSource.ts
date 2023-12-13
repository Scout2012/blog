import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { IDataSource } from "./DataSource";
import {
    MemoryDictionaryCacheProvider,
    MemoryDictionaryCacheRecord
} from "./MemoryCache";

export class FsDataSource implements IDataSource<MemoryDictionaryCacheRecord<string>, string> {
    private _cache: MemoryDictionaryCacheProvider<string> | undefined;

    constructor() {
        if (!this._cache)
        {
            this._cache = new MemoryDictionaryCacheProvider();
        }
    }

    async getById<T extends string>(path: string, id: string): Promise<T | undefined> {
          try {
            return await readFile(join(path, `${id}.md`)).then(fileBuff => fileBuff.toString("utf-8") as T);
          } catch (e) {
            console.error(`Error fetching post content for ${id}: `, e);
          }
    }

    async getAllIds<T>(path: string): Promise<T[] | []> {
        try {
            return await readdir(path).then(files => files.map(file => file.replace(/\.md$/, ""))) as T[] ?? [] ;
        } catch (e) {
            console.error("Error while fetching posts", e);
        }

        return [];
    }
};