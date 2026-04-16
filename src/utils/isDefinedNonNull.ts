export function isDefinedNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined && value !== 'null' && value !== 'undefined';
}

export function isDefinedNonNullWorklet<T>(value: T | null | undefined): value is T {
    'worklet';
    return value !== null && value !== undefined && value !== 'null' && value !== 'undefined';
}
