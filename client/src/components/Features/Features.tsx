import {
  Building2,
  ShieldCheck,
  Signature,
  Timeline,
  UserRoundKey,
  Users,
} from "lucide-react";
import React from "react";

const features = [
  {
    title: "Organization Management",
    description:
      "Create and manage organizations with region-based workforce structures and role-based administration.",
    icon: <Building2 className="size-7" />,
  },
  {
    title: "Employee Management",
    description:
      "Onboard employees, assign roles, manage teams, handle transfers, and track employment status.",
    icon: <Users className="size-7" />,
  },
  {
    title: "Role-Based Access Control",
    description:
      "Provide tailored permissions for organization owners, HRs, team leads, and employees.",
    icon: <UserRoundKey className="size-7" />,
  },
  {
    title: "Career Timeline Tracking",
    description:
      "Maintain a chronological record of promotions, transfers, role changes, and other employee milestones.",
    icon: <Timeline className="size-7" />,
  },
  {
    title: "Digital Credential Issuance",
    description:
      "Generate, upload, version, revoke, and manage organization-issued certificates and employment documents.",
    icon: <Signature className="size-7" />,
  },
  {
    title: "Credential Verification",
    description:
      "Enable instant public verification of credentials through unique IDs and QR-code-based validation.",
    icon: <ShieldCheck className="size-7" />,
  },
];

export default function Features() {
  return (
    <div className="m-auto flex flex-col justify-center gap-5 md:w-[90%]">
      <h1 className="text-center text-2xl font-bold">Key Features</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, index) => {
          return (
            <div
              key={index}
              className="flex cursor-default items-center gap-5 rounded-lg border-white bg-neutral-800 p-4 transition-all duration-200 hover:scale-101"
            >
              <span>{feature.icon}</span>
              <div className="flex flex-col justify-center text-sm">
                <span className="text-lg font-bold">{feature.title}</span>
                <span className="text-xs">{feature.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
