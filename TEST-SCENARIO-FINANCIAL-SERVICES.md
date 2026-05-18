# Test Scenario: FDE Designing Headless Loan Pre-Qualification Agent

## Context
**Company:** Regional bank expanding digital lending  
**User:** Sarah (FDE, 5 years experience, first time building headless agent)  
**Task:** Design behavior layer for loan pre-qualification agent  
**Surfaces:** Mobile app, web, SMS, phone (IVR), branch kiosk  
**Constraints:** Must comply with fair lending regulations, handle sensitive PII  

---

## Hour 0: Sarah Gets the Assignment

**Email from PM:**
> "We need a loan pre-qual agent that works across all channels. Customer starts on mobile, can continue on web or SMS, might call in halfway through. Need to know if they qualify for $5K-$50K personal loan. Should be fast but compliant. Can you design the behavior layer?"

**Sarah's reaction:** 😰 "Behavior layer? I build UIs. What does that even mean?"

**What she Googles:** "behavior layer headless systems"

**What she finds:** This playbook.

---

## Hour 0:15 - Sarah Opens Playbook

### What She Sees:

```
┌─────────────────────────────────────┐
│   BEHAVIOR LAYER PLAYBOOK           │
├─────────────────────────────────────┤
│                                     │
│  Navigation:                        │
│  → Start Here ⭐                    │
│     Spine                           │
│     Concepts                        │
│     By Role                         │
│     Examples                        │
│     Tools                           │
│     Questions                       │
│     Reframes                        │
│                                     │
└─────────────────────────────────────┘
```

**Sarah clicks: "Start Here"**

### She sees the Decision Flowchart first:

```
         User Intent
              ↓
      ┌───────────────┐
      │  Confidence?  │
      └───────┬───────┘
   ┌──────────┼──────────┐
   ↓          ↓          ↓
 <70%     70-90%      >90%
   ↓          ↓          ↓
ESCALATE    ASK      ┌──────┐
(human)   (confirm)  │Risk? │
                     └───┬──┘
                     ┌───┴───┐
                    Low    High
                     ↓      ↓
                   ACT    ASK
```

**Sarah's thought:** *"Okay, so I need confidence thresholds and risk levels. Got it."*

### Then she sees 4 persona paths:

```
🎯 Planning my first agent (45 min)
🔍 Reviewing existing design (30 min)  
💬 In a contentious meeting (2 min)
📊 Pitching to leadership (20 min)
```

**Sarah clicks: "🎯 Planning my first agent"**

### The path shows:

```
You're designing a new agent experience and need structure.

Steps:
1. Read: Core Thesis → Four Anchors (15 min)
2. Use: Pre-Launch Checklist (20 min)
3. Create: Context Schema using template (5 min)
4. Review: Examples for similar scenarios (15 min)

Time estimate: 45 minutes
Deliverables: 
- Behavior flow map
- Context schema
- Risk threshold doc
```

**Sarah's thought:** *"Perfect. Clear path. Let's go."*

---

## Hour 0:30 - Sarah Reads Core Thesis

She clicks **"Spine"** from the path.

### What she sees:

**Core Thesis:**
> "In headless and agentic systems, the experience succeeds or fails based on how the system behaves across steps, surfaces, and humans."

**Four Anchors:**
1. **Intent** - What does the user really need?
2. **Coordinate** - What should happen next?
3. **Context** - What context must carry forward?
4. **Involve** - Where does human judgment matter?

**Sarah maps this to her use case:**

```
Intent: User wants to know → "Do I qualify for a loan?"

Coordinate: Check credit → Verify income → Calculate DTI 
            → Determine eligibility → Return answer

Context: User PII, credit score, income, DTI calculation,
         eligibility decision + reasoning

Involve: Borderline cases (DTI 42%, near cutoff),
         Fair lending flags,
         High loan amounts (>$40K)
```

**Sarah's thought:** *"This is already helping me think through the flow."*

---

## Hour 0:45 - Sarah Goes to Tools → Pre-Launch Checklist

She clicks **"Tools"** in nav → Sees the checklist.

### She starts checking boxes:

#### Section 1: Intent Recognition

```
☐ Intent ambiguity map created?
```

**Sarah pauses.** *"What inputs might be ambiguous?"*

She writes down:
- "I want a loan" (how much? what type?)
- "Can I borrow money?" (personal loan vs. credit card vs. mortgage?)
- "Check my credit" (just viewing vs. pre-qualification?)

```
☑ Intent ambiguity map created ✓
☐ Clarification prompts written for ambiguous phrases?
```

**Sarah writes clarification prompts:**
- Ambiguous: "I want a loan"
  - Clarify: "I can help with that. Are you looking to: 1) Check if you pre-qualify, 2) Apply for a loan, 3) Check existing loan status?"

