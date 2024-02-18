export interface IBlogPost {
    body: string;
    last_modified: Date;
}

export interface IDataSource<R, V extends string> {
    getById<T extends IBlogPost>(path: string, key: string): Promise<T | null>;
    getAllIds<T extends IBlogPost>(path: string, key: string): Promise<T[]>;
}