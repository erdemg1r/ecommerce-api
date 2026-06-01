import { prisma } from "../config/database.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";
export const producerService = {
    findAll: async () => {
        return prisma.producer.findMany({
            where: { deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
            orderBy: { name: "asc" },
        });
    },
    findById: async (id) => {
        const producer = await prisma.producer.findUnique({
            where: { id, deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
        if (!producer)
            throw new NotFoundError("Üretici");
        return producer;
    },
    create: async (input) => {
        return prisma.producer.create({
            data: {
                name: input.name,
                ...(input.city !== undefined && { city: input.city }),
            },
        });
    },
    update: async (id, input) => {
        const data = {};
        if (input.name !== undefined)
            data.name = input.name;
        if (input.city !== undefined)
            data.city = input.city;
        return prisma.producer.update({
            where: { id },
            data,
        });
    },
    remove: async (id) => {
        const producer = await prisma.producer.findUnique({
            where: { id, deletedAt: null },
        });
        if (!producer)
            throw new NotFoundError("Üretici");
        await prisma.producer.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    },
    findDeleted: async () => {
        return prisma.producer.findMany({
            where: { deletedAt: { not: null } },
            orderBy: { deletedAt: "desc" },
        });
    },
    restore: async (id) => {
        const producer = await prisma.producer.findUnique({ where: { id } });
        if (!producer)
            throw new NotFoundError("Üretici");
        if (!producer.deletedAt)
            throw new ConflictError("Bu üretici zaten aktif");
        return prisma.producer.update({
            where: { id },
            data: { deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
    },
};
//# sourceMappingURL=producerService.js.map