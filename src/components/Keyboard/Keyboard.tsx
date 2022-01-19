// TODO: remove default layout prop, think about typing layouts

import { Key } from '../Key';
import { useKeyboardPressHistory, useEvent } from '../../hooks';
// @ts-ignore
import macEnLayout from '../../configs/keyboardLayouts/mac-en';
import {
    convertLayoutToKeyData,
    mapLayoutToEvents,
    getAnchorSuggestionIdx,
} from '../../utils/keyboard';
import { UIKbdKey } from '../../types';

type KeyboardProps = {
    layout: string[][],
    isShiftPressed: boolean,
};


export const Keyboard = (props: KeyboardProps) => {
    const { layout = macEnLayout as typeof props.layout, isShiftPressed } = props;
    const [keydownEvent] = useEvent('keydown');
    const [, lastKeyCombination] = useKeyboardPressHistory(keydownEvent as KeyboardEvent);
    const convertedLayout = convertLayoutToKeyData(layout);
    const mappedLayout = mapLayoutToEvents(convertedLayout);

    const renderKeyboardLayout = () => {
        return convertedLayout.map(
            (key, i) => (
                <Key
                    key={`${key.defaultValue}-${i}`}
                    keyData={key}
                    isShiftPressed={isShiftPressed}
                />
            )
        );
    };

    const matchEventToMappedLayout = (): UIKbdKey | null => {
        const lastKeyPressed = lastKeyCombination?.[0];
        return lastKeyPressed ? mappedLayout[lastKeyPressed] : null;
    };

    const suggestedAnchorIdx = getAnchorSuggestionIdx(
        matchEventToMappedLayout()?.rowIdx
    );

    console.log(
        convertedLayout.find(
            (k) => k.rowIdx === suggestedAnchorIdx && k.columnIdx === 2
        )
    );

    return (
        <>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <section className="keyboard">{renderKeyboardLayout()}</section>
            </div>
        </>
    );
};
