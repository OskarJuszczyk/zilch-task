import { useCallback, useState } from 'react';

import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

export function useLayout() {
    const [isLayoutMeasured, setIsLayoutMeasured] = useState(false);
    const [layout, setLayout] = useState<LayoutRectangle>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        setLayout(event.nativeEvent.layout);
        setIsLayoutMeasured(true);
    }, []);

    return { layout, onLayout, isLayoutMeasured };
}
