// TODO: remove default layout prop, think about typing layouts
import { useMemo } from 'react';
import { useReactiveRef } from '../../hooks';
import { convertLayoutToKeyData, mapLayoutToEvents } from '../../utils/keyboard';
import { HintArrow } from '../HintArrow';
import { Key } from '../Key';

type KeyboardProps = {
    layout: string[][];
    nextChar: string;
    lastPressedKeyChar: string | undefined;
    isError: boolean;
    isShiftPressed: boolean;
};


export const Keyboard: React.FC<KeyboardProps> = ({
    layout,
    nextChar,
    lastPressedKeyChar,
    isError,
    isShiftPressed,
}) => {
    const [nextKeyRef, nextKeyRefValue] = useReactiveRef<HTMLDivElement>();
    const [suggestedKeyRef, suggestedKeyRefValue] = useReactiveRef<HTMLDivElement>();

    const convertedLayout = useMemo(
        () => convertLayoutToKeyData(layout),
        [layout]
    );
    const mappedLayout = useMemo(
        () => mapLayoutToEvents(convertedLayout),
        [convertedLayout]
    );

    const keyboardLayout = useMemo(
        () =>
            convertedLayout.map((key, i) => {
                const isKeyPressedCurrently =
                    lastPressedKeyChar === key.defaultValue ||
                    lastPressedKeyChar === key.altValue;

                const isNextKey = nextChar === key.defaultValue || nextChar === key.altValue;

                const isSuggestedKey =
                    mappedLayout[nextChar]?.suggestedAnchorKey === key.defaultValue;

                const ref = isNextKey
                    ? nextKeyRef
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
                        nextKeyChar={nextChar}
                        isSuggestedKey={isSuggestedKey}
                        isError={isError}
                    />
                );
            }),
        [
            mappedLayout,
            convertedLayout,
            isShiftPressed,
            lastPressedKeyChar,
            isError,
            nextChar,
            nextKeyRef,
            suggestedKeyRef,
        ]
    );

    return (
        <div style={{ position: 'relative' }}>
            {nextKeyRefValue && suggestedKeyRefValue && (
                <HintArrow
                    fromElement={suggestedKeyRefValue}
                    toElement={nextKeyRefValue}
                />
            )}

            <section className="keyboard">{keyboardLayout}</section>
        </div>
    );
};
