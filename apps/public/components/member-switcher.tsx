"use client";

import {BadgeCheck, LogOut, PlusCircle, UserIcon} from "lucide-react";
import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useMediaQuery} from "@/components/ui/useMediaQuery";
import {cn} from "@/lib/utils";
import {signOutServer, useSession} from "@repo/utils/auth";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useMember} from "@/app/providers/member";
import type {Member} from "@/app/providers/member";

export default function MemberSwitcher() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const {session} = useSession();
  const {currentMember} = useMember();
  let _currentMember = currentMember; // members?.find((x) => x.type === "Individual") || null;

  if (!_currentMember) {
    if (!currentMember || currentMember.isValidated === false) {
      router.push("/profile/new/personal");
    }
    _currentMember = {
      id: Array.isArray(session?.user?.member_id) ? session.user.member_id[0] : session?.user?.member_id || "",
      name: session?.user?.name || "",
      surname: session?.user?.surname || "",
      identifier: session?.user?.email || "",
      type: "Individual",
      idType: "TCKN",
      mail: session?.user?.email || "",
    };
  }

  const DesktopContent = (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label="Select a member"
          className={cn("h-auto w-[200px] justify-start rounded-full border-none px-2")}
          role="combobox"
          variant="outline">
          <MemberItem member={_currentMember} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Content currentMember={_currentMember} setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );

  const MobileContent = (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label="Select a member"
          className={cn("h-auto w-[200px] justify-start rounded-full border-none px-2")}
          role="combobox"
          variant="outline">
          <MemberItem member={_currentMember} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <Content currentMember={_currentMember} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );

  return isDesktop ? DesktopContent : MobileContent;
}

function Content({
  setOpen,
  currentMember,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentMember: Member;
}) {
  const {members} = useMember();
  const organizations = members.filter((x) => x.type === "Organization" && x.title);
  const individuals = members.filter((x) => x.type === "Individual");
  return (
    <Command>
      <CommandInput placeholder="Search member..." />
      {(individuals.length > 0 || organizations.length > 0) && <CommandSeparator />}
      <CommandList>
        <CommandEmpty>No member found.</CommandEmpty>
        {individuals.length > 0 && (
          <CommandGroup heading="Individuals" key="individuals">
            {individuals.map((ind) => (
              <ListItem currentMember={currentMember} key={ind.id} member={ind} setOpen={setOpen} />
            ))}
          </CommandGroup>
        )}
        {organizations.length > 0 && (
          <CommandGroup heading="Organizations" key="organizations">
            {organizations.map((org) => (
              <ListItem currentMember={currentMember} key={org.id} member={org} setOpen={setOpen} />
            ))}
          </CommandGroup>
        )}
      </CommandList>
      <CommandSeparator />
      <Commands />
    </Command>
  );
}

function ListItem({
  member,
  currentMember,
  setOpen,
}: {
  member: Member;
  currentMember: Member;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {setCurrentMember} = useMember();

  return (
    <CommandItem
      className={cn(
        "hover:bg-primary/20 text-sm",

        member.id === currentMember.id && "bg-primary/10 aria-selected:bg-primary/20",
      )}
      key={member.id}
      onSelect={() => {
        setCurrentMember(member);
        setOpen(false);
      }}
      value={member.id}>
      <MemberItem member={member} />
    </CommandItem>
  );
}

function MemberItem({member}: {member: Partial<Member>}) {
  const {currentMember} = useMember();

  return (
    <React.Suspense fallback="loading">
      <>
        <Avatar className="mr-2 size-10">
          {currentMember?.profileImage && currentMember.id === member.id ? (
            <AvatarImage alt={member.id} src={`data:image/jpeg;base64,${currentMember.profileImage}`} />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              <>{member.name?.slice(0, 1).toUpperCase()}</>
              <>{member.surname?.slice(0, 1).toUpperCase()}</>
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
              <p className="overflow-hidden text-ellipsis text-nowrap">
                {member.type === "Organization" ? member.title : `${member.name} ${member.surname}`}
              </p>
              {member.isValidated ? <BadgeCheck className="text-primary size-4 min-w-4" /> : null}
            </div>
            <span className="text-xs text-gray-500">{member.identifier}</span>
          </div>
        </div>
      </>
    </React.Suspense>
  );
}

function Commands() {
  return (
    <CommandList>
      <CommandList>
        <CommandGroup>
          <CommandItem>
            <Link className="flex items-center gap-2" href="/profile/new/business">
              <PlusCircle className="size-4" />
              Create business account
            </Link>
          </CommandItem>
          <CommandSeparator />
          <CommandItem>
            <Link className="flex items-center gap-2" href="/profile">
              <UserIcon className="size-4" />
              Profile
            </Link>
          </CommandItem>
          <CommandItem
            className="flex items-center gap-2 text-red-500 hover:cursor-pointer aria-selected:text-red-500"
            onSelect={() => void signOutServer()}>
            <LogOut className="size-4" />
            Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandList>
  );
}
