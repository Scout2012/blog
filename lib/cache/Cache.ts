export interface ICache<R> {

}

export interface ICachedRecord<T> {
    ttl: number;
    value: T;
}

export interface ICacheProvider<R, V extends string> {
    _cache: ICache<R>; // Cache store
    _defaultTtl: number; // In seconds

    get(key: string): Promise<R | undefined>;
    set(key: string, value: V, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
}
