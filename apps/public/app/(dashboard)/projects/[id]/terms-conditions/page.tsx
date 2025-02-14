import ClientTerms from "./client";

const mockTerms = [
  {
    id: "termsAccepted",
    title: "Genel Şartlar ve Koşullar",
    content:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`.repeat(
        10,
      ),
  },
  {
    id: "privacyAccepted",
    title: "Gizlilik Politikası",
    content: `Gizlilik Politikası metni buraya gelecek...`.repeat(20),
  },
  {
    id: "cookieAccepted",
    title: "Çerez Politikası",
    content: `Çerez Politikası metni buraya gelecek...`.repeat(20),
  },
];

export default function TermsAndConditions() {
  // Gerçek bir uygulamada, şartlar ve koşulları bir API'den veya veritabanından çekerdiniz
  // const terms = await getTermsAndConditions(params.id);

  return (
    <div>
      <ClientTerms terms={mockTerms} />
    </div>
  );
}
