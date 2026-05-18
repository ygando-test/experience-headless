# Google Sites Implementation Guide

## Overview

This guide provides two options for publishing the Headless Experience Design Playbook as an internal Google Site.

---

## Option 1: Native Google Sites Structure

### Recommended Page Structure

#### Top-Level Pages (Main Navigation)

**1. Home (Start Here)**
- **Type:** Landing page
- **Content:** 
  - Hero section with playbook title and description
  - "What this helps teams do" (3 cards)
  - "What's in This Playbook" (8 section cards with icons)
  - "Choose Your Path" (4 persona cards)
- **Google Sites elements:**
  - Title block: "Headless Experience Design Playbook"
  - Text block: Introduction paragraph
  - Card layout (3 columns): What this helps teams do
  - Card layout (4 columns, 2 rows): Section overview cards
  - Collapsible sections: Choose Your Path personas

**2. Coordination Spine**
- **Type:** Content page
- **Content:** Core thesis, 4 anchors framework
- **Google Sites elements:**
  - Banner with blue gradient background
  - 4 cards (Intent, Coordinate, Context, Involve)
  - Text blocks for each anchor explanation
  - Tip callout box

**3. Core Concepts**
- **Type:** Content page with filter cards
- **Content:** 9 patterns (Headless, Task Chaining, etc.)
- **Google Sites elements:**
  - 9 collapsible sections (one per concept)
  - Each section contains: description, example, principle, how to implement
  - Tip callout box at top

**4. Role Guidance**
- **Type:** Content page
- **Content:** PM, Engineering, UX, Editorial guidance
- **Google Sites elements:**
  - 4 tabs OR 4 collapsible sections
  - Each role gets: concern, framing, talking points, deliverables
  - Tip callout box

**5. Experience Examples**
- **Type:** Content page
- **Content:** Real scenarios (Expense approval, booking, CRM, support)
- **Google Sites elements:**
  - 4 expandable cards
  - Each card: scenario, step-by-step flow, patterns used
  - Tip callout box

**6. Decision Tools**
- **Type:** Content page
- **Content:** Checklists, templates, testing protocols
- **Subpages (recommended):**
  - Decision Tools > Checklists
  - Decision Tools > Templates
  - Decision Tools > Testing Protocols
- **Google Sites elements:**
  - Quick reference card at top
  - Checklist items with checkbox styling (use bullet points)
  - Code blocks for templates (use "Code block" element)
  - Tip callout box

**7. Test Cases**
- **Type:** Content page with subpages
- **Subpages:**
  - Test Cases > Healthcare
  - Test Cases > Sales
  - Test Cases > Field Service
  - Test Cases > Nonprofit
- **Google Sites elements:**
  - Industry selector on main page (4 cards linking to subpages)
  - Each subpage: header, tabs for 4 anchors, deliverables, metrics
  - Use collapsible sections for anchor tabs
  - Tip callout box

**8. Alignment Questions**
- **Type:** Content page
- **Content:** Sharp questions to surface assumptions
- **Google Sites elements:**
  - List of questions grouped by use case
  - Use bullet points or numbered lists
  - Tip callout box with FAB button note

**9. Leadership Reframes**
- **Type:** Content page
- **Content:** Strategic questions, objection responses
- **Google Sites elements:**
  - Top 10 questions list
  - Quick pivots cards (use collapsible sections)
  - Tip callout box

---

### Navigation Setup

**Sidebar Navigation:**
1. Create all 9 pages in Google Sites
2. Set navigation to show in sidebar
3. Order: Start Here → Coordination Spine → ... → Leadership Reframes

**Custom Header (optional):**
- Add site logo or header image
- Set site name: "Headless Experience Design"
- Set tagline: "Coordination-first, not UI-less"

---

### Content Migration Strategy

#### Step 1: Create Page Structure
1. Create all 9 top-level pages in Google Sites
2. Add subpages for Decision Tools and Test Cases
3. Set up navigation order

#### Step 2: Migrate Content Section by Section
**For each page:**
1. Copy text content from HTML
2. Paste into Google Sites text blocks
3. Format headings (H2, H3)
4. Add cards for visual sections
5. Add collapsible sections for long content
6. Add callout boxes for tips

