import { ReanimatedKeyframe } from 'react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/Keyframe';

export type KeyframeProps = {
    enteringAnimation?: ReanimatedKeyframe;
    exitingAnimation?: ReanimatedKeyframe;
    duration?: number;
};

export const Duration = {
    superQuick: 150,
    quick: 250,
    medium: 450,
};
