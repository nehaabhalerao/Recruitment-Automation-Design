"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, TrendingUp, Award } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"

interface Recruiter {
  id: string
  name: string
  placements: number
  revenue: number
  target: number
  tier: "bronze" | "silver" | "gold" | "platinum"
  performanceScore: number
}

interface IncentiveStructure {
  tier: string
  placementRange: string
  baseRate: number
  bonusThreshold: number
  bonusRate: number
}

const mockRecruiters: Recruiter[] = [
  { id: "1", name: "John Smith", placements: 12, revenue: 180000, target: 10, tier: "gold", performanceScore: 92 },
  { id: "2", name: "Sarah Johnson", placements: 8, revenue: 120000, target: 10, tier: "silver", performanceScore: 78 },
  { id: "3", name: "Mike Davis", placements: 15, revenue: 225000, target: 10, tier: "platinum", performanceScore: 98 },
  { id: "4", name: "Emily Brown", placements: 10, revenue: 150000, target: 10, tier: "gold", performanceScore: 85 },
]

const performanceData = [
  { month: "Jan", revenue: 450000, placements: 30, incentives: 45000 },
  { month: "Feb", revenue: 520000, placements: 35, incentives: 52000 },
  { month: "Mar", revenue: 480000, placements: 32, incentives: 48000 },
  { month: "Apr", revenue: 610000, placements: 41, incentives: 61000 },
  { month: "May", revenue: 675000, placements: 45, incentives: 67500 },
  { month: "Jun", revenue: 720000, placements: 48, incentives: 72000 },
]

const incentiveStructure: IncentiveStructure[] = [
  { tier: "Bronze", placementRange: "0-5", baseRate: 8, bonusThreshold: 5, bonusRate: 10 },
  { tier: "Silver", placementRange: "6-10", baseRate: 9, bonusThreshold: 10, bonusRate: 12 },
  { tier: "Gold", placementRange: "11-15", baseRate: 10, bonusThreshold: 15, bonusRate: 14 },
  { tier: "Platinum", placementRange: "16+", baseRate: 12, bonusThreshold: 20, bonusRate: 16 },
]

const performanceByRecruiter = [
  { name: "John Smith", placements: 12, revenue: 180000, efficiency: 15000 },
  { name: "Sarah Johnson", placements: 8, revenue: 120000, efficiency: 15000 },
  { name: "Mike Davis", placements: 15, revenue: 225000, efficiency: 15000 },
  { name: "Emily Brown", placements: 10, revenue: 150000, efficiency: 15000 },
]

const calculateIncentive = (recruiter: Recruiter): number => {
  const structure = incentiveStructure.find((s) => {
    if (s.tier === "Bronze") return recruiter.placements <= 5
    if (s.tier === "Silver") return recruiter.placements >= 6 && recruiter.placements <= 10
    if (s.tier === "Gold") return recruiter.placements >= 11 && recruiter.placements <= 15
    if (s.tier === "Platinum") return recruiter.placements >= 16
    return false
  })

  if (!structure) return 0

  const baseIncentive = (recruiter.revenue * structure.baseRate) / 100
  let bonus = 0

  if (recruiter.placements >= structure.bonusThreshold) {
    const excessPlacements = recruiter.placements - structure.bonusThreshold
    bonus = ((recruiter.revenue * structure.bonusRate) / 100) * (excessPlacements / recruiter.placements)
  }

  return baseIncentive + bonus
}