#### Step 3: Style Consistently
**Use Google Sites themes:**
- Choose "Simple" or "Diplomat" theme
- Set brand color to Salesforce blue (#0176D3)
- Use white cards with subtle shadows
- Use light gray backgrounds (#F7F9FB)

#### Step 4: Add Interactivity (limited)
**What works in Google Sites:**
- Collapsible sections ✓
- Tabs (via collapsible sections) ✓
- Card layouts ✓
- Links ✓
- Images ✓
- Embedded videos ✓

**What doesn't work:**
- Search (would need custom embed) ✗
- Copy buttons (would need custom embed) ✗
- Filters (would need custom embed) ✗
- Dynamic content (would need custom embed) ✗

---

### Pros & Cons of Native Structure

**Pros:**
- Easy for non-technical teammates to maintain
- Uses Google Sites' native features
- SEO-friendly (searchable by Google)
- Mobile-responsive by default
- Accessible by default
- Fast load times
- Version history
- Permissions integration with Google Workspace

**Cons:**
- No search within playbook
- No copy-to-clipboard buttons
- No filters or dynamic sorting
- Limited styling flexibility
- Can't replicate exact visual design
- Collapsible sections less elegant than custom tabs

---

## Option 2: Full-Page Embed

### What This Provides

A single self-contained HTML file that includes:
- All CSS (inline in `<style>` tags)
- All JavaScript (inline in `<script>` tags)
- Complete playbook content and functionality
- Sidebar navigation
- Search functionality
- Copy buttons
- Filters
- Tabs and interactive elements
- Responsive design
- Accessibility features

### How to Use

**Step 1: Create a new page in Google Sites**
1. Go to your Google Site
2. Click **Pages** in the sidebar
3. Click **+ New Page**
4. Name it: "Headless Experience Design Playbook"
5. Choose page type: **Full page**

**Step 2: Add the embed code**
1. Open the page you just created
2. Click **Insert** → **Embed**
3. Click **Embed code**
4. Paste the entire contents of `playbook-embed.html`
5. Click **Next** → **Insert**

**Step 3: Adjust page settings**
1. In page settings, set navigation to **Hidden** (since the embed has its own navigation)
2. Set page to full width
3. Remove any default headers or footers
4. Save and publish

### File Location
The embed-ready file will be: `playbook-embed.html`

---

### Pros & Cons of Full-Page Embed

**Pros:**
- Maintains exact visual design
- All interactive features work (search, copy, filters, tabs)
- Single source of truth (one HTML file)
- Can update content by editing HTML
- Responsive and accessible
- Consistent with local version

**Cons:**
- Requires HTML editing to update content
- Not indexed by Google search
- May have slower initial load
- Harder for non-technical folks to maintain
- Needs testing in Google Sites environment
- May have iframe restrictions

---

## Maintenance Guide

### For Native Google Sites (Option 1)

**To update content:**
1. Navigate to the page in Google Sites
2. Click **Edit page**
3. Update text, add/remove sections
4. Click **Publish**

**To add a new concept:**
1. Go to Core Concepts page
2. Add a new collapsible section
3. Fill in: title, description, example, principle
4. Publish

**To add a new test case:**
1. Go to Test Cases page
2. Create a new subpage
3. Add industry icon and content
4. Link from main Test Cases page
5. Publish

### For Full-Page Embed (Option 2)

**To update content:**
1. Download the `playbook-embed.html` file
2. Open in a text editor (VS Code, Sublime, Notepad++)
3. Find the `data` object in the `<script>` section
4. Edit the content (JSON format)
5. Save the file
6. Re-paste into Google Sites embed

**To update styling:**
1. Open `playbook-embed.html`
2. Find the `<style>` section at the top
3. Edit CSS variables or specific styles
4. Save and re-paste into Google Sites

**Common updates:**
- Adding a new concept: Edit `data.concepts` array
- Adding a new example: Edit `data.examples` array
- Changing colors: Edit CSS variables in `:root`
- Updating text: Edit data object or HTML structure

---

## Known Limitations in Google Sites

### Native Structure Limitations
1. **No search:** Can't add site-wide search within embedded content
2. **Limited styling:** Must use Google Sites themes
3. **No custom JavaScript:** Can't add interactive filters or copy buttons
4. **Collapsible sections:** Less elegant than custom tabs
5. **Code blocks:** Limited syntax highlighting

### Embed Limitations
1. **Content security policy:** Some JavaScript features may be blocked
2. **iframe restrictions:** May have cross-origin issues
3. **Copy buttons:** May require user permission in some browsers
4. **Local storage:** May not persist across sessions
5. **Print layout:** May not print correctly from iframe
6. **Deep linking:** Hard to link to specific sections from outside

### Workarounds
- **For search:** Use browser's Ctrl+F / Cmd+F
- **For deep linking:** Create separate pages for major sections
- **For printing:** Provide a PDF version
- **For updates:** Keep a GitHub or Google Drive copy of the HTML file

---

## Recommended Approach

**For most teams: Option 1 (Native Structure)**
- Easier to maintain
- Works with Google Sites features
- Better for collaboration
- SEO-friendly

**For design-focused teams: Option 2 (Full-Page Embed)**
- Preserves exact design
- Interactive features work
- Consistent experience
- Better for showcasing

**Hybrid approach:**
- Use native structure for most pages
- Embed interactive tools as separate embeds
- Example: Embed just the Decision Tools page as custom HTML

---

## Testing Checklist

After publishing, verify:

### Functionality
- [ ] All pages load correctly
- [ ] Navigation works (sidebar or embedded)
- [ ] Links open in same/new tab as expected
- [ ] Search works (if embedded)
- [ ] Copy buttons work (if embedded)
- [ ] Collapsible sections expand/collapse
- [ ] Cards are clickable (if embedded)

### Responsive Design
- [ ] Desktop: Sidebar visible, full layout
- [ ] Tablet: Stacked layout, readable
- [ ] Mobile: Single column, hamburger menu (if embedded)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG AA
- [ ] Headings are semantic (H1 → H2 → H3)

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] Smooth scrolling

---

## Support

**Google Sites documentation:**
- [Create a Google Site](https://support.google.com/sites/answer/6372878)
- [Add content to pages](https://support.google.com/sites/answer/6372880)
- [Embed content](https://support.google.com/sites/answer/90569)

**For issues with the playbook:**
- Check browser console for errors
- Test in incognito mode (no extensions)
- Try a different browser
- Clear cache and reload
- Check Google Sites permissions

**For content updates:**
- Option 1: Edit directly in Google Sites
- Option 2: Edit HTML file and re-paste

---

## Next Steps

1. Review both options above
2. Choose implementation approach
3. If Option 1: Start creating pages in Google Sites
4. If Option 2: Use the `playbook-embed.html` file (creating next)
5. Test thoroughly before sharing
6. Share with pilot group for feedback
7. Roll out to full team
