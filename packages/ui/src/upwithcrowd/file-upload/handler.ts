"use server";
import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
const BASE_URL = process.env.BASE_URL;
export const handlers = {POST};
async function POST(req: Request) {
  try {
    const formData = await req.formData();
    let files: File[] = [];
    formData.forEach((x) => {
      if (x instanceof File) {
        files.push(x as File);
      }
    });
    const fileProps = JSON.parse(formData.get("fileProps") as string);
    if (!fileProps) return NextResponse.json({status: "fail", error: "No found"});
    if (!files) return NextResponse.json({status: "fail", error: "No files found"});
    revalidatePath("/");
    const formdata = new FormData();
    Object.keys(fileProps).forEach((key) => {
      if (key === "files") return;
      formdata.append(key, fileProps[key]);
    });
    formdata.append("files", formData.get("files") as File);
    const api = await fetch(BASE_URL + "/api/file", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formdata,
    });
    return new Response(JSON.stringify(await api.json()), {
      status: api.status,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({status: "fail", error: e});
  }
}
