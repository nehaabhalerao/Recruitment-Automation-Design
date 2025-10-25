"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, X, Check, Clock, AlertCircle } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Invoice {
  id: string
  invoiceNumber: string
  client: string
  amount: number
  date: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  description: string
  items: InvoiceItem[]
}

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
}

const cashflowData = [
  { month: "Jan", inflow: 450000, outflow: 180000, net: 270000 },
  { month: "Feb", inflow: 520000, outflow: 208000, net: 312000 },
  { month: "Mar", inflow: 480000, outflow: 192000, net: 288000 },
  { month: "Apr", inflow: 610000, outflow: 244000, net: 366000 },
  { month: "May", inflow: 675000, outflow: 270000, net: 405000 },
  { month: "Jun", inflow: 720000, outflow: 288000, net: 432000 },
]

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    client: "Tech Corp",
    amount: 45000,
    date: "2024-06-01",
    dueDate: "2024-06-15",
    status: "paid",
    description: "Recruitment services - Q2",
    items: [
      { description: "Senior Developer Placement", quantity: 1, rate: 25000 },
      { description: "Project Manager Placement", quantity: 1, rate: 20000 },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    client: "Finance Inc",
    amount: 52000,
    date: "2024-06-05",
    dueDate: "2024-06-19",
    status: "paid",
    description: "Recruitment services - Q2",
    items: [{ description: "Financial Analyst Placement", quantity: 2, rate: 26000 }],
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    client: "Global Solutions",
    amount: 38000,
    date: "2024-06-10",
    dueDate: "2024-06-24",
    status: "pending",
    description: "Recruitment services - Q2",
    items: [{ description: "Business Analyst Placement", quantity: 1, rate: 38000 }],
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    client: "Digital Ventures",
    amount: 61000,
    date: "2024-05-20",
    dueDate: "2024-06-03",
    status: "overdue",
    description: "Recruitment services - Q2",
    items: [
      { description: "Full Stack Developer Placement", quantity: 1, rate: 35000 },
      { description: "DevOps Engineer Placement", quantity: 1, rate: 26000 },
    ],
  },
]

const invoiceStatusData = [
  { name: "Paid", value: 97000, color: "var(--color-chart-2)" },
  { name: "Pending", value: 38000, color: "var(--color-chart-3)" },
  { name: "Overdue", value: 61000, color: "var(--color-destructive)" },
]

export function CashflowDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    amount: "",
    dueDate: "",
    description: "",
  })

  const totalInflow = cashflowData.reduce((sum, d) => sum + d.inflow, 0)
  const totalOutflow = cashflowData.reduce((sum, d) => sum + d.outflow, 0)
  const netCashflow = totalInflow - totalOutflow

  const totalInvoiced = invoices.reduce((sum, i) => sum + i.amount, 0)
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0)
  const totalPending = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0)
  const totalOverdue = invoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0)

  const collectionRate = totalInvoiced > 0 ? (totalPaid / totalInvoiced) * 100 : 0
  const daysOutstanding = invoices.length > 0 ? Math.round(invoices.length * 5) : 0

  const addInvoice = () => {
    if (newInvoice.client && newInvoice.amount) {
      const invoice: Invoice = {
        id: Date.now().toString(),
        invoiceNumber: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
        client: newInvoice.client,
        amount: Number.parseFloat(newInvoice.amount),
        date: new Date().toISOString().split("T")[0],
        dueDate: newInvoice.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
        description: newInvoice.description,
        items: [{ description: newInvoice.description, quantity: 1, rate: Number.parseFloat(newInvoice.amount) }],
      }
      setInvoices([...invoices, invoice])
      setNewInvoice({ client: "", amount: "", dueDate: "", description: "" })
      setShowNewInvoiceForm(false)
    }
  }

  const updateInvoiceStatus = (id: string, status: "paid" | "pending" | "overdue") => {
    setInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, status } : inv)))
  }

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="w-4 h-4 text-chart-2" />
      case "pending":
        return <Clock className="w-4 h-4 text-chart-3" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-chart-2/20 text-chart-2"
      case "pending":
        return "bg-chart-3/20 text-chart-3"
      case "overdue":
        return "bg-destructive/20 text-destructive"
      default:
        return ""
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Cashflow & Invoicing</h1>
        <p className="text-muted-foreground">Track cash inflows, outflows, generate invoices, and manage payments</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">${(totalInflow / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">6-month total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${(totalOutflow / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Incentives & expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Cashflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">${(netCashflow / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((netCashflow / totalInflow) * 100).toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{collectionRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Of invoiced amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoiced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${(totalInvoiced / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">{invoices.length} invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">${(totalPaid / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">${(totalPending / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${(totalOverdue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Cashflow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Trend</CardTitle>
          <CardDescription>Inflow vs Outflow analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="inflow"
                stackId="1"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stackId="1"
                stroke="var(--color-destructive)"
                fill="var(--color-destructive)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Invoice Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Status Distribution</CardTitle>
            <CardDescription>Breakdown by payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {invoiceStatusData.map((entry, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Financial Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Collection Rate</span>
              <span className="text-lg font-semibold text-foreground">{collectionRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Days Outstanding</span>
              <span className="text-lg font-semibold text-foreground">{daysOutstanding} days</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Avg Invoice Value</span>
              <span className="text-lg font-semibold text-foreground">
                ${(totalInvoiced / invoices.length / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Profit Margin</span>
              <span className="text-lg font-semibold text-chart-2">
                {((netCashflow / totalInflow) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Manage invoices and track payment status</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setShowNewInvoiceForm(!showNewInvoiceForm)}>
              <Plus className="w-4 h-4" />
              New Invoice
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* New Invoice Form */}
          {showNewInvoiceForm && (
            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Client name"
                  value={newInvoice.client}
                  onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                />
                <Input
                  placeholder="Amount"
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Due date"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addInvoice} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Invoice
                </Button>
                <Button variant="outline" onClick={() => setShowNewInvoiceForm(false)} className="gap-2 bg-transparent">
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Invoices Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Invoice</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Client</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Due Date</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-foreground">{invoice.invoiceNumber}</td>
                    <td className="py-3 px-4 text-foreground">{invoice.client}</td>
                    <td className="text-right py-3 px-4 text-foreground font-semibold">
                      ${(invoice.amount / 1000).toFixed(0)}K
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{invoice.dueDate}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(invoice.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex justify-center gap-2">
                        {invoice.status !== "paid" && (
                          <button
                            onClick={() => updateInvoiceStatus(invoice.id, "paid")}
                            className="px-2 py-1 text-xs bg-chart-2/20 text-chart-2 rounded hover:bg-chart-2/30 transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => deleteInvoice(invoice.id)}
                          className="p-1 hover:bg-destructive/10 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-destructive" />
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
