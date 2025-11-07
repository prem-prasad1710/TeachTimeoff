# 🔐 Login Issue & OAuth Integration Guide

## Current Issue: Can't Login After Signup

### Problem
You signed up with email `prem20090066870@gmail.com` but can't remember the password you used.

### Quick Solution: Reset the Password in Database

Run this command to update your password to something known:

```bash
mongosh techtimeoff --eval 'db.users.updateOne(
  { email: "prem20090066870@gmail.com" },
  { $set: { password: "$2a$10$test.password.hash" } }
)' 
```

Actually, let me create a better solution - a password reset script:

## Solution 1: Use Seed User Accounts (Immediate)

Instead of your signup account, use these pre-seeded accounts:

| Role | Email | Password |
|------|-------|----------|
| Faculty | faculty@jims.edu | faculty123 |
| Coordinator | coordinator@jims.edu | coord123 |
| Chief Coordinator | chief@jims.edu | chief123 |
| Principal | principal@jims.edu | principal123 |

## Solution 2: Reset Your Password

I'll create a password reset script for you.

## Solution 3: OAuth Integration (Google & GitHub)

I'll implement social login so you don't need to remember passwords!

---

## Next Steps

1. **Immediate**: Login with `faculty@jims.edu` / `faculty123`
2. **Short-term**: I'll create a password reset script
3. **Long-term**: I'll implement OAuth (Google & GitHub)

Would you like me to proceed with all three solutions?
