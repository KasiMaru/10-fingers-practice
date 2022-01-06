import { useState, useEffect } from 'react';
import { ModifierKeys } from '../constants/keyboard';


/**
 * Key + possible modifier combination
 */
type KeyCombination = Array<string>;
/**
 * A Stack of key + possible modifier combinations
 */
type KeysHistory = Array<KeyCombination>;

const getModKeysFromKbdEvent = (event: KeyboardEvent) =>
    Object.values(ModifierKeys)
        .filter((keyValue) => event[keyValue.eventName])
        .map((pressedKey) => pressedKey.name);


export const useKeyboardPressHistory = (event: KeyboardEvent | null) => {
    const [history, setHistory] = useState<KeysHistory>([]);

    useEffect(
        () => {
            if (!event || !event?.key) return;
            const modKeys = getModKeysFromKbdEvent(event);

            const isOnlyModifierPressed = modKeys.includes(event.key as typeof modKeys[number]);
            if (isOnlyModifierPressed) return;

            const keyCombination = [event.key, ...modKeys];
            setHistory(history => [...history, keyCombination]);
        },
        [event]
    );

    return [history];
};
