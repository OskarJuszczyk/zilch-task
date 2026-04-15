import DisplayPanel from '@components/Panels/DisplayPanel';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';

describe('DisplayPanel', () => {
    it('should pass animation props if animateOnMount is true', () => {
        const { getByTestId } = render(<DisplayPanel testID="display-panel" animateOnMount={true} withFade={true} shouldDisplayContent={true} />);

        expect(getByTestId('display-panel')).toHaveProp('entering', expect.any(Object));
        expect(getByTestId('display-panel')).toHaveProp('exiting', expect.any(Object));
        expect(getByTestId('display-panel')).toHaveProp('layout', expect.any(Function));
    });

    it('should not pass animation props if animateOnMount is false', () => {
        const { queryByTestId } = render(<DisplayPanel testID="display-panel" animateOnMount={false} withFade={true} shouldDisplayContent={true} />);

        expect(queryByTestId('display-panel')).not.toHaveProp('entering', expect.any(Object));
        expect(queryByTestId('display-panel')).not.toHaveProp('exiting', expect.any(Object));
        expect(queryByTestId('display-panel')).not.toHaveProp('layout', expect.any(Function));
    });

    it('should not show content if shouldDisplayContent is false', () => {
        const { queryByTestId } = render(<DisplayPanel testID="display-panel" withFade={true} shouldDisplayContent={false} />);

        expect(queryByTestId('display-panel')).toBeNull();
    });

    it('should return original component if there is no fade', () => {
        const { getByTestId, queryByTestId } = render(
            <DisplayPanel testID="display-panel" withFade={false} shouldDisplayContent={true}>
                <View testID="view" />
            </DisplayPanel>,
        );

        expect(getByTestId('view')).toBeVisible();
        expect(queryByTestId('display-panel')).toBeNull();
    });

    it('should display component if there is a fade', () => {
        const { getByTestId } = render(
            <DisplayPanel testID="display-panel" withFade={true} shouldDisplayContent={true}>
                <View testID="view" />
            </DisplayPanel>,
        );

        expect(getByTestId('display-panel')).toBeVisible();
        expect(getByTestId('view')).toBeVisible();
    });
});