```
☑ Clarification prompts written ✓
☐ Confidence threshold defined?
```

**Sarah uses the Decision Flowchart:**
- **<70% confidence** → Clarify (ask user)
- **70-90% confidence** → Show top interpretation, ask to confirm
- **>90% confidence** → Proceed (if low risk)

```
☑ Confidence threshold defined ✓
```

#### Section 2: Risk & Authority

```
☐ Risk thresholds documented?
```

**Sarah thinks:** *"What's high-risk in lending?"*

She writes:
- **Low risk:** Pre-qualification only (soft credit check, no commitment)
- **Medium risk:** Loan amount $5K-$25K
- **High risk:** Loan amount >$25K, DTI >43%, recent bankruptcy

```
☑ Risk thresholds documented ✓
☐ Escalation triggers specific?
```

**Sarah defines escalation triggers:**

| Condition | Action |
|-----------|--------|
| DTI ≥ 43% | Escalate to loan officer |
| Credit score < 580 | Suggest secured loan, escalate |
| Loan amount > $40K | Require human approval |
| Fair lending flag | Immediate escalation, audit trail |
| Incomplete income verification | Request documents, human review |

```
☑ Escalation triggers specific ✓
☐ High-stakes actions require confirmation?
```

**Sarah identifies high-stakes actions:**
- Hard credit pull (affects credit score) → **Always confirm**
- Submitting full application → **Confirm + review terms**
- Accepting loan terms → **Explicit consent required**

```
☑ High-stakes actions require confirmation ✓
```

#### Section 3: Context Preservation

```
☐ Context schema defined?
```

**Sarah clicks back to Tools → Context Schema Template**

---

## Hour 1:00 - Sarah Creates Context Schema

### She copies the template and fills it in:

```json
{
  "intent_id": "uuid",
  "user": {
    "id": "customer_id",
    "ssn_last4": "string (PII - encrypted)",
    "roles": ["prospect", "existing_customer"],
    "preferences": {
      "contact_method": "sms|email|phone",
      "language": "en|es"
    }
  },
  "conversation": {
    "history": [
      {
        "role": "user",
        "content": "I want to see if I qualify for a loan",
        "timestamp": "2026-05-17T10:30:00Z",
        "surface": "mobile_app"
      },
      {
        "role": "agent",
        "content": "I can help with that. What loan amount are you considering?",
        "timestamp": "2026-05-17T10:30:02Z"
      }
    ],
    "current_topic": "loan_prequalification",
    "disambiguation_state": "resolved"
  },
  "workflow": {
    "state": "income_verification",
    "progress": [
      "intent_captured",
      "loan_amount_confirmed",
      "credit_checked"
    ],
    "pending": [
      "verify_income",
      "calculate_dti",
      "determine_eligibility"
    ],
    "decisions_made": [
      {
        "what": "loan_amount_requested",
        "value": "$15,000",
        "why": "user_specified"
      },
      {
        "what": "credit_check_result",
        "value": "score_680",
        "why": "soft_pull_transunion",
        "timestamp": "2026-05-17T10:31:15Z"
      }
    ]
  },
  "financial_data": {
    "loan_amount_requested": 15000,
    "credit_score": 680,
    "monthly_income": null,
    "monthly_debt_obligations": null,
    "dti_ratio": null,
    "eligibility_result": null
  },
  "compliance": {
    "fair_lending_flags": [],
    "consent_given": {
      "credit_check": true,
      "data_sharing": true,
      "terms_reviewed": false
    },
    "audit_trail": [
      {
        "action": "soft_credit_pull",
        "actor": "system",
        "timestamp": "2026-05-17T10:31:15Z",
        "reason": "prequalification_check"
      }
    ]
  },
  "metadata": {
    "started_at": "2026-05-17T10:30:00Z",
    "last_updated": "2026-05-17T10:35:42Z",
    "surface": "mobile_app",
    "trace_id": "loan-preq-abc123",
    "session_timeout": "2026-05-17T11:30:00Z"
  }
}
```

**Sarah's additions:**
- `financial_data` section (domain-specific)
- `compliance` section (regulatory requirement)
- `audit_trail` (every decision logged)

**Sarah goes back to checklist:**

```
☑ Context schema defined ✓
☐ Every handoff point serializes full context?
```

**Sarah identifies handoff points:**

1. **Mobile → Web** (user switches mid-flow)
   - Serialize: Full context object
   - How: Generate resume token, QR code, or email link
   - Verify: Web deserializes and validates all fields present

2. **Agent → Loan Officer** (escalation)
   - Serialize: Full context + summary
   - How: Create ticket in loan system with context attached
   - Human sees: Summary card + expandable full history

