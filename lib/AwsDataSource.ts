import {
    ListObjectsV2Command,
    ListObjectsV2CommandInput,
    ListObjectsV2CommandOutput,
    S3Client,
    GetObjectCommand,
    GetObjectCommandInput,
    GetObjectCommandOutput,
    _Object
} from "@aws-sdk/client-s3";
import { IDataSource } from "./DataSource";
import {
    MemoryDictionaryCacheProvider,
    MemoryDictionaryCacheRecord
} from "./MemoryCache";

export class AWSDataSource implements IDataSource<MemoryDictionaryCacheRecord<string>, string> {
    private _s3: S3Client | undefined;
    private _cache: MemoryDictionaryCacheProvider<string> | undefined;

    constructor() {
        if (!this._s3)
        {
            this._s3 = new S3Client({region: process.env.POSTS_REGION || 'us-east-1'});
        }

        if (!this._cache)
        {
            this._cache = new MemoryDictionaryCacheProvider();
        }
    }

    async getById<T extends string>(path: string, key: string): Promise<T | undefined> {
        let params: GetObjectCommandInput = {
            Bucket: path,
            Key: key,
          };
        
          try {
            if (!this._s3)
            {
                console.error("S3 provider unavailable");
                return;
            }

            return await this._s3
            .send(
              new GetObjectCommand(params)
            )
            .then((response: GetObjectCommandOutput) => response.Body?.transformToString("utf-8") as unknown as T);
          } catch (e) {
            console.error(`Error fetching post content for ${key}: `, e);
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

            return await this._s3
            .send(
                new ListObjectsV2Command(params)
            )
            .then(
                (response: ListObjectsV2CommandOutput) => response.KeyCount && response.KeyCount <= 0 ? [] : response.Contents as T[]
            ) ?? [];
        } catch (e) {
            console.error("Error while fetching posts", e);
        }

        return [];
    }
};