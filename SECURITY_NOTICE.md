# ⚠️ SECURITY NOTICE

## If `scripts/set-env-vars.js` was committed to GitHub:

**IMMEDIATE ACTION REQUIRED:**

### 1. Remove from Git History
The file has been deleted, but if it was already committed, you need to remove it from Git history:

```bash
# Remove the file from Git history (use BFG Repo-Cleaner or git filter-branch)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch scripts/set-env-vars.js" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
git push origin --force --all
```

### 2. ROTATE ALL EXPOSED SECRETS

Since the secrets were exposed in the repository, you MUST rotate them:

#### Supabase Secrets (CRITICAL):
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **API**
3. **Regenerate** the following keys:
   - ✅ Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`) - **CRITICAL**
   - ✅ Secret Key (`SUPABASE_SECRET_KEY`)
   - ✅ JWT Secret (`SUPABASE_JWT_SECRET`)

#### Database Credentials:
1. Go to Supabase Dashboard → **Settings** → **Database**
2. **Reset** the database password (`POSTGRES_PASSWORD`)
3. Update all connection strings that use this password

#### Update Vercel Environment Variables:
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Update all the rotated secrets with new values

### 3. Verify .gitignore

Make sure `.gitignore` includes:
```
.env*
.env.local
.env*.local
scripts/set-env-vars.js
```

### 4. Check Repository

Search your GitHub repository to ensure no other files contain secrets:
- Search for: `SUPABASE_SERVICE_ROLE_KEY`
- Search for: `POSTGRES_PASSWORD`
- Search for: `sb_secret_`

## Prevention

✅ **DO:**
- Use environment variables (Vercel, .env.local)
- Use the `/env` web UI for local development
- Never commit secrets to Git
- Use `.gitignore` for sensitive files

❌ **DON'T:**
- Commit files with hardcoded secrets
- Share API keys in code comments
- Commit `.env` files
- Store secrets in scripts

## Current Status

- ✅ File deleted from local filesystem
- ⚠️ If committed to Git: Remove from history and rotate secrets
- ✅ Use Vercel environment variables for production
- ✅ Use `/env` web UI for local development

