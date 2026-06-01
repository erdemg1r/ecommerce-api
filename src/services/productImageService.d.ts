export declare const productImageService: {
    addMany: (productId: string, files: Express.Multer.File[]) => Promise<{
        url: string;
        id: string;
        createdAt: Date;
        sortOrder: number;
        productId: string;
    }[]>;
    remove: (productId: string, imageId: string) => Promise<{
        id: string;
    }>;
};
//# sourceMappingURL=productImageService.d.ts.map