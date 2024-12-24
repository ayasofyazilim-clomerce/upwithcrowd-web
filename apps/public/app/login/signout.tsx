"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SingOut() {
    return (
        <Button
            onClick={() => {
                signOut({
                    redirect: false,
                }
                );
            }}
            className="text-white text-sm hover:underline"
        >Sign Out</Button>
    )
}
