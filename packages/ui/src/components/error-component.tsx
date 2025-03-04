"use client";

import {useState, useEffect} from "react";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {LogOut, RefreshCw} from "lucide-react";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";

export default function ErrorComponent({
  message,
  languageData,
  signOutServer,
}: {
  message?: string;
  languageData: {SomethingWentWrong: string};
  signOutServer?: () => Promise<{
    error: string;
  }>;
}) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (signOutServer) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            void signOutServer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [signOutServer]);

  return (
    <section className="from-muted to-muted/50 relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br via-white px-4 py-12">
      {/* Animated background shapes */}
      <motion.div
        className="bg-primary/20 absolute left-0 top-0 h-64 w-64 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="bg-muted/50 absolute bottom-0 right-0 h-96 w-96 rounded-full opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -150, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 240"
            className="text-primary mx-auto h-56 w-56 overflow-visible">
            {/* Background circle */}
            <circle cx="120" cy="150" r="95" className="fill-primary/10" />

            {/* Computer icon */}
            <rect x="70" y="110" width="100" height="70" rx="6" fill="currentColor" opacity="0.8" />
            <rect x="80" y="120" width="80" height="45" rx="2" fill="white" />
            <rect x="90" y="180" width="60" height="8" rx="2" fill="currentColor" opacity="0.8" />

            {/* Clock moved to computer screen */}
            <circle cx="120" cy="142.5" r="18" fill="currentColor" opacity="0.9" />
            <circle cx="120" cy="142.5" r="15" fill="white" />
            <line x1="120" y1="142.5" x2="120" y2="132.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="120" y1="142.5" x2="128" y2="142.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Animated dotted circle */}
            <circle cx="120" cy="150" r="85" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 120 150"
                to="360 120 150"
                dur="60s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </motion.div>

        <motion.h1
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.2}}
          className="mb-4 text-4xl font-bold text-black md:text-5xl">
          {signOutServer ? "Your session has expired" : languageData.SomethingWentWrong}
        </motion.h1>

        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.4}}>
          {!signOutServer ? (
            <p className="text-muted-foreground mb-8 text-xl">{message || "Unknown error"}</p>
          ) : (
            <div className="mb-8 space-y-4">
              <p className="text-muted-foreground text-xl">
                For your security, you have been logged out due to inactivity.
              </p>

              {countdown > 0 && (
                <div className="flex items-center justify-center space-x-3">
                  <motion.div
                    className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-white"
                    animate={{scale: [1, 1.1, 1]}}
                    transition={{duration: 1, repeat: Number.POSITIVE_INFINITY}}>
                    <span className="text-2xl font-bold">{countdown}</span>
                  </motion.div>
                  <span className="text-muted-foreground text-lg">Redirecting to login page...</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.6}}
          className="flex justify-center space-x-4">
          <Button
            className="flex items-center gap-2 px-8 py-3 text-lg"
            onClick={() => {
              if (signOutServer) {
                void signOutServer();
                return;
              }
              router.back();
            }}
            variant={signOutServer ? "default" : "outline"}
            size="lg">
            {signOutServer ? (
              <>
                <LogOut className="h-6 w-6" />
                <span>Login now</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-6 w-6" />
                <span>Try again</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
