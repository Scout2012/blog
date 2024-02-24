import {
    ListObjectsV2Command,
    ListObjectsV2CommandInput,
    ListObjectsV2CommandOutput,
    S3Client,
    GetObjectCommand,
    GetObjectCommandInput,
    _Object
} from "@aws-sdk/client-s3";
import { IDataSource, IBlogPost } from "../DataSource";
import {
    MemoryDictionaryCacheProvider,
    MemoryDictionaryCacheRecord
} from "../cache/MemoryCache";

export class AWSDataSource implements IDataSource<MemoryDictionaryCacheRecord<string>, string> {
    private _s3: S3Client | undefined;
    private _cache: MemoryDictionaryCacheProvider<string> | undefined;

    constructor(config) {
        if (!this._s3)
        {
            this._s3 = new S3Client(config);
        }

        if (!this._cache)
        {
            this._cache = new MemoryDictionaryCacheProvider();
        }
    }

    async getById<T extends IBlogPost>(path: string, id: string): Promise<T | null> {
        let params: GetObjectCommandInput = {
            Bucket: path,
            Key: `${id}.md`,
        };

        try {
            if (!this._s3)
            {
                console.error("S3 provider unavailable");
                return null;
            }

            const { Body, LastModified } = await this._s3
            .send(
                new GetObjectCommand(params)
            );
            const postContent = await Body?.transformToString("utf-8");

            if(!postContent)
            {
                return null;
            }

            return {
                body: postContent,
                last_modified: LastModified,
            } as T;
        } catch (e) {
            console.error(`Error fetching post content for ${id}: `, e);
            return null;
        }
    }

    async getAllIds<T>(path: string): Promise<T[] | []> {
        let params: ListObjectsV2CommandInput = {
            Bucket: path,
        };
        try {
            if (!this._s3)
            {
                console.error("S3 provider unavailable");
                return [];
            }

           const postKeys = await this._s3
            .send(
                new ListObjectsV2Command(params)
            )
            .then(
                (response: ListObjectsV2CommandOutput) => response.KeyCount && response.KeyCount <= 0 ? [] : response.Contents
            );

            if(!postKeys)
            {
                return [];
            }

            return postKeys.map(postKey => postKey.Key?.replace(/\.md$/, "")) as T[] ?? [];
        } catch (e) {
            console.error("Error while fetching posts", e);
        }

        return [];
    }
};