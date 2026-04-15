import { RefObject, useEffect, useRef } from 'react';

export function useTimeoutRef(): RefObject<ReturnType<typeof setTimeout> | number | null> {
    const ref = useRef<ReturnType<typeof setTimeout> | number | null>(null);

    useEffect(() => {
        const cleanup = () => {
            if (ref.current) {
                clearTimeout(ref.current);
            }
        };

        return cleanup;
    }, []);

    return ref;
}
