import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {NewBusinessAccountForm} from "./client";

export default function NewBusinessAccountServer() {
  return (
    <Card className="h- mx-auto w-full p-2 sm:p-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold sm:text-2xl">Yeni Kurumsal Hesap</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Başlamak için işletme hesap bilgilerinizi girin.
        </CardDescription>
      </CardHeader>
      <NewBusinessAccountForm />
    </Card>
  );
}
