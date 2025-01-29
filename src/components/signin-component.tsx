import { auth } from "@/auth";
import UserAvatar from "@/components/user-avatar";
import { SignOut } from "./signout-button";
import SignIn from "./signin-button";

export default async function SigninComponent() {
    const session = await auth()

    return (
        <>
            {session ?
                <div>
                    <UserAvatar />
                    <SignOut />
                </div>
                :
                <SignIn />
            }
        </>
    )
}