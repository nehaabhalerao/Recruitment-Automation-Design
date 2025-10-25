"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Zap, Plus, Trash2, Target, Linkedin } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface Prospect {
  id: string
  name: string
  company: string
  vertical: "Recruitment" | "AI Data"
  status: "New" | "Contacted" | "Qualified" | "Converted"
  linkedinUrl: string
  email: string
  score: number
  engagementLevel: "Low" | "Medium" | "High"
  lastContact: string
  notes: string
}

const mockProspects: Prospect[] = [
  {
    id: "1",
    name: "Alex Chen",
    company: "TechCorp",
    vertical: "AI Data",
    status: "Qualified",
    linkedinUrl: "linkedin.com/in/alexchen",
    email: "alex@techcorp.com",
    score: 85,
    engagementLevel: "High",
    lastContact: "2024-06-15",
    notes: "Strong interest in AI solutions",
  },
  {
    id: "2",
    name: "Sarah Williams",
    company: "Recruit Plus",
    vertical: "Recruitment",
    status: "Converted",
    linkedinUrl: "linkedin.com/in/sarahw",
    email: "sarah@recruitplus.com",
    score: 95,
    engagementLevel: "High",
    lastContact: "2024-06-10",
    notes: "Signed contract",
  },
  {
    id: "3",
    name: "Mike Johnson",
    company: "DataFlow",
    vertical: "AI Data",
    status: "Contacted",
    linkedinUrl: "linkedin.com/in/mikej",
    email: "mike@dataflow.com",
    score: 65,
    engagementLevel: "Medium",
    lastContact: "2024-06-12",
    notes: "Initial outreach completed",
  },
  {
    id: "4",
    name: "Emily Davis",
    company: "Talent Hub",
    vertical: "Recruitment",
    status: "New",
    linkedinUrl: "linkedin.com/in/emilyd",
    email: "emily@talenthub.com",
    score: 45,
    engagementLevel: "Low",
    lastContact: "2024-06-18",
    notes: "Profile identified",
  },
  {
    id: "5",
    name: "James Wilson",
    company: "AI Solutions",
    vertical: "AI Data",
    status: "Qualified",
    linkedinUrl: "linkedin.com/in/jamesw",
    email: "james@aisolutions.com",
    score: 78,
    engagementLevel: "High",
    lastContact: "2024-06-14",
    notes: "Demo scheduled",
  },
]

const statusColors = {
  New: "bg-blue-500/20 text-blue-600",
  Contacted: "bg-yellow-500/20 text-yellow-600",
  Qualified: "bg-purple-500/20 text-purple-600",
  Converted: "bg-green-500/20 text-green-600",
}

const verticalColors = {
  Recruitment: "bg-chart-1/20 text-chart-1",
  "AI Data": "bg-chart-2/20 text-chart-2",
}

const engagementColors = {
  Low: "bg-destructive/20 text-destructive",
  Medium: "bg-chart-3/20 text-chart-3",
  High: "bg-chart-2/20 text-chart-2",
}

const scoreDistribution = [
  { range: "0-25", count: 0, color: "var(--color-destructive)" },
  { range: "26-50", count: 1, color: "var(--color-chart-3)" },
  { range: "51-75", count: 1, color: "var(--color-chart-4)" },
  { range: "76-100", count: 3, color: "var(--color-chart-2)" },
]

const statusDistribution = [
  { name: "New", value: 1, color: "var(--color-chart-4)" },
  { name: "Contacted", value: 1, color: "var(--color-chart-3)" },
  { name: "Qualified", value: 2, color: "var(--color-chart-1)" },
  { name: "Converted", value: 1, color: "var(--color-chart-2)" },
]

