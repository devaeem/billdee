"use client";

import { Network, Cog, Shield, Users2, Clock, Globe } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      name: "Full Integration",
      description:
        "All data and operations are managed on the same network, making inter-business transactions quick and simple.",
      icon: Network,
    },
    {
      name: "Ease of Implementation",
      description:
        "An inherently flexible infrastructure allows finetuned customization per each business's needs.",
      icon: Cog,
    },
    {
      name: "Flexible Security Model",
      description:
        "Data protection as well as great performance even at scale is made possible with a unique approach to security.",
      icon: Shield,
    },
    {
      name: "Advanced Segmentation",
      description:
        "A multi-channel system provides additional layers of private and confidential communication.",
      icon: Users2,
    },
    {
      name: "24/7 Support",
      description:
        "Our system requires ongoing support, our engineers are ready to solve any issues or demanded adaptability.",
      icon: Clock,
    },
    {
      name: "Open Source Ecosystem",
      description:
        "More than 100,000 contributing organizations and engineers continuously improve system-wide performance.",
      icon: Globe,
    },
  ];

  return (
    <section
      className="relative bg-gradient-to-b from-slate-50 to-white py-24 overflow-hidden"
      id="features"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-emerald-100 opacity-20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-50 opacity-30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="inline-flex items-center justify-center px-4 py-1.5 text-base font-semibold leading-7 text-emerald-700 bg-emerald-50 rounded-full mb-4">
            BUSINESS DATA ACTIVATION PLATFORM
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            Seamless but Secure
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Enhance efficiency with a Business Information Exchange designed
            around data self-sovereignty and business needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group flex flex-col items-start transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-emerald-200 rounded-lg  opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-100/50">
                    <feature.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-7 text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
