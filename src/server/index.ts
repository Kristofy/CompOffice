import { prisma } from "./prisma";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    test: publicProcedure.query(async () => {
        return "Hello, World!";
    }),
    getUnits: publicProcedure.query(async () => {
        // sort
        return prisma.instructor_pack_unit_event.findMany({
            orderBy: {
                total: 'desc',
            },
        });
    }),
});

export type AppRouter = typeof appRouter;