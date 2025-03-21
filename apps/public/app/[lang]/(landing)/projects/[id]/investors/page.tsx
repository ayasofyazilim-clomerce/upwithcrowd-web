"use server";

import {permanentRedirect} from "next/navigation";

export default function Page({params}: {params: {id: string; lang: string}}) {
  const {lang, id} = params;

  return permanentRedirect(`/${lang}/projects/${id}`);
}
