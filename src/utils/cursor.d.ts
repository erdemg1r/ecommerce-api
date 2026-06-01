export interface ProductCursor {
    createdAt: string;
    id: string;
}
export declare function encodeCursor(c: ProductCursor): string;
export declare function decodeCursor(token: string): ProductCursor | null;
//# sourceMappingURL=cursor.d.ts.map