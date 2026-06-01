import { ConflictError, NotFoundError } from "../utils/errors.js";
import { prisma } from "../config/database.js";
export const tagService = {
    findAll: async () => {
        return prisma.tag.findMany({
            where: { deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
            orderBy: { name: "asc" },
        });
    },
    findById: async (id) => {
        const tag = await prisma.tag.findUnique({
            where: { id, deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
        if (!tag)
            throw new NotFoundError("Etiket");
        return tag;
    },
    create: async (input) => {
        return prisma.tag.create({
            data: { name: input.name },
        });
    },
    update: async (id, input) => {
        const data = {};
        if (input.name !== undefined)
            data.name = input.name;
        return prisma.tag.update({
            where: { id },
            data,
        });
    },
    remove: async (id) => {
        const tag = await prisma.tag.findUnique({ where: { id, deletedAt: null } });
        if (!tag)
            throw new NotFoundError("Etiket");
        await prisma.tag.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    },
    findDeleted: async () => {
        return prisma.tag.findMany({
            where: { deletedAt: { not: null } },
            orderBy: { deletedAt: "desc" },
        });
    },
    restore: async (id) => {
        const tag = await prisma.tag.findUnique({ where: { id } });
        if (!tag)
            throw new NotFoundError("Etiket");
        if (!tag.deletedAt)
            throw new ConflictError("Bu etiket zaten aktif");
        return prisma.tag.update({
            where: { id },
            data: { deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
    },
};
//# sourceMappingURL=tagService.js.map