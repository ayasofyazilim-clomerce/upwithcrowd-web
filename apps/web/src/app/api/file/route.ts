import {auth} from "@repo/utils/auth/next-auth";

export async function POST(_request: Request) {
  const userData = await auth();
  const token = userData?.user && "access_token" in userData.user ? userData.user.access_token : ""; //userData?.user;
  const formData = await _request.formData();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const request = await fetch(`${process.env.BASE_URL}/api/file`, {
    headers,
    body: formData,
    method: "POST",
  });
  return request;
}
