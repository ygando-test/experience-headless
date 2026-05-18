# Quick Setup: Embed into Google Sites

## What You're Getting

A single HTML file (`playbook-embed.html`) that contains:
- Complete Headless Experience Design Playbook
- All CSS styling (Salesforce-inspired design)
- All JavaScript functionality (search, navigation, tabs, copy buttons)
- All content (9 sections, 4 test cases, tools, examples)
- Mobile-responsive layout
- WCAG AA accessible

## Step-by-Step Setup

### Step 1: Create the Page

1. Go to your Google Site
2. Click **Pages** → **+ New Page**
3. Name: "Headless Experience Design Playbook"
4. Page type: Select **Full page** (NOT Web page or Announcement)
5. Click **Create**

### Step 2: Embed the Playbook

1. On the new page, click **Insert** → **Embed**
2. Click **Embed code** tab
3. Copy the entire contents of `playbook-embed.html`
4. Paste into the embed code box
5. Click **Next**
6. Click **Insert**

### Step 3: Adjust Page Settings

1. Click **Settings** (gear icon) for the page
2. Set **Show page in navigation**: Your preference (typically ON)
3. Set **Page width**: Full width
4. Turn OFF **Show page title** (the embed has its own title)
5. Click **Done**

### Step 4: Publish

1. Click **Publish** in top right
2. Review the page
3. Click **Publish** to confirm

---

## Troubleshooting

### The embed appears blank or won't load

**Possible causes:**
1. Code wasn't copied completely
2. Google Sites blocked the embed
3. Browser security settings

**Solutions:**
1. Re-copy the entire HTML file (including `<!DOCTYPE html>` at the top)
2. Try in a different browser
3. Check browser console for errors (F12 → Console tab)
4. Try "Embed from the web" instead of "Embed code" and use a hosted version

### The layout looks broken

**Possible causes:**
1. Page width isn't set to full
2. Extra padding from Google Sites theme

**Solutions:**
1. Set page width to "Full width" in page settings
2. Remove any section padding in the page layout
3. Choose a minimal theme (Simple or Diplomat)

### Copy buttons don't work

**Possible causes:**
1. Browser security prevents clipboard access
2. User needs to grant permission

**Solutions:**
1. Users will see a permission prompt - click "Allow"
2. Alternative: Users can manually select text and copy (Ctrl+C / Cmd+C)
3. Add a note: "If copy buttons don't work, select the text and press Ctrl+C"

### Navigation doesn't scroll smoothly

**Possible causes:**
1. Conflicting Google Sites JavaScript
2. iframe restrictions

**Solutions:**
1. This is cosmetic - navigation still works
2. Users can scroll manually if needed

### Search doesn't work

**Possible causes:**
1. JavaScript blocked by Google Sites
2. Content not loaded yet

**Solutions:**
1. Wait a few seconds after page load
2. Refresh the page
3. Try typing slower (debounced search)

---

## Updating Content

### Quick Text Changes

1. Download or open `playbook-embed.html` in a text editor
2. Find the content you want to change (search for the text)
3. Edit the text directly in the HTML or in the `data` object
4. Save the file
5. In Google Sites, delete the old embed
6. Insert the new embed with updated code

### Adding New Content

**To add a new concept:**
1. Open `playbook-embed.html`
2. Find the `data.concepts` array (around line 200)
3. Add a new object following the existing pattern:
```javascript
{
    title: "Your Concept",
    description: "What it is",
    example: "Real example",
    principle: "Design principle",
    tags: ["Tag1"],
    howToImplement: [...],
    redFlags: [...]
}
```
4. Save and re-embed

**To add a new test case:**
1. Find `data.industryTestCases` array
2. Add a new industry following the existing pattern
3. Include: industry, icon, title, anchors, deliverables, metrics
4. Save and re-embed

### Changing Colors

1. Open `playbook-embed.html`
2. Find the `:root` section in the `<style>` block (around line 50)
3. Change CSS variables:
```css
--color-primary: #0176D3;  /* Change this to your brand color */
--color-bg: #F7F9FB;       /* Change background */
```
4. Save and re-embed

---

## What Works in the Embed

