import Svg, { Path } from 'react-native-svg';

import { DEFAULT_ICON_SIZE, SVGGraphicProps } from '@assets/utils/types';

export function IconFactory(path: string) {
    const Icon = ({ fill, width = DEFAULT_ICON_SIZE, height = DEFAULT_ICON_SIZE }: SVGGraphicProps) => (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d={path} fill={fill} />
        </Svg>
    );

    return Icon;
}
