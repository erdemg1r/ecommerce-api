import type { CreateTagInput, UpdateTagInput } from "../schemas/tagSchemas.js";
export declare const tagService: {
    findAll: () => Promise<({
        products: {
            id: string;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            stock: number;
            imageUrl: string | null;
            categoryId: string | null;
            producerId: string | null;
            ownerId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById: (id: string) => Promise<{
        products: {
            id: string;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            stock: number;
            imageUrl: string | null;
            categoryId: string | null;
            producerId: string | null;
            ownerId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create: (input: CreateTagInput) => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update: (id: string, input: UpdateTagInput) => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove: (id: string) => Promise<void>;
    findDeleted: () => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    restore: (id: string) => Promise<{
        products: {
            id: string;
            name: string;
            isActive: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            stock: number;
            imageUrl: string | null;
            categoryId: string | null;
            producerId: string | null;
            ownerId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=tagService.d.ts.map