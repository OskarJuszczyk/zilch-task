import { CardStatus } from '@cards/types';
import { FreezeOverlay, FreezeOverlayRef } from '@features/cards/components/overlays/FreezeOverlay';
import { OpacityOverlay, OpacityOverlayRef } from '@features/cards/components/overlays/OpacityOverlay';

export const CardStatusNone = 'none' as const;

type HandleAnimationProps = {
    status: {
        old: CardStatus | typeof CardStatusNone;
        new: CardStatus;
    };
    config: {
        freezeRef: React.RefObject<FreezeOverlayRef | null>;
        blockedOverlayRef: React.RefObject<OpacityOverlayRef | null>;
        pendingOverlayRef: React.RefObject<OpacityOverlayRef | null>;
        expiredOverlayRef: React.RefObject<OpacityOverlayRef | null>;
    };
};

export type AnimationConfigMap = Map<CardStatus | typeof CardStatusNone, Map<CardStatus, VoidFunction>>;

type OverlayActions = {
    enter: (props: { withAnimation: boolean }) => void;
    leave: VoidFunction;
    duration: number;
};

const OVERLAY_STATUSES = [CardStatus.FROZEN, CardStatus.PENDING, CardStatus.BLOCKED, CardStatus.EXPIRED] as const;
type OverlayStatus = (typeof OVERLAY_STATUSES)[number];

function getOverlayActions(status: OverlayStatus, config: HandleAnimationProps['config']): OverlayActions {
    switch (status) {
        case CardStatus.FROZEN:
            return {
                enter: p => config.freezeRef.current?.onFreeze(p),
                leave: () => config.freezeRef.current?.onUnfreeze(),
                duration: FreezeOverlay.Duration,
            };
        case CardStatus.PENDING:
            return {
                enter: p => config.pendingOverlayRef.current?.onTint(p),
                leave: () => config.pendingOverlayRef.current?.onUntint(),
                duration: OpacityOverlay.Duration,
            };
        case CardStatus.BLOCKED:
            return {
                enter: p => config.blockedOverlayRef.current?.onTint(p),
                leave: () => config.blockedOverlayRef.current?.onUntint(),
                duration: OpacityOverlay.Duration,
            };
        case CardStatus.EXPIRED:
            return {
                enter: p => config.expiredOverlayRef.current?.onTint(p),
                leave: () => config.expiredOverlayRef.current?.onUntint(),
                duration: OpacityOverlay.Duration,
            };
    }
}

export function setupAnimationConfig(config: HandleAnimationProps['config']) {
    const map: AnimationConfigMap = new Map();
    let pendingTimeout: ReturnType<typeof setTimeout> | null = null;

    // none → overlay (no animation) and ACTIVE → overlay (with animation)
    const noneMap = new Map<CardStatus, VoidFunction>();
    const activeMap = new Map<CardStatus, VoidFunction>();
    for (const target of OVERLAY_STATUSES) {
        const { enter } = getOverlayActions(target, config);
        noneMap.set(target, () => enter({ withAnimation: false }));
        activeMap.set(target, () => enter({ withAnimation: true }));
    }

    map.set(CardStatusNone, noneMap);
    map.set(CardStatus.ACTIVE, activeMap);

    // overlay → overlay / ACTIVE transitions
    for (const from of OVERLAY_STATUSES) {
        const { leave, duration } = getOverlayActions(from, config);
        const innerMap = new Map<CardStatus, VoidFunction>();

        innerMap.set(CardStatus.ACTIVE, leave);

        for (const target of OVERLAY_STATUSES) {
            if (target === from) {
                continue;
            }
            const { enter } = getOverlayActions(target, config);
            innerMap.set(target, () => {
                if (pendingTimeout) {
                    clearTimeout(pendingTimeout);
                }
                leave();
                pendingTimeout = setTimeout(() => {
                    pendingTimeout = null;
                    enter({ withAnimation: true });
                }, duration);
            });
        }

        map.set(from, innerMap);
    }

    return map;
}
