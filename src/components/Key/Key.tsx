import { forwardRef } from 'react';
import classNames from 'classnames';
import { UIKbdKey } from '../../types/keyboard'

type KeyProps = {
    keyData: UIKbdKey;
    isKeyPressed: boolean;
    isShiftPressed: boolean;
    isSuggestedKey: boolean;
};

const KeyValueToDisplayValue: Record<string, string | undefined> = {
    Space: '',
    Meta: '⌘',
    Control: 'ctrl',
    Shift: '⇧',
    Tab: '↹',
    Backspace: '⌫',
    Enter: '↵',
    Capslock: '⇪',
};


export const Key = forwardRef<HTMLDivElement, KeyProps>(
    (
        {
            keyData,
            isKeyPressed,
            isShiftPressed,
            isSuggestedKey,
        },
        ref,
    ) => {
        const shouldMapValueToSymbol = keyData.isModKey || !keyData.altValue;

        const formatKeyValueForUI = () => {
            if (shouldMapValueToSymbol) {
                return (
                    KeyValueToDisplayValue[keyData.defaultValue] ??
                    keyData.defaultValue.toLowerCase()
                );
            }

            return isShiftPressed && keyData.altValue
                ? keyData.altValue
                : keyData.defaultValue;
        };

        const keyClasses = classNames(
            'keyboard__key',
            [`keyboard__key--position-${keyData.columnIdx}-${keyData.rowIdx}`],

            'key',
            { 'key--default': !keyData.isModKey },
            { 'key--modifier': keyData.isModKey },
            { 'key--anchor': keyData.isAnchorKey },
            { 'key--pressed': isKeyPressed },
            { 'key--suggested': isSuggestedKey && !isKeyPressed }
        );

        return (
            <div
                ref={ref}
                data-testid={keyData.defaultValue}
                className={keyClasses}
            >
                <div className="key__content">{formatKeyValueForUI()}</div>
            </div>
        );
    }
);

Key.displayName = 'Key';