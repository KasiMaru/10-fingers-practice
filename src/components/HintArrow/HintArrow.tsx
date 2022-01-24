type HintArrowProps = {
    fromElement: HTMLElement;
    toElement: HTMLElement;
};

export const HintArrow: React.FC<HintArrowProps> = ({
    fromElement,
    toElement,
}) => {
    const { x: fromX, y: fromY, width: fromWidth, height: fromHeight } = fromElement.getBoundingClientRect();
    const { x: toX, y: toY, width: toWidth, height: toHeight } = toElement.getBoundingClientRect();

    const arrowCoordProps = {
        x1: fromX - fromWidth * 1.5,
        y1: fromY + fromHeight * 0.5,
        x2: toX - toWidth * 1.5,
        y2: toY + toHeight * 0.5,
    };

    return (
        <svg className="hint-arrow">
            <defs>
                <marker
                    className="hint-arrow__marker"
                    id="arrow"
                    viewBox="0 -5 10 10"
                    refX="5"
                    refY="0"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                >
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
            </defs>
            <line
                {...arrowCoordProps}
                className="hint-arrow__line"
                strokeWidth="4"
                markerEnd="url(#arrow)"
            ></line>
        </svg>
    );
};
