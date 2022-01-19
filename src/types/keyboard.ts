export type UIKbdKey = {
    defaultValue: string;
    altValue: string | null;
    columnIdx: number;
    rowIdx: number;
    isModKey: boolean;
    isAnchorKey: boolean;
};

export type KbdLayoutMapping = Record<string, UIKbdKey>;