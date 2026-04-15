declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

type Cast<X, Y> = X extends Y ? X : Y;
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type FromEntries<T> = T extends [infer Key, any][] ? { [K in Cast<Key, PropertyKey>]: ArrayElement<T>[1] } : { [key in PropertyKey]: any };

type ObjectEntries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

type ObjectKeys<T> = T extends object ? (keyof T)[] : T extends number ? [] : T extends any[] | string ? string[] : never;

interface ObjectConstructor {
    fromEntries<T>(obj: T): FromEntries<T>;
    entries<T>(o: T): ObjectEntries<T>;
    keys<T>(o: T): ObjectKeys<T>;
}

type WithUndefined<T> = T | undefined;
type WithNull<T> = T | null;

type EndsWith<T extends string, Suffix extends string> = T extends `${infer Prefix}${Suffix}` ? T : never;
type StartsWith<T extends string, Prefix extends string> = T extends `${Prefix}${infer Suffix}` ? T : never;

type RecordValues<T> = T extends Record<string, unknown> ? T[keyof T] : never;

// Recursively builds dot-separated property paths for type T
type NestedKeyOf<T> = T extends object
    ? {
          [K in Extract<keyof T, string>]: T[K] extends Function ? never : T[K] extends object ? K | `${K}.${NestedKeyOf<T[K]>}` : K;
      }[Extract<keyof T, string>]
    : never;

// Recursively builds dot-separated property paths for type T but only returns the leaf nodes
type OnlyLeafNestedKeyOf<T> = T extends object
    ? {
          [K in Extract<keyof T, string>]: T[K] extends Function ? never : T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K;
      }[Extract<keyof T, string>]
    : never;

/*
 * Extracts all leaf values from a deeply nested object type.
 * This recursively traverses the object structure and returns the union of all primitive values.
 * Works with any level of nesting.
 */
type ExtractValues<T> = T extends object ? ExtractValues<T[keyof T]> : T;

declare namespace NodeJS {
    interface ProcessEnv {
        EXPO_PUBLIC_IS_PROD: 'true' | string;
    }
}
