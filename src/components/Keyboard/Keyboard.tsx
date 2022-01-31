// TODO: remove default layout prop, think about typing layouts
import { useCallback, useMemo } from 'react';
import { useReactiveRef } from '../../hooks';
import { convertLayoutToKeyData, mapLayoutToEvents } from '../../utils/keyboard';
import { HintArrow } from '../HintArrow';
import { Key } from '../Key';

type KeyboardProps = {
    layout: string[][];
    currentChar: string | undefined;
    errorChar: string | null;
    isShiftPressed: boolean;
};


export const Keyboard: React.FC<KeyboardProps> = ({
    layout,
    currentChar,
    errorChar,
    isShiftPressed,
}) => {
    const [currentKeyRef, currentKeyRefValue] = useReactiveRef<HTMLDivElement>();
    const [suggestedKeyRef, suggestedKeyRefValue] = useReactiveRef<HTMLDivElement>();

    const convertedLayout = useMemo(
        () => convertLayoutToKeyData(layout),
        [layout]
    );
    const mappedLayout = useMemo(
        () => mapLayoutToEvents(convertedLayout),
        [convertedLayout]
    );

    const matchEventToMappedLayout = useCallback(
        () => (currentChar ? mappedLayout[currentChar] : null),
        [mappedLayout, currentChar]
    );

    const keyboardLayout = useMemo(
        () =>
            convertedLayout.map((key, i) => {
                const isKeyPressedCurrently =
                    currentChar === key.defaultValue ||
                    currentChar === key.altValue;

                const isSuggestedKey =
                    matchEventToMappedLayout()?.suggestedAnchorKey === key.defaultValue;

                const ref = isKeyPressedCurrently
                    ? currentKeyRef
                    : isSuggestedKey
                        ? suggestedKeyRef
                        : null;

                return (
                    <Key
                        ref={ref}
                        key={`${key.defaultValue}-${i}`}
                        keyData={key}
                        isShiftPressed={isShiftPressed}
                        isKeyPressed={isKeyPressedCurrently}
                        isSuggestedKey={isSuggestedKey}
                        errorChar={errorChar}
                    />
                );
            }),
        [
            convertedLayout,
            isShiftPressed,
            currentChar,
            errorChar,
            matchEventToMappedLayout,
            currentKeyRef,
            suggestedKeyRef,
        ]
    );

    return (
        <div style={{ position: 'relative' }}>
            {currentKeyRefValue && suggestedKeyRefValue && (
                <HintArrow
                    fromElement={suggestedKeyRefValue}
                    toElement={currentKeyRefValue}
                />
            )}

            <section className="keyboard">{keyboardLayout}</section>
        </div>
    );
};
