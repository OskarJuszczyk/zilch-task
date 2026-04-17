import { RefObject, useCallback, useEffect, useRef } from 'react';

type Ref = RefObject<ReturnType<typeof setTimeout> | number | null>;

export function useTimeoutRef(): {
    ref: Ref;
    cleanRef: VoidFunction;
} {
    const ref = useRef<ReturnType<typeof setTimeout> | number | null>(null);

    const cleanRef = useCallback(() => {
        if (ref.current) {
            clearTimeout(ref.current);
            ref.current = null;
        }
    }, [ref]);

    useEffect(() => {
        return cleanRef;
    }, [cleanRef]);

    return { ref, cleanRef };
}
