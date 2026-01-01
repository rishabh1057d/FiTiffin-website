"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2, XCircle, AlertCircle, Save, Plus, Trash2, Eye, EyeOff, Upload } from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

interface EnvVar {
  key: string
  value: string
  isSet: boolean
  isPublic: boolean
  description: string
}

const REQUIRED_ENV_VARS: Omit<EnvVar, "value" | "isSet">[] = [
  // Supabase Public Variables
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    isPublic: true,
    description: "Your Supabase project URL (public)",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    isPublic: true,
    description: "Your Supabase anonymous/public key (public)",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    isPublic: true,
    description: "Your Supabase publishable key (public)",
  },
  {
    key: "SUPABASE_URL",
    isPublic: true,
    description: "Your Supabase project URL (alternative)",
  },
  {
    key: "SUPABASE_PUBLISHABLE_KEY",
    isPublic: true,
    description: "Your Supabase publishable key (alternative)",
  },
  // Supabase Secret Variables
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    isPublic: false,
    description: "Your Supabase service role key (KEEP SECRET!)",
  },
  {
    key: "SUPABASE_SECRET_KEY",
    isPublic: false,
    description: "Your Supabase secret key (KEEP SECRET!)",
  },
  {
    key: "SUPABASE_JWT_SECRET",
    isPublic: false,
    description: "Your Supabase JWT secret (KEEP SECRET!)",
  },
  // PostgreSQL Public Variables
  {
    key: "POSTGRES_DATABASE",
    isPublic: true,
    description: "PostgreSQL database name",
  },
  {
    key: "POSTGRES_HOST",
    isPublic: true,
    description: "PostgreSQL host address",
  },
  {
    key: "POSTGRES_USER",
    isPublic: true,
    description: "PostgreSQL username",
  },
  // PostgreSQL Secret Variables
  {
    key: "POSTGRES_PASSWORD",
    isPublic: false,
    description: "PostgreSQL password (KEEP SECRET!)",
  },
  {
    key: "POSTGRES_URL",
    isPublic: false,
    description: "PostgreSQL connection URL with credentials (KEEP SECRET!)",
  },
  {
    key: "POSTGRES_PRISMA_URL",
    isPublic: false,
    description: "PostgreSQL Prisma connection URL (KEEP SECRET!)",
  },
  {
    key: "POSTGRES_URL_NON_POOLING",
    isPublic: false,
    description: "PostgreSQL non-pooling connection URL (KEEP SECRET!)",
  },
]

