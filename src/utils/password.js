import bcrypt from "bcrypt";
const SALT_ROUNDS = 12;
export const hashPassword = async (plain) => {
    return bcrypt.hash(plain, SALT_ROUNDS);
};
export const comparePassword = async (plain, hash) => {
    return bcrypt.compare(plain, hash);
};
export const DUMMY_HASH = bcrypt.hashSync("dummyPasswordForTimingAttackProtection", SALT_ROUNDS);
//# sourceMappingURL=password.js.map