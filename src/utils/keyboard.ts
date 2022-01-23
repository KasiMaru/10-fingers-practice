import { UIKbdKey, KbdLayoutMapping } from '../types/keyboard';

const SPACE_KEY_VALUE = ' ';

const anchorKeysIndexes: number[] = [1, 2, 3, 4, 7, 8, 9, 10];

/**
 * Modifier key values are >= 3 symbols long (like "Alt") and always capitalized.
 */
export const checkIfModKey = (key: string) =>
    key.length >= 3 && key[0] === key[0].toUpperCase();

export const convertLayoutToKeyData = (layout: string[][]) =>
    layout.map((row, rowIdx) =>
        row.map((key, columnIdx) => {
            const isModKey = checkIfModKey(key);
            const [defaultValue, altValue = null] = isModKey ? [key] : key.split('');
            const isAnchorKey = rowIdx === 2 && anchorKeysIndexes.includes(columnIdx);

            const suggestedAnchorIdx = getAnchorSuggestionIdx(
                columnIdx,
                row.length,
            );

            const suggestedAnchorKey = layout[2][suggestedAnchorIdx][0];

            const keyData: UIKbdKey = {
                defaultValue: defaultValue === SPACE_KEY_VALUE ? 'Space' : defaultValue,
                altValue,
                rowIdx,
                suggestedAnchorKey,
                columnIdx,
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

export const getAnchorSuggestionIdx = (keyIdx: number, rowLength: number) => {
    const leftHandAnchors = anchorKeysIndexes.slice(0, anchorKeysIndexes.length / 2);
    const rightHandAnchors = anchorKeysIndexes.slice(anchorKeysIndexes.length / 2);

    return getClosestNumberFromArray(
        keyIdx < Math.ceil(rowLength / 2) ? leftHandAnchors : rightHandAnchors,
        keyIdx
    );
};

export const mapLayoutToEvents = (layout: UIKbdKey[]): KbdLayoutMapping => {
    const defaultMappings = layout.reduce((mapped: KbdLayoutMapping, key) => {
        mapped[key.defaultValue] = key;

        return mapped;
    },
        {}
    );

    const altMappings = layout.reduce(
        (mapped: KbdLayoutMapping, key) => {
            key.altValue && (mapped[key.altValue] = key);

            return mapped;
        },
        {}
    );

    return { ...defaultMappings, ...altMappings };
};
