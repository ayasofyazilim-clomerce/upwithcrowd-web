"use client";

import { BadgeCheck, PlusCircle } from "lucide-react";
import * as React from "react";

import { Member, useMember } from "@/app/providers/member";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function MemberSwitcher() {
  const [open, setOpen] = React.useState(false);
  const { members, currentMember } = useMember();
  if (!currentMember) return null;
  if (!members) return null;
  const organizations = members.filter(
    (x) => x.type === "Organization" && x.name,
  );
  const individuals = members.filter(
    (x) => x.type === "Individual" || (x.type === "NONE" && x.name),
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a member"
          className={cn(
            "h-auto w-[200px] justify-start rounded-full border-none px-2",
          )}
        >
          <MemberItem member={currentMember} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search member..." />
          <CommandList>
            <CommandEmpty>No member found.</CommandEmpty>
            <CommandGroup key="individuals" heading="Individuals">
              {individuals.map((ind) => (
                <ListItem
                  key={ind.id}
                  member={ind}
                  currentMember={currentMember}
                  setOpen={setOpen}
                />
              ))}
            </CommandGroup>
            <CommandGroup key="organizations" heading="Organizations">
              {organizations.map((org) => (
                <ListItem
                  key={org.id}
                  member={org}
                  currentMember={currentMember}
                  setOpen={setOpen}
                />
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <PlusCircle className="mr-2 size-4" />
                Create business account
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
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
  const { setCurrentMember } = useMember();
  return (
    <CommandItem
      key={member.id}
      value={member.id}
      onSelect={() => {
        console.log(member);
        setCurrentMember(member);
        setOpen(false);
      }}
      className={cn(
        "hover:bg-primary/20 text-sm",

        member.id === currentMember.id &&
          "bg-primary/10 aria-selected:bg-primary/20",
      )}
    >
      <MemberItem member={member} />
    </CommandItem>
  );
}

function MemberItem({ member }: { member: Member }) {
  return (
    <>
      <Avatar className="mr-2 size-10">
        <AvatarImage
          // src={`https://avatar.vercel.sh/${member.value}.png`}
          alt={member.id}
          className="grayscale"
        />
        <AvatarFallback className="bg-primary/10 text-primary text-sm">
          <span>{member.name?.slice(0, 1)}</span>
          <span>{member.surname?.slice(0, 1)}</span>
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2 overflow-hidden text-left">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
            <span className="overflow-hidden text-ellipsis text-nowrap">
              {member.type === "Organization"
                ? member.title
                : `${member.name} ${member.surname}`}
            </span>
            {member.isValidated && (
              <BadgeCheck className="text-primary size-4 min-w-4" />
            )}
          </div>
          <span className="text-xs text-gray-500">{member.identifier}</span>
        </div>
      </div>
    </>
  );
}
