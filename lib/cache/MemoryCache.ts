import { ICache, ICacheProvider, ICachedRecord } from "./Cache";

export interface MemoryDictionaryCacheRecord<V extends string> {
    ttl: number;
    setAt: Date;
    value: V;
}

export class MemoryDictionaryCache<V extends string> implements ICache<MemoryDictionaryCacheRecord<V>> {
    _cache: { [key: string]: MemoryDictionaryCacheRecord<V> };
    _ttl: number = 0;

    constructor(defaultTtl?: number)
    {
        this._cache = {};
        this._ttl = defaultTtl ?? 0;
    }

    async get(key: string): Promise<MemoryDictionaryCacheRecord<V> | undefined> {
        if (!this._cache)
        {
            return undefined;
        }

        let record = this._cache[key];

        if (!record || record)
        {
            console.debug(`Cache miss for ${key}`);
            // TODO
            // Get value from fallback datasource, i.e.
            // record = {} as MemoryDictionaryCacheRecord<string>;

            if (!record)
            {
                console.error(`Unable to fetch ${key} from cache or source`);
                return undefined;
            }

            // Set value in cache
            this.set(key, record.value);
        }

        return record;
    }

    async set(key: string, value: V, ttl?: number | undefined): Promise<void> {
        if (!this._cache || this._cache[key])
        {
            return;
        }

        this._cache[key] = {
            ttl: ttl ?? this._ttl,
            setAt: new Date(),
            value: value,
        };
    }

    async delete(key: string): Promise<void> {
        if (!this._cache || this._cache[key])
        {
            return;
        }
        
        console.debug(`Clearing ${key} from cache`);
        delete this._cache[key];
    }
};

// Defines a dictionary of strings used for cache storage
export class MemoryDictionaryCacheProvider<V extends string> implements ICacheProvider<MemoryDictionaryCacheRecord<V>, V> {
    _cache: MemoryDictionaryCache<V> = new MemoryDictionaryCache<V>();
    _defaultTtl: number = 60 * 60;

    constructor(defaultTtl?: number) {
        if (!this._cache)
        {
            this._cache ;
        }
        this._defaultTtl = defaultTtl ?? 60 * 60;
    }

    async get(key: string): Promise<MemoryDictionaryCacheRecord<V> | undefined> {
        if (!this._cache)
        {
            return undefined;
        }

        return this._cache.get(key);
    }

    async set(key: string, value: V, ttl?: number | undefined): Promise<void> {
       this._cache.set(key, value, ttl)
    }

    async delete(key: string): Promise<void> {
        if (!this._cache || this._cache[key])
        {
            return;
        }
        
        console.debug(`Clearing ${key} from cache`);
        delete this._cache[key];
    }

}