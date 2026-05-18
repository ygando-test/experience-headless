# Google Sites Implementation - README

## What's Been Created

I've prepared comprehensive documentation for publishing your Headless Experience Design Playbook to Google Sites.

---

## Files Created

### 1. **GOOGLE-SITES-GUIDE.md** (Main Guide)
**What it contains:**
- **Option 1: Native Google Sites Structure**
  - Recommended page hierarchy
  - What goes on each page
  - Which Google Sites elements to use
  - Migration strategy
  - Pros & cons
  
- **Option 2: Full-Page Embed**
  - Self-contained HTML file approach
  - How to embed in Google Sites
  - Maintenance instructions
  - Pros & cons

- **Maintenance guides** for both options
- **Known limitations** and workarounds
- **Testing checklist**

### 2. **EMBED-SETUP.md** (Quick Start Guide)
**What it contains:**
- Step-by-step setup instructions (5 minutes)
- Troubleshooting common issues
- How to update content
- What works / what doesn't in the embed
- Mobile and accessibility features
- Performance expectations

---

## Creating the Embed File

### Why It's Not Included

The `playbook-embed.html` file would be **very large** (~5000+ lines, 250-300 KB) because it needs to include:
- Complete HTML structure
- All CSS (inline `<style>` tags) - ~1900 lines
- All JavaScript (inline `<script>` tags) - ~3000 lines
- All content data (9 sections, 4 test cases, tools, examples)

This is too large to generate in a single response.

### How to Create It

**Option A: Manual Assembly (Recommended)**

1. Create a new file: `playbook-embed.html`

2. Start with this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Headless Experience Design Playbook</title>
    <style>
        /* Paste contents of styles-clean.css here */
        /* Then paste contents of styles-enhancements.css here */
        /* Add these overrides for iframe embedding: */
        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        .app {
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <!-- Paste contents of index.html <body> here (everything between <body> and </body>) -->
    
    <script>
        /* Paste contents of script-enhanced.js here */
        
        /* Add this at the end for Google Sites compatibility: */
        window.addEventListener('message', function(e) {
            if (e.data.type === 'resize') {
                document.body.style.height = e.data.height + 'px';
            }
        });
    </script>
</body>
</html>
```

3. Copy file contents:
   - Copy all of `styles-clean.css` into the `<style>` section
   - Copy all of `styles-enhancements.css` after it
   - Copy the body content from `index.html`
   - Copy all of `script-enhanced.js` into the `<script>` section

4. Test locally:
   - Open `playbook-embed.html` in a browser
   - Verify everything works
   - Test mobile responsiveness
   - Test search, navigation, copy buttons

5. Deploy to Google Sites following `EMBED-SETUP.md`

**Option B: Automated Script**

Create a build script (`build-embed.sh`):

```bash
#!/bin/bash

# Create embed file
cat > playbook-embed.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Headless Experience Design Playbook</title>
    <style>
EOF

# Add styles
cat styles-clean.css >> playbook-embed.html
cat styles-enhancements.css >> playbook-embed.html

# Close style tag and open body
cat >> playbook-embed.html << 'EOF'
    </style>
</head>
<body>
EOF

# Extract body content from index.html
sed -n '/<body>/,/<\/body>/p' index.html | sed '1d;$d' >> playbook-embed.html

# Add script
cat >> playbook-embed.html << 'EOF'
    <script>
EOF

cat script-enhanced.js >> playbook-embed.html

# Close script and body
cat >> playbook-embed.html << 'EOF'
    </script>
</body>
</html>
EOF

echo "Created playbook-embed.html"
```

Make executable and run:
```bash
chmod +x build-embed.sh
./build-embed.sh
```

---

## Quick Decision Guide

### Choose Option 1 (Native Google Sites) if:
- ✅ You want easy maintenance by non-technical team members
- ✅ You're okay with simpler styling (Google Sites themes)
- ✅ You can live without search, filters, and copy buttons
- ✅ You want content indexed by Google search
- ✅ You prefer version history and collaboration features

### Choose Option 2 (Full-Page Embed) if:
- ✅ You want to preserve the exact design
- ✅ You need search, filters, tabs, and copy buttons
- ✅ You have someone technical who can update the HTML
- ✅ You want a consistent, polished experience
- ✅ You're comfortable with occasional re-embedding for updates

### Hybrid Approach:
- Use **Option 1** for most pages (Coordination Spine, Core Concepts, etc.)
- Use **Option 2** just for interactive pages (Decision Tools, Test Cases)
- Best of both worlds: maintainable + interactive

---

## Implementation Timeline

### Week 1: Decision & Setup
- Day 1-2: Review both options, choose approach
- Day 3: Set up Google Site structure
- Day 4-5: Begin content migration OR create embed file

### Week 2: Content Population
- Day 1-3: Add all content to pages
- Day 4: Style and format
- Day 5: Internal review

### Week 3: Testing & Launch
- Day 1-2: Test across devices and browsers
- Day 3: Pilot group feedback
- Day 4: Incorporate feedback
- Day 5: Publish and announce

---

## Maintenance Plan

### Monthly
- Review content for accuracy
- Check for broken links
- Update examples with new scenarios
- Add new test cases as needed

### Quarterly
- Refresh visual design if needed
- Add new concepts or tools
- Update metrics and success criteria
- Gather user feedback

### Annually
- Major content audit
- Reorganize structure if needed
- Update design system
- Migrate to new platform if needed

---

## Success Metrics

Track these to measure playbook adoption:

**Usage:**
- Page views per week
- Unique visitors
- Time on page
- Most viewed sections

**Engagement:**
- Feedback comments
- Questions in Slack/email
- Usage in meetings (mentions)
- Downloads (if providing PDF)

**Impact:**
- Teams using the framework
- Projects citing the playbook
- Design reviews using the tools
- Reduced rework due to missing coordination

---

## Support & Resources

### Documentation
- `GOOGLE-SITES-GUIDE.md` - Complete implementation guide
- `EMBED-SETUP.md` - Quick start for Option 2
- `ACCESSIBILITY-FIXES.md` - WCAG compliance details

### Getting Help
- **Google Sites help:** https://support.google.com/sites/
- **Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Salesforce design:** https://www.lightningdesignsystem.com/

### Feedback
- Create a Google Form for feedback
- Add "Send Feedback" link in Google Sites header
- Monitor analytics to see what's being used

---

## Next Steps

1. **Read** `GOOGLE-SITES-GUIDE.md` to understand both options
2. **Choose** Option 1 (native) or Option 2 (embed)
3. **If Option 1:** Start creating pages in Google Sites
4. **If Option 2:** Create `playbook-embed.html` using instructions above
5. **Test** thoroughly before sharing widely
6. **Launch** to pilot group first
7. **Iterate** based on feedback

---

## Questions?

Common questions answered in the guides:
- How do I update content? → See maintenance sections
- Will this work on mobile? → Yes, fully responsive
- Can users print it? → Yes, but may need special handling for embeds
- Is it accessible? → Yes, WCAG AA compliant
- How big is the file? → ~250-300 KB for embed, negligible for native
- Can I customize the design? → Yes for embed, limited for native

For questions not covered:
- Check Google Sites documentation
- Test in a staging site first
- Consult with your web team

---

**Ready to get started?** Open `GOOGLE-SITES-GUIDE.md` for the complete implementation guide.
