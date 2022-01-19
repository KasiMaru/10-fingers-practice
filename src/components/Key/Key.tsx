import classNames from 'classnames';
import { UIKbdKey } from '../../types/keyboard'

type KeyProps = {
    keyData: UIKbdKey;
    isShiftPressed: boolean;
};


const KeyValueToDisplayValue: Record<string, string | undefined> = {
    Space: '',
    Meta: '⌘',
    Control: 'ctrl',
    Shift: '⇧',
    Tab: '↹',
    Backspace: '⌫',
    Enter: '↵',
};


export const Key = (props: KeyProps) => {
    const { keyData, isShiftPressed } = props;

    const formatKeyValueForUI = () => {
        if (keyData.isModKey) {
            return (
                KeyValueToDisplayValue[keyData.defaultValue] ||
                keyData.defaultValue.toLowerCase()
            );
        }

        return isShiftPressed ? keyData.altValue : keyData.defaultValue;
    };

    const keyClasses = classNames(
        'key',
        `key--${keyData.defaultValue.toLowerCase()}`,
        { 'key--default': !keyData.isModKey },
        { 'key--modifier': keyData.isModKey }
    );

    return (
        <div
            data-testid={keyData.defaultValue}
            className={keyClasses}
        >
            <div className="key__content">
                {formatKeyValueForUI()}
            </div>
        </div>
    );
};
