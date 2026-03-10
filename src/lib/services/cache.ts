import { prisma } from "@/lib/prisma"

const DEFAULT_TTL_HOURS = 24

export async function getCachedProfile<T>(platform: string, username: string): Promise<T | null> {
  try {
    const cached = await prisma.socialProfileCache.findUnique({
      where: { platform_username: { platform, username: username.toLowerCase() } },
    })

    if (!cached) return null
    if (new Date() > cached.expiresAt) {
      await prisma.socialProfileCache.delete({
        where: { platform_username: { platform, username: username.toLowerCase() } },
      })
      return null
    }

    return JSON.parse(cached.data) as T
  } catch {
    return null
  }
}

export async function setCachedProfile(
  platform: string,
  username: string,
  data: unknown,
  ttlHours = DEFAULT_TTL_HOURS,
): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000)
    await prisma.socialProfileCache.upsert({
      where: { platform_username: { platform, username: username.toLowerCase() } },
      update: { data: JSON.stringify(data), expiresAt, updatedAt: new Date() },
      create: {
        platform,
        username: username.toLowerCase(),
        data: JSON.stringify(data),
        expiresAt,
      },
    })
  } catch (error) {
    console.error("Cache write error:", error)
  }
}
