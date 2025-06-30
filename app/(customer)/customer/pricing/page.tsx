"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const standardPlans = {
    basic: {
      name: "Basic",
      monthly: 29,
      yearly: 290,
      features: [
        "Up to 10 users",
        "5GB storage",
        "Basic support",
        "Core features",
        "Email support",
        "Basic reporting",
        "---", // Placeholder for equal height
      ],
    },
    pro: {
      name: "Pro",
      monthly: 79,
      yearly: 790,
      features: [
        "Up to 50 users",
        "20GB storage",
        "Priority support",
        "Advanced features",
        "Custom integrations",
        "Analytics dashboard",
        "API access",
      ],
    },
    enterprise: {
      name: "Enterprise",
      monthly: 199,
      yearly: 1990,
      features: [
        "Unlimited users",
        "Unlimited storage",
        "24/7 support",
        "All features",
        "Custom development",
        "Dedicated account manager",
        "SLA guarantee",
      ],
    },
  };

  const teamPlans = {
    teams: {
      name: "Teams",
      price: "40",
      subtitle: "Everything in Pro, plus",
      features: [
        "Enforce Privacy Mode org-wide",
        "Admin Dashboard with usage stats",
        "Centralized team billing",
        "SAML/OIDC SSO",
        "Access to PR indexing",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      subtitle: "Everything in Teams, plus",
      features: [
        "More usage included",
        "SCIM seat management",
        "Access control features",
        "Priority support and account management",
      ],
    },
  };

  return (
    <div className="container mx-auto py-12 px-4 relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your business needs. All plans include our
          core features.
        </p>
      </div>

      <Tabs defaultValue="standard" className="w-full mb-8">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-[400px] grid-cols-2 p-1">
            <TabsTrigger value="standard">Standard Plans</TabsTrigger>
            <TabsTrigger value="team">Team Plans</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standard">
          <div className="flex justify-center mb-8">
            <Tabs
              defaultValue="monthly"
              className="w-full max-w-xs"
              onValueChange={(value) => setBillingCycle(value)}
            >
              <TabsList className="grid w-full grid-cols-2 p-1 bg-orange-50 hover:bg-orange-100/50 transition-colors">
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md transition-all"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md transition-all"
                >
                  Yearly
                  <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white to-orange-50/30 flex flex-col">
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-2xl font-bold text-center text-orange-900">
                  {standardPlans.basic.name}
                </CardTitle>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold text-orange-600">
                    $
                    {billingCycle === "monthly"
                      ? standardPlans.basic.monthly
                      : standardPlans.basic.yearly}
                  </span>
                  <span className="text-gray-600">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <ul className="space-y-4 mb-8">
                  {standardPlans.basic.features.map((feature) =>
                    feature !== "---" ? (
                      <li key={feature} className="flex items-center group">
                        <Check className="h-5 w-5 text-orange-500 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-orange-700 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ) : null
                  )}
                </ul>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-200 hover:shadow-orange-300">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-orange-500 border-2 bg-gradient-to-b from-white to-orange-50/30 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
                  Most Popular
                </span>
              </div>
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-2xl font-bold text-center text-orange-900">
                  {standardPlans.pro.name}
                </CardTitle>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold text-orange-600">
                    $
                    {billingCycle === "monthly"
                      ? standardPlans.pro.monthly
                      : standardPlans.pro.yearly}
                  </span>
                  <span className="text-gray-600">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <ul className="space-y-4 mb-8">
                  {standardPlans.pro.features.map((feature) => (
                    <li key={feature} className="flex items-center group">
                      <Check className="h-5 w-5 text-orange-500 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-orange-700 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-200 hover:shadow-orange-300">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white to-orange-50/30 flex flex-col">
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-2xl font-bold text-center text-orange-900">
                  {standardPlans.enterprise.name}
                </CardTitle>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold text-orange-600">
                    $
                    {billingCycle === "monthly"
                      ? standardPlans.enterprise.monthly
                      : standardPlans.enterprise.yearly}
                  </span>
                  <span className="text-gray-600">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <ul className="space-y-4 mb-8">
                  {standardPlans.enterprise.features.map((feature) => (
                    <li key={feature} className="flex items-center group">
                      <Check className="h-5 w-5 text-orange-500 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-orange-700 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-200 hover:shadow-orange-300">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="bg-black rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Teams Plan */}
            <Card className="relative bg-[#111111] border-gray-800 hover:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white">
                  {teamPlans.teams.name}
                </CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-6xl font-bold text-white">
                    ${teamPlans.teams.price}
                  </span>
                  <span className="ml-2 text-gray-400">/user/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">{teamPlans.teams.subtitle}</p>
                <ul className="space-y-4 mb-8">
                  {teamPlans.teams.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="h-5 w-5 text-gray-400 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white hover:bg-gray-100 text-black transition-all duration-300">
                  Get Team
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative bg-[#111111] border-gray-800 hover:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white">
                  {teamPlans.enterprise.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-6xl font-bold text-white">
                    {teamPlans.enterprise.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  {teamPlans.enterprise.subtitle}
                </p>
                <ul className="space-y-4 mb-8">
                  {teamPlans.enterprise.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="h-5 w-5 text-gray-400 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white hover:bg-gray-100 text-black transition-all duration-300">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pricing;
