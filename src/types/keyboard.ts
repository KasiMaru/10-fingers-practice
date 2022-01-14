export type UIKbdKey = {
    defaultValue: string;
    altValue: string;
    columnIdx: number;
    rowIdx: number;
    isModKey: boolean;
    isAnchorKey: boolean;
    nearestAnchorKey?: string;
};

export type KbdLayoutMapping = Record<string, UIKbdKey>;