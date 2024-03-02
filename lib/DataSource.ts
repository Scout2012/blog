export interface IBlogPost {
    body: string;
    last_modified: Date;
}

export interface DataSource {
    getById<T extends IBlogPost>(path: string, key: string): Promise<T | null>;
    getAllIds<T extends IBlogPost>(path: string, key: string): Promise<Array<T>>;
}