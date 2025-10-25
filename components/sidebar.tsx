"use client"

import { BarChart3, DollarSign, TrendingUp, Users, Zap, Settings } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "recruitment", label: "Recruitment", icon: Users },
    { id: "cashflow", label: "Cashflow", icon: DollarSign },
    { id: "pnl", label: "P&L Dashboard", icon: TrendingUp },
    { id: "prospects", label: "Prospects", icon: Zap },
    { id: "freelancers", label: "Freelancers", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sidebar-foreground">ConsultBae</h1>
        <p className="text-sm text-sidebar-foreground/60">Automation Suite</p>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="pt-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50">v1.0.0</p>
      </div>
    </aside>
  )
}
