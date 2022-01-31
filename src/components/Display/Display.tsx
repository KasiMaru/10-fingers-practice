type DisplayProps = {
    sentence: string,
    currentLetterIdx: number,
};

export const Display: React.FC<DisplayProps> = ({ sentence, currentLetterIdx }) => {
    return (
        <div className="display">
            <div className="display__text">
                { sentence }
            </div>
        </div>
    );
};