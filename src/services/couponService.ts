import { prisma } from "../config/database.js";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors.js";
import type { CreateCouponInput, UpdateCouponInput } from "../schemas/couponSchemas.js";

export const couponService = {
  findAll: async () => {
    return prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById: async (id: string) => {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });
    if (!coupon) throw new NotFoundError("Kupon");
    return coupon;
  },

  findByCode: async (code: string) => {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });
    if (!coupon) throw new NotFoundError("Kupon");
    return coupon;
  },

  create: async (input: CreateCouponInput) => {
    const codeUpper = input.code.toUpperCase();
    const existing = await prisma.coupon.findUnique({
      where: { code: codeUpper },
    });

    if (existing) {
      throw new ConflictError("Bu kupon kodu zaten mevcut");
    }

    return prisma.coupon.create({
      data: {
        code: codeUpper,
        discountType: input.discountType,
        discountValue: input.discountValue,
        minOrderAmount: input.minOrderAmount,
        maxUsage: input.maxUsage ?? null,
        expiresAt: input.expiresAt ?? null,
        isActive: input.isActive ?? true,
      },
    });
  },

  update: async (id: string, input: UpdateCouponInput) => {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });
    if (!coupon) throw new NotFoundError("Kupon");

    const codeUpper = input.code ? input.code.toUpperCase() : undefined;
    if (codeUpper && codeUpper !== coupon.code) {
      const existing = await prisma.coupon.findUnique({
        where: { code: codeUpper },
      });
      if (existing) {
        throw new ConflictError("Bu kupon kodu zaten mevcut");
      }
    }

    return prisma.coupon.update({
      where: { id },
      data: {
        ...(codeUpper !== undefined && { code: codeUpper }),
        ...(input.discountType !== undefined && { discountType: input.discountType }),
        ...(input.discountValue !== undefined && { discountValue: input.discountValue }),
        ...(input.minOrderAmount !== undefined && { minOrderAmount: input.minOrderAmount }),
        ...(input.maxUsage !== undefined && { maxUsage: input.maxUsage ?? null }),
        ...(input.expiresAt !== undefined && { expiresAt: input.expiresAt ?? null }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });
  },

  remove: async (id: string) => {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });
    if (!coupon) throw new NotFoundError("Kupon");

    return prisma.coupon.delete({
      where: { id },
    });
  },

  validateCoupon: async (code: string, orderAmount: number) => {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      throw new ValidationError("Geçersiz Kupon", {
        code: ["Böyle bir kupon kodu bulunamadı"],
      });
    }

    if (!coupon.isActive) {
      throw new ValidationError("Geçersiz Kupon", {
        code: ["Bu kupon aktif değil"],
      });
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new ValidationError("Geçersiz Kupon", {
        code: ["Bu kuponun süresi dolmuş"],
      });
    }

    if (orderAmount < coupon.minOrderAmount) {
      throw new ValidationError("Geçersiz Kupon", {
        code: [`Bu kupon için minimum sepet tutarı ${coupon.minOrderAmount / 100} TL olmalıdır`],
      });
    }

    if (coupon.maxUsage !== null) {
      const currentUsage = await prisma.cart.count({
        where: { couponId: coupon.id },
      });
      if (currentUsage >= coupon.maxUsage) {
        throw new ValidationError("Geçersiz Kupon", {
          code: ["Bu kuponun maksimum kullanım sınırına ulaşılmış"],
        });
      }
    }

    let discount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      discount = Math.floor((orderAmount * coupon.discountValue) / 100);
    } else if (coupon.discountType === "FIXED") {
      discount = Math.min(orderAmount, coupon.discountValue);
    }

    return {
      valid: true,
      coupon,
      discount,
    };
  },
};
