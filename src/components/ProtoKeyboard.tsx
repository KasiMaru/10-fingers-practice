import { useState, useEffect } from 'react';
import { useKeyboardPressHistory } from '../hooks/useKeyboardPressHistory';
import './ProtoKeyboard.scss';

export const ProtoKeyboard = () => {
    const [event, setEvent] = useState<KeyboardEvent|null>(null);
    const [keyboardHistory] = useKeyboardPressHistory(event);

    useEffect(
        () => {
            const handleEvent = (event: KeyboardEvent) => setEvent(event);

            document.addEventListener('keydown', handleEvent);
            return () => document.removeEventListener('keydown', handleEvent);
        },
        []
    );

    return (
        <section>
            <h1>{JSON.stringify(keyboardHistory)}</h1>
        </section>
    );
};
