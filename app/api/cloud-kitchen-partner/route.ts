import { createServerSideClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const {
      ownerName,
      email,
      phone,
      kitchenName,
      city,
      address,
      capacity,
      cuisines,
      fssaiLicense,
      experience,
      currentOrders,
      message,
    } = body

    if (
      !ownerName ||
      !email ||
      !phone ||
      !kitchenName ||
      !city ||
      !address ||
      !capacity ||
      !cuisines
    ) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createServerSideClient()

    const { data, error } = await supabase
      .from("cloud_kitchen_partners")
      .insert([
        {
          owner_name: ownerName,
          email,
          phone,
          kitchen_name: kitchenName,
          city,
          address,
          capacity,
          cuisines,
          fssai_license: fssaiLicense || null,
          experience: experience || null,
          current_orders: currentOrders || null,
          message: message || null,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return Response.json({ error: "Failed to save partnership request" }, { status: 500 })
    }

    console.log("Cloud kitchen partner request saved successfully:", data)

    return Response.json(
      {
        success: true,
        message: "Partnership request submitted successfully",
        partnerId: data[0]?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing partnership request:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

