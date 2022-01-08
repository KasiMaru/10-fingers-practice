// TODO: remove default layout prop, think about typing layouts

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useKeyboardPressHistory } from '../hooks/useKeyboardPressHistory';
// @ts-ignore
import macEnLayout from '../configs/keyboardLayouts/mac-en';
import './ProtoKeyboard.scss';

type ProtoKeyboardProps = {
    layout: string[][],
    isShiftPressed: boolean,
};

const SPACE_KEY_DISPLAY_VALUE = 'space';

/**
 * Check if a current key is a modifier key.
 * Modifier key values are >= 3 symbols long (like "Alt") and always capitalized.
 */
const checkIfModKey = (key: string)=> key.length >= 3 && key[0] === key[0].toUpperCase();

export const ProtoKeyboard = (props: ProtoKeyboardProps) => {
    const { layout = macEnLayout as typeof props.layout, isShiftPressed } = props;
    const [event, setEvent] = useState<KeyboardEvent | null>(null);
    const [keyboardHistory] = useKeyboardPressHistory(event);

    useEffect(() => {
        const handleEvent = (event: KeyboardEvent) => setEvent(event);

        document.addEventListener('keydown', handleEvent);
        return () => document.removeEventListener('keydown', handleEvent);
    }, []);

    const getKeyDisplayVal = (key: string) => {
        const isModKey = checkIfModKey(key);
        const [defaultVal, altVal] = isModKey ? [key] : key.split('');

        if (!isModKey) {
            return (defaultVal === ' ') ?
                SPACE_KEY_DISPLAY_VALUE :
                isShiftPressed ?
                    altVal :
                    defaultVal;
        }

        if (isModKey) {
            return defaultVal.toLowerCase();
        }
    };

    const renderKeyboardLayout = () => {
        return layout.map((row) => {
            return row.map((key, i) => {
                const isModKey = checkIfModKey(key);
                const displayValue = getKeyDisplayVal(key);

                const keyClasses = classNames(
                    'key',
                    `key--${displayValue}`,
                    { 'key--default': !isModKey },
                    { 'key--modifier': isModKey }
                );

                return (
                    <div data-testid={displayValue} className={keyClasses} key={`${key}-${i}`}>
                        <div className="key__content">{displayValue}</div>
                    </div>
                );
            });
        });
    };

    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <section className="keyboard">
                <div style={{display: 'none'}}>
                    {JSON.stringify(keyboardHistory)}
                </div>

                {renderKeyboardLayout()}
            </section>
        </div>
    );
};
