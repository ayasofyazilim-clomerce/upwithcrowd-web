"use client";

import { useSession } from "@repo/utils/auth";

// Mock user data
// const userData = {
//   name: "John",
//   surname: "Doe",
//   email: "john.doe@example.com",
//   profileImage: "/placeholder.svg",
// };

export default function People() {
  const { session } = useSession();
  const currentUser = session?.user;
  // const [profileImage, setProfileImage] = useState(userData.profileImage);

  // useEffect(() => {
  //   void getMembership().then((result) => {
  //     if (!result || !result.items) return;
  //     const myMember = result.items;
  //     if (myMember.length > 0) {
  //       setProfileImage(
  //         (myMember[0]).profileImage || userData.profileImage,
  //       ); // Use fallback if profileImage doesn't exist
  //     }
  //   });
  // }, [session]);

  return (
    <div className="flex">
      <div className="flex flex-row items-center gap-4">
        {/* <Image
          src={profileImage}
          alt="Profile picture"
          width={50}
          height={50}
          className="rounded-full"
        /> */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{currentUser?.name} </h1>
          <p className="text-muted-foreground text-sm">Project Creator</p>
        </div>
      </div>

      <div></div>
    </div>
  );
}
