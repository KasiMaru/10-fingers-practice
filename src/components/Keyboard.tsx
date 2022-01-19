// TODO: remove default layout prop, think about typing layouts

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useKeyboardPressHistory } from '../hooks/useKeyboardPressHistory';
// @ts-ignore
import macEnLayout from '../configs/keyboardLayouts/mac-en';
import {
    getAnchorSuggestionIdx,
    convertLayoutToKeyData,
    formatKeyValueForUI,
    mapLayoutToEvents,
} from '../utils/keyboard';
import './Keyboard.scss';
import { UIKbdKey } from '../types/keyboard';

type KeyboardProps = {
    layout: string[][],
    isShiftPressed: boolean,
};


export const Keyboard = (props: KeyboardProps) => {
    const {layout = macEnLayout as typeof props.layout, isShiftPressed} = props;
    const [event, setEvent] = useState<KeyboardEvent | null>(null);
    const [keyboardHistory] = useKeyboardPressHistory(event);
    const convertedLayout = convertLayoutToKeyData(layout);
    const mappedLayout = mapLayoutToEvents(convertedLayout);

    useEffect(
        () => {
            const handleEvent = (event: KeyboardEvent) => setEvent(event);

            document.addEventListener('keydown', handleEvent);
            return () => document.removeEventListener('keydown', handleEvent);
        },
    [],
    );

    const renderKeyboardLayout = () => {
        return convertedLayout.map((key, i) => {
            const displayValue = formatKeyValueForUI(key, isShiftPressed);

            const keyClasses = classNames(
                'key',
                `key--${key.defaultValue.toLowerCase()}`,
                { 'key--default': !key.isModKey },
                { 'key--modifier': key.isModKey },
            );

            return (
                <div data-testid={displayValue} className={keyClasses} key={`${key}-${i}`}>
                    <div className="key__content">{displayValue}</div>
                </div>
            );
        });
    };

    const matchEventToMappedLayout = (): UIKbdKey|null => {
        const lastKeyPressed = keyboardHistory[keyboardHistory.length - 1]?.[0];
        const mappedValue = mappedLayout[lastKeyPressed];

        return mappedValue || null;
    };

    const suggestedAnchorIdx = getAnchorSuggestionIdx(
        matchEventToMappedLayout()?.rowIdx
    );

    console.log(convertedLayout.find((k) => k.rowIdx === suggestedAnchorIdx && k.columnIdx === 2));

    return (
        <>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <section className="keyboard">{renderKeyboardLayout()}</section>
            </div>
        </>
    );
};
