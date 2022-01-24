import { useState, useCallback } from 'react';

export const useReactiveRef = <T>(): [(referred: T) => void, T | null] => {
    const [ref, setRef] = useState<T | null>(null);

    const reactiveRef = useCallback((referred: T) => {
        if (referred !== null) {
            setRef(referred);
        }
    }, []);

    return [reactiveRef, ref];
};
