import { AWSDataSource, FsDataSource } from "./provider";

export interface DataSource {
    getById<T>(key: string): Promise<T | null>;
    getAllIds<T>(prefix: string): Promise<Array<T>>;
}

export function getDataSource() {
    const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || '';
    const ACCESS_KEY_SECRET = process.env.ACCESS_KEY_SECRET || '';
    const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
    const REGION = process.env.POSTS_REGION || 'us-east-1';

    return ENVIRONMENT == "dev"
    ? new FsDataSource()
    : new AWSDataSource(
        {
            region: REGION,
            credentials: {
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: ACCESS_KEY_SECRET
            }
        }
    );
}