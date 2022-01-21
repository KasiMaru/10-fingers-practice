export type UIKbdKey = {
    defaultValue: string;
    altValue: string | null;
    columnIdx: number;
    rowIdx: number;
    suggestedAnchorKey: string;
    isModKey: boolean;
    isAnchorKey: boolean;
};

export type KbdLayoutMapping = Record<string, UIKbdKey>;