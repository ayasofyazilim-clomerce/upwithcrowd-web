import type { Session } from "next-auth";
import { upwithcrowdServiceClient } from "@ayasofyazilim/saas/upwithcrowdService";
import { auth } from "@/auth";

const HEADERS = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
};
export async function getUpwithcrowd(session?: Session | null) {
    const userData = session || (await auth());
    const token = userData?.expires || "" //userData?.user;
    return new upwithcrowdServiceClient({
        TOKEN: token,
        BASE: process.env.BASE_URL,
        HEADERS,
    });
}