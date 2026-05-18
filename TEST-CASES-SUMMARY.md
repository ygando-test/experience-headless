# Industry Test Cases - Summary

## What Was Added

I've created an interactive **Industry Test Cases** section for the playbook with 4 complete industry scenarios showing FDEs designing headless agents. Each test case is a deep-dive journey following the same structure as the Financial Services example.

---

## How to Access

1. Open `index.html` in your browser
2. Click **"Test Cases"** in the navigation
3. See 4 industry cards to choose from
4. Click any industry to see the full scenario
5. Use the 4 tabs (Intent, Coordinate, Context, Involve) to explore each anchor

---

## The 4 Industries

### 1. 🏥 Healthcare - Patient Appointment Scheduling

**FDE:** Marcus  
**Company:** Regional Health System  
**Agent:** Multi-provider appointment scheduling across patient portal, SMS, IVR, front desk kiosk

**Key Challenges:**
- **Intent:** "I need to see a doctor" (urgent? what type? new or follow-up?)
- **Coordinate:** Triage → Insurance verify → Provider search → Pre-auth check → Schedule → Notify
- **Context:** HIPAA compliance (PHI encrypted), multi-surface booking, insurance verification travels
- **Involve:** Emergency symptoms → immediate escalation. Pre-auth needed → human verification

**Unique Constraints:**
- HIPAA compliance (every access logged)
- Emergency vs. routine triage
- Insurance pre-authorization workflows
- Multi-provider coordination

**Deliverables Marcus Created:**
- Context schema with `patient`, `insurance`, `triage`, `appointment`, `compliance` sections
- Decision matrix: When to schedule vs. escalate (urgency-based)
- HIPAA testing protocol (PHI encryption, access logging)
- SLA thresholds (emergency symptoms = immediate escalation)

**Key Metric:** Emergency detection rate: 100% (cannot miss emergency symptoms)

**Key Insight:**  
*"In healthcare, the behavior layer must balance autonomy with safety. Agent handles routine scheduling but immediately escalates anything that could be urgent. HIPAA compliance means every access is logged, and PHI must survive surface switches without being exposed."*

---

### 2. 💼 Sales - Lead Qualification & Routing

**FDE:** Priya  
**Company:** Enterprise SaaS Company  
**Agent:** Lead capture, scoring, enrichment, and routing across website chat, forms, email, phone

**Key Challenges:**
- **Intent:** "Tell me about pricing" (buyer or researcher? company size? decision maker?)
- **Coordinate:** Capture → Score (BANT) → Enrich (Clearbit) → Territory rules → Route → Sync to CRM
- **Context:** Multi-channel unification (chat + form + email = one lead record), enrichment data preserved
- **Involve:** Enterprise + high BANT → AE immediately. Mid-market → SDR. Low score → nurture campaign

**Unique Constraints:**
- Speed-to-lead < 5 minutes
- Complex territory rules (geo + vertical + company size)
- CRM sync (Salesforce duplicate detection)
- Lead scoring algorithm (BANT-based)

**Deliverables Priya Created:**
- Context schema with `contact`, `enrichment`, `qualification (BANT)`, `activity_timeline`, `routing`
- Lead scoring model (0-100 scale with intent signals)
- Decision matrix: When to route to AE vs. SDR vs. nurture
- Territory assignment algorithm (handles geo + vertical + size)

**Key Metric:** Speed-to-lead: < 5 minutes (capture to SDR notification)

**Key Insight:**  
*"In sales, the behavior layer is a routing engine. It must capture intent across channels, score quality, apply complex territory logic, and route to the right human FAST. Context must unify (chat + form + email = one lead record) so reps aren't surprised when they call."*

---

### 3. 🔧 Field Service - Technician Dispatch & Parts Ordering

**FDE:** Jordan  
**Company:** Industrial Equipment Maintenance  
**Agent:** Service request handling, tech dispatch, parts inventory management across customer portal, dispatcher, tech mobile app

**Key Challenges:**
- **Intent:** "My machine is down" (how urgent? which machine? warranty status? parts needed?)
- **Coordinate:** Triage → Check warranty → Find tech → Check parts → Dispatch → Diagnose → Order parts → Complete
- **Context:** Work order travels: call center → dispatcher → tech mobile app (offline) → warehouse system
- **Involve:** No tech available within SLA → escalate. Safety concern → immediate escalation. Parts out of stock → escalate

