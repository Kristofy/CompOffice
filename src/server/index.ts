import { prisma } from "./prisma";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    test: publicProcedure.query(async () => {
        return "Hello, World!";
    }),
    getUnits: publicProcedure.query(async () => {
        return prisma.unit.findMany({take: 10})
    }),
});

export type AppRouter = typeof appRouter;