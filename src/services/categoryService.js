import { ConflictError, NotFoundError } from "../utils/errors.js";
import { prisma } from "../config/database.js";
const toSlug = (name) => name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const categoryService = {
    findAll: async () => {
        return prisma.category.findMany({
            where: { deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
            orderBy: { name: "asc" },
        });
    },
    findById: async (id) => {
        const category = await prisma.category.findUnique({
            where: { id, deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
        if (!category)
            throw new NotFoundError("Kategori");
        return category;
    },
    create: async (input) => {
        return prisma.category.create({
            data: {
                name: input.name,
                slug: toSlug(input.name),
            },
        });
    },
    update: async (id, input) => {
        const data = {};
        if (input.name) {
            data.name = input.name;
            data.slug = toSlug(input.name);
        }
        return prisma.category.update({
            where: { id },
            data,
        });
    },
    remove: async (id) => {
        const category = await prisma.category.findUnique({
            where: { id, deletedAt: null },
        });
        if (!category)
            throw new NotFoundError("Kategori");
        await prisma.category.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    },
    findDeleted: async () => {
        return prisma.category.findMany({
            where: { deletedAt: { not: null } },
            orderBy: { deletedAt: "desc" },
        });
    },
    restore: async (id) => {
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new NotFoundError("Kategori");
        if (!category.deletedAt)
            throw new ConflictError("Bu kategori zaten aktif");
        return prisma.category.update({
            where: { id },
            data: { deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
    },
};
//# sourceMappingURL=categoryService.js.map