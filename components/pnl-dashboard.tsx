"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface PnlStatement {
  month: string
  revenue: number
  cogs: number
  grossProfit: number
  operatingExpenses: number
  operatingProfit: number
  taxes: number
  netProfit: number
}

const pnlData: PnlStatement[] = [
  {
    month: "Jan",
    revenue: 450000,
    cogs: 180000,
    grossProfit: 270000,
    operatingExpenses: 120000,
    operatingProfit: 150000,
    taxes: 30000,
    netProfit: 120000,
  },
  {
    month: "Feb",
    revenue: 520000,
    cogs: 208000,
    grossProfit: 312000,
    operatingExpenses: 130000,
    operatingProfit: 182000,
    taxes: 36400,
    netProfit: 145600,
  },
  {
    month: "Mar",
    revenue: 480000,
    cogs: 192000,
    grossProfit: 288000,
    operatingExpenses: 125000,
    operatingProfit: 163000,
    taxes: 32600,
    netProfit: 130400,
  },
  {
    month: "Apr",
    revenue: 610000,
    cogs: 244000,
    grossProfit: 366000,
    operatingExpenses: 140000,
    operatingProfit: 226000,
    taxes: 45200,
    netProfit: 180800,
  },
  {
    month: "May",
    revenue: 675000,
    cogs: 270000,
    grossProfit: 405000,
    operatingExpenses: 150000,
    operatingProfit: 255000,
    taxes: 51000,
    netProfit: 204000,
  },
  {
    month: "Jun",
    revenue: 720000,
    cogs: 288000,
    grossProfit: 432000,
    operatingExpenses: 160000,
    operatingProfit: 272000,
    taxes: 54400,
    netProfit: 217600,
  },
]

const expenseBreakdown = [
  { name: "Incentives", value: 40, amount: 240000, color: "var(--color-chart-1)" },
  { name: "Operations", value: 30, amount: 180000, color: "var(--color-chart-2)" },
  { name: "Marketing", value: 15, amount: 90000, color: "var(--color-chart-3)" },
  { name: "Admin", value: 15, amount: 90000, color: "var(--color-chart-4)" },
]

const revenueBySource = [
  { source: "Direct Placements", revenue: 2400000, percentage: 55 },
  { source: "Contract Services", revenue: 1600000, percentage: 35 },
  { source: "Consulting", revenue: 400000, percentage: 10 },
]

const monthlyMetrics = [
  { month: "Jan", grossMargin: 60, operatingMargin: 33.3, netMargin: 26.7 },
  { month: "Feb", grossMargin: 60, operatingMargin: 35, netMargin: 28 },
  { month: "Mar", grossMargin: 60, operatingMargin: 33.9, netMargin: 27.2 },
  { month: "Apr", grossMargin: 60, operatingMargin: 37, netMargin: 29.6 },
  { month: "May", grossMargin: 60, operatingMargin: 37.8, netMargin: 30.2 },
  { month: "Jun", grossMargin: 60, operatingMargin: 37.8, netMargin: 30.2 },
]

