// TODO: remove default layout prop, think about typing layouts

import { useState, useEffect } from 'react';
import { Key } from '../Key';
import { useKeyboardPressHistory } from '../../hooks';
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
        return convertedLayout.map((key, i) => (
            <Key
                key={`${key.defaultValue}-${i}`}
                keyData={key}
                isShiftPressed={isShiftPressed}
            />
        ));
    };

    const matchEventToMappedLayout = (): UIKbdKey|null => {
        const lastKeyPressed = keyboardHistory[keyboardHistory.length - 1]?.[0];
        const mappedValue = mappedLayout[lastKeyPressed];

        return mappedValue || null;
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
