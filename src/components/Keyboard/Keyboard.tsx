// TODO: remove default layout prop, think about typing layouts
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Key } from '../Key';
import { useKeyboardPressHistory, useEvent } from '../../hooks';
// @ts-ignore
import macEnLayout from '../../configs/keyboardLayouts/mac-en';
import { convertLayoutToKeyData, mapLayoutToEvents } from '../../utils/keyboard';

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
    const lastKeyPressed = lastKeyCombination?.[0];

    const convertedLayout = useMemo(
        ()  => convertLayoutToKeyData(layout),
        [layout],
    );
    const mappedLayout = useMemo(
        () => mapLayoutToEvents(convertedLayout),
        [convertedLayout]
    );

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

    const matchEventToMappedLayout = useCallback(
        () => lastKeyPressed ? mappedLayout[lastKeyPressed] : null,
        [mappedLayout, lastKeyPressed]
    );

    const keyboardLayout = useMemo(
        () =>
            convertedLayout.map((key, i) => {
                const isKeyPressedCurrently =
                    lastKeyPressed === key.defaultValue ||
                    lastKeyPressed === key.altValue;

                const isSuggestedKey = matchEventToMappedLayout()?.suggestedAnchorKey === key.defaultValue;

                return (
                    <Key
                        key={`${key.defaultValue}-${i}`}
                        keyData={key}
                        isShiftPressed={isShiftPressed}
                        isKeyPressed={isKeyPressedCurrently}
                        isSuggestedKey={isSuggestedKey}
                    />
                );
            }),
        [
            convertedLayout,
            isShiftPressed,
            lastKeyPressed,
            matchEventToMappedLayout,
        ]
    );

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <section className="keyboard">{keyboardLayout}</section>
        </div>
    );
};
