import { FreezeOverlayRef } from '@features/cards/components/overlays/FreezeOverlay';
import { OpacityOverlayRef } from '@features/cards/components/overlays/OpacityOverlay';
import { CardStatusNone, setupAnimationConfig } from '@features/cards/components/overlays/setupAnimationConfig';
import { CardStatus } from '@cards/types';
import { createRef } from 'react';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('setupAnimationConfig', () => {
    describe('when the previous status is none', () => {
        it.each([
            { old: CardStatusNone, current: CardStatus.FROZEN, called: ['freeze'] },
            { old: CardStatusNone, current: CardStatus.PENDING, called: ['tintPending'] },
            { old: CardStatusNone, current: CardStatus.BLOCKED, called: ['tintBlocked'] },
            { old: CardStatusNone, current: CardStatus.ACTIVE, called: [] },
            { old: CardStatusNone, current: CardStatus.CANCELED, called: [] },
            { old: CardStatusNone, current: CardStatus.EXPIRED, called: ['tintExpired'] },
            { old: CardStatusNone, current: CardStatus.INACTIVE, called: [] },
        ] as SetupAnimationConfigProps[])(
            'should call the correct functions when moving from status $old to $current',
            ({ old, current, called }) => {
                const {
                    onTintBlocked,
                    onUntintBlocked,
                    onTintPending,
                    onUntintPending,
                    onFreeze,
                    onUnfreeze,
                    onTintExpired,
                    onUntintExpired,
                    callAnimation,
                } = mockImports();

                callAnimation(old, current);

                jest.runAllTimers();

                expect(onTintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'tintBlocked').length);
                expect(onUntintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'untintBlocked').length);
                expect(onTintPending).toHaveBeenCalledTimes(called.filter(call => call === 'tintPending').length);
                expect(onUntintPending).toHaveBeenCalledTimes(called.filter(call => call === 'untintPending').length);
                expect(onFreeze).toHaveBeenCalledTimes(called.filter(call => call === 'freeze').length);
                expect(onUnfreeze).toHaveBeenCalledTimes(called.filter(call => call === 'unfreeze').length);
                expect(onTintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'tintExpired').length);
                expect(onUntintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'untintExpired').length);
            },
        );
    });

    describe('when the previous status is frozen', () => {
        it.each([
            { old: CardStatus.FROZEN, current: CardStatus.ACTIVE, called: ['unfreeze'] },
            { old: CardStatus.FROZEN, current: CardStatus.PENDING, called: ['unfreeze', 'tintPending'] },
            { old: CardStatus.FROZEN, current: CardStatus.BLOCKED, called: ['unfreeze', 'tintBlocked'] },
            { old: CardStatus.FROZEN, current: CardStatus.CANCELED, called: [] },
            { old: CardStatus.FROZEN, current: CardStatus.EXPIRED, called: ['unfreeze', 'tintExpired'] },
            { old: CardStatus.FROZEN, current: CardStatus.INACTIVE, called: [] },
        ] as SetupAnimationConfigProps[])(
            'should call the correct functions when moving from status $old to $current',
            ({ old, current, called }) => {
                const {
                    onTintBlocked,
                    onUntintBlocked,
                    onTintPending,
                    onUntintPending,
                    onFreeze,
                    onUnfreeze,
                    onTintExpired,
                    onUntintExpired,
                    callAnimation,
                } = mockImports();

                callAnimation(old, current);

                jest.runAllTimers();

                expect(onTintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'tintBlocked').length);
                expect(onUntintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'untintBlocked').length);
                expect(onTintPending).toHaveBeenCalledTimes(called.filter(call => call === 'tintPending').length);
                expect(onUntintPending).toHaveBeenCalledTimes(called.filter(call => call === 'untintPending').length);
                expect(onFreeze).toHaveBeenCalledTimes(called.filter(call => call === 'freeze').length);
                expect(onUnfreeze).toHaveBeenCalledTimes(called.filter(call => call === 'unfreeze').length);
                expect(onTintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'tintExpired').length);
                expect(onUntintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'untintExpired').length);
            },
        );
    });

    describe('when the previous status is pending', () => {
        it.each([
            { old: CardStatus.PENDING, current: CardStatus.ACTIVE, called: ['untintPending'] },
            { old: CardStatus.PENDING, current: CardStatus.FROZEN, called: ['untintPending', 'freeze'] },
            { old: CardStatus.PENDING, current: CardStatus.BLOCKED, called: ['untintPending', 'tintBlocked'] },
            { old: CardStatus.PENDING, current: CardStatus.CANCELED, called: [] },
            { old: CardStatus.PENDING, current: CardStatus.EXPIRED, called: ['untintPending', 'tintExpired'] },
            { old: CardStatus.PENDING, current: CardStatus.INACTIVE, called: [] },
        ] as SetupAnimationConfigProps[])(
            'should call the correct functions when moving from status $old to $current',
            ({ old, current, called }) => {
                const {
                    onTintBlocked,
                    onUntintBlocked,
                    onTintPending,
                    onUntintPending,
                    onFreeze,
                    onUnfreeze,
                    onTintExpired,
                    onUntintExpired,
                    callAnimation,
                } = mockImports();

                callAnimation(old, current);

                jest.runAllTimers();

                expect(onTintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'tintBlocked').length);
                expect(onUntintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'untintBlocked').length);
                expect(onTintPending).toHaveBeenCalledTimes(called.filter(call => call === 'tintPending').length);
                expect(onUntintPending).toHaveBeenCalledTimes(called.filter(call => call === 'untintPending').length);
                expect(onFreeze).toHaveBeenCalledTimes(called.filter(call => call === 'freeze').length);
                expect(onUnfreeze).toHaveBeenCalledTimes(called.filter(call => call === 'unfreeze').length);
                expect(onTintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'tintExpired').length);
                expect(onUntintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'untintExpired').length);
            },
        );
    });

    describe('when the previous status is blocked', () => {
        it.each([
            { old: CardStatus.BLOCKED, current: CardStatus.ACTIVE, called: ['untintBlocked'] },
            { old: CardStatus.BLOCKED, current: CardStatus.FROZEN, called: ['untintBlocked', 'freeze'] },
            { old: CardStatus.BLOCKED, current: CardStatus.PENDING, called: ['untintBlocked', 'tintPending'] },
            { old: CardStatus.BLOCKED, current: CardStatus.EXPIRED, called: ['untintBlocked', 'tintExpired'] },
            { old: CardStatus.BLOCKED, current: CardStatus.CANCELED, called: [] },
            { old: CardStatus.BLOCKED, current: CardStatus.INACTIVE, called: [] },
        ] as SetupAnimationConfigProps[])(
            'should call the correct functions when moving from status $old to $current',
            ({ old, current, called }) => {
                const {
                    onTintBlocked,
                    onUntintBlocked,
                    onTintPending,
                    onUntintPending,
                    onFreeze,
                    onUnfreeze,
                    onTintExpired,
                    onUntintExpired,
                    callAnimation,
                } = mockImports();

                callAnimation(old, current);

                jest.runAllTimers();

                expect(onTintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'tintBlocked').length);
                expect(onUntintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'untintBlocked').length);
                expect(onTintPending).toHaveBeenCalledTimes(called.filter(call => call === 'tintPending').length);
                expect(onUntintPending).toHaveBeenCalledTimes(called.filter(call => call === 'untintPending').length);
                expect(onFreeze).toHaveBeenCalledTimes(called.filter(call => call === 'freeze').length);
                expect(onUnfreeze).toHaveBeenCalledTimes(called.filter(call => call === 'unfreeze').length);
                expect(onTintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'tintExpired').length);
                expect(onUntintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'untintExpired').length);
            },
        );
    });

    describe('when the previous status is active', () => {
        it.each([
            { old: CardStatus.ACTIVE, current: CardStatus.FROZEN, called: ['freeze'] },
            { old: CardStatus.ACTIVE, current: CardStatus.PENDING, called: ['tintPending'] },
            { old: CardStatus.ACTIVE, current: CardStatus.BLOCKED, called: ['tintBlocked'] },
            { old: CardStatus.ACTIVE, current: CardStatus.CANCELED, called: [] },
            { old: CardStatus.ACTIVE, current: CardStatus.EXPIRED, called: ['tintExpired'] },
            { old: CardStatus.ACTIVE, current: CardStatus.INACTIVE, called: [] },
        ] as SetupAnimationConfigProps[])(
            'should call the correct functions when moving from status $old to $current',
            ({ old, current, called }) => {
                const {
                    onTintBlocked,
                    onUntintBlocked,
                    onTintPending,
                    onUntintPending,
                    onFreeze,
                    onUnfreeze,
                    onTintExpired,
                    onUntintExpired,
                    callAnimation,
                } = mockImports();

                callAnimation(old, current);

                jest.runAllTimers();

                expect(onTintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'tintBlocked').length);
                expect(onUntintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'untintBlocked').length);
                expect(onTintPending).toHaveBeenCalledTimes(called.filter(call => call === 'tintPending').length);
                expect(onUntintPending).toHaveBeenCalledTimes(called.filter(call => call === 'untintPending').length);
                expect(onFreeze).toHaveBeenCalledTimes(called.filter(call => call === 'freeze').length);
                expect(onUnfreeze).toHaveBeenCalledTimes(called.filter(call => call === 'unfreeze').length);
                expect(onTintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'tintExpired').length);
                expect(onUntintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'untintExpired').length);
            },
        );
    });

    describe('when rapid status changes occur', () => {
        it('should cancel pending enter when a new transition fires before timeout', () => {
            const { onUnfreeze, onTintPending, onUntintPending, onTintBlocked, callAnimation } = mockImports();

            // FROZEN → PENDING: triggers unfreeze + schedules tintPending after timeout
            callAnimation(CardStatus.FROZEN, CardStatus.PENDING);

            expect(onUnfreeze).toHaveBeenCalledTimes(1);
            expect(onTintPending).not.toHaveBeenCalled();

            // Before timeout fires, PENDING → BLOCKED: should cancel the pending tintPending
            callAnimation(CardStatus.PENDING, CardStatus.BLOCKED);

            expect(onUntintPending).toHaveBeenCalledTimes(1);

            // Now run all timers — tintPending should NOT fire, only tintBlocked
            jest.runAllTimers();

            expect(onTintPending).not.toHaveBeenCalled();
            expect(onTintBlocked).toHaveBeenCalledTimes(1);
        });
    });

    describe('when the previous status is expired', () => {
        it.each([
            { old: CardStatus.EXPIRED, current: CardStatus.ACTIVE, called: ['untintExpired'] },
            { old: CardStatus.EXPIRED, current: CardStatus.FROZEN, called: ['untintExpired', 'freeze'] },
            { old: CardStatus.EXPIRED, current: CardStatus.PENDING, called: ['untintExpired', 'tintPending'] },
            { old: CardStatus.EXPIRED, current: CardStatus.BLOCKED, called: ['untintExpired', 'tintBlocked'] },
            { old: CardStatus.EXPIRED, current: CardStatus.CANCELED, called: [] },
            { old: CardStatus.EXPIRED, current: CardStatus.INACTIVE, called: [] },
        ] as SetupAnimationConfigProps[])(
            'should call the correct functions when moving from status $old to $current',
            ({ old, current, called }) => {
                const {
                    onTintBlocked,
                    onUntintBlocked,
                    onTintPending,
                    onUntintPending,
                    onFreeze,
                    onUnfreeze,
                    onTintExpired,
                    onUntintExpired,
                    callAnimation,
                } = mockImports();

                callAnimation(old, current);

                jest.runAllTimers();

                expect(onTintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'tintBlocked').length);
                expect(onUntintBlocked).toHaveBeenCalledTimes(called.filter(call => call === 'untintBlocked').length);
                expect(onTintPending).toHaveBeenCalledTimes(called.filter(call => call === 'tintPending').length);
                expect(onUntintPending).toHaveBeenCalledTimes(called.filter(call => call === 'untintPending').length);
                expect(onFreeze).toHaveBeenCalledTimes(called.filter(call => call === 'freeze').length);
                expect(onUnfreeze).toHaveBeenCalledTimes(called.filter(call => call === 'unfreeze').length);
                expect(onTintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'tintExpired').length);
                expect(onUntintExpired).toHaveBeenCalledTimes(called.filter(call => call === 'untintExpired').length);
            },
        );
    });
});

