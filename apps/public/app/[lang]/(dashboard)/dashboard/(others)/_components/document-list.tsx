import {FileText} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

// Simple date formatter function to replace date-fns
function formatDate(date: Date, format: "long" | "short" = "long"): string {
  if (format === "long") {
    // Format like "15 Mayıs 2023"
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  // Format like "15.05.2023"
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Mock data for company documents
const documents = [
  {
    id: "1",
    title: "İmza Sirküleri",
    type: "legal",
    date: new Date("2023-05-15"),
    fileSize: "2.4 MB",
    status: "active",
  },
  {
    id: "2",
    title: "Vergi Levhası",
    type: "tax",
    date: new Date("2023-04-10"),
    fileSize: "1.2 MB",
    status: "active",
  },
  {
    id: "3",
    title: "Ticaret Sicil Gazetesi",
    type: "legal",
    date: new Date("2022-11-22"),
    fileSize: "3.7 MB",
    status: "active",
  },
  {
    id: "4",
    title: "Faaliyet Belgesi",
    type: "operational",
    date: new Date("2023-01-05"),
    fileSize: "1.8 MB",
    status: "expired",
  },
  {
    id: "5",
    title: "SGK Borcu Yoktur Belgesi",
    type: "tax",
    date: new Date("2023-06-20"),
    fileSize: "0.9 MB",
    status: "active",
  },
  {
    id: "6",
    title: "Yetki Belgesi",
    type: "operational",
    date: new Date("2022-09-14"),
    fileSize: "1.5 MB",
    status: "active",
  },
  {
    id: "7",
    title: "Vergi Borcu Yoktur Belgesi",
    type: "tax",
    date: new Date("2023-03-30"),
    fileSize: "1.1 MB",
    status: "expired",
  },
];

const documentTypeLabels = {
  legal: "Hukuki",
  tax: "Vergi",
  operational: "Operasyonel",
};

const statusLabels = {
  active: "Aktif",
  expired: "Süresi Dolmuş",
};

export function DocumentList() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid">
        <TabsList className="mb-6 ">
          <TabsTrigger value="grid">Kart Görünümü</TabsTrigger>
          <TabsTrigger value="list">Liste Görünümü</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <Badge className="ml-2" variant={doc.status === "active" ? "default" : "destructive"}>
                      {statusLabels[doc.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <CardDescription>{documentTypeLabels[doc.type as keyof typeof documentTypeLabels]}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="text-muted-foreground h-5 w-5" />
                    <span className="text-muted-foreground text-sm">{doc.fileSize}</span>
                    <span className="text-muted-foreground ml-auto text-xs">{formatDate(doc.date, "long")}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Belge Adı</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Boyut</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell>{documentTypeLabels[doc.type as keyof typeof documentTypeLabels]}</TableCell>
                    <TableCell>{formatDate(doc.date, "short")}</TableCell>
                    <TableCell>{doc.fileSize}</TableCell>
                    <TableCell>
                      <Badge variant={doc.status === "active" ? "default" : "destructive"}>
                        {statusLabels[doc.status as keyof typeof statusLabels]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
