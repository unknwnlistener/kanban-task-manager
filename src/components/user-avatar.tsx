import { auth } from "@/auth"
import Image from "next/image"

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user?.image) return null

    return (
        <>
            <Image className="size-12 rounded-full" src={session.user.image} alt="User Avatar" />
        </>
    )
}