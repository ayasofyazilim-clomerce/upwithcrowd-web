"use client";

import {SessionProvider as Default, useSession as DefaultUseSession} from "next-auth/react";
export const SessionProvider = Default;
export function useSession() {
  const {data: session, update: sessionUpdate} = DefaultUseSession();
  return {session, sessionUpdate};
}

// import type {Session} from "next-auth";
// import {createContext, useContext, useMemo} from "react";

// interface ProvidersProps {
//   children: React.ReactNode;
//   session: Session | null;
// }
// interface SessionContextProps {
//   session: Session | null;

// }
// export const SessionContext = createContext<SessionContextProps>({
//   session: null,
//   updateSession: () => {},
// });

// export const useSession = () => {
//   return useContext(SessionContext);
// };

// export function SessionProvider({children, session}: ProvidersProps) {
//   const memoizedSessionKey = useMemo(() => {
//     return new Date().valueOf();
//   }, [session]);
//   return (
//     <SessionContext.Provider key={memoizedSessionKey} value={{session}}>
//       {children}
//     </SessionContext.Provider>
//   );
// }
