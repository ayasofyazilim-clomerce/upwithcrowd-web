"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function signInForm<State>(prevState: State, formData: FormData) {
    const res = {
        ok: false,
        json: async () => ({})
    };
    try {
        await signIn("credentials", {
            redirect: true,
            redirectTo: "/profile",
            email: formData.get("email"),
            password: formData.get("password"),
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "NEXT_REDIRECT") {
                redirect("/profile");
            }
        }
    }
    return {
        message: "Invalid email or password",
    }

}