export declare const wishlistService: {
    list: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        product: {
            id: string;
            name: string;
            isActive: boolean;
            price: number;
            imageUrl: string | null;
        };
    }[]>;
    add: (userId: string, productId: string) => Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        userId: string;
    }>;
    remove: (userId: string, productId: string) => Promise<void>;
};
//# sourceMappingURL=wishlistService.d.ts.map