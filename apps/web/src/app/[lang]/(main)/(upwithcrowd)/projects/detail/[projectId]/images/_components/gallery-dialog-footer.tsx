import {Button} from "@/components/ui/button";

function GalleryDialogFooter({
  fileId,
  isPending,
  handleFileValidation,
}: {
  isPending: boolean;
  fileId: string;
  handleFileValidation: (fileId: string, isValidated: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        disabled={isPending}
        onClick={() => {
          handleFileValidation(fileId, false);
        }}
        variant="destructive">
        Reddet
      </Button>
      <Button
        disabled={isPending}
        onClick={() => {
          handleFileValidation(fileId, true);
        }}>
        Onayla
      </Button>
    </div>
  );
}

export default GalleryDialogFooter;
