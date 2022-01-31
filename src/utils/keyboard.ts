import { UIKbdKey, KbdLayoutMapping } from '../types/keyboard';
import { Languages } from '../constants/keyboard';

const ANCHOR_KEYS_INDEXES: number[] = [1, 2, 3, 4, 7, 8, 9, 10];
const ANCHOR_KEYS_ROW = 2;

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
            const isAnchorKey =
                rowIdx === ANCHOR_KEYS_ROW &&
                ANCHOR_KEYS_INDEXES.includes(columnIdx);

            const suggestedAnchorIdx = getAnchorSuggestionIdx(
                columnIdx,
                rowIdx,
                row.length,
            );

            const suggestedAnchorKey =
                layout[ANCHOR_KEYS_ROW][suggestedAnchorIdx][0];

            const keyData: UIKbdKey = {
                defaultValue,
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

export const getAnchorSuggestionIdx = (
    keyIdx: number,
    rowIndex: number,
    rowLength: number
) => {
    /**
     * Suggestions based on the row need a little balancing, based on the layout
     */
    const RowIdxToBalanceNum: Record<number, number> = {
        0: 0,
        1: -1,
        2: -1,
        3: -1,
        4: 0,
    };

    const leftHandAnchors = ANCHOR_KEYS_INDEXES.slice(
        0,
        ANCHOR_KEYS_INDEXES.length / 2
    );
    const rightHandAnchors = ANCHOR_KEYS_INDEXES.slice(
        ANCHOR_KEYS_INDEXES.length / 2
    );

    const currentAnchors =
        keyIdx < Math.round(rowLength / 2 + RowIdxToBalanceNum[rowIndex])
            ? leftHandAnchors
            : rightHandAnchors;

    return getClosestNumberFromArray(currentAnchors, keyIdx);
};;

export const mapLayoutToKeyboardValues = (layout: UIKbdKey[]): KbdLayoutMapping => {
    const defaultMappings = layout.reduce(
        (mapped: KbdLayoutMapping, key) => {
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

export const getLangOfChar = (
    char: string,
): typeof Languages[keyof typeof Languages] => {
    const cyrillicCharsReg = /[\u0430-\u044f]+/i; // аА-яЯ
    const isCyrillic = cyrillicCharsReg.test(char);

    return isCyrillic ? Languages.RU : Languages.EN;
};