**Unique Constraints:**
- Real-time tech location/availability
- Mobile offline support (tech syncs when back online)
- SLA compliance (4-hour emergency response)
- Parts inventory real-time sync

**Deliverables Jordan Created:**
- Context schema with `work_order`, `equipment`, `issue`, `dispatch`, `parts`, `offline_updates`, `timeline`
- Decision matrix: When to auto-dispatch vs. escalate (SLA + complexity)
- Offline sync protocol (tech works without signal, queues updates)
- SLA thresholds (Emergency: 4hr, Urgent: 24hr, Routine: 1 week)

**Key Metric:** SLA compliance rate: > 95% (emergency within 4hr, urgent within 24hr)

**Key Insight:**  
*"In field service, the behavior layer is a real-time coordination engine. It must handle offline mobile workers, predict parts needs, enforce SLAs, and keep everyone synchronized. The challenge is mobile connectivity: context must survive offline periods and merge cleanly when tech reconnects."*

---

### 4. ❤️ Nonprofit - Donation Processing & Donor Engagement

**FDE:** Alex  
**Company:** Environmental Conservation Nonprofit  
**Agent:** Multi-channel donation capture, recurring gift management, tax receipt generation, donor stewardship

**Key Challenges:**
- **Intent:** "I want to help" (one-time or recurring? which program? tribute gift? tax receipt needed?)
- **Coordinate:** Capture → Process payment → Generate receipt → Segment → Route high-value to MGO → Thank-you → Stewardship
- **Context:** Single donor profile across website, text-to-donate, mail, events, phone (unified giving history)
- **Involve:** Major gift (>$10K) → immediate MGO call. Mid-level ($1K-$10K) → MGO email. Grassroots → automated

**Unique Constraints:**
- IRS compliance (tax receipts)
- Donor privacy (GDPR/CCPA)
- Recurring gift management (handle failed payments gracefully)
- Major donor identification (route to personal outreach)

**Deliverables Alex Created:**
- Context schema with `donor`, `giving_profile`, `gift_history`, `stewardship`, `tax_receipts`
- Decision matrix: When to auto-thank vs. personal outreach (giving-level based)
- Giving thresholds (Major: >$10K, Mid-level: $1K-$10K, Grassroots: <$1K)
- Stewardship sequences (immediate, 24hr, 1 week touchpoints)

**Key Metric:** Major donor response time: < 24hr (MGO personal outreach)

**Key Insight:**  
*"In nonprofit, the behavior layer is a donor relationship engine. It must capture generosity across channels, route high-value donors for personal touches, automate stewardship for grassroots donors, and ensure IRS compliance. The challenge is balancing automation (scale) with personalization (relationships). Major donors must never feel like 'just a number.'"*

---

## How Each Test Case Is Structured

### 1. Header Section
- Industry icon + title
- FDE name + company
- Assignment (what they were asked to build)
- Constraints (technical, regulatory, operational)
- Surfaces (showing headless nature)

### 2. Four Anchors (Tabbed Navigation)

Each anchor has:
- **Challenge:** The core problem for this anchor
- **Solution:** How the FDE solved it using playbook tools
- **Anchor-specific content:**
  - **Intent:** Ambiguity map, confidence thresholds
  - **Coordinate:** Flow steps, failure points & recovery
  - **Context:** Full schema (copy-pasteable JSON), handoff scenarios
  - **Involve:** Escalation triggers, decision matrix

### 3. Deliverables Section
- What the FDE produced (schema, matrix, thresholds, flow map)
- Testing protocols (6 tests ready to run)

### 4. Success Metrics
- 6-8 key metrics with targets
- Industry-specific (e.g., HIPAA compliance in healthcare, speed-to-lead in sales)

### 5. Key Insight
- One-paragraph summary of the core behavior layer challenge for this industry

---

## Interactive Features

### Industry Selector
- 4 clickable cards (Healthcare, Sales, Field Service, Nonprofit)
- Click to load full test case
- Visual indicator for active industry

### Four Anchors Tabs
- 4 tabs: Intent 🎯, Coordinate ⚙️, Context 💾, Involve 🤝
- Click to switch between anchors
- Content loads dynamically
- Mobile-friendly (icon-only on small screens)

### Copy-Paste Ready
- Context schemas shown as formatted JSON
- "Copy Schema" button for easy use
- All schemas follow the Context Schema Template from Tools section

### Visual Hierarchy
- Color-coded sections (constraints = red, surfaces = green)
- Priority badges (CRITICAL, HIGH, MEDIUM)
- Confidence levels (High/Medium/Low with color coding)

