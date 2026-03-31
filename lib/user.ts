import { auth, clerkClient } from "@clerk/nextjs/server";
import { createServiceClient } from "./supabase/service";
import type { User } from "@/types";

export async function getOrCreateUser(): Promise<User | null> {
  const { userId } = auth();
  if (!userId) return null;

  const supabase = createServiceClient();

  // Check if user exists
  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", userId)
    .single();

  if (existing) return existing as User;

  // Lazy create from Clerk
  const clerk = clerkClient();
  const clerkUser = await clerk.users.getUser(userId);

  const { data: created, error } = await supabase
    .from("users")
    .upsert(
      {
        clerk_id: userId,
        email:
          clerkUser.emailAddresses[0]?.emailAddress ?? "",
        full_name: [clerkUser.firstName, clerkUser.lastName]
          .filter(Boolean)
          .join(" ") || null,
        avatar_url: clerkUser.imageUrl ?? null,
      },
      { onConflict: "clerk_id" }
    )
    .select()
    .single();

  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return created as User;
}
