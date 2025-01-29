import { auth } from "@/auth"

export default async function UserAvatar() {
    const session = await auth()
    console.log(session);

    if (!session?.user?.image) return null

    return (
        <>
            <img className="size-12 rounded-full" src={session.user.image} alt="User Avatar" />
        </>
    )
}