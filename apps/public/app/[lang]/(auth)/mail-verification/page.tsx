import {CheckCircle, XCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {postAccountLinkUserVerifyLinkTokenApi} from "@repo/actions/core/AccountService/post-actions";

export default async function MailVerification({
  searchParams,
}: {
  searchParams: {userId: string; confirmationToken: string};
}) {
  const {userId, confirmationToken} = searchParams;

  const res = await postAccountLinkUserVerifyLinkTokenApi({
    requestBody: {
      userId,
      token: confirmationToken,
      tenantId: "",
    },
  });
  if (res.data === true) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-full rounded-lg ">
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-center">
            <CheckCircle className="text-primary h-16 w-16" />
            <h2 className="text-primary text-xl font-semibold">E-postanız başarıyla doğrulandı</h2>
            <p className="text-gray-600">
              Hesabınız artık aktif. Giriş yaparak platformu kullanmaya başlayabilirsiniz.
            </p>
          </div>
          <Link className="mt-8 flex justify-center" href="/login">
            <Button>Giriş Yap</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full rounded-lg ">
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-center">
          <XCircle className="h-16 w-16 text-red-700" />
          <h2 className="text-xl font-semibold text-red-700">E-postanız doğrulanmadı</h2>
          <p className="text-gray-600">E-posta adresinizi kontrol edin ve doğrulama bağlantısına tekrar tıklayın.</p>
        </div>
      </div>
    </div>
  );
}