3. **Mobile → SMS** (user asks to text results)
   - Serialize: Minimal context (intent_id, result)
   - How: SMS includes link: "Tap to continue: [link with intent_id]"
   - Resume: Full context loaded from DB by intent_id

4. **Agent → IVR** (user calls in)
   - Serialize: Read from DB by customer_id
   - How: IVR says "I see you started a loan application..."
   - Context preserved: Pick up exactly where they left off

```
☑ Every handoff point serializes full context ✓
☐ Receiving system validates context?
```

**Sarah writes validation rules:**

```javascript
function validateContext(context) {
  const required = [
    'intent_id',
    'user.id',
    'workflow.state',
    'metadata.trace_id'
  ];
  
  for (let field of required) {
    if (!getNestedValue(context, field)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Domain validation
  if (context.workflow.state === 'determine_eligibility') {
    if (!context.financial_data.dti_ratio) {
      throw new Error('Cannot determine eligibility without DTI');
    }
  }
  
  return true;
}
```

```
☑ Receiving system validates context ✓
```

---

## Hour 1:30 - Sarah Maps the Flow

She uses the **Behavior Flow Map Template** from Tools.

### Her swim-lane diagram:

```
TIME →
─────────────────────────────────────────────────────────────────────

USER:
  [Mobile app] → [Ask about loan] → [Provide income] → [Review decision]
       ↓                                    ↓                    ↓
       
AGENT:
  Receive intent → Clarify → Check credit → Request income → Calculate DTI
       ↓              ↓          ↓              ↓                ↓
       
SYSTEMS:
  Intent service → Credit bureau → Income verify API → Loan engine
       ↓              ↓                  ↓                  ↓
       
DECISIONS:
  High conf? → Low risk? → DTI OK? → Eligible?
    ↓ No         ↓ No       ↓ No      ↓ Yes
    
HUMAN (LOAN OFFICER):
         Clarify ← Escalate ← Review ← (if high DTI or >$40K)
```

### Sarah identifies failure points:

| Step | What Could Fail | Recovery Path |
|------|-----------------|---------------|
| Credit check | Bureau API timeout | Retry 2x, then offer to continue later + save progress |
| Income verify | User can't provide docs | Escalate to loan officer OR suggest secured loan |
| DTI calculation | Missing debt data | Ask user to confirm debts, show estimated range |
| Surface switch | Context lost | User says "I already told you this" → RED FLAG |

---

## Hour 1:45 - Sarah Designs Decision Logic

Using the **Decision Flowchart**, she maps every decision point:

### Decision 1: Should agent proceed with credit check?

**Inputs:**
- User intent: "I want to see if I qualify"
- Consent status: Not yet given

**Decision:**
```
Confidence: 95% (clear intent)
Risk: Medium (soft pull = low impact, but still PII)
→ Decision: ASK (request consent before acting)
```

**Sarah writes:**
```javascript
if (intent === 'prequalification' && !consent.credit_check) {
  return {
    action: 'ask_consent',
    message: 'To check your eligibility, I'll need to do a soft credit check. This won't affect your credit score. May I proceed?',
    options: ['Yes, check my credit', 'Tell me more first', 'No thanks']
  };
}
```

### Decision 2: User's DTI is 42% (cutoff is 43%)

**Inputs:**
- DTI: 42% (just under threshold)
- Credit score: 680 (decent)
- Loan amount: $15K (medium)

**Decision:**
```
Confidence: 85% (eligible, but close to line)
Risk: Medium (near cutoff, could be borderline)
→ Decision: ASK (show reasoning, let human verify)
```

**Sarah writes:**
```javascript
if (dti >= 40 && dti < 43) {
  return {
    action: 'escalate_with_recommendation',
    message: 'Based on your income and debts, you appear to qualify. However, your debt-to-income ratio is close to our threshold. I'd like a loan officer to review and confirm. Is that okay?',
    recommendation: 'APPROVE with conditions',
    reason: 'DTI 42% (acceptable but borderline)',
    human_review_required: true
  };
}
```

### Decision 3: User's DTI is 48% (above threshold)

**Inputs:**
- DTI: 48% (above 43% cutoff)
- Credit score: 680
- Loan amount: $15K

**Decision:**
```
Confidence: 95% (clearly ineligible under current policy)
Risk: Low (declining is low-risk)
→ Decision: ACT (explain decline, offer alternatives)
```

**Sarah writes:**
```javascript
if (dti >= 43) {
  return {
    action: 'decline_with_alternatives',
    message: 'Based on your current income and debt obligations, you don't qualify for this loan amount at this time. However, I can help you with:',
    alternatives: [
      {
        option: 'Lower loan amount',
        description: 'You may qualify for up to $8K based on your DTI',
        action: 'recalculate_with_amount'
      },
      {
        option: 'Add a co-applicant',
        description: 'Combining income could improve your DTI',
        action: 'escalate_to_loan_officer'
      },
      {
        option: 'Speak with a loan officer',
        description: 'Discuss other options and financial strategies',
        action: 'escalate_to_human'
      }
    ],
    reasoning: 'Your debt-to-income ratio (48%) exceeds our maximum threshold (43%)',
    audit: true
  };
}
```