export function ProspectAutomation() {
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects)
  const [newProspect, setNewProspect] = useState({
    name: "",
    company: "",
    email: "",
    vertical: "Recruitment" as const,
  })

  const totalProspects = prospects.length
  const recruitmentCount = prospects.filter((p) => p.vertical === "Recruitment").length
  const aiDataCount = prospects.filter((p) => p.vertical === "AI Data").length
  const convertedCount = prospects.filter((p) => p.status === "Converted").length
  const qualifiedCount = prospects.filter((p) => p.status === "Qualified").length
  const avgScore = prospects.length > 0 ? prospects.reduce((sum, p) => sum + p.score, 0) / prospects.length : 0
  const conversionRate = ((convertedCount / totalProspects) * 100).toFixed(1)

  const addProspect = () => {
    if (newProspect.name && newProspect.company && newProspect.email) {
      const prospect: Prospect = {
        id: Date.now().toString(),
        name: newProspect.name,
        company: newProspect.company,
        email: newProspect.email,
        vertical: newProspect.vertical,
        status: "New",
        linkedinUrl: `linkedin.com/in/${newProspect.name.toLowerCase().replace(" ", "")}`,
        score: 50,
        engagementLevel: "Low",
        lastContact: new Date().toISOString().split("T")[0],
        notes: "Newly added prospect",
      }
      setProspects([...prospects, prospect])
      setNewProspect({ name: "", company: "", email: "", vertical: "Recruitment" })
    }
  }

  const deleteProspect = (id: string) => {
    setProspects(prospects.filter((p) => p.id !== id))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2"
    if (score >= 60) return "text-chart-1"
    if (score >= 40) return "text-chart-3"
    return "text-destructive"
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sales Prospect Automation</h1>
        <p className="text-muted-foreground">
          LinkedIn classification, prospect scoring, and automated CRM integration
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalProspects}</div>
            <p className="text-xs text-muted-foreground mt-1">From LinkedIn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recruitment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{recruitmentCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Vertical classification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{aiDataCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Vertical classification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{avgScore.toFixed(0)}/100</div>
            <p className="text-xs text-muted-foreground mt-1">Prospect quality</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{convertedCount} converted</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Prospect Score Distribution</CardTitle>
            <CardDescription>Quality assessment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="range" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Bar dataKey="count" fill="var(--color-chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Prospect Status Distribution</CardTitle>
            <CardDescription>Pipeline breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Prospects Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Prospects</CardTitle>
            <CardDescription>Automated LinkedIn classification and prospect scoring</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Zap className="w-4 h-4" />
              Sync LinkedIn
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Prospect
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Prospect Form */}
          <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Name"
                value={newProspect.name}
                onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
              />
              <Input
                placeholder="Company"
                value={newProspect.company}
                onChange={(e) => setNewProspect({ ...newProspect, company: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Email"
                type="email"
                value={newProspect.email}
                onChange={(e) => setNewProspect({ ...newProspect, email: e.target.value })}
              />
              <select
                value={newProspect.vertical}
                onChange={(e) =>
                  setNewProspect({ ...newProspect, vertical: e.target.value as "Recruitment" | "AI Data" })
                }
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="Recruitment">Recruitment</option>
                <option value="AI Data">AI Data</option>
              </select>
            </div>
            <Button onClick={addProspect} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Prospect
            </Button>
          </div>

          {/* Prospects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Vertical</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Engagement</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((prospect) => (
                  <tr key={prospect.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{prospect.name}</td>
                    <td className="py-3 px-4 text-foreground">{prospect.company}</td>
                    <td className="text-center py-3 px-4">
                      <Badge className={verticalColors[prospect.vertical]}>{prospect.vertical}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`font-bold ${getScoreColor(prospect.score)}`}>{prospect.score}</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge className={statusColors[prospect.status]}>{prospect.status}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge className={engagementColors[prospect.engagementLevel]}>{prospect.engagementLevel}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{prospect.email}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <a
                          href={`https://${prospect.linkedinUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-chart-2" />
                        </a>
                        <button
                          onClick={() => deleteProspect(prospect.id)}
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

      {/* Prospect Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Prospect Insights
          </CardTitle>
          <CardDescription>Key metrics and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Qualified Prospects</p>
              <p className="text-2xl font-bold text-chart-1">{qualifiedCount}</p>
              <p className="text-xs text-muted-foreground mt-2">Ready for demo</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">High Engagement</p>
              <p className="text-2xl font-bold text-chart-2">
                {prospects.filter((p) => p.engagementLevel === "High").length}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Active prospects</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Next Steps</p>
              <p className="text-2xl font-bold text-chart-3">
                {prospects.filter((p) => p.status === "Contacted").length}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Follow-up needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
