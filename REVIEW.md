# Behavior Layer Playbook Review
**Lens: Jakob Nielsen's Usability Heuristics + 10+ Headless Implementations**

## Executive Summary

**What's Working Well:**
- Strong conceptual framework with clear anchors (Intent, Coordinate, Context, Involve)
- Role-based perspectives show deep understanding of cross-functional dynamics
- Examples are concrete and grounded in real scenarios
- The "meeting mode" feature is brilliant for presentation contexts

**Critical Gaps:**
1. **No error prevention or measurement framework** - talks about what goes wrong, not how to prevent it
2. **Missing implementation patterns** - heavy on philosophy, light on "here's how"
3. **No user testing or validation methodology** - how do teams know if their behavior layer works?
4. **Lacks concrete deliverables** - what artifacts should teams produce?
5. **No decision trees or flowcharts** - everything is prose, needs visual decision aids

---

## Detailed Review by Nielsen's 10 Heuristics

### 1. Visibility of System Status ⚠️ PARTIALLY ADDRESSED

**What's Missing:**
- No guidance on **instrumentation**: what metrics should teams track?
- Missing: "How do we know the behavior layer is working?"
- No observable signals mentioned for monitoring in production
- Examples show transparency to *end users* but not to *operators*

**Add:**
```
Instrumentation Checklist:
- Context preservation rate (% of handoffs with full history)
- Escalation reasons logged (structured data, not just "escalated")
- Time-to-recovery after failures (MTTR for behavior layer)
- Clarification request rate (how often system asks vs. guesses)
- User repeat rate (same question asked multiple times = context loss)
```

**Nielsen would say:** "The playbook tells teams to show system status to users, but doesn't tell teams how to see their own system status."

---

### 2. Match Between System and Real World ✅ STRONG

The role-based perspectives are excellent. Each role gets their language:
- PM: "feature infrastructure"
- Eng: "orchestration logic"
- UX: "interaction design without a canvas"

**One improvement:**
Add an "Objections" section for each role with pre-written rebuttals:
- PM: "This will slow us down" → "You'll spend 2x more time fixing coordination bugs later"
- Eng: "Where does this code live?" → "Here's the architectural layer diagram"

---

### 3. User Control and Freedom ✅ COVERED, NEEDS DEPTH

The "Human Control" concept exists, but no concrete patterns for:
- **Undo**: What's undoable? What requires a rollback workflow?
- **Pause/Resume**: Can users pause a multi-step flow and come back tomorrow?
- **Abort**: What's the kill switch? When is it too late to stop?

**Add a pattern:**
```
PATTERN: Checkpoint & Resume
- What: Agent saves state at decision points
- When: Any flow longer than 2 minutes or requiring external approval
- Deliverable: State serialization spec
- Test: "Can user close browser mid-flow and resume?"
```

---

### 4. Consistency and Standards ⚠️ MAJOR GAP

