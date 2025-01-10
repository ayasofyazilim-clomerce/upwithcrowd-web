"use client";

import { GetApiPublicProjectProjectDetailByIdResponse } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { useState } from "react";
import ProjectCreator from "../_components/project-creator";
import SupportCard from "../_components/support-card";
import ProjectSummary from "../_components/project-summary";

export default function ProjectDetails({
  project,
}: {
  project: GetApiPublicProjectProjectDetailByIdResponse;
}) {
  const [currentImageIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const donationOptions = [10, 25, 50, 100, 250, 500];
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedDonation(Number(value));
    }
  };

  const fundedPercentage =
    ((project.fundableAmount ?? 0) / (project.fundNominalAmount ?? 1)) * 100;
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <ProjectSummary
              project={project}
              currentImageIndex={currentImageIndex}
              fundedPercentage={fundedPercentage}
            />
            {/* PROJECT DETAILS SECTION BEGIN */}
            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              What is the {project.projectName}?{" "}
            </h2>
            <p className="mb-8 text-lg">{project.projectDefinition}</p>
          </div>
          <div className="lg:w-1/3">
            <ProjectCreator />
            <SupportCard
              donationOptions={donationOptions}
              selectedDonation={selectedDonation}
              setSelectedDonation={setSelectedDonation}
              customAmount={customAmount}
              handleCustomAmountChange={handleCustomAmountChange}
            />
          </div>
        </div>
      </main>
    </>
  );
}