---

## How FDEs Should Use This

### If you're designing an agent in one of these industries:
1. Click your industry
2. See how the FDE mapped the 4 anchors
3. Copy their context schema as a starting point
4. Adapt their decision matrix to your use case
5. Use their testing protocols

### If you're in a different industry:
1. Find the most similar industry (by constraints)
   - **Regulated:** Healthcare (HIPAA) → also applies to finance, insurance
   - **Multi-channel:** Sales, Nonprofit → applies to customer support, e-commerce
   - **Mobile/Offline:** Field Service → applies to logistics, delivery, inspections
2. See how they solved similar problems
3. Adapt patterns to your domain

---

## Common Patterns Across Industries

### Intent Challenges (All Industries)
- Ambiguous requests ("I need help", "Tell me about...", "Something's wrong")
- Confidence thresholds (70%, 90%)
- Clarification prompts for low-confidence intents

### Coordinate Challenges (All Industries)
- Multi-step flows (5-10 steps)
- Parallel tasks (while doing X, also do Y)
- Failure recovery paths (what if step 3 fails?)
- External API timeouts (don't block the flow)

### Context Challenges (All Industries)
- Multi-surface scenarios (mobile → web, app → phone)
- Unified records (all channels point to same entity)
- Handoff context (human sees full history, not empty ticket)
- Offline sync (mobile workers, connectivity issues)

### Involve Challenges (All Industries)
- Risk-based escalation (high-value, high-stakes, uncertainty)
- Urgency classification (emergency, urgent, routine)
- Authority boundaries (agent can do X, must escalate Y)
- Human-in-the-loop decision points

---

## What Makes Each Industry Unique

| Industry | Unique Challenge | Key Escalation Trigger | Critical Context |
|----------|------------------|------------------------|------------------|
| **Healthcare** | HIPAA compliance, emergency detection | Emergency symptoms → immediate | PHI (encrypted), triage result |
| **Sales** | Speed-to-lead (<5 min), territory rules | Enterprise + high BANT → AE | BANT score, intent signals |
| **Field Service** | Offline mobile workers, SLA enforcement | No tech in SLA window → manager | Work order, offline updates |
| **Nonprofit** | Donor relationships, IRS compliance | Major gift (>$10K) → personal call | Lifetime giving, stewardship history |

---

## Technical Implementation Notes

### Data Structure
All test cases stored in `script-enhanced.js`:
```javascript
data.industryTestCases = [
  {
    industry: "Healthcare",
    icon: "🏥",
    anchors: {
      intent: { challenge, solution, ambiguity_map, confidence_thresholds },
      coordinate: { challenge, solution, flow, failure_points },
      context: { challenge, solution, schema, handoffs },
      involve: { challenge, solution, escalation_triggers, decision_matrix }
    },
    deliverables: { ... },
    metrics: { ... }
  }
]
```

### Rendering
- `renderTestCases()` creates industry selector + loads first test case
- `renderTestCaseDetail(industryId)` loads header, tabs, deliverables, metrics
- `renderAnchorContent(testCase, anchorType)` dynamically renders intent/coordinate/context/involve

### Navigation
- Industry cards have click handlers → load that industry
- Anchor tabs have click handlers → load that anchor
- Active states managed with CSS classes

---

## File Changes

### Updated Files:
1. **`script-enhanced.js`**
   - Added `industryTestCases` array with 4 complete scenarios
   - Added `renderTestCases()`, `renderTestCaseDetail()`, `renderAnchorContent()` functions
   - Added to `DOMContentLoaded` init

2. **`index.html`**
   - Added `<section id="test-cases">` with content container
   - Added "Test Cases" to navigation

3. **`styles-enhancements.css`**
   - Added `.industry-selector`, `.industry-card` (selector grid)
   - Added `.test-case-*` classes (header, assignment, constraints, surfaces)
   - Added `.anchors-tabs`, `.anchor-tab` (tabbed navigation)
   - Added `.anchor-detail`, `.anchor-section` (content display)
   - Added `.confidence-grid`, `.flow-steps`, `.failure-point` (anchor-specific)
   - Added `.schema-preview`, `.handoff-scenario`, `.escalation-trigger` (context/involve)
   - Added `.test-case-deliverables`, `.metrics-grid`, `.test-case-insight`
   - Mobile-responsive (stacks on small screens)

---

## Testing Checklist

Open `index.html` and verify:

- [ ] Click **"Test Cases"** in nav → Section loads
- [ ] See 4 industry cards (Healthcare, Sales, Field Service, Nonprofit)
- [ ] Healthcare loads by default (active state)
- [ ] Click **Sales** → Card becomes active, content changes
- [ ] See 4 anchor tabs (Intent, Coordinate, Context, Involve)
- [ ] Intent tab active by default
- [ ] Click **Coordinate** → Tab becomes active, content changes
- [ ] See flow steps (numbered list)
- [ ] See failure points with recovery paths
- [ ] Click **Context** → See JSON schema with syntax highlighting
- [ ] Click "Copy Schema" button → Schema copied to clipboard
- [ ] See handoff scenarios (from → to)
- [ ] Click **Involve** → See escalation triggers with priority badges
- [ ] See decision matrix (scenario → decision)
- [ ] Scroll down → See deliverables (4 cards + testing protocols)
- [ ] See metrics (6-8 metrics with targets)
- [ ] See key insight (yellow box with lightbulb)
- [ ] Resize to mobile → Industry cards stack vertically, anchor labels hide (icons only)

---

## Usage Examples

### For an FDE designing a healthcare agent:
1. Click **Healthcare** industry
2. Click **Intent** tab → Copy ambiguity map ("I need to see a doctor" → triage questions)
3. Click **Context** tab → Copy schema, adapt `patient`, `insurance`, `triage` sections
4. Click **Involve** tab → Copy escalation triggers (emergency symptoms → immediate)
5. Use **Deliverables** section → Run HIPAA testing protocol

### For an FDE designing a sales agent:
1. Click **Sales** industry
2. Click **Coordinate** tab → Study flow (Capture → Score → Enrich → Route → Sync)
3. Copy failure recovery (Clearbit timeout → proceed with basic data, don't block)
4. Click **Context** tab → Copy `activity_timeline` structure (unify chat + form + email)
5. Click **Involve** tab → Copy decision matrix (Enterprise + high BANT → AE)
6. Use **Metrics** → Set target: Speed-to-lead < 5 minutes

### For an FDE in a different industry (e.g., Insurance):
1. Pick most similar: **Healthcare** (regulated) or **Sales** (CRM integration)
2. Study patterns: Compliance sections, Risk-based escalation, Multi-channel context
3. Adapt schemas: Replace `patient` with `policyholder`, `triage` with `claim_type`
4. Adapt triggers: Replace HIPAA with insurance regulations
5. Use testing protocols as templates

---

## Value Proposition

### Before Test Cases Section:
- Playbook had tools (checklists, templates) but no worked examples
- FDEs had to imagine how tools apply to their industry
- "I understand the concepts, but what does this look like in practice?"

### After Test Cases Section:
- 4 complete journeys showing tools in action
- See exact schemas, decision matrices, escalation triggers for real industries
- "I can copy Healthcare's approach and adapt it to my telemedicine agent"

**Time saved:** ~4-6 hours (from "blank page" to "working schema")

---

## Future Enhancements (Optional)

### Additional Industries:
- **E-commerce:** Order fulfillment agent (inventory, shipping, returns)
- **Education:** Student support agent (enrollment, financial aid, course registration)
- **Government:** Citizen services agent (permits, licenses, form submission)
- **Hospitality:** Hotel booking agent (reservations, loyalty programs, concierge)

### Interactive Features:
- **Compare Industries:** Side-by-side view of 2 industries
- **Export Schema:** Download JSON schema as file
- **Inline Editing:** Let users customize schema in-browser, download modified version
- **Test Case Builder:** Wizard to create your own test case

### Filtering:
- **By Constraint:** Show all industries with "offline support" or "regulatory compliance"
- **By Surface:** Show all industries using "mobile app" or "SMS"
- **By Pattern:** Show all industries using "Task Chaining" or "Handoff Protocol"

---

## Summary

The **Industry Test Cases** section transforms the playbook from "here are the tools" to "here's how to use them in your industry."

**4 complete scenarios** showing FDEs:
- Mapping 4 anchors to their use case
- Creating context schemas
- Defining decision matrices
- Solving coordination challenges
- Testing behavior layers

**Interactive navigation:**
- Click industry → See full scenario
- Click anchor → See that challenge + solution
- Copy schemas → Use in your project

**Result:** FDEs can now see themselves in the playbook and follow a proven path from assignment to validated design.

🎯
