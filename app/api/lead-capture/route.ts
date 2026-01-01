import { createServerSideClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, company, role, companySize, city, contactMethod } = body

    if (!name || !email || !phone || !company || !role || !companySize || !city || !contactMethod) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createServerSideClient()

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name,
          email,
          phone,
          company,
          role,
          company_size: companySize,
          city,
          contact_method: contactMethod,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return Response.json({ error: "Failed to save booking" }, { status: 500 })
    }

    console.log("Booking saved successfully:", data)

    return Response.json(
      {
        success: true,
        message: "Booking saved successfully",
        bookingId: data[0]?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing booking:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
