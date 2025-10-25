"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Trash2 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"

interface Freelancer {
  id: number
  name: string
  projects: number
  revenue: number
  rating: number
  utilization: number
  status: "Active" | "Inactive" | "On Leave"
  skills: string[]
  avgProjectValue: number
  completionRate: number
  lastProject: string
}

const mockFreelancers: Freelancer[] = [
  {
    id: 1,
    name: "John Dev",
    projects: 24,
    revenue: 85000,
    rating: 4.8,
    utilization: 92,
    status: "Active",
    skills: ["React", "Node.js", "TypeScript"],
    avgProjectValue: 3542,
    completionRate: 98,
    lastProject: "2024-06-18",
  },
  {
    id: 2,
    name: "Sarah Designer",
    projects: 18,
    revenue: 72000,
    rating: 4.9,
    utilization: 88,
    status: "Active",
    skills: ["UI/UX", "Figma", "Branding"],
    avgProjectValue: 4000,
    completionRate: 100,
    lastProject: "2024-06-17",
  },
  {
    id: 3,
    name: "Mike Engineer",
    projects: 31,
    revenue: 95000,
    rating: 4.7,
    utilization: 95,
    status: "Active",
    skills: ["Python", "AWS", "DevOps"],
    avgProjectValue: 3065,
    completionRate: 97,
    lastProject: "2024-06-19",
  },
  {
    id: 4,
    name: "Emily Analyst",
    projects: 15,
    revenue: 58000,
    rating: 4.6,
    utilization: 80,
    status: "On Leave",
    skills: ["Data Analysis", "SQL", "Tableau"],
    avgProjectValue: 3867,
    completionRate: 95,
    lastProject: "2024-06-10",
  },
  {
    id: 5,
    name: "David Manager",
    projects: 22,
    revenue: 78000,
    rating: 4.8,
    utilization: 85,
    status: "Active",
    skills: ["Project Management", "Agile", "Leadership"],
    avgProjectValue: 3545,
    completionRate: 99,
    lastProject: "2024-06-16",
  },
]

const performanceData = [
  { month: "Jan", activeFreelancers: 12, totalProjects: 45, revenue: 180000, avgRating: 4.6 },
  { month: "Feb", activeFreelancers: 14, totalProjects: 52, revenue: 208000, avgRating: 4.65 },
  { month: "Mar", activeFreelancers: 13, totalProjects: 48, revenue: 192000, avgRating: 4.68 },
  { month: "Apr", activeFreelancers: 16, totalProjects: 61, revenue: 244000, avgRating: 4.7 },
  { month: "May", activeFreelancers: 18, totalProjects: 67, revenue: 268000, avgRating: 4.75 },
  { month: "Jun", activeFreelancers: 20, totalProjects: 72, revenue: 288000, avgRating: 4.78 },
]

const efficiencyData = mockFreelancers.map((f) => ({
  name: f.name,
  revenue: f.revenue,
  utilization: f.utilization,
  rating: f.rating * 20,
}))

export function FreelancerAnalytics() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>(mockFreelancers)

  const totalFreelancers = freelancers.length
  const activeFreelancers = freelancers.filter((f) => f.status === "Active").length
  const totalRevenue = freelancers.reduce((sum, f) => sum + f.revenue, 0)
  const totalProjects = freelancers.reduce((sum, f) => sum + f.projects, 0)
  const avgRating = (freelancers.reduce((sum, f) => sum + f.rating, 0) / totalFreelancers).toFixed(2)
  const avgUtilization = (freelancers.reduce((sum, f) => sum + f.utilization, 0) / totalFreelancers).toFixed(0)
  const avgCompletionRate = (freelancers.reduce((sum, f) => sum + f.completionRate, 0) / totalFreelancers).toFixed(1)

  const topPerformer = freelancers.reduce((prev, current) => (prev.revenue > current.revenue ? prev : current))

  const deleteFreelancer = (id: number) => {
    setFreelancers(freelancers.filter((f) => f.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-chart-2/20 text-chart-2"
      case "Inactive":
        return "bg-destructive/20 text-destructive"
      case "On Leave":
        return "bg-chart-3/20 text-chart-3"
      default:
        return ""
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Freelancer Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive performance tracking, earnings analytics, and resource management
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Freelancers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalFreelancers}</div>
            <p className="text-xs text-muted-foreground mt-1">{activeFreelancers} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">${(totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3 flex items-center gap-1">
              <Star className="w-5 h-5 fill-chart-3" />
              {avgRating}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground mt-1">Resource usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>Freelancer activity, projects, and revenue over time</CardDescription>
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
              <Line type="monotone" dataKey="activeFreelancers" stroke="var(--color-chart-1)" strokeWidth={2} />
              <Line type="monotone" dataKey="totalProjects" stroke="var(--color-chart-2)" strokeWidth={2} />
              <Line type="monotone" dataKey="avgRating" stroke="var(--color-chart-3)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Efficiency Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Utilization</CardTitle>
            <CardDescription>Freelancer efficiency analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="utilization" stroke="var(--color-muted-foreground)" name="Utilization %" />
                <YAxis dataKey="revenue" stroke="var(--color-muted-foreground)" name="Revenue" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                  cursor={{ strokeDasharray: "3 3" }}
                />
                <Scatter name="Freelancers" data={efficiencyData} fill="var(--color-chart-1)" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Performer
            </CardTitle>
            <CardDescription>Highest revenue generator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Name</p>
              <p className="text-xl font-bold text-foreground">{topPerformer.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                <p className="text-lg font-bold text-chart-1">${(topPerformer.revenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Projects</p>
                <p className="text-lg font-bold text-chart-2">{topPerformer.projects}</p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Rating</p>
                <p className="text-lg font-bold text-chart-3 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-chart-3" />
                  {topPerformer.rating}
                </p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Utilization</p>
                <p className="text-lg font-bold text-chart-4">{topPerformer.utilization}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Freelancer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Freelancer Details</CardTitle>
          <CardDescription>Individual performance metrics and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Projects</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Avg Value</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Rating</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Completion</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {freelancers.map((freelancer) => (
                  <tr key={freelancer.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{freelancer.name}</td>
                    <td className="text-right py-3 px-4 text-foreground">{freelancer.projects}</td>
                    <td className="text-right py-3 px-4 text-chart-1 font-semibold">
                      ${(freelancer.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="text-right py-3 px-4 text-muted-foreground">
                      ${(freelancer.avgProjectValue / 1000).toFixed(1)}K
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-chart-2 font-semibold">
                        <Star className="w-4 h-4 fill-chart-2" />
                        {freelancer.rating}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-chart-3 rounded-full"
                            style={{ width: `${freelancer.completionRate}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{freelancer.completionRate}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge className={getStatusColor(freelancer.status)}>{freelancer.status}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <button
                        onClick={() => deleteFreelancer(freelancer.id)}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Skills Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Distribution</CardTitle>
          <CardDescription>Top skills in the freelancer network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {freelancers.map((freelancer) => (
              <div key={freelancer.id} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{freelancer.name}</p>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-muted/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
