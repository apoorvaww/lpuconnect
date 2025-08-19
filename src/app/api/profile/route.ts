import { usersTable } from "@/db/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";


export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return new Response(JSON.stringify({ error: "not signed in" }), { status: 401 })
    }

    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkId, userId))

        console.log("user:", user);

    if (!user) {
        return new Response(JSON.stringify({
            error: "User not found"
        }), { status: 404 })
    }

    return new Response(JSON.stringify(user), { status: 200 })
}


export async function PUT(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new Response(JSON.stringify({ error: "Not signed in" }), { status: 401 })
    }

    const body = await req.json();
    const { name, age, role, avatarUrl } = body;

    await db
        .update(usersTable)
        .set({
            name,
            age,
            avatarUrl,
            updatedAt: new Date()
        })
        .where(eq(usersTable.clerkId, userId))

    return new Response(JSON.stringify({ success: true }), { status: 200 })

}