export function PnlDashboard() {
  const totalRevenue = pnlData.reduce((sum, d) => sum + d.revenue, 0)
  const totalCogs = pnlData.reduce((sum, d) => sum + d.cogs, 0)
  const totalGrossProfit = pnlData.reduce((sum, d) => sum + d.grossProfit, 0)
  const totalOperatingExpenses = pnlData.reduce((sum, d) => sum + d.operatingExpenses, 0)
  const totalOperatingProfit = pnlData.reduce((sum, d) => sum + d.operatingProfit, 0)
  const totalTaxes = pnlData.reduce((sum, d) => sum + d.taxes, 0)
  const totalNetProfit = pnlData.reduce((sum, d) => sum + d.netProfit, 0)

  const grossMargin = (totalGrossProfit / totalRevenue) * 100
  const operatingMargin = (totalOperatingProfit / totalRevenue) * 100
  const netMargin = (totalNetProfit / totalRevenue) * 100
  const taxRate = (totalTaxes / totalOperatingProfit) * 100

  const lastMonthProfit = pnlData[pnlData.length - 1].netProfit
  const prevMonthProfit = pnlData[pnlData.length - 2].netProfit
  const profitGrowth = ((lastMonthProfit - prevMonthProfit) / prevMonthProfit) * 100

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">P&L Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive profit and loss analysis with detailed financial metrics and profitability insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">${(totalRevenue / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">6-month total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">${(totalNetProfit / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">{netMargin.toFixed(1)}% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gross Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">${(totalGrossProfit / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">{grossMargin.toFixed(1)}% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Operating Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">${(totalOperatingProfit / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">{operatingMargin.toFixed(1)}% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold flex items-center gap-1 ${profitGrowth >= 0 ? "text-chart-2" : "text-destructive"}`}
            >
              {profitGrowth >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {profitGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs previous month</p>
          </CardContent>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card>
        <CardHeader>
          <CardTitle>P&L Statement Summary</CardTitle>
          <CardDescription>6-month financial overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-foreground font-semibold">Total Revenue</span>
              <span className="text-lg font-bold text-chart-1">${(totalRevenue / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-muted-foreground">Cost of Goods Sold</span>
              <span className="text-foreground">-${(totalCogs / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border bg-muted/30 px-3 py-2 rounded">
              <span className="text-foreground font-semibold">Gross Profit</span>
              <span className="text-lg font-bold text-chart-3">${(totalGrossProfit / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-muted-foreground">Operating Expenses</span>
              <span className="text-foreground">-${(totalOperatingExpenses / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border bg-muted/30 px-3 py-2 rounded">
              <span className="text-foreground font-semibold">Operating Profit</span>
              <span className="text-lg font-bold text-chart-4">${(totalOperatingProfit / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-muted-foreground">Taxes</span>
              <span className="text-foreground">-${(totalTaxes / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center bg-chart-2/10 px-3 py-2 rounded">
              <span className="text-foreground font-bold">Net Profit</span>
              <span className="text-xl font-bold text-chart-2">${(totalNetProfit / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* P&L Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss Trend</CardTitle>
            <CardDescription>Revenue vs Profit over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pnlData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                  formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} />
                <Line type="monotone" dataKey="netProfit" stroke="var(--color-chart-2)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Margin Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Margin Analysis</CardTitle>
            <CardDescription>Profitability margins over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
                <Legend />
                <Line type="monotone" dataKey="grossMargin" stroke="var(--color-chart-1)" strokeWidth={2} />
                <Line type="monotone" dataKey="operatingMargin" stroke="var(--color-chart-3)" strokeWidth={2} />
                <Line type="monotone" dataKey="netMargin" stroke="var(--color-chart-2)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense and Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Distribution of operational costs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                  formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Financial Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-chart-1" />
                <span className="text-muted-foreground">Gross Margin</span>
              </div>
              <span className="font-semibold text-foreground">{grossMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-chart-3" />
                <span className="text-muted-foreground">Operating Margin</span>
              </div>
              <span className="font-semibold text-foreground">{operatingMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-chart-2" />
                <span className="text-muted-foreground">Net Profit Margin</span>
              </div>
              <span className="font-semibold text-foreground">{netMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-chart-4" />
                <span className="text-muted-foreground">Tax Rate</span>
              </div>
              <span className="font-semibold text-foreground">{taxRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-chart-2" />
                <span className="text-muted-foreground">Avg Monthly Profit</span>
              </div>
              <span className="font-semibold text-foreground">${(totalNetProfit / 6 / 1000).toFixed(0)}K</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Source */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Source</CardTitle>
          <CardDescription>Breakdown of revenue streams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueBySource.map((item) => (
              <div key={item.source} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">{item.source}</span>
                  <span className="text-chart-1 font-semibold">${(item.revenue / 1000000).toFixed(2)}M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-1 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{item.percentage}% of total revenue</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
