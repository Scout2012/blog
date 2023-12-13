export interface IDataSource<R, V extends string> {
    getById<T extends string>(path: string, key: string): Promise<T | undefined>;
    getAllIds<T extends string>(path: string, key: string): Promise<T[]>;
}