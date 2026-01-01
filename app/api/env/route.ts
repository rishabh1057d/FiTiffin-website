import { NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

const ENV_FILE_PATH = join(process.cwd(), ".env.local")

async function readEnvFile(): Promise<Record<string, string>> {
  if (!existsSync(ENV_FILE_PATH)) {
    return {}
  }

  try {
    const content = await readFile(ENV_FILE_PATH, "utf-8")
    const envVars: Record<string, string> = {}

    content.split("\n").forEach((line) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith("#")) {
        const match = trimmed.match(/^([^=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          envVars[key] = value
        }
      }
    })

    return envVars
  } catch (error) {
    console.error("Error reading .env.local file:", error)
    return {}
  }
}

async function writeEnvFile(envVars: Record<string, string>): Promise<void> {
  try {
    const lines: string[] = []
    lines.push("# Environment variables")
    lines.push("# This file is auto-generated. Do not edit manually unless you know what you're doing.")
    lines.push("")

    // Define all known environment variables
    const allKnownKeys = [
      // Supabase Public
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_URL",
      "SUPABASE_PUBLISHABLE_KEY",
      // Supabase Secret
      "SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_SECRET_KEY",
      "SUPABASE_JWT_SECRET",
      // PostgreSQL Public
      "POSTGRES_DATABASE",
      "POSTGRES_HOST",
      "POSTGRES_USER",
      // PostgreSQL Secret
      "POSTGRES_PASSWORD",
      "POSTGRES_URL",
      "POSTGRES_PRISMA_URL",
      "POSTGRES_URL_NON_POOLING",
    ]

    // Add Supabase variables
    lines.push("# Supabase Configuration")
    const supabasePublicKeys = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_URL",
      "SUPABASE_PUBLISHABLE_KEY",
    ]
    supabasePublicKeys.forEach((key) => {
      if (envVars[key]) {
        lines.push(`${key}="${envVars[key]}"`)
      }
    })

    const supabaseSecretKeys = [
      "SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_SECRET_KEY",
      "SUPABASE_JWT_SECRET",
    ]
    supabaseSecretKeys.forEach((key) => {
      if (envVars[key]) {
        lines.push(`${key}="${envVars[key]}"`)
      }
    })

    // Add PostgreSQL variables
    lines.push("")
    lines.push("# PostgreSQL Configuration")
    const postgresPublicKeys = ["POSTGRES_DATABASE", "POSTGRES_HOST", "POSTGRES_USER"]
    postgresPublicKeys.forEach((key) => {
      if (envVars[key]) {
        lines.push(`${key}="${envVars[key]}"`)
      }
    })

    const postgresSecretKeys = [
      "POSTGRES_PASSWORD",
      "POSTGRES_URL",
      "POSTGRES_PRISMA_URL",
      "POSTGRES_URL_NON_POOLING",
    ]
    postgresSecretKeys.forEach((key) => {
      if (envVars[key]) {
        lines.push(`${key}="${envVars[key]}"`)
      }
    })

    // Add custom variables (not in the known list)
    const customKeys = Object.keys(envVars).filter((key) => !allKnownKeys.includes(key))
    if (customKeys.length > 0) {
      lines.push("")
      lines.push("# Custom variables")
      customKeys.forEach((key) => {
        if (envVars[key]) {
          lines.push(`${key}="${envVars[key]}"`)
        }
      })
    }

    await writeFile(ENV_FILE_PATH, lines.join("\n") + "\n", "utf-8")
  } catch (error) {
    console.error("Error writing .env.local file:", error)
    throw error
  }
}

export async function GET() {
  try {
    const envVars = await readEnvFile()

    // Separate known and custom variables
    const allKnownKeys = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_URL",
      "SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_SECRET_KEY",
      "SUPABASE_JWT_SECRET",
      "POSTGRES_DATABASE",
      "POSTGRES_HOST",
      "POSTGRES_USER",
      "POSTGRES_PASSWORD",
      "POSTGRES_URL",
      "POSTGRES_PRISMA_URL",
      "POSTGRES_URL_NON_POOLING",
    ]

    const customVars = Object.keys(envVars)
      .filter((key) => !allKnownKeys.includes(key))
      .map((key) => ({
        key,
        value: envVars[key],
      }))

    return NextResponse.json({
      envVars,
      customVars,
    })
  } catch (error) {
    console.error("Error reading environment variables:", error)
    return NextResponse.json(
      { error: "Failed to read environment variables" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { envVars } = body

    if (!envVars || typeof envVars !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    // Validate critical required variables (minimum for app to work)
    const criticalRequiredKeys = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
    ]

    const missing = criticalRequiredKeys.filter((key) => !envVars[key] || !envVars[key].trim())
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: `Missing critical required variables: ${missing.join(", ")}`,
          missing,
        },
        { status: 400 }
      )
    }

    // Merge with existing env vars to preserve any that aren't being updated
    const existing = await readEnvFile()
    const merged = { ...existing, ...envVars }

    await writeEnvFile(merged)

    return NextResponse.json({
      success: true,
      message: "Environment variables saved successfully",
    })
  } catch (error) {
    console.error("Error saving environment variables:", error)
    return NextResponse.json(
      { error: "Failed to save environment variables" },
      { status: 500 }
    )
  }
}