type SetupAnimationConfigProps = {
    old: CardStatus | typeof CardStatusNone;
    current: CardStatus;
    called: ('freeze' | 'unfreeze' | 'tintBlocked' | 'untintBlocked' | 'tintPending' | 'untintPending' | 'tintExpired' | 'untintExpired')[];
};

function mockImports() {
    const onFreeze = jest.fn();
    const onUnfreeze = jest.fn();
    const freezeOverlayRef = createRef<FreezeOverlayRef>();
    freezeOverlayRef.current = { onFreeze, onUnfreeze };

    const onTintBlocked = jest.fn();
    const onUntintBlocked = jest.fn();
    const blockedOverlayRef = createRef<OpacityOverlayRef>();
    blockedOverlayRef.current = { onTint: onTintBlocked, onUntint: onUntintBlocked };

    const onTintPending = jest.fn();
    const onUntintPending = jest.fn();
    const pendingOverlayRef = createRef<OpacityOverlayRef>();
    pendingOverlayRef.current = { onTint: onTintPending, onUntint: onUntintPending };

    const onTintExpired = jest.fn();
    const onUntintExpired = jest.fn();
    const expiredOverlayRef = createRef<OpacityOverlayRef>();
    expiredOverlayRef.current = { onTint: onTintExpired, onUntint: onUntintExpired };

    const config = setupAnimationConfig({ freezeRef: freezeOverlayRef, blockedOverlayRef, pendingOverlayRef, expiredOverlayRef });

    function callAnimation(old: CardStatus | typeof CardStatusNone, current: CardStatus) {
        const handler = config.get(old)?.get(current);
        handler?.();
    }

    return {
        onTintBlocked,
        onUntintBlocked,
        onTintPending,
        onUntintPending,
        onFreeze,
        onUnfreeze,
        onTintExpired,
        onUntintExpired,
        callAnimation,
    };
}
