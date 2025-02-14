import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { useMember } from "@/app/providers/member";

export default function ProjectCreator() {
  const {currentMember} = useMember();
  return (
    <section className="w-full">
      <div className="container">
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="px-0">
            <div className="grid grid-cols-1 items-center justify-between gap-4 md:grid-cols-2">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <h3 className="text-xl font-semibold">
                  {currentMember?.name} {currentMember?.surname}
                </h3>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  {currentMember?.mail}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {currentMember?.tel || currentMember?.mobile}
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <Avatar className="size-24">
                  {currentMember?.profileImage ? (
                    <AvatarImage alt="Creator Image" src={`data:image/jpeg;base64,${currentMember.profileImage}`} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      <>{currentMember?.name?.slice(0, 1).toUpperCase()}</>
                      <>{currentMember?.surname?.slice(0, 1).toUpperCase()}</>
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