**Sarah's key insight:** *"Never just say 'no.' Always offer a path forward."*

---

## Hour 2:00 - Sarah Uses Testing Protocols

She goes back to **Tools → Testing Protocols** and picks relevant ones:

### Test 1: Interrupt Test

**Scenario:** User starts on mobile, switches to web mid-flow.

**Steps:**
1. Start pre-qualification on mobile
2. Complete: intent, loan amount, consent to credit check
3. Credit check runs (score: 680)
4. App asks for income
5. **User closes app, opens web browser**
6. Web shows: "Continue your loan application"
7. User clicks → **Verify: Sees "We already have your credit score (680). Let's verify your income."**

**Pass condition:** Zero context loss, user doesn't repeat credit check.

**Sarah's test plan:**
```javascript
describe('Context Preservation: Mobile → Web', () => {
  it('should resume with full context', async () => {
    // 1. Start on mobile
    const session = await startPrequalification('mobile', userId);
    await provideConsent(session, 'credit_check');
    await runCreditCheck(session); // score: 680
    
    // 2. Serialize context
    const resumeToken = await session.serialize();
    
    // 3. Resume on web
    const webSession = await resumeFromToken(resumeToken, 'web');
    
    // 4. Verify
    expect(webSession.financial_data.credit_score).toBe(680);
    expect(webSession.workflow.state).toBe('income_verification');
    expect(webSession.workflow.progress).toContain('credit_checked');
  });
});
```

### Test 2: Ambiguity Stress Test

**Scenario:** Feed ambiguous utterances, verify clarification.

**Sarah's test cases:**

| User Input | Expected Behavior | Pass/Fail |
|------------|-------------------|-----------|
| "I want a loan" | ASK: "What amount are you considering?" | |
| "Check my credit" | ASK: "Are you checking to prequalify for a loan or just view your score?" | |
| "Can I borrow $50K?" | ASK: "For a personal loan or mortgage?" (>$40K triggers different products) | |
| "I make $5K a month" | ACT: Proceed with income verification (clear data) | |

**Sarah writes:**
```javascript
describe('Ambiguity Handling', () => {
  it('should clarify ambiguous loan amount', async () => {
    const response = await agent.handleIntent('I want a loan');
    
    expect(response.action).toBe('clarify');
    expect(response.message).toContain('What amount');
    expect(response.options).toHaveLength(3);
  });
  
  it('should NOT clarify clear intent', async () => {
    const response = await agent.handleIntent('I want to see if I qualify for a $15K personal loan');
    
    expect(response.action).toBe('proceed');
    expect(response.loan_amount).toBe(15000);
    expect(response.product_type).toBe('personal_loan');
  });
});
```

### Test 3: Authority Boundary Test

**Scenario:** Agent should stop at risk thresholds.

**Sarah's test:**
```javascript
describe('Escalation Thresholds', () => {
  it('should escalate when DTI >= 43%', async () => {
    const result = await agent.calculateEligibility({
      income: 5000,
      debts: 2150, // DTI = 43%
      loan_amount: 15000
    });
    
    expect(result.action).toBe('escalate');
    expect(result.reason).toContain('DTI');
    expect(result.human_review_required).toBe(true);
  });
  
  it('should escalate when loan amount > $40K', async () => {
    const result = await agent.calculateEligibility({
      income: 10000,
      debts: 2000, // DTI = 20% (good)
      loan_amount: 45000 // Above threshold
    });
    
    expect(result.action).toBe('escalate');
    expect(result.reason).toContain('loan amount');
  });
  
  it('should NOT escalate when all green', async () => {
    const result = await agent.calculateEligibility({
      income: 6000,
      debts: 1500, // DTI = 25% (good)
      loan_amount: 15000 // Normal amount
    });
    
    expect(result.action).toBe('approve');
    expect(result.human_review_required).toBe(false);
  });
});
```

---

## Hour 2:30 - Sarah Checks Examples

She goes to **Examples** section → Looks for similar scenarios.

### She finds: "Invoice Processing"

**Pattern:** System acts when confident, asks when not.

**Sarah's takeaway:** *"Same pattern. Credit score clear → act. DTI borderline → ask."*

### She finds: "Scheduled Report" 

**Pattern:** Automation detects anomaly → pauses → asks human.

**Sarah maps to her use case:**
- Loan agent calculates DTI → detects borderline (42%) → pauses → escalates with recommendation

### Failure Mode Example:

From **"Customer Refund"** example:

```
Failure: Human agent sees empty ticket
Impact: Customer repeats entire story
Prevention: Handoff includes full context
```

**Sarah applies:**
```
Failure: Loan officer sees empty escalation ticket
Impact: Officer has to re-verify income, re-check credit
Prevention: Escalation includes:
  - All user inputs (income, debts)
  - Credit check result + timestamp
  - DTI calculation + reasoning
  - Loan amount requested
  - Why escalated (borderline DTI)
```

---

## Hour 2:45 - Sarah Completes Checklist

She returns to **Pre-Launch Checklist** and finishes:

```
✓ Intent Recognition (5/5 checks)
✓ Risk & Authority (4/4 checks)
✓ Context Preservation (4/4 checks)
✓ Failure & Recovery (4/4 checks)
✓ Handoffs (4/4 checks)
☐ Instrumentation (0/6 checks)
```

### Instrumentation Section:

```
☐ Key metrics defined?
```

**Sarah defines metrics:**

```yaml
# Behavior Layer Metrics

context_preservation_rate:
  description: "% of surface switches with full context"
  calculation: "(successful_resumes / total_surface_switches) * 100"
  target: "> 98%"
  alert_threshold: "< 95%"

clarification_request_rate:
  description: "% of intents requiring clarification"
  calculation: "(clarify_requests / total_intents) * 100"
  target: "10-20%"
  alert_threshold: "> 30% (too much) or < 5% (guessing)"

escalation_rate:
  description: "% of applications escalated to human"
  calculation: "(escalations / total_applications) * 100"
  target: "15-25%"
  alert_threshold: "> 40% (agent not useful) or < 5% (acting beyond authority)"

escalation_reasons:
  description: "Breakdown of why escalations happened"
  categories:
    - high_dti
    - low_credit_score
    - high_loan_amount
    - fair_lending_flag
    - user_requested
  tracked_as: "structured enum"

recovery_success_rate:
  description: "% of failures with successful recovery"
  calculation: "(recovered_failures / total_failures) * 100"
  target: "> 90%"

user_repeat_rate:
  description: "How often user repeats information"
  detection: "Text similarity score on repeated utterances"
  target: "< 2%"
  alert_threshold: "> 5% (context loss)"
```

```
☑ Key metrics defined ✓
☐ Logging captures intent_id, user_id, trace_id?
```

**Sarah writes logging spec:**

```javascript
// Every behavior layer event logs:
{
  event_type: 'intent_received|clarification_requested|action_executed|escalated',
  event_id: 'uuid',
  intent_id: 'uuid', // Links all events for one application
  timestamp: 'ISO8601',
  actor: {
    type: 'user|agent|system|loan_officer',
    id: 'string'
  },
  context: {
    workflow_state: 'string',
    surface: 'mobile|web|sms|ivr',
    confidence_score: 0.95
  },
  payload: {
    // Event-specific data
  },
  trace_id: 'string', // Distributed tracing
  user_id: 'customer_id',
  session_id: 'string'
}
```

```
☑ Logging captures required fields ✓
☐ Dashboards show completion rate, failure points?
```

**Sarah sketches dashboard:**

```
┌─────────────────────────────────────────────┐
│  Loan Prequalification Agent Dashboard     │
├─────────────────────────────────────────────┤
│                                             │
│  Completion Rate:  78%  ↑ 5% vs. last week │
│  Avg. Time:        4m 32s                   │
│  Context Loss:     1.2%  ✓ Under target    │
│                                             │
│  Where flows break:                         │
│  ┌────────────────────────────────────┐    │
│  │ Income verification    45%         │    │
│  │ Credit check timeout   25%         │    │
│  │ User abandonment       20%         │    │
│  │ DTI calculation error  10%         │    │
│  └────────────────────────────────────┘    │
│                                             │
│  Escalation Breakdown:                      │
│  ┌────────────────────────────────────┐    │
│  │ High DTI (>43%)       58%          │    │
│  │ High loan amount      22%          │    │
│  │ Low credit score      12%          │    │
│  │ User requested         8%          │    │
│  └────────────────────────────────────┘    │
│                                             │
│  Recovery Success:  92%  ✓ Target met      │
│                                             │
└─────────────────────────────────────────────┘
```

```
☑ Dashboards designed ✓
☑ Alerts configured ✓
```

**Final checklist:**
```
✓ Intent Recognition (5/5)
✓ Risk & Authority (4/4)
✓ Context Preservation (4/4)
✓ Failure & Recovery (4/4)
✓ Handoffs (4/4)
✓ Instrumentation (6/6)
```

---

## Hour 3:00 - Sarah Has Her Deliverables

### 1. Context Schema (ready to implement)