✅ **Fully functional:**
- Sidebar navigation
- Search with live filtering
- Copy buttons (with user permission)
- Collapsible sections
- Interactive cards
- Tabs for test cases and tools
- Filters for concepts and roles
- Responsive mobile layout
- Keyboard navigation
- Screen reader support

✅ **Accessibility:**
- WCAG AA contrast ratios
- Keyboard focus indicators
- Semantic HTML headings
- ARIA labels where needed

---

## What May Not Work

⚠️ **Potential limitations:**
- Deep linking to specific sections (workaround: create bookmarks)
- Printing from within iframe (workaround: open in new tab)
- Browser back button (iframe doesn't change URL)
- Cross-origin features if Google Sites blocks them
- LocalStorage for saving user preferences

❌ **Definitely won't work:**
- External API calls (no backend)
- Dynamic data fetching
- User authentication (beyond Google Sites permissions)

---

## File Size & Performance

- **File size:** ~250-300 KB (all-in-one HTML file)
- **Load time:** 1-2 seconds on fast connection
- **Mobile data:** ~300 KB download
- **No external dependencies** (everything is inline)

**Performance tips:**
- Inline styles and scripts are cached by browser
- Content renders in single request
- No external fonts to download
- No external images (icons are emoji)

---

## Maintenance Workflow

### Regular Updates (Non-Technical)

If you need to update just text:
1. Keep a Google Doc with all content
2. Hire a developer to update the HTML file quarterly
3. Re-embed the updated file

### Regular Updates (Technical)

If you're comfortable with HTML:
1. Keep `playbook-embed.html` in Google Drive or GitHub
2. Edit the file when content changes
3. Version control (save as playbook-embed-v2.html)
4. Re-embed the latest version

### Emergency Updates

If you need to add a quick note:
1. In Google Sites, add a text block ABOVE the embed
2. Use it for announcements or updates
3. Example: "🆕 New test case added: Education sector"
4. This doesn't require re-embedding

---

## Sharing & Permissions

The playbook inherits Google Sites permissions:
- **View:** Anyone with access to the site can view
- **Edit:** Only site editors can update the page
- **Embed:** The HTML content is view-only for all users

To share with specific people:
1. Click **Share** in Google Sites (top right)
2. Add people or groups
3. Set their role (Viewer or Editor)
4. Click **Send**

---

## Mobile Experience

The embed is fully responsive:
- **Desktop:** Sidebar + main content side-by-side
- **Tablet:** Sidebar toggles with hamburger menu
- **Mobile:** Single column, collapsible sidebar

Mobile navigation:
- Tap ☰ to open menu
- Tap section to navigate
- Menu closes automatically
- Scroll to read content

---

## Accessibility Features

Built-in accessibility:
- Skip to main content link
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators on all interactive elements
- High contrast text
- Screen reader announcements
- Semantic HTML structure
- ARIA labels for icons

Testing:
- Use VoiceOver (Mac) or NVDA (Windows)
- Tab through all interactive elements
- Verify focus is visible
- Check color contrast with tools

---

## Getting Help

**If the embed breaks:**
1. Check Google Sites status page
2. Try a different browser
3. Check browser console (F12) for errors
4. Re-embed the code from scratch

**If you need to modify content:**
1. Refer to the data structure in the HTML file
2. Follow existing patterns for new content
3. Test locally before re-embedding
4. Keep a backup of the working version

**For custom changes:**
1. Hire a web developer familiar with HTML/CSS/JS
2. Provide them with `playbook-embed.html`
3. Have them test locally first
4. Document any custom changes

---

## Next Steps

1. ✅ Review the `playbook-embed.html` file
2. ✅ Test locally in a browser (open the HTML file)
3. ✅ Follow the Step-by-Step Setup above
4. ✅ Publish and test in Google Sites
5. ✅ Share with a pilot group for feedback
6. ✅ Roll out to full team

**Success criteria:**
- All 9 sections load
- Navigation works
- Search filters content
- Copy buttons work (with permission)
- Mobile layout is readable
- Page loads in < 3 seconds

---

Ready to publish? Follow **Step-by-Step Setup** at the top of this guide.
