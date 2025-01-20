"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { postApiMember } from "@/actions/upwithcrowd/member/post-action";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  UpwithCrowd_Members_IdType,
  UpwithCrowd_Members_SaveMemberDto,
  UpwithCrowd_Members_Type,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export default function NewBusinessAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: "Organization" as UpwithCrowd_Members_Type, // Set default value to "Organization"
    idType: "NONE" as UpwithCrowd_Members_IdType, // Set default value a
    identifier: "",
    name: "",
    surname: "",
    title: "",
    tel: "",
    mail: "",
    annualIncome: 0,
    mobile: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTitle, setShowTitle] = useState(false);
  const [showNameSurname, setShowNameSurname] = useState(true); // Yeni state
  const { toast } = useToast();

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      // Set default values for name and surname when idType is VKN
      if (name === "idType" && value === "VKN") {
        updatedFormData.name = "";
        updatedFormData.surname = "";
      }
      return updatedFormData;
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    // Show or hide title field based on idType
    if (name === "idType") {
      setShowTitle(value === "VKN");
      setShowNameSurname(value !== "VKN");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (
      formData.idType === "TCKN" &&
      !/^[0-9]{11}$/.test(formData.identifier)
    ) {
      newErrors.identifier = "Identifier must be 11 digits for TCKN";
    } else if (
      formData.idType === "VKN" &&
      !/^[0-9]{10}$/.test(formData.identifier)
    ) {
      newErrors.identifier = "Identifier must be 10 digits for VKN";
    } else if (!/^[0-9]{8,11}$/.test(formData.identifier)) {
      newErrors.identifier = "Identifier must be 8-11 digits";
    }
    if (formData.idType === "TCKN") {
      if (!formData.name) {
        newErrors.name = "Name is required";
      } else if (!/^[a-zA-Z*\s,.'\-p{L}]{1,600}$/.test(formData.name)) {
        newErrors.name = "Invalid name format";
      }
      if (!formData.surname) {
        newErrors.surname = "Surname is required";
      } else if (!/^[a-zA-Z*\s,.'\-p{L}]{1,600}$/.test(formData.surname)) {
        newErrors.surname = "Invalid surname format";
      }
    }
    if (showTitle && !formData.title) {
      newErrors.title = "Title is required for VKN";
    } else if (
      formData.title &&
      !/^[a-zA-Z0-9*\s&,.'\-p{L}]{1,600}$/.test(formData.title)
    ) {
      newErrors.title = "Invalid title format";
    }
    if (formData.tel && !/^([+]\d{1,2})(\d{10})$/.test(formData.tel)) {
      newErrors.tel = "Invalid telephone format";
    }
    if (
      !/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(formData.mail)
    ) {
      newErrors.mail = "Invalid email address";
    }
    if (
      formData.annualIncome &&
      !/^([1-9][0-9]{0,19})$/.test(formData.annualIncome.toString())
    ) {
      newErrors.annualIncome = "Invalid annual income";
    }
    if (formData.mobile && !/^([+]\d{1,2})(\d{10})$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number format";
    }
    setErrors(newErrors);
    console.log("Validation errors:", newErrors); // Add this line to log validation errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }
    setIsSubmitting(true);
    console.log("formData", formData);
    try {
      const requestBody: UpwithCrowd_Members_SaveMemberDto = {
        type: formData.type,
        idType: formData.idType,
        identifier: formData.identifier,
        title: formData.title,
        tel: formData.tel,
        mail: formData.mail,
        annualIncome: formData.annualIncome,
        mobile: formData.mobile,
      };
      if (formData.idType !== "VKN") {
        requestBody.name = formData.name;
        requestBody.surname = formData.surname;
      }
      const memberResult = await postApiMember({ requestBody });
      if (memberResult.type === "success") {
        toast({
          title: "Success",
          description: "Your business account has been created successfully.",
          variant: "default",
        });
      } else {
        console.log(memberResult.message);
        toast({
          title: "Error",
          description: memberResult.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating business account:", error);
      toast({
        title: "Error",
        description:
          "There was an error creating your business account. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          New Business Account
        </CardTitle>
        <CardDescription>
          Enter your business account details below to get started.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Select
                name="idType"
                value={formData.idType}
                onValueChange={(value) =>
                  handleChange({ target: { name: "idType", value } })
                }
              >
                <SelectTrigger id="idType">
                  <SelectValue placeholder="Select ID type" />
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
              <Label htmlFor="identifier">Identifier</Label>
              <Input
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter identifier"
              />
              {errors.identifier && (
                <p className="text-sm text-red-500">{errors.identifier}</p>
              )}
            </div>
          </div>
          {showNameSurname && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Enter surname"
                />
                {errors.surname && (
                  <p className="text-sm text-red-500">{errors.surname}</p>
                )}
              </div>
            </div>
          )}
          {showTitle && (
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tel">Telephone</Label>
              <Input
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="+12345678901"
              />
              {errors.tel && (
                <p className="text-sm text-red-500">{errors.tel}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+12345678901"
              />
              {errors.mobile && (
                <p className="text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mail">Email</Label>
            <Input
              id="mail"
              name="mail"
              type="email"
              value={formData.mail}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.mail && (
              <p className="text-sm text-red-500">{errors.mail}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualIncome">Annual Income</Label>
            <Input
              id="annualIncome"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              placeholder="Enter annual income"
            />
            {errors.annualIncome && (
              <p className="text-sm text-red-500">{errors.annualIncome}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Create Business Account"}
          </Button>
        </CardFooter>
      </form>
      <Toaster />
    </Card>
  );
}
