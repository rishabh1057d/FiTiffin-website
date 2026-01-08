import { createServerSideClient } from "@/lib/supabase/server"
import { Resend } from "resend"
import { generateAdminNotificationEmail, generateUserConfirmationEmail, type FormSubmissionData } from "@/lib/email/templates"

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = "info@fitiffin.com"
const FROM_EMAIL = "Fitiffin <info@fitiffin.com>"

/**
 * Unified form submission endpoint
 * Handles both Company Lunch and Cloud Kitchen form submissions
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Extract and validate required fields
    const { type, name, ownerName, email, phone, company, message, ...additionalFields } = body

    // Validate required fields
    if (!type || (type !== "company" && type !== "cloud-kitchen")) {
      return Response.json({ error: "Invalid or missing form type. Must be 'company' or 'cloud-kitchen'" }, { status: 400 })
    }

    // Handle both 'name' and 'ownerName' fields (cloud kitchen form uses ownerName)
    const submitterName = (name || ownerName || "").trim()
    if (!submitterName) {
      return Response.json({ error: "Name is required" }, { status: 400 })
    }

    if (!email || !email.trim()) {
      return Response.json({ error: "Email is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!phone || !phone.trim()) {
      return Response.json({ error: "Phone is required" }, { status: 400 })
    }

    // Prepare form submission data
    const formData: FormSubmissionData = {
      type,
      name: submitterName,
      email: email.trim(),
      phone: phone.trim(),
      company: company?.trim() || additionalFields.kitchenName?.trim() || "",
      message: message?.trim(),
      ...additionalFields,
      // Ensure ownerName is included for cloud kitchen forms
      ...(ownerName && { ownerName: ownerName.trim() }),
    }

    // Save to database
    const supabase = await createServerSideClient()
    let dbError: Error | null = null

    try {
      if (type === "company") {
        // Save to bookings table
        const { error } = await supabase.from("bookings").insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            role: additionalFields.role || null,
            company_size: additionalFields.companySize || null,
            city: additionalFields.city || null,
            contact_method: additionalFields.contactMethod || null,
            status: "pending",
          },
        ])

        if (error) {
          dbError = error
        }
      } else {
        // Save to cloud_kitchen_partners table
        const { error } = await supabase.from("cloud_kitchen_partners").insert([
          {
            owner_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            kitchen_name: formData.company || additionalFields.kitchenName || "",
            city: additionalFields.city || null,
            address: additionalFields.address || null,
            capacity: additionalFields.capacity || null,
            cuisines: additionalFields.cuisines || null,
            fssai_license: additionalFields.fssaiLicense || null,
            experience: additionalFields.experience || null,
            current_orders: additionalFields.currentOrders || null,
            message: formData.message || null,
            status: "pending",
          },
        ])

        if (error) {
          dbError = error
        }
      }
    } catch (dbErr) {
      dbError = dbErr instanceof Error ? dbErr : new Error(String(dbErr))
    }

    // Send emails (even if database save fails, we still want to notify)
    let emailError: Error | null = null

    try {
      // Generate email content
      const adminEmail = generateAdminNotificationEmail(formData)
      const userEmail = generateUserConfirmationEmail(formData)

      // Send admin notification email
      const adminResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
      })

      // Send user confirmation email
      const userResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: formData.email,
        subject: userEmail.subject,
        html: userEmail.html,
        text: userEmail.text,
      })

      // Check for email errors
      if (adminResult.error) {
        emailError = new Error(`Admin email failed: ${adminResult.error.message}`)
      }
      if (userResult.error) {
        emailError = new Error(`User email failed: ${userResult.error.message}`)
      }
    } catch (emailErr) {
      emailError = emailErr instanceof Error ? emailErr : new Error(String(emailErr))
    }

    // Return appropriate response based on what succeeded/failed
    if (dbError && emailError) {
      // Both failed - return error
      return Response.json(
        {
          error: "Failed to save submission and send emails",
          details: {
            database: dbError.message,
            email: emailError.message,
          },
        },
        { status: 500 }
      )
    }

    if (dbError) {
      // Database failed but emails sent - return partial success
      return Response.json(
        {
          success: true,
          message: "Form submitted successfully. Emails sent, but there was an issue saving to database.",
          warning: dbError.message,
        },
        { status: 200 }
      )
    }

    if (emailError) {
      // Emails failed but database saved - return partial success
      return Response.json(
        {
          success: true,
          message: "Form submitted successfully. Data saved, but there was an issue sending emails.",
          warning: emailError.message,
        },
        { status: 200 }
      )
    }

    // Everything succeeded
    return Response.json(
      {
        success: true,
        message: "Form submitted successfully. We'll get back to you within 24 hours.",
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle JSON parsing errors and other unexpected errors
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