export function RecruitmentDashboard() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>(mockRecruiters)
  const [newRecruiter, setNewRecruiter] = useState("")
  const [selectedRecruiter, setSelectedRecruiter] = useState<string | null>(null)

  const totalRevenue = recruiters.reduce((sum, r) => sum + r.revenue, 0)
  const totalPlacements = recruiters.reduce((sum, r) => sum + r.placements, 0)
  const totalIncentives = recruiters.reduce((sum, r) => sum + calculateIncentive(r), 0)
  const avgPerformanceScore =
    recruiters.length > 0 ? recruiters.reduce((sum, r) => sum + r.performanceScore, 0) / recruiters.length : 0
  const targetAchievement = recruiters.length > 0 ? (totalPlacements / (recruiters.length * 10)) * 100 : 0

  const addRecruiter = () => {
    if (newRecruiter.trim()) {
      const recruiter: Recruiter = {
        id: Date.now().toString(),
        name: newRecruiter,
        placements: 0,
        revenue: 0,
        target: 10,
        tier: "bronze",
        performanceScore: 0,
      }
      setRecruiters([...recruiters, recruiter])
      setNewRecruiter("")
    }
  }

  const deleteRecruiter = (id: string) => {
    setRecruiters(recruiters.filter((r) => r.id !== id))
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Recruitment Automation</h1>
        <p className="text-muted-foreground">
          Manage recruiters, track incentives, and monitor performance with advanced analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${(totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">From {totalPlacements} placements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Incentives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">${(totalIncentives / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalIncentives / totalRevenue) * 100).toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalPlacements}</div>
            <p className="text-xs text-muted-foreground mt-1">Active recruiters: {recruiters.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{avgPerformanceScore.toFixed(0)}/100</div>
            <p className="text-xs text-muted-foreground mt-1">Team score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Target Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{targetAchievement.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Of team target</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>Revenue, placements, and incentives over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} />
              <Line type="monotone" dataKey="placements" stroke="var(--color-chart-2)" strokeWidth={2} />
              <Line type="monotone" dataKey="incentives" stroke="var(--color-chart-3)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recruiter Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Recruiter Performance Comparison</CardTitle>
          <CardDescription>Revenue vs Placements by recruiter</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceByRecruiter}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Bar dataKey="placements" fill="var(--color-chart-2)" />
              <Bar dataKey="efficiency" fill="var(--color-chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Incentive Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Incentive Structure
          </CardTitle>
          <CardDescription>Tier-based incentive rates and bonus thresholds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Tier</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Placement Range</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Base Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Bonus Threshold</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Bonus Rate</th>
                </tr>
              </thead>
              <tbody>
                {incentiveStructure.map((item) => (
                  <tr key={item.tier} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground">{item.tier}</td>
                    <td className="py-3 px-4 text-foreground">{item.placementRange}</td>
                    <td className="text-right py-3 px-4 text-chart-1">{item.baseRate}%</td>
                    <td className="text-right py-3 px-4 text-foreground">{item.bonusThreshold}</td>
                    <td className="text-right py-3 px-4 text-chart-2">{item.bonusRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recruiters Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recruiters</CardTitle>
          <CardDescription>Manage recruiter profiles, incentives, and performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add new recruiter..."
              value={newRecruiter}
              onChange={(e) => setNewRecruiter(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addRecruiter()}
            />
            <Button onClick={addRecruiter} className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Placements</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Incentive</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Tier</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Performance</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((recruiter) => (
                  <tr key={recruiter.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{recruiter.name}</td>
                    <td className="text-right py-3 px-4 text-foreground">{recruiter.placements}</td>
                    <td className="text-right py-3 px-4 text-foreground">${(recruiter.revenue / 1000).toFixed(0)}K</td>
                    <td className="text-right py-3 px-4 text-chart-1 font-semibold">
                      ${(calculateIncentive(recruiter) / 1000).toFixed(0)}K
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          recruiter.tier === "platinum"
                            ? "bg-yellow-500/20 text-yellow-700"
                            : recruiter.tier === "gold"
                              ? "bg-orange-500/20 text-orange-700"
                              : recruiter.tier === "silver"
                                ? "bg-gray-400/20 text-gray-700"
                                : "bg-amber-600/20 text-amber-700"
                        }`}
                      >
                        {recruiter.tier.charAt(0).toUpperCase() + recruiter.tier.slice(1)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-chart-2" />
                        <span className="text-foreground font-medium">{recruiter.performanceScore}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => deleteRecruiter(recruiter.id)}
                          className="p-1 hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
