import { LogIn } from "lucide-react";
import Features from "@/components/Features/Features";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen p-15">
      <div className="flex flex-col items-center gap-7 text-center">
        <h1 className="text-4xl font-bold">
          <span className="bg-linear-40 from-red-600 via-pink-500 to-pink-400 bg-clip-text text-transparent">
            WorkVault
          </span>{" "}
          - Manage Employees. Issue Credentials. Build Trust.
        </h1>

        <div className="flex flex-col justify-center gap-3 lg:w-[70%]">
          <p className="text-xl">
            RecruitIt is a modern workforce management and credential
            verification platform designed to help organizations efficiently
            manage their employees, teams, and regional operations. From
            onboarding new employees and organizing workforce structures to
            assigning HR responsibilities and tracking employee growth,
            RecruitIt provides a centralized solution for managing the entire
            employee lifecycle.
          </p>
          <p className="text-xl">
            Beyond workforce management, RecruitIt enables organizations to
            issue trusted digital credentials such as experience letters,
            internship certificates, and employment verification documents. Each
            credential can be securely managed, versioned, and verified through
            unique verification links and QR codes, helping organizations
            establish trust while giving employees a reliable way to showcase
            their professional achievements.
          </p>
        </div>

        <Link href={"/login"}>
          <Button>
            <div className="flex items-center gap-3 px-5">
              <span>Conitnue to WorkVault</span>
              <LogIn />
            </div>
          </Button>
        </Link>
      </div>

      <hr className="m-auto my-10 w-[50%] text-white/20" />

      <Features />
    </div>
  );
}
