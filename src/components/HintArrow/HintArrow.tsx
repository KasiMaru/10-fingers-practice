// TODO: make calculations relative to the parent element

type HintArrowProps = {
    fromElement: HTMLElement;
    toElement: HTMLElement;
};

const getElemCoordsRelativeToParent = (
    element: HTMLElement
) => ({
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight,
});

export const HintArrow: React.FC<HintArrowProps> = ({ fromElement, toElement }) => {
    const {
        x: fromX,
        y: fromY,
        width: fromWidth,
        height: fromHeight,
    } = getElemCoordsRelativeToParent(fromElement);
    const {
        x: toX,
        y: toY,
        width: toWidth,
        height: toHeight,
    } = getElemCoordsRelativeToParent(toElement);

    const arrowCoordProps = {
        x1: fromX + fromWidth * 0.5,
        y1: fromY + fromHeight * 0.5,
        x2: toX + toWidth * 0.5,
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
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto"
                >
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
            </defs>
            <line
                {...arrowCoordProps}
                className="hint-arrow__line"
                strokeWidth="3"
                markerEnd="url(#arrow)"
            ></line>
        </svg>
    );
};
