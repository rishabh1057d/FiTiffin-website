/**
 * Email templates for form submissions
 */

export interface FormSubmissionData {
  type: "company" | "cloud-kitchen"
  name: string
  email: string
  phone: string
  company: string
  message?: string
  // Additional fields for company form
  role?: string
  companySize?: string
  city?: string
  contactMethod?: string
  // Additional fields for cloud kitchen form
  kitchenName?: string
  ownerName?: string
  address?: string
  capacity?: string
  cuisines?: string
  fssaiLicense?: string
  experience?: string
  currentOrders?: string
}

/**
 * Generate admin notification email content
 */
export function generateAdminNotificationEmail(data: FormSubmissionData): {
  subject: string
  html: string
  text: string
} {
  const formTypeLabel = data.type === "company" ? "Company Lunch / Corporate Catering" : "Cloud Kitchen / Partner Onboarding"
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  })

  const fields = [
    { label: "Form Type", value: formTypeLabel },
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    {
      label: data.type === "company" ? "Company Name" : "Kitchen Name",
      value: data.company || data.kitchenName || "N/A",
    },
  ]

  // Add type-specific fields
  if (data.type === "company") {
    if (data.role) fields.push({ label: "Role", value: data.role })
    if (data.companySize) fields.push({ label: "Company Size", value: data.companySize })
    if (data.city) fields.push({ label: "City", value: data.city })
    if (data.contactMethod) fields.push({ label: "Preferred Contact Method", value: data.contactMethod })
  } else {
    if (data.ownerName) fields.push({ label: "Owner/Manager Name", value: data.ownerName })
    if (data.address) fields.push({ label: "Address", value: data.address })
    if (data.capacity) fields.push({ label: "Daily Meal Capacity", value: data.capacity })
    if (data.cuisines) fields.push({ label: "Cuisines", value: data.cuisines })
    if (data.fssaiLicense) fields.push({ label: "FSSAI License", value: data.fssaiLicense })
    if (data.experience) fields.push({ label: "Years of Experience", value: data.experience })
    if (data.currentOrders) fields.push({ label: "Current Daily Order Volume", value: data.currentOrders })
  }

  if (data.message) {
    fields.push({ label: "Message", value: data.message })
  }

  fields.push({ label: "Timestamp", value: timestamp })

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Received – Fitiffin</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Lead Received</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin-top: 0; font-size: 16px; color: #4b5563;">A new ${formTypeLabel.toLowerCase()} form submission has been received:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 6px; overflow: hidden;">
            ${fields
              .map(
                (field) => `
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 16px; font-weight: 600; color: #374151; width: 40%;">${field.label}</td>
                <td style="padding: 12px 16px; color: #6b7280;">${field.value}</td>
              </tr>
            `
              )
              .join("")}
          </table>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">Please follow up with the lead within 24 hours.</p>
        </div>
      </body>
    </html>
  `

  const text = `
New Lead Received – Fitiffin

Form Type: ${formTypeLabel}
${fields.map((field) => `${field.label}: ${field.value}`).join("\n")}

Please follow up with the lead within 24 hours.
  `.trim()

  return {
    subject: "New Lead Received – Fitiffin",
    html,
    text,
  }
}

/**
 * Generate user confirmation email content
 */
export function generateUserConfirmationEmail(data: FormSubmissionData): {
  subject: string
  html: string
  text: string
} {
  const formTypeLabel = data.type === "company" ? "Company Lunch / Corporate Catering" : "Cloud Kitchen / Partner Onboarding"

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We've received your details – Fitiffin</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${data.name.split(" ")[0]}!</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin-top: 0; font-size: 16px; color: #4b5563;">We've received your ${formTypeLabel.toLowerCase()} inquiry and appreciate you reaching out to Fitiffin.</p>
          <p style="font-size: 16px; color: #4b5563;">Our team will review your information and get back to you within 24 hours.</p>
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;"><strong>What happens next?</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #6b7280; font-size: 14px;">
              <li>We'll review your submission</li>
              <li>Our team will contact you within 24 hours</li>
              <li>We'll discuss your requirements in detail</li>
            </ul>
          </div>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">If you have any immediate questions, feel free to reach out to us at info@fitiffin.com</p>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">Best regards,<br>The Fitiffin Team</p>
        </div>
      </body>
    </html>
  `

  const text = `
Thank You, ${data.name.split(" ")[0]}!

We've received your ${formTypeLabel.toLowerCase()} inquiry and appreciate you reaching out to Fitiffin.

Our team will review your information and get back to you within 24 hours.

What happens next?
- We'll review your submission
- Our team will contact you within 24 hours
- We'll discuss your requirements in detail

If you have any immediate questions, feel free to reach out to us at info@fitiffin.com

Best regards,
The Fitiffin Team
  `.trim()

  return {
    subject: "We've received your details – Fitiffin",
    html,
    text,
  }
}
