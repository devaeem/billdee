"use client";

import Btn from "@/components/custom-ui/btn";
import { ArrowRight04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-white pt-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-8">
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-500">
                ANYTIME, ANYWHERE BILLING
              </p>
              <h1 className="mb-6 text-6xl tracking-wide uppercase font-extrabold sm:text-5xl lg:text-6xl">
                BillDee
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Provide users with multiple ways to access the billing
                management system and reduce gaps in tracking bill statuses
                between billing cycles. At the same time, allow store owners or
                customers to easily reach out for further inquiries in case any
                questions remain unanswered
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-gray-600">
                  Support for multiple communication channels
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-gray-600">
                  Follow-up via the patient engagement dashboard
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <HugeiconsIcon
                    icon={ArrowRight04Icon}
                    size={12}
                    strokeWidth={2}
                    className="text-emerald-500 animate-pulse"
                  />
                </div>
                <p className="text-emerald-600 text-sm font-bold tracking-wide">
                  No geographical constraints; reach the provider who will best
                  solve your problem
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-8">
              <Btn
                size="lg"
                onClick={() => {
                  router.push("/login");
                }}
                className="rounded-full font-extrabold tracking-wide hover:scale-110 transition-all duration-500 ease-out uppercase bg-gradient-to-br from-emerald-500 to-emerald-600  px-8 text-white hover:bg-emerald-600"
                endIcon={
                  <HugeiconsIcon
                    icon={ArrowRight04Icon}
                    size={20}
                    strokeWidth={2}
                    className="text-white  animate-pulse hover:text-white "
                  />
                }
              >
                Get Started
              </Btn>
            </div>
          </div>

          {/* Image */}
          <div className="relative mt-16 lg:ml-32  flex justify-center items-center">
            <div className="relative aspect-[4/5] ">
              <img
                src="/images/billdee.png"
                alt="TeleMedicine App Interface"
                className="  object-contain border-2 border-gray-200 rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
