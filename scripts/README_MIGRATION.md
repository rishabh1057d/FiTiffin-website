# Database Migration Guide - Adding Phone Number Field

This guide will help you add the `phone` column to your existing `bookings` table.

## Step 1: Run the Migration Script

You have two options to run the migration:

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `add-phone-number-column.sql`
5. Click **Run** to execute the migration

### Option B: Using psql Command Line

```bash
psql -h db.nuvmiyjojbqjhxnwyslz.supabase.co -U postgres -d postgres -f scripts/add-phone-number-column.sql
```

## Step 2: Verify the Migration

After running the migration, verify that the column was added:

```sql
-- Check if the column exists
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bookings' AND column_name = 'phone';
```

You should see:
- `column_name`: phone
- `data_type`: character varying
- `is_nullable`: YES (or NO if you made it required)

## Step 3: Test the Form

1. Go to your lead capture page (`/lead-capture`)
2. Fill out the form including the phone number field
3. Submit the form
4. Check your database to verify the phone number was saved

## What the Migration Does

- Adds a `phone` column (VARCHAR(20)) to the `bookings` table
- Creates an index on the `phone` column for faster lookups
- The column is nullable by default to avoid breaking existing records

## Notes

- **Existing records**: If you have existing bookings, their `phone` field will be `NULL`. You can update them manually if needed.
- **New records**: All new form submissions will require a phone number.
- **Making it required**: If you want to make the phone field required for all records (including existing ones), uncomment the `ALTER COLUMN phone SET NOT NULL` line in the migration script.

## Troubleshooting

If you encounter any errors:

1. **Column already exists**: The migration uses `IF NOT EXISTS`, so it's safe to run multiple times.
2. **Permission errors**: Make sure you're using the service role key or have proper database permissions.
3. **Connection issues**: Verify your database connection string is correct.