```json
{
  "intent_id": "uuid",
  "user": {...},
  "conversation": {...},
  "workflow": {
    "state": "enum",
    "progress": [...],
    "pending": [...],
    "decisions_made": [...]
  },
  "financial_data": {
    "loan_amount_requested": "number",
    "credit_score": "number",
    "monthly_income": "number",
    "monthly_debt_obligations": "number",
    "dti_ratio": "number",
    "eligibility_result": "string"
  },
  "compliance": {
    "fair_lending_flags": [],
    "consent_given": {...},
    "audit_trail": [...]
  },
  "metadata": {...}
}
```

### 2. Behavior Flow Map (visual)

```
User Intent → Clarify → Consent → Credit Check → Income Verify
                                         ↓
                                    Calculate DTI
                                         ↓
                    ┌────────────────────┼────────────────────┐
                    ↓                    ↓                    ↓
               DTI < 40%             DTI 40-43%           DTI > 43%
                    ↓                    ↓                    ↓
                 APPROVE          ESCALATE (borderline)   DECLINE
                                  with recommendation     with alternatives
```

### 3. Decision Authority Matrix

| Scenario | Agent Action | Human Required? |
|----------|--------------|-----------------|
| DTI < 40% + Credit > 640 | Approve | No |
| DTI 40-43% | Recommend approval, escalate | Yes |
| DTI > 43% | Decline + offer alternatives | No (unless user requests) |
| Loan > $40K | Escalate | Yes |
| Credit < 580 | Suggest alternatives | Yes |
| Fair lending flag | Escalate immediately | Yes |

### 4. Risk Threshold Document

```yaml
Confidence Thresholds:
  - >90%: Proceed (if low risk)
  - 70-90%: Confirm with user
  - <70%: Clarify intent

Risk Levels:
  Low:
    - Pre-qualification (soft pull)
    - Loan amount < $25K
    - DTI < 40%
    
  Medium:
    - Loan amount $25K-$40K
    - DTI 40-43%
    
  High:
    - Loan amount > $40K
    - DTI > 43%
    - Credit score < 580
    - Fair lending flag
    - Recent bankruptcy

Escalation Rules:
  - High risk + any confidence → Escalate
  - Medium risk + low confidence → Escalate
  - Low risk + high confidence → Proceed
```

### 5. Testing Protocols (6 tests ready to run)

- Interrupt Test (mobile → web context preservation)
- Ambiguity Test (clarification prompts)
- Authority Boundary Test (escalation thresholds)
- Recovery Path Test (credit bureau timeout)
- Context Handoff Test (agent → loan officer)
- Failure Cascade Test (income verify fails after credit check)

### 6. Instrumentation Plan

- 6 metrics defined with targets
- Logging spec (structured events)
- Dashboard mockup
- Alert thresholds

---

## Hour 3:15 - Sarah Meets with PM

**PM:** "Do you understand what a behavior layer is now?"

**Sarah:** "Yes. It's the orchestration logic that decides when the agent acts, asks, or escalates, and how context travels across surfaces."

**PM:** "Great. Can you build it?"

**Sarah:** "I have everything I need."

**She shows:**

1. **Context Schema** → "This is what travels between mobile, web, SMS"
2. **Decision Flowchart** → "This is when we act vs. ask vs. escalate"
3. **Flow Map** → "This is the entire journey with failure paths"
4. **Checklist** → "All 27 checks passed"
5. **Tests** → "6 protocols ready to validate behavior"

**PM:** "How long to implement?"

**Sarah:** "2 weeks for MVP. I know exactly what to build."

**PM:** 🤯 "You did this in 3 hours?"

**Sarah:** "The playbook gave me the structure. I just followed the path."

---

## Key Moments: How Playbook Helped

### Intent (Anchor 1)

**Problem Sarah solved:**
- Ambiguous inputs like "I want a loan"
- Clarification prompts written
- Confidence thresholds defined (70%, 90%)

**Playbook tool used:**
- Decision Flowchart
- Clarify pattern from Concepts
- Ambiguity Stress Test

### Coordinate (Anchor 2)

**Problem Sarah solved:**
- Multi-step flow: credit check → income verify → DTI → eligibility
- What happens next at each step
- Failure recovery paths (credit bureau timeout → retry → save progress)

**Playbook tool used:**
- Task Chaining pattern
- Behavior Flow Map Template
- Failure Cascade Test

### Context (Anchor 3)

**Problem Sarah solved:**
- User switches from mobile to web mid-flow
- Agent escalates to loan officer
- Context must include: credit score, income, DTI, decisions made
- Handoff includes full context + summary

**Playbook tool used:**
- Context Schema Template (copy-pasted and customized)
- Handoff Protocol pattern
- Context Handoff Test
- Interrupt Test

### Involve (Anchor 4)

