import { useEffect, useRef } from 'react';

import { View } from 'react-native';

import { CardStatus } from '@cards/types';
import { FreezeOverlay, FreezeOverlayRef } from '@features/cards/components/overlays/FreezeOverlay';
import { OpacityOverlay, OpacityOverlayRef } from '@features/cards/components/overlays/OpacityOverlay';
import { AnimationConfigMap, CardStatusNone, setupAnimationConfig } from '@features/cards/components/overlays/setupAnimationConfig';

type CardOverlayProps = {
    status: CardStatus;
    blurTargetRef: React.RefObject<View | null>;
};

export function CardStatusOverlay({ status, blurTargetRef }: CardOverlayProps) {
    const prevStatus = useRef<CardStatus | typeof CardStatusNone>(CardStatusNone);

    const freezeOverlayRef = useRef<FreezeOverlayRef | null>(null);
    const pendingOverlayRef = useRef<OpacityOverlayRef | null>(null);
    const blockedOverlayRef = useRef<OpacityOverlayRef | null>(null);
    const expiredOverlayRef = useRef<OpacityOverlayRef | null>(null);
    const animationConfig = useRef<AnimationConfigMap | null>(
        setupAnimationConfig({ freezeRef: freezeOverlayRef, blockedOverlayRef, pendingOverlayRef, expiredOverlayRef }),
    );

    useEffect(() => {
        const handler = animationConfig.current?.get(prevStatus.current)?.get(status);
        if (handler) {
            handler();
        }

        prevStatus.current = status;
    }, [status]);

    return (
        <>
            <OpacityOverlay ref={blockedOverlayRef} status={CardStatus.BLOCKED} />
            <OpacityOverlay ref={pendingOverlayRef} status={CardStatus.PENDING} />
            <OpacityOverlay ref={expiredOverlayRef} status={CardStatus.EXPIRED} />
            <FreezeOverlay ref={freezeOverlayRef} blurTargetRef={blurTargetRef} />
        </>
    );
}
