import { UIKbdKey, KbdLayoutMapping } from '../types/keyboard';

const SPACE_KEY_VALUE = ' ';

const KeyValueToDisplayValue: Record<string, string|undefined> = {
    [SPACE_KEY_VALUE]: '',
    Meta: '⌘',
    Control: 'ctrl',
    Shift: '⇧',
    Tab: '↹',
    Backspace: '⌫',
    Enter: '↵',
};
const anchorKeysIndexes: number[] = [1, 2, 3, 4, 7, 8, 9, 10];

/**
 * Modifier key values are >= 3 symbols long (like "Alt") and always capitalized.
 */
export const checkIfModKey = (key: string) =>
    key.length >= 3 && key[0] === key[0].toUpperCase();

export const convertLayoutToKeyData = (layout: string[][]) =>
    layout.map((row, columnIdx) =>
        row.map((key, rowIdx) => {
            const isModKey = checkIfModKey(key);
            const [defaultValue, altValue] = isModKey ? [key] : key.split('');
            const isAnchorKey = columnIdx === 2 && anchorKeysIndexes.includes(rowIdx);

            const keyData: UIKbdKey = {
                defaultValue: defaultValue === SPACE_KEY_VALUE ? 'Space' : defaultValue,
                altValue,
                columnIdx,
                rowIdx,
                isAnchorKey,
                isModKey,
            };

            return keyData;
        })
    ).flat();


const getClosestNumberFromArray = (array: number[], number: number) =>
    array.reduce((closest: number, current: number) => {
        const aDiff = Math.abs(closest - number);
        const bDiff = Math.abs(current - number);

        if (aDiff === bDiff) {
            return closest > current ? closest : current;
        } else {
            return bDiff < aDiff ? current : closest;
        }
    });

export const formatKeyValueForUI = (key: UIKbdKey, isShiftPressed: boolean): string => {
    if (key.isModKey) {
        return KeyValueToDisplayValue[key.defaultValue] || key.defaultValue.toLowerCase();
    }

    return isShiftPressed ?
        key.altValue :
        key.defaultValue;
};

export const getAnchorSuggestionIdx = (keyIdx: number) => {
    const defaultRowKeysAmount = 14;

    const leftHandAnchors = anchorKeysIndexes.slice(0, anchorKeysIndexes.length / 2);
    const rightHandAnchors = anchorKeysIndexes.slice(anchorKeysIndexes.length / 2);

    return getClosestNumberFromArray(
        (keyIdx < defaultRowKeysAmount / 2) ? leftHandAnchors : rightHandAnchors,
        keyIdx
    );
};

export const mapLayoutToEvents = (layout: UIKbdKey[]): KbdLayoutMapping => {
    const defaultMappings = layout.reduce((mapped: KbdLayoutMapping, key) => {
        mapped[key.defaultValue] = key;
        return mapped;
    }, {});

    const altMappings = layout.reduce((mapped: KbdLayoutMapping, key) => {
        mapped[key.altValue] = key;
        return mapped;
    }, {});

    return { ...defaultMappings, ...altMappings };
};