**Problem Sarah solved:**
- When should agent escalate? (DTI >43%, loan >$40K, borderline cases)
- How should it escalate? (with recommendation + reasoning)
- What should human see? (full context, not empty ticket)
- Fair lending compliance (immediate escalation + audit)

**Playbook tool used:**
- Decision Authority Matrix checklist
- Risk threshold definitions
- Authority Boundary Test
- Escalation examples from "Customer Refund"

---

## What Sarah Built (Concrete Artifacts)

### 1. State Machine

```javascript
const states = {
  INITIATED: 'initiated',
  INTENT_CLARIFYING: 'intent_clarifying',
  LOAN_AMOUNT_CONFIRMED: 'loan_amount_confirmed',
  CONSENT_PENDING: 'consent_pending',
  CREDIT_CHECKING: 'credit_checking',
  INCOME_VERIFYING: 'income_verifying',
  DTI_CALCULATING: 'dti_calculating',
  ELIGIBILITY_DETERMINED: 'eligibility_determined',
  ESCALATED: 'escalated',
  APPROVED: 'approved',
  DECLINED: 'declined',
  FAILED: 'failed'
};

const transitions = {
  [states.INITIATED]: {
    on_high_confidence: states.LOAN_AMOUNT_CONFIRMED,
    on_low_confidence: states.INTENT_CLARIFYING
  },
  [states.LOAN_AMOUNT_CONFIRMED]: {
    on_consent_given: states.CREDIT_CHECKING,
    on_consent_denied: states.DECLINED
  },
  [states.CREDIT_CHECKING]: {
    on_success: states.INCOME_VERIFYING,
    on_failure: states.FAILED,
    on_timeout: states.FAILED // with recovery options
  },
  // ... etc
};
```

### 2. Escalation Handler

```javascript
function shouldEscalate(application) {
  const { dti, loan_amount, credit_score, flags } = application;
  
  // Immediate escalation
  if (flags.fair_lending) {
    return {
      escalate: true,
      priority: 'immediate',
      reason: 'fair_lending_flag',
      human_action: 'review_and_approve'
    };
  }
  
  // High loan amount
  if (loan_amount > 40000) {
    return {
      escalate: true,
      priority: 'high',
      reason: 'high_loan_amount',
      recommendation: 'review_terms',
      context: application.toJSON()
    };
  }
  
  // Borderline DTI
  if (dti >= 40 && dti < 43) {
    return {
      escalate: true,
      priority: 'medium',
      reason: 'borderline_dti',
      recommendation: 'approve_with_conditions',
      context: application.toJSON()
    };
  }
  
  // High DTI - decline with alternatives
  if (dti >= 43) {
    return {
      escalate: false,
      action: 'decline_with_alternatives',
      alternatives: generateAlternatives(application)
    };
  }
  
  return { escalate: false };
}
```

### 3. Context Serialization

```javascript
class LoanApplication {
  serialize() {
    return {
      intent_id: this.intent_id,
      user: this.user,
      conversation: this.conversation,
      workflow: this.workflow,
      financial_data: this.financial_data,
      compliance: this.compliance,
      metadata: {
        ...this.metadata,
        serialized_at: new Date().toISOString()
      }
    };
  }
  
  static deserialize(data) {
    validateContext(data); // Throws if missing required fields
    return new LoanApplication(data);
  }
  
  resumeOnSurface(new_surface) {
    this.metadata.surface = new_surface;
    this.metadata.last_updated = new Date().toISOString();
    
    // Log surface switch
    this.logEvent({
      event_type: 'surface_switched',
      from: this.metadata.previous_surface,
      to: new_surface,
      context_preserved: true
    });
  }
}
```

---

## Validation: Running Tests

Sarah runs her 6 tests:

```bash
$ npm test

✓ Interrupt Test: Mobile → Web context preservation
✓ Ambiguity Test: Clarification prompts trigger correctly
✓ Authority Boundary Test: Escalates at DTI > 43%
✓ Recovery Test: Credit timeout → retry → save progress
✓ Context Handoff Test: Loan officer sees full context
✓ Failure Cascade Test: Income fail after credit doesn't lose credit data

6 passing (342ms)
```

**Sarah's confidence:** 🚀

---

## Week 2: Sarah Implements

- **Day 1-2:** Build state machine + context schema
- **Day 3-4:** Implement decision logic (act/ask/escalate)
- **Day 5-6:** Build handoff serialization
- **Day 7-8:** Add instrumentation + logging
- **Day 9:** Integration testing
- **Day 10:** Deploy to staging

**Week 3: Validation**

```
Context Preservation Rate: 99.2% ✓
Clarification Rate: 18% ✓ (target: 10-20%)
Escalation Rate: 22% ✓ (target: 15-25%)
Recovery Success Rate: 94% ✓
User Repeat Rate: 0.8% ✓ (target: < 2%)
```

