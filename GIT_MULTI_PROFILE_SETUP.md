# Git Multi-Profile Setup Guide

## Current Configuration

Your Git is now configured to work with multiple GitHub accounts:

### Global Settings
```bash
git config --global credential.helper manager-core
git config --global credential.useHttpPath true
git config --global credential.modalPrompt true
```

### Repository-Specific Settings (daggpt-landing)
```bash
git config user.name "dagchain-official"
git config user.email "support@dagchain.network"
```

## How It Works

1. **credential.useHttpPath = true**: Git will store credentials per repository URL, not globally
2. **credential.modalPrompt = true**: Forces a prompt/popup for authentication
3. **Repository-specific user config**: Each repo can have its own author

## Managing Multiple Profiles

### For Each Repository

When you clone or work on a new repository, set the correct author:

**For dagchain-official projects:**
```bash
cd /path/to/dagchain-project
git config user.name "dagchain-official"
git config user.email "support@dagchain.network"
```

**For personal projects:**
```bash
cd /path/to/personal-project
git config user.name "answervinod"
git config user.email "answervinod@gmail.com"
```

## Getting the Account Selection Popup

When you push to GitHub, you should see a popup asking you to choose which account to authenticate with:
- Choose **dagchain-official** (logged in Microsoft Edge) for organization projects
- Choose **answervinod** (logged in Brave) for personal projects

## Clearing Cached Credentials

If you need to force the popup to appear again:

```bash
# List all GitHub credentials
cmdkey /list | Select-String "github"

# Delete specific credential
cmdkey /delete:"LegacyGeneric:target=git:https://github.com"
```

## Troubleshooting

### Popup Not Appearing
1. Clear cached credentials using the commands above
2. Try pushing again - the popup should appear

### Wrong Account Being Used
1. Check repository author config:
   ```bash
   git config user.name
   git config user.email
   ```
2. Update if needed using the commands in "For Each Repository" section

### Vercel Deployment Failing
- Make sure commits are authored by `dagchain-official <support@dagchain.network>`
- Check GitHub commit history to verify the author
- Vercel only accepts deployments from authorized Git authors

## Best Practices

1. **Always set user.name and user.email per repository** - don't rely on global settings
2. **Use different browsers** for different accounts (Brave for personal, Edge for organization)
3. **Clear credentials** if you accidentally authenticate with the wrong account
4. **Verify author** before pushing: `git log -1 --pretty=format:"%an <%ae>"`

## Current Status

✅ Git configured for multi-profile workflow
✅ dagchain-official credentials set for this repository
✅ Vercel deployment working with correct Git author
✅ Images and video loading correctly on deployed site
