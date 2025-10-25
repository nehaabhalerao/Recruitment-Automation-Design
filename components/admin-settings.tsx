"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Download, Upload, Lock, Users, Database, AlertCircle } from "lucide-react"

interface Setting {
  id: string
  key: string
  value: string
  description: string
  category: "Financial" | "System" | "Integration" | "Security"
}

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Viewer"
  lastLogin: string
  status: "Active" | "Inactive"
}

interface AuditLog {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

const defaultSettings: Setting[] = [
  {
    id: "1",
    key: "INCENTIVE_RATE",
    value: "10",
    description: "Percentage of revenue for recruiter incentives",
    category: "Financial",
  },
  {
    id: "2",
    key: "TAX_RATE",
    value: "18",
    description: "GST/Tax rate for invoices",
    category: "Financial",
  },
  {
    id: "3",
    key: "PAYMENT_TERMS",
    value: "30",
    description: "Payment terms in days",
    category: "Financial",
  },
  {
    id: "4",
    key: "MIN_PLACEMENT_VALUE",
    value: "15000",
    description: "Minimum placement value threshold",
    category: "System",
  },
  {
    id: "5",
    key: "API_RATE_LIMIT",
    value: "1000",
    description: "API requests per hour",
    category: "Integration",
  },
  {
    id: "6",
    key: "SESSION_TIMEOUT",
    value: "3600",
    description: "Session timeout in seconds",
    category: "Security",
  },
]

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@consultbae.com",
    role: "Admin",
    lastLogin: "2024-06-19",
    status: "Active",
  },
  {
    id: "2",
    name: "Manager One",
    email: "manager@consultbae.com",
    role: "Manager",
    lastLogin: "2024-06-18",
    status: "Active",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@consultbae.com",
    role: "Viewer",
    lastLogin: "2024-06-15",
    status: "Active",
  },
]

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Settings Updated",
    user: "Admin User",
    timestamp: "2024-06-19 14:30",
    details: "Incentive rate changed from 9% to 10%",
  },
  {
    id: "2",
    action: "User Created",
    user: "Admin User",
    timestamp: "2024-06-18 10:15",
    details: "New manager account created",
  },
  {
    id: "3",
    action: "Data Exported",
    user: "Manager One",
    timestamp: "2024-06-17 16:45",
    details: "Exported recruitment data for Q2",
  },
  {
    id: "4",
    action: "Settings Updated",
    user: "Admin User",
    timestamp: "2024-06-16 09:20",
    details: "Tax rate updated to 18%",
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Financial":
      return "bg-chart-1/20 text-chart-1"
    case "System":
      return "bg-chart-2/20 text-chart-2"
    case "Integration":
      return "bg-chart-3/20 text-chart-3"
    case "Security":
      return "bg-destructive/20 text-destructive"
    default:
      return ""
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-destructive/20 text-destructive"
    case "Manager":
      return "bg-chart-1/20 text-chart-1"
    case "Viewer":
      return "bg-chart-3/20 text-chart-3"
    default:
      return ""
  }
}

export function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>(defaultSettings)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [newSetting, setNewSetting] = useState({ key: "", value: "", description: "", category: "System" as const })
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Viewer" as const })
  const [activeTab, setActiveTab] = useState<"settings" | "users" | "audit" | "data">("settings")

  const updateSetting = (id: string, field: string, value: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const addSetting = () => {
    if (newSetting.key && newSetting.value) {
      setSettings([
        ...settings,
        {
          id: Date.now().toString(),
          ...newSetting,
        },
      ])
      setNewSetting({ key: "", value: "", description: "", category: "System" })
    }
  }

  const deleteSetting = (id: string) => {
    setSettings(settings.filter((s) => s.id !== id))
  }

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          ...newUser,
          lastLogin: new Date().toISOString().split("T")[0],
          status: "Active",
        },
      ])
      setNewUser({ name: "", email: "", role: "Viewer" })
    }
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">Configure system parameters, manage users, and monitor system activity</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "settings"
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "users"
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "audit"
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Audit Logs
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "data"
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Data Management
        </button>
      </div>

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Manage business rules and system parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-end gap-4 p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1">Key</label>
                    <Input
                      value={setting.key}
                      onChange={(e) => updateSetting(setting.id, "key", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1">Value</label>
                    <Input value={setting.value} onChange={(e) => updateSetting(setting.id, "value", e.target.value)} />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1">Category</label>
                    <Badge className={getCategoryColor(setting.category)}>{setting.category}</Badge>
                  </div>
                  <button
                    onClick={() => deleteSetting(setting.id)}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Setting */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">Add New Setting</h3>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground block mb-1">Key</label>
                  <Input
                    value={newSetting.key}
                    onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                    placeholder="SETTING_KEY"
                    className="font-mono"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground block mb-1">Value</label>
                  <Input
                    value={newSetting.value}
                    onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                    placeholder="Value"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground block mb-1">Category</label>
                  <select
                    value={newSetting.category}
                    onChange={(e) =>
                      setNewSetting({
                        ...newSetting,
                        category: e.target.value as "Financial" | "System" | "Integration" | "Security",
                      })
                    }
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground w-full"
                  >
                    <option value="Financial">Financial</option>
                    <option value="System">System</option>
                    <option value="Integration">Integration</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <Button onClick={addSetting} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage system users and access control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New User */}
            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
              <h3 className="font-semibold text-foreground">Add New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "Admin" | "Manager" | "Viewer" })}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <Button onClick={addUser} className="gap-2">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Last Login</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="text-center py-3 px-4">
                        <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{user.lastLogin}</td>
                      <td className="text-center py-3 px-4">
                        <Badge className="bg-chart-2/20 text-chart-2">{user.status}</Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <button
                          onClick={() => deleteUser(user.id)}
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
      )}

      {/* Audit Logs Tab */}
      {activeTab === "audit" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Audit Logs
            </CardTitle>
            <CardDescription>System activity and change history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{log.action}</p>
                      <p className="text-sm text-muted-foreground">By {log.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Management Tab */}
      {activeTab === "data" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Data Export
              </CardTitle>
              <CardDescription>Export system data for backup or analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 bg-transparent gap-2">
                  <Download className="w-4 h-4" />
                  Export All Data
                </Button>
                <Button variant="outline" className="h-12 bg-transparent gap-2">
                  <Download className="w-4 h-4" />
                  Export Recruitment Data
                </Button>
                <Button variant="outline" className="h-12 bg-transparent gap-2">
                  <Download className="w-4 h-4" />
                  Export Financial Data
                </Button>
                <Button variant="outline" className="h-12 bg-transparent gap-2">
                  <Download className="w-4 h-4" />
                  Export User Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Data Import
              </CardTitle>
              <CardDescription>Import data from external sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 bg-transparent gap-2">
                  <Upload className="w-4 h-4" />
                  Import Data
                </Button>
                <Button variant="outline" className="h-12 bg-transparent gap-2">
                  <Upload className="w-4 h-4" />
                  Restore Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Database Management
              </CardTitle>
              <CardDescription>Manage database and cache operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 bg-transparent">
                  Backup Database
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  Clear Cache
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  Optimize Database
                </Button>
                <Button variant="destructive" className="h-12">
                  Reset System
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
