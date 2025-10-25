"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RecruitmentDashboard } from "@/components/recruitment-dashboard"
import { CashflowDashboard } from "@/components/cashflow-dashboard"
import { PnlDashboard } from "@/components/pnl-dashboard"
import { ProspectAutomation } from "@/components/prospect-automation"
import { FreelancerAnalytics } from "@/components/freelancer-analytics"
import { AdminSettings } from "@/components/admin-settings"

export default function Home() {
  const [activeTab, setActiveTab] = useState("recruitment")

  const renderContent = () => {
    switch (activeTab) {
      case "recruitment":
        return <RecruitmentDashboard />
      case "cashflow":
        return <CashflowDashboard />
      case "pnl":
        return <PnlDashboard />
      case "prospects":
        return <ProspectAutomation />
      case "freelancers":
        return <FreelancerAnalytics />
      case "settings":
        return <AdminSettings />
      default:
        return <RecruitmentDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