**Result:** ✅ Launch approved

---

## Sarah's Reflection

**What the playbook gave her:**

1. **Structure** - Clear path from "what?" to "how"
2. **Templates** - Context schema, not starting from scratch
3. **Checklists** - 27 checks ensured nothing missed
4. **Patterns** - Learned from other use cases
5. **Testing** - Knew how to validate before launch
6. **Confidence** - Had artifacts to show PM/Eng

**What she would've done without playbook:**

1. Googled "how to build agent" → 50 blog posts, no structure
2. Built UI-centric (not headless)
3. Forgotten about context preservation
4. No escalation thresholds (agent acts beyond authority)
5. No testing protocols (bugs in production)
6. Week 3: Redesign after PM says "this isn't what I asked for"

**Time saved:** ~3 weeks of trial-and-error

---

## PM's Reflection

**Before playbook:**
- "Behavior layer" was a vague concept
- FDEs built UIs, not orchestration logic
- Coordination bugs discovered post-launch
- 3-4 weeks fixing "context lost" issues

**After playbook:**
- FDE understood in 3 hours
- Clear deliverables (schema, checklist, tests)
- Caught issues before launch (via checklist)
- Clean handoffs (mobile ↔ web ↔ SMS)

**Result:**
- Faster time-to-market
- Higher quality
- Less technical debt
- Reusable patterns for next agent

---

## Final Artifacts Sarah Delivered

```
📁 loan-prequalification-agent/
├── 📄 BEHAVIOR-DESIGN.md
│   ├── Context Schema
│   ├── Decision Authority Matrix
│   ├── Risk Thresholds
│   └── Flow Map
│
├── 📄 TESTING-PROTOCOLS.md
│   ├── 6 test scenarios
│   ├── Pass conditions
│   └── Test results
│
├── 📄 INSTRUMENTATION.md
│   ├── Metrics definitions
│   ├── Logging spec
│   ├── Dashboard design
│   └── Alert thresholds
│
├── 💻 src/
│   ├── state-machine.js
│   ├── context-schema.js
│   ├── decision-engine.js
│   ├── escalation-handler.js
│   └── serialization.js
│
└── 🧪 tests/
    ├── interrupt.test.js
    ├── ambiguity.test.js
    ├── authority.test.js
    ├── recovery.test.js
    ├── handoff.test.js
    └── failure-cascade.test.js
```

**All from 3 hours with the playbook.**

---

## The 4 Anchors in Action (Summary)

### Intent → "Do I qualify?"
- **Ambiguous:** "I want a loan" → Agent clarifies amount
- **Clear:** "I want to see if I qualify for a $15K personal loan" → Agent proceeds
- **Confidence:** <70% clarify, 70-90% confirm, >90% act

### Coordinate → Multi-step flow
- Credit check → Income verify → DTI → Eligibility
- Each step knows what's next
- Failures have recovery paths (timeout → retry → save)

### Context → Preserved everywhere
- Mobile → Web: Full context travels via resume token
- Agent → Loan Officer: Escalation includes full history + reasoning
- User never repeats themselves
- Context Schema defines exactly what travels

### Involve → Human at right moments
- DTI >43% → Escalate
- Loan >$40K → Escalate
- Fair lending flag → Immediate escalation
- Borderline (DTI 40-43%) → Escalate with recommendation
- Clear cases → Agent approves/declines with alternatives

---

## Playbook Value: Quantified

**Sarah's journey:**
- **Hour 0-0.5:** Understand behavior layer concept
- **Hour 0.5-1:** Map to use case (4 anchors)
- **Hour 1-2:** Design (checklist, schema, flow)
- **Hour 2-3:** Validate (tests, examples, patterns)
- **Total:** 3 hours from "what's behavior layer?" to validated design

**Without playbook:** ~2-3 weeks (trial-and-error, multiple redesigns)

**ROI:** 10-15x faster time-to-design

**Quality improvement:**
- ✅ Nothing forgotten (checklist)
- ✅ Testable (6 protocols)
- ✅ Standard schemas (context, events)
- ✅ Error prevention built in

---

## Conclusion

The playbook transformed Sarah from:
- "I don't know what behavior layer is"

To:
- "I have a complete behavior design with schemas, tests, and metrics"

In **3 hours**.

**The key moves:**
1. Started with "Start Here" (not reading everything)
2. Followed persona path (planning first agent)
3. Used tools (checklist, templates, flowchart)
4. Referenced examples (learned from others)
5. Ran tests (validated before building)

**Result:** Production-ready behavior layer design for a complex financial services agent, addressing all 4 anchors (Intent, Coordinate, Context, Involve) with concrete artifacts ready for implementation.

🎯