**Missing entirely:**
- No standard vocabulary for behavior layer states (is it "escalated" or "handed off"?)
- No canonical event schema (what fields must every handoff carry?)
- No error taxonomy (what's a "soft failure" vs. "hard stop"?)

**Headless veteran perspective:**
Every successful headless system I've built had a **behavior layer contract document**:
- Standardized event envelope (intent_id, user_context, trace_id, timestamp)
- Escalation categories (needs_human_approval, ambiguous_intent, external_failure)
- Context preservation rules (what travels in headers vs. payload vs. database)

**Add:**
```
SECTION: Behavior Layer Standards

1. Event Envelope
   - Every behavior layer event MUST include:
     * intent_id: UUID tracking original user request
     * context_snapshot: User state + conversation history
     * confidence_score: Agent's certainty (0-100)
     * escalation_reason: Enum from taxonomy

2. State Machine Conventions
   - Standard states: initiated, clarifying, executing, waiting_approval, 
     escalated, completed, failed, abandoned
   - Transitions must log reason + timestamp
   - Failed states must include recovery_options array

3. Naming Conventions
   - Use "clarify" not "ask for more info"
   - Use "escalate" not "hand off to human"
   - Use "context" not "session" or "state"
```

---

### 5. Error Prevention 🚨 BIGGEST GAP

**Current state:**
The playbook has a whole "Failure Modes" section... but zero guidance on *preventing* them.

**Nielsen would say:** "You've documented what goes wrong, but not how to stop it from going wrong in the first place."

**Missing:**
- Pre-launch checklist for behavior layer
- Design-time safeguards (guardrails, not just recovery)
- Testing methodology

**Add:**
```
SECTION: Error Prevention Framework

Design-Time Checklist:
□ Intent ambiguity map created? (list all ways user request could be misinterpreted)
□ Risk thresholds defined? (what $ amount / data volume triggers human approval?)
□ Context schema validated? (does next step have everything it needs?)
□ Fallback path exists for every external dependency?
□ Escalation triggers documented? (specific conditions, not "when needed")

Testing Protocol:
1. Interrupt Test: Can user pause/resume without context loss?
2. Failure Cascade Test: What happens if step 3 fails after steps 1-2 succeeded?
3. Ambiguity Stress Test: Feed edge-case utterances, verify clarification (not guessing)
4. Context Handoff Test: Escalate to human, verify they see full history
5. Recovery Path Test: Simulate every failure mode, verify non-dead-end recovery

Red Flags (auto-fail scenarios):
- Agent acts on ambiguous input without clarification
- Handoff loses context (human sees blank ticket)
- Failure surfaces with no recovery option
- High-stakes action executes without approval prompt
```

---

### 6. Recognition Rather Than Recall ⚠️ NEEDS TOOLS

**Current:**
The playbook expects teams to *remember* all these patterns. That's recall, not recognition.

**Nielsen would say:** "Give them checklists and decision trees, not paragraphs to memorize."

**Add:**
1. **Decision Flowchart**: "Should the agent act, ask, or escalate?"
   - Confidence > 90% + low risk → Act
   - Confidence 70-90% OR medium risk → Ask for confirmation
   - Confidence < 70% OR high risk → Escalate to human

2. **Quick Reference Card** (1-page PDF):
   ```
   4 ANCHORS QUICK CHECK
   [ ] Intent: What does user need? (answer, action, decision, reassurance, escalation)
   [ ] Coordinate: What happens next? Who/what owns it?
   [ ] Context: What must not get lost?
   [ ] Involve: When must a human approve/decide?

   5 RED FLAGS
   [ ] Agent guesses on ambiguous input
   [ ] Handoff loses history
   [ ] Failure has no recovery path
   [ ] High-stakes action auto-executes
   [ ] User repeats themselves across surfaces
   ```

3. **Behavior Layer Canvas** (Miro/FigJam template):
   - Swim lanes for: User, Agent, Systems, Humans
   - Columns for: Intent, Clarify, Execute, Handoff, Recover
   - Force teams to map out the flow visually

---

### 7. Flexibility and Efficiency of Use ✅ STRONG

The role-based sections are great for different skill levels. Meeting mode is smart.

**One addition:**
Add "Fast Track" vs. "Deep Dive" markers:
- Fast Track: Read Spine + Examples (15 min)
- Standard: Add Concepts + By Role (45 min)
- Deep Dive: Full playbook + create artifacts (2 hours)

---

### 8. Aesthetic and Minimalist Design ✅ EXCELLENT

The UI is clean. Information hierarchy is clear. No clutter.

**Minor suggestion:**
The "Quick Pivots" section (objection handling) feels tacked on. Either promote it to a full section or merge into "By Role."

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors ⚠️ SURFACE LEVEL

**Current:**
Examples show *what* recovery looks like ("I can retry with another card...").

**Missing:**
- How to *design* recovery paths
- When recovery is impossible (and how to communicate that)
- Post-mortem template for when behavior layer fails

**Add:**
```
SECTION: Recovery Path Design

For Every Failure Mode, Define:
1. What Happened (system explanation)
2. Why It Happened (if knowable)
3. What Happens Next (options, not dead end)
4. How to Prevent Next Time (if user-controllable)

Example:
Failure: Payment declined
System says: "Your card ending in 4321 was declined by your bank."
Options:
- Try a different card
- Update billing address and retry
- Pay via bank transfer (we'll email instructions)
- Save this order and complete payment later

Post-Mortem Template:
When a behavior layer failure reaches users in production:
1. What was the user intent?
2. Where did the system fail? (clarify, execute, handoff, recover?)
3. What context was lost?
4. What did the user experience?
5. How do we prevent this?
6. What metric would have caught this?
```

---

### 10. Help and Documentation 🚨 CRITICAL GAP

**Current:**
The playbook *is* documentation, but there's no "help" for using the playbook itself.

**Missing:**
- No "Start Here" guide
- No decision tree: "Which section should I read first?"
- No FAQ
- No worked example end-to-end (use case → patterns applied → artifacts produced)

**Add:**
```
SECTION: Getting Started

Choose Your Path:

1. "I'm designing my first agent experience"
   → Read: Core Thesis → Four Anchors → Examples → Questions
   → Do: Fill out Context Schema Template

2. "I'm reviewing an existing agent design"
   → Read: Failure Modes → Questions → Quality
   → Do: Run the Pre-Launch Checklist

3. "I'm pitching behavior layer to leadership"
   → Read: Why Now → By Role (Exec lens) → Quality
   → Do: Prepare cost-of-not-doing-this estimate

4. "I'm in a contentious meeting and need a question to ask"
   → Use: Quick Ask panel (?) → pick relevant question
```

---

## What's Missing: Headless Implementation Veteran Lens

### 1. **No Architecture Guidance**

Where does behavior layer *live* in the stack?

**Add:**
```
SECTION: Architecture Patterns

Option A: Orchestration Service
- Central service that receives intents, routes to agents, tracks state
- Pro: Single source of truth for behavior logic
- Con: Can become bottleneck
- Use when: <10 agents, centralized control needed

Option B: Event Mesh (Choreography)
- Agents publish events, subscribers react based on behavior rules
- Pro: Decoupled, scales horizontally
- Con: Harder to trace, eventual consistency
- Use when: Many agents, high throughput

Option C: Embedded in Gateway
- API gateway interprets intent, enriches context, routes
- Pro: Minimal latency
- Con: Gateway becomes complex
- Use when: Latency-critical, simpler flows

Most teams need: Hybrid (gateway for routing, orchestrator for stateful flows)
```

### 2. **No Context Schema Guidance**

Every headless system I've built had a **context object spec**. The playbook says "preserve context" but never defines what that *is*.

**Add:**
```
SECTION: Context Schema

Minimum Context Object:
{
  "intent_id": "uuid",
  "user": {
    "id": "string",
    "roles": ["array"],
    "preferences": {"object"}
  },
  "conversation": {
    "history": ["array of turns"],
    "current_topic": "string",
    "disambiguation_state": "none|pending|resolved"
  },
  "workflow": {
    "state": "enum",
    "progress": ["completed_steps"],
    "pending": ["next_steps"],
    "decisions_made": [{"what": "string", "why": "string"}]
  },
  "metadata": {
    "started_at": "timestamp",
    "last_updated": "timestamp",
    "surface": "slack|mobile|email",
    "trace_id": "string"
  }
}

Serialize this at every handoff. Next step deserializes and validates.
```

### 3. **No Testing Strategy**

How do you *test* a behavior layer? It's not a UI. It's not a single API.

**Add:**
```
SECTION: Testing the Behavior Layer

Unit Tests (per pattern):
- Clarify: Ambiguous input → system asks, doesn't guess
- Handoff: Escalation event → context travels to destination
- Recovery: Failure → recovery options returned (not null)

Integration Tests (cross-pattern):
- Scenario: User starts task on mobile, switches to desktop
  - Assert: Context preserved, progress visible
- Scenario: Agent tries 3 vendors, all fail
  - Assert: Escalates with summary of attempts

End-to-End Tests (user journey):
- Test script: "Submit expense report via Slack, manager approves on mobile, finance sees notification"
  - Assert: Context never lost, each actor has what they need

Shadow Mode Testing:
- Run new behavior layer in parallel with old system
- Compare outcomes, escalation rates, context loss
- Switch traffic gradually (10% → 50% → 100%)

Chaos Engineering:
- Kill external API mid-flow → verify graceful degradation
- Inject ambiguous utterances → verify clarification rate
- Simulate human unavailable → verify fallback to another approver
```

### 4. **No Versioning Strategy**

Behavior layer is *logic*. Logic changes. How do you version it?

**Add:**
```
SECTION: Behavior Layer Versioning

Do NOT version the entire behavior layer as one blob. Version patterns independently.

Example:
- clarify_v1: Ask on ambiguity
- clarify_v2: Ask + show top 2 interpretations
- clarify_v3: Ask + show interpretations + log confidence scores

Pattern Version in Event:
{
  "behavior": {
    "clarify": "v2",
    "handoff": "v1",
    "recovery": "v1"
  }
}

Migration Strategy:
1. Deploy new version alongside old (feature flag)
2. Route 10% of traffic to new version
3. Compare metrics (clarification success rate, escalation rate)
4. Rollout or rollback
5. Deprecate old version after 2 weeks of stable new version
```

### 5. **No Cost Model**

What's the *cost* of implementing behavior layer? Teams will ask.

**Add:**
```
SECTION: Implementation Cost Model

Time Investment (rough estimates):

Small System (1-3 agents, 1 surface):
- Design: 2 weeks (map flows, define patterns)
- Implementation: 4 weeks (orchestration + instrumentation)
- Testing: 2 weeks (scenarios + shadow mode)

Medium System (4-10 agents, multi-surface):
- Design: 4 weeks
- Implementation: 8 weeks
- Testing: 4 weeks

Large System (10+ agents, multi-surface, high stakes):
- Design: 8 weeks (includes stakeholder alignment)
- Implementation: 12 weeks
- Testing: 6 weeks

Ongoing Cost:
- Maintenance: 10-20% of dev time
- Instrumentation review: Weekly
- Pattern updates: Quarterly

Cost of NOT doing it:
- 2-3x more time fixing coordination bugs post-launch
- Customer trust erosion (hard to quantify, high impact)
- Tech debt that blocks future agent features
```

---

## Structural Recommendations

### 1. Add a "Deliverables" Section

**What artifacts should teams produce?**

```
DELIVERABLES CHECKLIST

Planning Phase:
□ Intent Map (all ways users express each need)
□ Risk Matrix (what requires approval at what threshold)
□ Context Schema (what travels between steps)
□ Behavior Flow Diagram (visual map of who/what does what)

Design Phase:
□ Clarification Script (how system disambiguates)
□ Escalation Triggers (specific conditions for human involvement)
□ Recovery Path Catalog (failure mode → recovery options)
□ State Machine Diagram (states + transitions + reasons)

Implementation Phase:
□ Event Schema (structure of all behavior layer events)
□ Instrumentation Plan (metrics, logs, traces)
□ Feature Flags (version control for patterns)

Validation Phase:
□ Test Scenarios (covering all patterns)
□ Shadow Mode Results (comparison with baseline)
□ Launch Checklist (pre-flight checks)
```

### 2. Add a "When NOT to Use" Section

**Not every system needs behavior layer.**

```
WHEN NOT TO USE BEHAVIOR LAYER

Skip this if:
- Single-turn Q&A (no multi-step coordination)
- Fully contained in one UI (no handoffs)
- Purely informational (no actions)
- Prototype/demo (not production)

Use lightweight version if:
- 1-2 agents, low stakes
- Internal tool (not customer-facing)
- Well-defined, narrow scope

Use full behavior layer if:
- Multi-step workflows
- Cross-surface (Slack, email, mobile, API)
- Human-in-the-loop approvals
- High stakes (money, data, compliance)
```

### 3. Add a "Case Study" Section

**Show, don't just tell.**

```
CASE STUDY: Expense Reimbursement System

Before Behavior Layer:
- Employee submits expense via email
- Finance manually checks policy
- Approval request sent to manager (new email thread, no context)
- Manager approves (or not, email gets lost)
- Finance manually processes reimbursement
- Employee has no visibility into status

After Behavior Layer:
- Employee submits via Slack, email, or mobile (single door)
- System checks policy automatically (coordinate)
- If over $500, routes to manager with context (handoff)
- Manager approves on mobile (context preserved)
- System schedules payment, notifies employee (coordinate)
- Employee can check status anytime, any surface (visibility)

Patterns Applied:
- Single Door
- Clarify (ambiguous receipts → system asks)
- Handoff Protocol (manager sees full context)
- Task Chaining (approval → payment → notification)
- Recovery (payment fails → retry options)

Metrics (6 months post-launch):
- Time-to-reimbursement: 7 days → 2 days
- Context loss rate: 40% → 2%
- Employee satisfaction: 3.2/5 → 4.6/5
- Finance manual work: -60%
```

---

## Quick Wins (High Impact, Low Effort)

1. **Add a 1-page Quick Reference PDF** (recognition > recall)
2. **Add decision flowchart images** (act vs. ask vs. escalate)
3. **Add "Start Here" section** (reduce friction for new users)
4. **Add Pre-Launch Checklist** (error prevention)
5. **Add Context Schema Template** (consistency & standards)

---

## Final Verdict

**Strengths:**
- Conceptual framework is solid
- Role-based perspectives show empathy
- Examples are concrete
- Design is clean

**Critical Gaps (Nielsen lens):**
- Error prevention: Missing entirely
- Standards: No vocabulary, schema, or conventions
- Help: No "getting started" path
- Testing: How do teams validate this?

**Critical Gaps (Headless veteran lens):**
- No architecture guidance (where does this live?)
- No context schema (what gets preserved?)
- No testing strategy (how do we know it works?)
- No deliverables (what artifacts should teams produce?)
- No cost model (what's the investment?)

**Recommended Next Steps:**

Priority 1 (must-have):
1. Add Pre-Launch Checklist (error prevention)
2. Add Context Schema Template (standards)
3. Add "Start Here" section (help)
4. Add Decision Flowchart (recognition over recall)

Priority 2 (high value):
5. Add Architecture Patterns section
6. Add Testing Strategy section
7. Add Deliverables Checklist
8. Add worked Case Study

Priority 3 (nice-to-have):
9. Add Cost Model
10. Add Versioning Strategy
11. Add "When NOT to Use" section

---

## One More Thing: Accessibility (Nielsen's 11th Heuristic)

The playbook itself has good contrast, responsive design, keyboard navigation (sidebar). Well done.

But: **No guidance on behavior layer accessibility.**

**Add:**
```
SECTION: Accessibility in Behavior Layer

1. Clarification must work non-visually
   - Don't rely on "click option 1 or 2" if user is on screenreader
   - Provide text-based disambiguation

2. Context preservation helps users with cognitive disabilities
   - Not having to repeat yourself is an accessibility feature

3. Recovery paths must be clear and sequential
   - "You can retry or cancel" (simple choice)
   - NOT "Click here to see options, then click again to select, then confirm"

4. Escalation to human is an accessibility feature
   - When agent can't handle edge case, human support is the accessible fallback
```

---

## Summary

This playbook is a **strong conceptual foundation** but needs **practical implementation guidance** to be truly useful.

It's 70% philosophy, 30% practice. Flip that ratio.

Teams need:
- Checklists they can use in meetings
- Templates they can fill out
- Flowcharts they can follow
- Tests they can run
- Metrics they can track

Right now, the playbook inspires. Next version should also *enable*.
