import {
    ListObjectsV2Command,
    ListObjectsV2CommandInput,
    ListObjectsV2CommandOutput,
    S3Client,
    GetObjectCommand,
    GetObjectCommandInput,
    _Object
} from "@aws-sdk/client-s3";
import { DataSource } from "../DataSource";
import { DATA_LOCATION } from "../Global";

export class AWSDataSource implements DataSource {
    private _s3: S3Client | undefined;

    constructor(config) {
        if (!this._s3)
        {
            this._s3 = new S3Client(config);
        }
    }

    async getById<T>(id: string): Promise<T | null> {
        let params: GetObjectCommandInput = {
            Bucket: DATA_LOCATION,
            Key: id,
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
            console.error(`Error fetching content for ${id}: `, e);
            return null;
        }
    }

    async getAllIds<T>(prefix: string): Promise<Array<T>> {
        let params: ListObjectsV2CommandInput = {
            Prefix: prefix,
            Bucket: DATA_LOCATION,
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
                (response: ListObjectsV2CommandOutput) => {
                    if (response.KeyCount && response.KeyCount <= 0)
                    {
                        return [];
                    }

                    return response.Contents
                }
            );

            if(!postKeys)
            {
                return [];
            }

            return postKeys.filter(post => !post.Key?.endsWith("/")).map(post => post.Key?.replace(/\.md$/, "")) as Array<T> ?? [];
        } catch (e) {
            console.error("Error while fetching posts", e);
        }

        return [];
    }
};