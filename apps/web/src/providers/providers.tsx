"use server";

import {getGrantedPoliciesApi} from "@repo/utils/api";
import {SessionProvider} from "@repo/utils/auth";
import {auth} from "@repo/utils/auth/next-auth";
import {GrantedPoliciesProvider} from "@repo/utils/policies";
import type {Policy} from "@repo/utils/policies";
import {NovuProvider} from "@repo/ui/providers/novu";

interface ProvidersProps {
  children: JSX.Element;
}
export default async function Providers({children}: ProvidersProps) {
  const session = await auth();
  const grantedPolicies = (await getGrantedPoliciesApi()) as Record<Policy, boolean>;

  return (
    <SessionProvider session={session}>
      <GrantedPoliciesProvider grantedPolicies={grantedPolicies}>
        <NovuProvider
          appId={process.env.NOVU_APP_IDENTIFIER || ""}
          appUrl={process.env.NOVU_APP_URL || ""}
          subscriberId={session?.user?.sub || "67b8674f58411ad400a054e9"}>
          {children}
        </NovuProvider>
      </GrantedPoliciesProvider>
    </SessionProvider>
  );
}
