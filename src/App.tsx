import { useState } from 'react';
import { useCaptureKeydownEvents } from './hooks';
import { Display, Keyboard } from './components';
// @ts-ignore
import macEnLayout from './configs/keyboardLayouts/mac-en';
import './styles/index.scss';

export const App = () => {
    const [lastKeyPressedChar, isShiftPressed] = useCaptureKeydownEvents();
    const [nextChar, setNextChar] = useState('e');

    const isError = lastKeyPressedChar !== nextChar;

    return (
        <div style={{ width: '80%', margin: '0 auto', marginTop: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Display
                    sentence="Hello Darkness, my old friend"
                    currentLetterIdx={2}
                />

                <Keyboard
                    layout={macEnLayout}
                    nextChar={nextChar}
                    lastPressedKeyChar={lastKeyPressedChar}
                    isError={isError}
                    isShiftPressed={isShiftPressed}
                />
            </div>
        </div>
    );
};
