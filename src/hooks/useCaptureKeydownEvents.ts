import { useEffect, useState } from 'react';
import { useEvent } from './useEvent';
import { useKeyboardPressHistory } from './useKeyboardPressHistory';

const isKbdEventWithShift = (event: unknown) =>
    event instanceof KeyboardEvent && event.shiftKey;


export const useCaptureKeydownEvents = (): [string | undefined, boolean] => {
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    const [keyDownEvent] = useEvent('keydown');
    const [keyUpEvent] = useEvent('keyup');

    const [, lastKeyCombination] = useKeyboardPressHistory(
        keyDownEvent as KeyboardEvent
    );
    const lastKeyPressed = lastKeyCombination?.[0];

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

    return [lastKeyPressed, isShiftPressed];
};
