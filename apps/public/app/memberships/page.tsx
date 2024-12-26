"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IdType = "NONE" | "TCKN" | "SCL" | "YKN" | "VKN" | "MKN";

interface Member {
  id: string;
  idType: IdType;
  memberId: string;
  name?: string;
  surname?: string;
  title?: string;
  tel?: string;
  mail: string;
  annualIncome?: number;
  mobile?: string;
  isInvestor?: boolean;
  isEntrepreneur?: boolean;
  qualifiedCheck?: boolean;
  fullNameCheck?: boolean;
  eDevletStatus?: boolean;
}

// Mock data for demonstration
const initialMembers: Member[] = [
  {
    id: "1",
    idType: "TCKN",
    memberId: "12345678901",
    name: "John",
    surname: "Doe",
    mail: "john.doe@example.com",
    isInvestor: true,
    qualifiedCheck: true,
  },
  {
    id: "2",
    idType: "VKN",
    memberId: "9876543210",
    name: "Jane",
    surname: "Smith",
    mail: "jane.smith@example.com",
    isEntrepreneur: true,
    eDevletStatus: true,
  },
];

export default function MembershipsPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  const handleCreateMember = () => {
    setCurrentMember(null);
    setIsDialogOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setCurrentMember(member);
    setIsDialogOpen(true);
  };

  const handleSaveMember = (member: Member) => {
    if (currentMember) {
      setMembers(members.map((m) => (m.id === member.id ? member : m)));
    } else {
      setMembers([...members, { ...member, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Memberships</h1>
        <Button onClick={handleCreateMember}>Create New Member</Button>
      </div>
      <div className="bg-card overflow-hidden rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4">ID Type</TableHead>
              <TableHead className="px-6 py-4">Member ID</TableHead>
              <TableHead className="px-6 py-4">Name</TableHead>
              <TableHead className="px-6 py-4">Email</TableHead>
              <TableHead className="px-6 py-4">Investor</TableHead>
              <TableHead className="px-6 py-4">Entrepreneur</TableHead>
              <TableHead className="px-6 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="px-6 py-4">{member.idType}</TableCell>
                <TableCell className="px-6 py-4">{member.memberId}</TableCell>
                <TableCell className="px-6 py-4">{`${member.name || ""} ${member.surname || ""}`}</TableCell>
                <TableCell className="px-6 py-4">{member.mail}</TableCell>
                <TableCell className="px-6 py-4">
                  {member.isInvestor ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {member.isEntrepreneur ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEditMember(member)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentMember ? "Edit Member" : "Create New Member"}
            </DialogTitle>
          </DialogHeader>
          <MemberForm member={currentMember} onSave={handleSaveMember} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MemberFormProps {
  member: Member | null;
  onSave: (member: Member) => void;
}

function MemberForm({ member, onSave }: MemberFormProps) {
  const [formData, setFormData] = useState<Member>(
    member || {
      id: "",
      idType: "NONE",
      memberId: "",
      mail: "",
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="idType">ID Type</Label>
        <Select
          name="idType"
          value={formData.idType}
          onValueChange={handleSelectChange("idType")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ID Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NONE">NONE</SelectItem>
            <SelectItem value="TCKN">TCKN</SelectItem>
            <SelectItem value="SCL">SCL</SelectItem>
            <SelectItem value="YKN">YKN</SelectItem>
            <SelectItem value="VKN">VKN</SelectItem>
            <SelectItem value="MKN">MKN</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="memberId">Member ID</Label>
        <Input
          id="memberId"
          name="memberId"
          value={formData.memberId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="surname">Surname</Label>
        <Input
          id="surname"
          name="surname"
          value={formData.surname || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mail">Email</Label>
        <Input
          id="mail"
          name="mail"
          type="email"
          value={formData.mail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isInvestor"
          name="isInvestor"
          checked={formData.isInvestor || false}
          onChange={handleChange}
          className="text-primary focus:ring-primary rounded border-gray-300"
        />
        <Label htmlFor="isInvestor">Is Investor</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isEntrepreneur"
          name="isEntrepreneur"
          checked={formData.isEntrepreneur || false}
          onChange={handleChange}
          className="text-primary focus:ring-primary rounded border-gray-300"
        />
        <Label htmlFor="isEntrepreneur">Is Entrepreneur</Label>
      </div>
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
}
