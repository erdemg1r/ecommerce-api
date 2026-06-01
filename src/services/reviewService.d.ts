import type { UpsertReviewInput } from "../schemas/reviewSchemas.js";
export declare const reviewService: {
    upsert: (userId: string, productId: string, input: UpsertReviewInput) => Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        userId: string;
        rating: number;
        comment: string | null;
    }>;
    findAllByProduct: (productId: string, cursor: string | undefined, limit: number) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            user: {
                id: string;
                name: string;
            };
            rating: number;
            comment: string | null;
        }[];
        meta: {
            limit: number;
            nextCursor: string | null;
            hasMore: boolean;
        };
    }>;
    getStats: (productId: string) => Promise<{
        avgRating: number;
        totalReviews: number;
        distribution: {
            rating: number;
            count: number;
        }[];
    }>;
    remove: (userId: string, role: string, reviewId: string) => Promise<void>;
};
//# sourceMappingURL=reviewService.d.ts.map