export default function EnvPage() {
  const [envVars, setEnvVars] = useState<EnvVar[]>([])
  const [customVars, setCustomVars] = useState<Array<{ key: string; value: string }>>([])
  const [newVarKey, setNewVarKey] = useState("")
  const [newVarValue, setNewVarValue] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [visibleValues, setVisibleValues] = useState<Set<string>>(new Set())
  const [bulkImportText, setBulkImportText] = useState("")
  const [showBulkImport, setShowBulkImport] = useState(false)

  useEffect(() => {
    loadEnvVars()
  }, [])

  const loadEnvVars = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/env")
      const data = await response.json()

      const vars: EnvVar[] = REQUIRED_ENV_VARS.map((req) => ({
        ...req,
        value: data.envVars[req.key] || "",
        isSet: !!data.envVars[req.key],
      }))

      setEnvVars(vars)
      setCustomVars(data.customVars || [])
    } catch (error) {
      console.error("Failed to load environment variables:", error)
      toast.error("Failed to load environment variables")
    } finally {
      setLoading(false)
    }
  }

  const updateEnvVar = (key: string, value: string) => {
    setEnvVars((prev) =>
      prev.map((v) => (v.key === key ? { ...v, value, isSet: !!value } : v))
    )
  }

  const addCustomVar = () => {
    if (!newVarKey.trim()) {
      toast.error("Variable key is required")
      return
    }

    if (envVars.some((v) => v.key === newVarKey) || customVars.some((v) => v.key === newVarKey)) {
      toast.error("Variable key already exists")
      return
    }

    setCustomVars([...customVars, { key: newVarKey, value: newVarValue }])
    setNewVarKey("")
    setNewVarValue("")
    setIsPublic(false)
  }

  const removeCustomVar = (key: string) => {
    setCustomVars(customVars.filter((v) => v.key !== key))
  }

  const updateCustomVar = (key: string, value: string) => {
    setCustomVars(customVars.map((v) => (v.key === key ? { ...v, value } : v)))
  }

  const saveEnvVars = async () => {
    try {
      setSaving(true)

      const allVars: Record<string, string> = {}
      envVars.forEach((v) => {
        if (v.value) {
          allVars[v.key] = v.value
        }
      })
      customVars.forEach((v) => {
        if (v.value) {
          allVars[v.key] = v.value
        }
      })

      const response = await fetch("/api/env", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ envVars: allVars }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Environment variables saved successfully!")
        await loadEnvVars()
      } else {
        toast.error(data.error || "Failed to save environment variables")
      }
    } catch (error) {
      console.error("Failed to save environment variables:", error)
      toast.error("Failed to save environment variables")
    } finally {
      setSaving(false)
    }
  }

  const toggleVisibility = (key: string) => {
    setVisibleValues((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const maskValue = (value: string, isPublic: boolean) => {
    if (!value) return ""
    if (isPublic || visibleValues.has(value)) return value
    return "•".repeat(Math.min(value.length, 20))
  }

  const handleBulkImport = () => {
    if (!bulkImportText.trim()) {
      toast.error("Please paste environment variables to import")
      return
    }

    try {
      const lines = bulkImportText.split("\n")
      let importedCount = 0

      lines.forEach((line) => {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) return

        // Match KEY="VALUE" or KEY=VALUE format
        const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*["']?([^"']*)["']?$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()

          // Check if it's a known variable
          const knownVar = REQUIRED_ENV_VARS.find((v) => v.key === key)
          if (knownVar) {
            updateEnvVar(key, value)
            importedCount++
          } else {
            // Check if custom var already exists
            const existingCustom = customVars.find((v) => v.key === key)
            if (existingCustom) {
              updateCustomVar(key, value)
            } else {
              setCustomVars([...customVars, { key, value }])
            }
            importedCount++
          }
        }
      })

      if (importedCount > 0) {
        toast.success(`Successfully imported ${importedCount} environment variable(s)`)
        setBulkImportText("")
        setShowBulkImport(false)
      } else {
        toast.error("No valid environment variables found. Format: KEY=\"VALUE\"")
      }
    } catch (error) {
      console.error("Bulk import error:", error)
      toast.error("Failed to import environment variables")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Environment Variables</h1>
          <p className="text-muted-foreground">
            Manage your application environment variables. Changes will be saved to <code className="text-sm bg-muted px-2 py-1 rounded">.env.local</code>
          </p>
        </div>

        {/* Bulk Import */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>
                  Paste environment variables in KEY="VALUE" format to quickly import them
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowBulkImport(!showBulkImport)}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                {showBulkImport ? "Hide" : "Show"} Import
              </Button>
            </div>
          </CardHeader>
          {showBulkImport && (
            <CardContent className="space-y-4">
              <Textarea
                placeholder='NEXT_PUBLIC_SUPABASE_URL="https://example.supabase.co"&#10;NEXT_PUBLIC_SUPABASE_ANON_KEY="your-key-here"&#10;SUPABASE_SERVICE_ROLE_KEY="your-secret-key"'
                value={bulkImportText}
                onChange={(e) => setBulkImportText(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
              <Button onClick={handleBulkImport} className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Import Variables
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Required Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Required Variables</CardTitle>
            <CardDescription>
              These environment variables are required for the application to function properly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {envVars.map((envVar) => (
              <div key={envVar.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={envVar.key} className="font-mono text-sm">
                      {envVar.key}
                    </Label>
                    {envVar.isSet ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    {!envVar.isPublic && (
                      <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded">
                        SECRET
                      </span>
                    )}
                    {envVar.isPublic && (
                      <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                        PUBLIC
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{envVar.description}</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id={envVar.key}
                      type={visibleValues.has(envVar.key) || envVar.isPublic ? "text" : "password"}
                      value={envVar.value}
                      onChange={(e) => updateEnvVar(envVar.key, e.target.value)}
                      placeholder={`Enter ${envVar.key}`}
                      className="font-mono text-sm"
                    />
                    {!envVar.isPublic && (
                      <button
                        type="button"
                        onClick={() => toggleVisibility(envVar.key)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {visibleValues.has(envVar.key) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Custom Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Variables</CardTitle>
            <CardDescription>
              Add additional environment variables as needed for your application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {customVars.map((customVar) => (
              <div key={customVar.key} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Label className="font-mono text-sm">{customVar.key}</Label>
                  <Input
                    type="text"
                    value={customVar.value}
                    onChange={(e) => updateCustomVar(customVar.key, e.target.value)}
                    placeholder="Enter value"
                    className="font-mono text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeCustomVar(customVar.key)}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label>Variable Key</Label>
                  <Input
                    type="text"
                    value={newVarKey}
                    onChange={(e) => setNewVarKey(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_"))}
                    placeholder="MY_CUSTOM_VAR"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Value</Label>
                  <Input
                    type="text"
                    value={newVarValue}
                    onChange={(e) => setNewVarValue(e.target.value)}
                    placeholder="Enter value"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addCustomVar} variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Required variables set:</span>
                <span className="font-semibold">
                  {envVars.filter((v) => v.isSet).length} / {envVars.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Custom variables:</span>
                <span className="font-semibold">{customVars.length}</span>
              </div>
              {envVars.some((v) => !v.isSet) && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm text-yellow-500">
                    Some required variables are missing. Please set them before saving.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveEnvVars} disabled={saving} className="w-full gap-2">
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Environment Variables
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Security Warning */}
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Security Notice</p>
                <p className="text-sm text-muted-foreground">
                  Environment variables are saved to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.env.local</code> which is not committed to version control. 
                  Never commit sensitive keys to your repository. Make sure <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.env.local</code> is in your <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.gitignore</code> file.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

