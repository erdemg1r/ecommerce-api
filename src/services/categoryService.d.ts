import type { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchemas.js";
export declare const categoryService: {
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
        slug: string;
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
        slug: string;
    }>;
    create: (input: CreateCategoryInput) => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    update: (id: string, input: UpdateCategoryInput) => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    remove: (id: string) => Promise<void>;
    findDeleted: () => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
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
        slug: string;
    }>;
};
//# sourceMappingURL=categoryService.d.ts.map