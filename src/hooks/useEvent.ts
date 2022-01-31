import { useState, useEffect } from 'react';

export const useEvent = (eventName: string, target?: string) => {
    const [event, setEvent] = useState<Event | null>(null);
    const eventTarget = target ? document.querySelector(target) : document;

    useEffect(
        () => {
            if (!eventTarget || !eventName) return;

            const handleEvent = (event: Event) => setEvent(event);
            eventTarget.addEventListener(eventName, handleEvent);

            return () => document.removeEventListener(eventName, handleEvent);
        },
        [eventTarget, eventName],
    );

    return [event];
};
