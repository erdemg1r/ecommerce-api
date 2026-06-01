import type { CreateProducerInput, UpdateProducerInput } from "../schemas/producerSchemas.js";
export declare const producerService: {
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
        city: string | null;
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
        city: string | null;
    }>;
    create: (input: CreateProducerInput) => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
    }>;
    update: (id: string, input: UpdateProducerInput) => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
    }>;
    remove: (id: string) => Promise<void>;
    findDeleted: () => Promise<{
        id: string;
        name: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
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
        city: string | null;
    }>;
};
//# sourceMappingURL=producerService.d.ts.map