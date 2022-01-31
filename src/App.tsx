import { useCaptureKeydownEvents } from './hooks';
import { Display, Keyboard } from './components';
// @ts-ignore
import macEnLayout from './configs/keyboardLayouts/mac-en';
import './styles/index.scss';

export const App = () => {
    const [lastKeyPressed, isShiftPressed] = useCaptureKeydownEvents();

    return (
        <div style={{ width: '80%', margin: '0 auto', marginTop: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Display
                    sentence="Hello Darkness, my old friend"
                    currentLetterIdx={2}
                />

                <Keyboard
                    layout={macEnLayout}
                    currentChar={lastKeyPressed}
                    errorChar={null}
                    isShiftPressed={isShiftPressed}
                />
            </div>
        </div>
    );
};
