import type { CreateProductInput, UpdateProductInput, ProductQuery } from "../schemas/productSchemas.js";
type SearchProduct = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    rank: number;
};
export declare const productService: {
    findAll: (filters: ProductQuery) => Promise<{
        data: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            category: {
                id: string;
                name: string;
            } | null;
            producer: {
                id: string;
                name: string;
            } | null;
            description: string | null;
            price: number;
            stock: number;
            imageUrl: string | null;
            tags: {
                id: string;
                name: string;
            }[];
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findAllWithCursor: (filters: ProductQuery) => Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            category: {
                id: string;
                name: string;
            } | null;
            producer: {
                id: string;
                name: string;
            } | null;
            description: string | null;
            price: number;
            stock: number;
            imageUrl: string | null;
            tags: {
                id: string;
                name: string;
            }[];
        }[];
        meta: {
            limit: number;
            nextCursor: string | null;
            hasMore: boolean;
        };
    }>;
    findById: (id: string) => Promise<{
        category: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        producer: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
        } | null;
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        images: {
            url: string;
            id: string;
            sortOrder: number;
        }[];
    } & {
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
    }>;
    create: (input: CreateProductInput & {
        ownerId: string;
    }) => Promise<{
        category: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        producer: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
        } | null;
        owner: {
            id: string;
            email: string;
            name: string;
        } | null;
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    update: (id: string, input: UpdateProductInput) => Promise<{
        category: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        producer: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
        } | null;
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    addTags: (productId: string, tagIds: string[]) => Promise<{
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    removeTags: (productId: string, tagIds: string[]) => Promise<{
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    setTags: (productId: string, tagIds: string[]) => Promise<{
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    remove: (id: string) => Promise<void>;
    restore: (id: string) => Promise<{
        category: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        producer: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
        } | null;
        tags: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    findDeleted: () => Promise<({
        category: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        producer: {
            id: string;
            name: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
        } | null;
    } & {
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
    })[]>;
    setImage: (id: string, imageUrl: string) => Promise<{
        id: string;
        name: string;
        updatedAt: Date;
        imageUrl: string | null;
    }>;
    search: (q: string, page: number, limit: number) => Promise<{
        data: SearchProduct[];
        total: number;
    }>;
};
export {};
//# sourceMappingURL=productService.d.ts.map