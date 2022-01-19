// TODO: remove default layout prop, think about typing layouts
import { useState, useEffect, useMemo } from 'react';
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
};

const isKbdEventWithShift = (event: unknown) =>
    event instanceof KeyboardEvent && event.shiftKey;

export const Keyboard = (props: KeyboardProps) => {
    const { layout = macEnLayout as typeof props.layout } = props;
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [keyDownEvent] = useEvent('keydown');
    const [keyUpEvent] = useEvent('keyup');
    const [, lastKeyCombination] = useKeyboardPressHistory(keyDownEvent as KeyboardEvent);

    const convertedLayout = convertLayoutToKeyData(layout);
    const mappedLayout = mapLayoutToEvents(convertedLayout);

    useEffect(
        () => {
            const isShiftHeld = isKbdEventWithShift(keyDownEvent);
            setIsShiftPressed(isShiftHeld);
        },
        [keyDownEvent]
    );
    useEffect(
        () => {
            const isShiftReleased = isKbdEventWithShift(keyUpEvent);
            setIsShiftPressed(isShiftReleased);
        },
        [keyUpEvent]
    );

    const keyboardLayout = useMemo(
        () => convertedLayout.map(
            (key, i) =>
                <Key
                    key={`${key.defaultValue}-${i}`}
                    keyData={key}
                    isShiftPressed={isShiftPressed}
                />
        ),
        [convertedLayout, isShiftPressed]
    );

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
        <div style={{ width: '80%', margin: '0 auto' }}>
            <section className="keyboard">{keyboardLayout}</section>
        </div>
    );
};
