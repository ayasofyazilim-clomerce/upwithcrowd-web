import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Plus} from "lucide-react";
import Link from "next/link";
import {DocumentList} from "../_components/document-list";

export default function DocumentsPage() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6">
        <div>
          <CardTitle className="text-base sm:text-lg">Şirket Belgeleri</CardTitle>
          <CardDescription className="text-sm">Belgelerinizi inceleyin.</CardDescription>
        </div>
        <Link className="w-full sm:w-auto" href="documents/document-upload">
          <Button className="w-full sm:w-auto" size="sm">
            Yeni Belge Ekle
            <Plus className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <DocumentList />
      </CardContent>
    </Card>
  );
}
