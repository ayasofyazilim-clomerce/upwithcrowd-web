"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

const ProfileLinkInput = () => {
  const baseLink = "https://kickstarter.com/profile/";
  const maxUrlLength = 20;
  const [url, setUrl] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxUrlLength) {
      setUrl(value);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="relative mt-2">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {baseLink}
        </span>
        <Input
          type="text"
          id="profileLink"
          value={url}
          onChange={handleInputChange}
          className="w-full rounded-md border border-gray-300 py-2 pl-[calc(100%+8rem)] pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          style={{ paddingLeft: `${baseLink.length - 3}ch` }}
        />
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <CircleAlert /> Include at least one letter—you can also use numbers and
        dashes.
      </p>
      <div className="mt-3 flex justify-end">
        <Button
          type="button"
          disabled={url.length < 3}
          className={`${
            url.length < 3
              ? "bg-muted text-muted-foreground"
              : "text-muted bg-black hover:bg-black/90"
          }`}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ProfileLinkInput;
