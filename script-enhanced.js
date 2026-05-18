const quickQuestions = [
    "What happens when this step fails?",
    "How does the system know when to ask a human?",
    "What context does the next step need?",
    "Does the user know what the system just did?",
    "If I interrupt this, does my intent get lost?",
    "What would make the user stop trusting this?",
    "Is this one task or three tasks pretending to be one?",
    "Does the system explain its reasoning or just its result?",
    "Can the user undo this later?",
    "If this ran at 3am with no one watching, what could go wrong?"
];

const roleQuestionMap = {
    'PM': "If your roadmap includes agents or workflows, how will they behave when users interrupt them mid-flow?",
    'Eng': "What's the API contract between intent recognition and task execution in your architecture?",
    'UX': "When you draw the happy path, what happens at step 3 if step 2 fails?",
    'Editorial': "When the system explains why it escalated, whose voice is that? The system's or the user's?"
};

const conceptExampleMap = {
    'Headless': "Customer asks Slack bot for refund. Bot checks policy, routes to agent if needed, updates CRM, sends confirmation email. No single screen contains the whole flow.",
    'Task Chaining': "Approve invoice → auto-creates payment record → schedules bank transfer → notifies AP team. Each step feeds the next.",
    'Single Door': "Submit expense report through Slack, email, or mobile app. Same task ID, same approval queue, same audit trail.",
    'Trust': "Agent says: 'I found three eligible vendors. I'm recommending TechCorp because they met delivery SLA last quarter. Approve or pick another?'",
    'Handoff': "Agent escalates to human support. The human sees: what the agent tried, what failed, customer history, current sentiment.",
    'Recovery': "Payment fails. System: 'Your card was declined. I can retry with another card, split the payment, or pause the order. What works?'",
    'Human Control': "Agent is processing a bulk update. User: 'Stop. Exclude records from Q1.' System pauses, adjusts scope, confirms, resumes.",
    'Clarify': "User says 'update my credentials.' Agent responds: 'I can help with that. Do you need to reset your VPN password or update your SSO security questions?'",
    'Detour': "Mid-flight booking, user asks: 'Is Wi-Fi free?' Agent answers, then says: 'Wi-Fi is complimentary. Back to your booking—what's your departure date?'"
};

const data = {
    spine: {
        thesis: "In headless and agentic systems, the experience succeeds or fails based on how the system behaves across steps, surfaces, and humans.",
        responsibility: "Design how intent becomes coordinated action, while preserving context, control, and trust.",
        memorable: "Headless is not UI-less. It is coordination-first: the experience lives in how intent, context, work, and humans stay connected.",
        quickQuestions: [
            { label: "Intent", question: "What does the user really need?" },
            { label: "Coordinate", question: "What should happen next?" },
            { label: "Context", question: "What context must carry forward?" },
            { label: "Involve", question: "Where does human judgment matter?" }
        ],
        anchors: [
            {
                label: "Intent",
                pill: "intent",
                name: "Interpret intent",
                meaning: "Understand what the user is trying to accomplish, not just what they typed.",
                question: "What does the user need: answer, action, decision, reassurance, or escalation?",
                prevents: "The system treats a high-stakes need like a generic question."
            },
            {
                label: "Coordinate",
                pill: "coordinate",
                name: "Move work across steps",
                meaning: "Coordinate work across agents, systems, tools, and people.",
                question: "What should happen next, and who or what owns it?",
                prevents: "The user gets explanation instead of progress."
            },
            {
                label: "Context",
                pill: "context",
                name: "Preserve context",
                meaning: "Carry the meaning, state, and history forward.",
                question: "What must not get lost as the work moves?",
                prevents: "The user repeats themselves or loses important nuance."
            },
            {
                label: "Involve",
                pill: "human",
                name: "Involve a human",
                meaning: "Bring people in where judgment, risk, consent, or accountability matters.",
                question: "When should the system ask, approve, escalate, or stop?",
                prevents: "The agent acts beyond its authority or hides risk."
            }
        ]
    },

    // NEW: Getting Started Guide
    gettingStarted: {
        paths: [
            {
                persona: "Planning my first agent",
                icon: "🎯",
                description: "You're designing a new agent experience and need structure",
                steps: [
                    "Go to: Coordination Spine (read the 4 anchors: Intent, Coordinate, Context, Involve)",
                    "Go to: Decision Tools (use Pre-Launch Checklist)",
                    "Go to: Decision Tools (copy Context Schema template)",
                    "Go to: Experience Examples or Test Cases (find similar scenarios)"
                ],
                timeEstimate: "45 minutes",
                deliverables: ["Behavior flow map", "Context schema", "Decision matrix"]
            },
            {
                persona: "Reviewing existing design",
                icon: "🔍",
                description: "Your agent is scoped and you need to audit for gaps",
                steps: [
                    "Go to: Decision Tools (run Pre-Launch Checklist)",
                    "Go to: Alignment Questions (ask these during review)",
                    "Go to: Decision Tools (run Testing Protocols)",
                    "Go to: Core Concepts (check against patterns)"
                ],
                timeEstimate: "30 minutes",
                deliverables: ["Gap analysis", "Test results", "Fix recommendations"]
            },
            {
                persona: "In a contentious meeting",
                icon: "💬",
                description: "Need a sharp question to surface hidden assumptions",
                steps: [
                    "Click: ? button (bottom right corner) for Quick Ask",
                    "Or go to: Alignment Questions",
                    "Or go to: Leadership Reframes (for objection responses)"
                ],
                timeEstimate: "2 minutes",
                deliverables: ["Decision clarity", "Aligned team"]
            },
            {
                persona: "Pitching to leadership",
                icon: "📊",
                description: "Need to build business case for headless work",
                steps: [
                    "Go to: Coordination Spine (understand thesis and 4 anchors)",
                    "Go to: Role Guidance (see PM perspective for business value)",
                    "Go to: Test Cases (show industry examples with metrics)",
                    "Go to: Leadership Reframes (answer objections)"
                ],
                timeEstimate: "20 minutes",
                deliverables: ["Business case", "Industry examples", "Objection responses"]
            }
        ]
    },

    concepts: [
        {
            title: "Headless",
            description: "No single surface owns the experience. The system coordinates action across multiple touchpoints without a central UI.",
            example: "Customer asks Slack bot for refund. Bot checks policy, routes to agent if needed, updates CRM, sends confirmation email. No single screen contains the whole flow.",
            tags: ["Headless"],
            principle: "Design the transitions, not just the screens.",
            // NEW: Implementation guidance
            howToImplement: [
                "Map all touchpoints where user can initiate or interact",
                "Define a single source of truth for task state (one DB, one ID)",
                "Ensure context travels with the task (use context schema)",
                "Instrument every transition (log when work moves between systems)"
            ],
            redFlags: [
                "Different systems show different task status",
                "User has to remember which surface they started on",
                "Context lost when switching surfaces"
            ]
        },
        {
            title: "Task Chaining",
            description: "One action triggers the next. The system knows what comes after and prepares the next step without waiting for the user.",
            example: "Approve invoice → auto-creates payment record → schedules bank transfer → notifies AP team. Each step feeds the next.",
            tags: ["Task Chaining"],
            principle: "Make the system proactive about what happens next.",
            howToImplement: [
                "Model each step as an event that publishes 'completed' state",
                "Next step subscribes to completion event and auto-initiates",
                "Include rollback strategy if later step fails",
                "Provide visibility: show user what's happening next"
            ],
            redFlags: [
                "User has to manually trigger obvious next step",
                "System waits for user when it has everything it needs",
                "Chain breaks silently if one step fails"
            ]
        },
        {
            title: "Single Door",
            description: "One clear entry point for a task, regardless of where it gets completed.",
            example: "Submit expense report through Slack, email, or mobile app. Same task ID, same approval queue, same audit trail.",
            tags: ["Single Door"],
            principle: "Don't make users guess which channel is 'official.'",
            howToImplement: [
                "Use unified task ID across all surfaces",
                "Route all entry points to same workflow engine",
                "Normalize inputs to common schema before processing",
                "Maintain single audit log regardless of entry channel"
            ],
            redFlags: [
                "Different channels have different approval processes",
                "User asks 'which way is faster?'",
                "Reports show inconsistent data by channel"
            ]
        },
        {
            title: "Trust Signals",
            description: "The system shows it's working, shows its reasoning, and shows when it's unsure.",
            example: "Agent says: 'I found three eligible vendors. I'm recommending TechCorp because they met delivery SLA last quarter. Approve or pick another?'",
            tags: ["Trust"],
            principle: "Confidence without explanation breaks trust.",
            howToImplement: [
                "Log reasoning alongside decisions (why this vendor, this approval path, etc.)",
                "Surface confidence scores to user when relevant",
                "Explain what the system tried before escalating",
                "Provide audit trail: who/what did what, when, why"
            ],
            redFlags: [
                "System makes decisions with no explanation",
                "User asks 'why did it do that?' and no one knows",
                "Agent confident in wrong answer (no uncertainty signal)"
            ]
        },
        {
            title: "Handoff Protocol",
            description: "When work moves from system to human or human to system, context must travel with it.",
            example: "Agent escalates to human support. The human sees: what the agent tried, what failed, customer history, current sentiment.",
            tags: ["Handoff"],
            principle: "Never make the human start over.",
            howToImplement: [
                "Use context schema (see Tools section)",
                "Serialize context at handoff point",
                "Destination deserializes and validates (error if missing key fields)",
                "Provide summary + full context (human sees both)"
            ],
            redFlags: [
                "Human support says 'can you repeat that?'",
                "Agent-to-agent handoffs lose conversation history",
                "Approver has to hunt for context in other systems"
            ]
        },
        {
            title: "Recovery Path",
            description: "When something fails, the system must guide toward resolution, not abandonment.",
            example: "Payment fails. System: 'Your card was declined. I can retry with another card, split the payment, or pause the order. What works?'",
            tags: ["Recovery"],
            principle: "Failure is not a dead end. It's a fork.",
            howToImplement: [
                "For every failure mode, define 2-3 recovery options",
                "Preserve progress (user shouldn't lose completed steps)",
                "Explain what happened and why (if knowable)",
                "If no recovery possible, say why and offer next best alternative"
            ],
            redFlags: [
                "Error messages with no actionable next step",
                "User has to start entire flow over after one step fails",
                "System fails silently (user doesn't know anything broke)"
            ]
        },
        {
            title: "Human Control",
            description: "User can interrupt, redirect, or override at any point without breaking the system.",
            example: "Agent is processing a bulk update. User: 'Stop. Exclude records from Q1.' System pauses, adjusts scope, confirms, resumes.",
            tags: ["Human Control"],
            principle: "Autonomy is permission, not possession.",
            howToImplement: [
                "Support pause/resume for long-running tasks",
                "Allow scope changes mid-execution",
                "Confirm destructive actions before executing",
                "Provide undo or rollback where possible"
            ],
            redFlags: [
                "User can't stop an in-progress task",
                "Changing one parameter requires restarting whole flow",
                "No way to undo a completed action"
            ]
        },
        {
            title: "Clarify",
            description: "When intent is ambiguous, the system asks before acting instead of guessing.",
            example: "User says 'update my credentials.' Agent responds: 'I can help with that. Do you need to reset your VPN password or update your SSO security questions?'",
            tags: ["Clarify"],
            principle: "Ambiguity is not a license to guess. Pause and ask.",
            howToImplement: [
                "Define confidence threshold (e.g., <70% = clarify, >90% = act)",
                "Map common ambiguous phrases to clarification prompts",
                "Show top interpretations, let user pick",
                "Track clarification rate (if >30%, improve intent recognition)"
            ],
            redFlags: [
                "Agent guesses and executes wrong action",
                "User says 'that's not what I meant' after agent acts",
                "No way to preview what agent will do before it acts"
            ]
        },
        {
            title: "Detour",
            description: "The system can handle side questions mid-flow and return to the original task without losing progress.",
            example: "Mid-flight booking, user asks: 'Is Wi-Fi free?' Agent answers, then says: 'Wi-Fi is complimentary. Back to your booking—what's your departure date?'",
            tags: ["Detour"],
            principle: "Let users wander without losing their place.",
            howToImplement: [
                "Save conversation state before detour",
                "Detect off-topic question (topic model or explicit intent)",
                "Answer, then offer return: 'Back to [original task]...'",
                "Preserve form data / progress during detour"
            ],
            redFlags: [
                "User asks side question, system refuses to answer",
                "Detour clears in-progress form data",
                "Agent can't remember what you were doing before detour"
            ]
        }
    ],

    // NEW: Tools & Templates Section
    tools: {
        quickReference: {
            title: "Quick Reference Card",
            description: "Print or save this 1-page reference for meetings and planning sessions",
            sections: [
                {
                    title: "4 Anchors Quick Check",
                    items: [
                        "☐ Intent: What does user need? (answer, action, decision, reassurance, escalation)",
                        "☐ Coordinate: What happens next? Who/what owns it?",
                        "☐ Context: What must not get lost?",
                        "☐ Involve: When must a human approve/decide?"
                    ]
                },
                {
                    title: "5 Red Flags",
                    items: [
                        "⚠ Agent guesses on ambiguous input",
                        "⚠ Handoff loses history",
                        "⚠ Failure has no recovery path",
                        "⚠ High-stakes action auto-executes",
                        "⚠ User repeats themselves across surfaces"
                    ]
                },
                {
                    title: "Decision Rule",
                    items: [
                        "Confidence > 90% + Low Risk → ACT (execute autonomously)",
                        "Confidence 70-90% OR Medium Risk → ASK (request confirmation)",
                        "Confidence < 70% OR High Risk → ESCALATE (route to human)"
                    ]
                },
                {
                    title: "Context Schema Essentials",
                    items: [
                        "intent_id (UUID linking all events)",
                        "conversation history (what was said)",
                        "workflow state (where are we?)",
                        "decisions made (what + why)",
                        "trace_id (distributed tracing)"
                    ]
                }
            ]
        },
        checklists: [
            {
                name: "Pre-Launch Checklist",
                description: "Run this before launching any agent experience",
                category: "Error Prevention",
                items: [
                    {
                        section: "Intent Recognition",
                        checks: [
                            "Intent ambiguity map created? (list all ways request could be misinterpreted)",
                            "Clarification prompts written for common ambiguous phrases?",
                            "Confidence threshold defined? (when to act vs. ask)",
                            "Fallback path defined for unrecognized intents?"
                        ]
                    },
                    {
                        section: "Risk & Authority",
                        checks: [
                            "Risk thresholds documented? (what $ amount / data volume triggers approval)",
                            "Escalation triggers specific? (not just 'when needed' — actual conditions)",
                            "High-stakes actions require confirmation before execution?",
                            "Agent authority limits tested? (does it stop when it should?)"
                        ]
                    },
                    {
                        section: "Context Preservation",
                        checks: [
                            "Context schema defined? (see Context Schema Template)",
                            "Every handoff point serializes full context?",
                            "Receiving system validates context (errors if missing key fields)?",
                            "User can switch surfaces mid-task without losing progress?"
                        ]
                    },
                    {
                        section: "Failure & Recovery",
                        checks: [
                            "Every external dependency has fallback/timeout handling?",
                            "Each failure mode has 2-3 recovery options (not dead ends)?",
                            "Silent failures prevented (all errors notify someone)?",
                            "User can see what went wrong and why?"
                        ]
                    },
                    {
                        section: "Handoffs",
                        checks: [
                            "Human-in-loop escalations include full context?",
                            "Agent-to-agent handoffs preserve conversation history?",
                            "Approvers see: what happened, what needs deciding, why?",
                            "No one ever asks 'can you repeat that?'"
                        ]
                    },
                    {
                        section: "Instrumentation",
                        checks: [
                            "Key metrics defined? (context preservation rate, escalation reasons, recovery success)",
                            "Logging captures: intent_id, user_id, trace_id on every event?",
                            "Dashboards show: task completion rate, where flows break, escalation patterns?",
                            "Alerts configured for: silent failures, context loss, high error rates?"
                        ]
                    }
                ]
            },
            {
                name: "Context Handoff Audit",
                description: "Verify context preservation across transitions",
                category: "Testing",
                items: [
                    {
                        section: "Audit Checklist",
                        checks: [
                            "Pick a multi-step scenario that crosses 2+ surfaces",
                            "Document what context exists at each step (intent, history, user data, progress)",
                            "Execute the scenario",
                            "At each transition, verify: did all context arrive?",
                            "If context lost, identify: which fields? which transition?"
                        ]
                    }
                ]
            },
            {
                name: "Decision Authority Matrix",
                description: "Map what agent can do autonomously vs. requires approval",
                category: "Standards",
                items: [
                    {
                        section: "Authority Levels",
                        checks: [
                            "Low risk, high confidence → Agent acts autonomously",
                            "Medium risk OR medium confidence → Agent asks for confirmation",
                            "High risk OR low confidence → Agent escalates to human",
                            "Irreversible + high stakes → Always requires human approval"
                        ]
                    },
                    {
                        section: "Define Thresholds",
                        checks: [
                            "What $ amount triggers approval? (e.g., >$1K = manager review)",
                            "What data volume is 'bulk'? (e.g., >100 records = show preview)",
                            "What PII requires consent? (e.g., SSN, health records)",
                            "What actions are irreversible? (e.g., account deletion, data export)"
                        ]
                    }
                ]
            }
        ],

        templates: [
            {
                name: "Context Schema Template",
                description: "Define what travels between steps",
                category: "Standards",
                codeSnippet: `{
  "intent_id": "uuid",
  "user": {
    "id": "string",
    "roles": ["array"],
    "preferences": {}
  },
  "conversation": {
    "history": [
      {"role": "user", "content": "...", "timestamp": "..."},
      {"role": "agent", "content": "...", "timestamp": "..."}
    ],
    "current_topic": "string",
    "disambiguation_state": "none|pending|resolved"
  },
  "workflow": {
    "state": "initiated|clarifying|executing|waiting_approval|escalated|completed|failed",
    "progress": ["list of completed steps"],
    "pending": ["list of next steps"],
    "decisions_made": [
      {"what": "chose vendor A", "why": "best price + delivery SLA"}
    ]
  },
  "metadata": {
    "started_at": "ISO8601 timestamp",
    "last_updated": "ISO8601 timestamp",
    "surface": "slack|mobile|email|web",
    "trace_id": "string for distributed tracing"
  }
}`
            },
            {
                name: "Behavior Event Schema",
                description: "Standardize events across coordination layer",
                category: "Standards",
                codeSnippet: `{
  "event_type": "intent_received|clarification_requested|action_executed|escalated|completed|failed",
  "event_id": "uuid",
  "intent_id": "uuid (links all events for one user request)",
  "timestamp": "ISO8601",
  "actor": {
    "type": "user|agent|system|human_approver",
    "id": "string"
  },
  "context": {
    /* Context schema from above */
  },
  "payload": {
    /* Event-specific data */
    "confidence_score": 0.85,
    "action_taken": "string",
    "escalation_reason": "high_risk|ambiguous_intent|external_failure|requires_approval",
    "recovery_options": ["array of possible next steps"]
  }
}`
            },
            {
                name: "Recovery Path Template",
                description: "Design recovery for each failure mode",
                category: "Error Prevention",
                structure: [
                    {
                        label: "Failure Mode",
                        example: "Payment gateway timeout"
                    },
                    {
                        label: "What User Sees",
                        example: "We couldn't process your payment. Your order is saved."
                    },
                    {
                        label: "Why (if knowable)",
                        example: "Payment provider didn't respond within 30 seconds."
                    },
                    {
                        label: "Recovery Options",
                        example: "1) Retry now  2) Try different payment method  3) Complete later (we'll email link)"
                    },
                    {
                        label: "What's Preserved",
                        example: "Order items, shipping address, delivery preferences"
                    },
                    {
                        label: "What's Lost",
                        example: "Nothing — full state saved"
                    }
                ]
            },
            {
                name: "Behavior Flow Map Template",
                description: "Visual map of who/what does what",
                category: "Help",
                structure: [
                    "Swim lanes: User | Agent | Systems | Human Approvers",
                    "Columns: Receive Intent | Clarify | Execute | Handoff | Confirm | Complete",
                    "Decision diamonds: Where does flow branch? (confidence check, risk check, failure?)",
                    "Context arrows: Show what travels at each transition",
                    "Failure paths: Dotted lines showing error → recovery routes"
                ]
            }
        ],

        testingProtocols: [
            {
                name: "Interrupt Test",
                description: "Can user pause/resume without context loss?",
                steps: [
                    "Start multi-step flow (e.g., expense submission)",
                    "Complete 50% of steps",
                    "Interrupt: close app, switch surfaces, or wait 24 hours",
                    "Resume: return to flow",
                    "Verify: all progress preserved, user doesn't repeat themselves"
                ],
                passCondition: "Zero context loss, user continues from where they left off"
            },
            {
                name: "Failure Cascade Test",
                description: "What happens when step N fails after steps 1-(N-1) succeeded?",
                steps: [
                    "Identify a multi-step chain (e.g., approve → create record → notify)",
                    "Let step 1-2 succeed",
                    "Force step 3 to fail (simulate external service down)",
                    "Verify: user notified, recovery options provided, steps 1-2 not lost"
                ],
                passCondition: "Failure doesn't lose prior progress, recovery path is clear"
            },
            {
                name: "Ambiguity Stress Test",
                description: "Does agent clarify or guess on edge cases?",
                steps: [
                    "List 10 ambiguous utterances (e.g., 'update my info', 'check status')",
                    "Feed each to agent",
                    "Verify: agent asks clarifying question (doesn't guess and act)"
                ],
                passCondition: "Zero guesses — agent clarifies every time intent is ambiguous"
            },
            {
                name: "Context Handoff Test",
                description: "Does context survive transitions?",
                steps: [
                    "Trigger escalation from agent to human",
                    "Verify human sees: conversation history, what agent tried, why it escalated, user context",
                    "Test cross-surface: start on Slack, switch to mobile — does state travel?"
                ],
                passCondition: "Human/next system has 100% of context, no 'can you repeat that?'"
            },
            {
                name: "Recovery Path Test",
                description: "Every failure has non-dead-end recovery",
                steps: [
                    "List all failure modes (payment fails, API timeout, approval rejected, etc.)",
                    "Simulate each failure",
                    "Verify: user sees 2-3 recovery options, can act without restarting flow"
                ],
                passCondition: "Zero dead ends, all failures offer path forward"
            },
            {
                name: "Authority Boundary Test",
                description: "Agent stops at risk thresholds",
                steps: [
                    "Identify high-risk actions (e.g., refund >$1K, bulk delete, PII access)",
                    "Attempt each via agent",
                    "Verify: agent stops and escalates (doesn't auto-execute)"
                ],
                passCondition: "Agent never acts beyond defined authority limits"
            }
        ]
    },

    byRole: [
        {
            role: "PM",
            care_about: "Shipping features that work across surfaces without rebuilding the same flow three times.",
            persona_quotes: [
                "My roadmap is packed. I can't afford to spend Q3 fixing coordination bugs that should've been designed in Q1.",
                "Every time we add Slack as a channel, we rebuild approval logic. That's not sustainable."
            ],
            concern: "What features do we need?",
            frame: "Headless experience design is feature infrastructure that determines whether multi-step flows feel seamless or fragmented.",
            talking_points: [
                "Your roadmap has agents, workflows, or cross-channel actions? Then you need behavior design upfront.",
                "Without it, every new touchpoint becomes a new silo. You'll spend sprints building 'glue features.'",
                "Investing in behavior layer reduces rework. One design pattern, multiple surfaces."
            ],
            connect_to: "Shipping velocity, consistency, less technical debt.",
            // NEW: Deliverables PM should request
            deliverablesForRole: [
                "Behavior flow map (who does what, when)",
                "Decision authority matrix (what requires approval)",
                "Risk threshold doc ($ amounts, data volumes)",
                "Context schema (what travels between systems)",
                "Instrumentation plan (how we measure success)"
            ]
        },
        {
            role: "Eng",
            care_about: "Clear contracts between services so I'm not debugging mystery escalations at 2am.",
            persona_quotes: [
                "If the agent decides to escalate, where does that event go? Who owns retry logic? These need answers before we write code.",
                "I don't want to build a brittle state machine that breaks the moment someone adds a new step."
            ],
            concern: "How does this work technically?",
            frame: "Headless experience design is orchestration logic that sits between intent and execution, routing work across services.",
            talking_points: [
                "Think event-driven coordination: interpret intent, trigger actions, track state, handle escalation.",
                "It's not a UI framework. It's task routing with context preservation built in.",
                "The API contract: given intent + current state → what happens next?"
            ],
            connect_to: "Service boundaries, event choreography, fault tolerance.",
            deliverablesForRole: [
                "Event schema (standardized envelope for all behavior events)",
                "Context schema (typed contract for what travels between services)",
                "State machine diagram (states, transitions, failure paths)",
                "Architecture decision: orchestrator vs. choreography",
                "Instrumentation: trace_id propagation, structured logging"
            ]
        },
        {
            role: "UX",
            care_about: "Making sure users don't lose context when the system hands off between surfaces or steps.",
            persona_quotes: [
                "I can design the Slack interaction and the mobile screen, but who's designing the transition? That's where trust breaks.",
                "If the agent fails and escalates to a human, does the human know what already happened? Or do they start from zero?"
            ],
            concern: "Where do I design this?",
            frame: "Headless experience design is interaction design without a single canvas. You design the flow, not the frame.",
            talking_points: [
                "You design what the system does, when it waits, when it asks, and how it hands off.",
                "Your toolkit: flows, decision trees, state diagrams, conversation scripts.",
                "Your deliverable: a map showing how intent moves through the system."
            ],
            connect_to: "User agency, error handling, feedback loops.",
            deliverablesForRole: [
                "Behavior flow map (visual map of user journey across surfaces)",
                "Decision tree (when agent acts vs. asks vs. escalates)",
                "Error state designs (recovery paths for each failure mode)",
                "Handoff context spec (what human sees when agent escalates)",
                "Clarification prompts (disambiguation scripts)"
            ]
        },
        {
            role: "Editorial",
            care_about: "Making sure the system sounds human when it explains what it's doing and why.",
            persona_quotes: [
                "The agent says 'processing request'—what does that even mean to a user? We need to explain, not just report status.",
                "When the system escalates, the message should say why. That's not a developer writing that copy, that's us."
            ],
            concern: "What do we call this?",
            frame: "Headless experience design is the voice and tone of system actions, not just responses.",
            talking_points: [
                "You write the system's reasoning, not just its replies.",
                "When the agent explains why it escalated? That's editorial work.",
                "When it says 'I tried X, now trying Y'? That's behavior copy."
            ],
            connect_to: "Transparency, trust, clarity under uncertainty.",
            deliverablesForRole: [
                "Reasoning templates (how agent explains its decisions)",
                "Escalation language (why agent is handing off to human)",
                "Error messages (what happened, why, what's next)",
                "Confidence signals (how agent expresses uncertainty)",
                "Clarification prompts (disambiguation without jargon)"
            ]
        }
    ],

    examples: [
        {
            title: "Expense Approval",
            scenario: "Employee submits expense report. Amount triggers approval workflow.",
            behavior: [
                "System checks amount against policy.",
                "Under $500: auto-approve, log to finance.",
                "Over $500: route to manager, send mobile notification.",
                "Manager out-of-office: escalate to VP, notify employee of delay.",
                "Approved: trigger reimbursement, update employee via email."
            ],
            what_matters: "No UI owns this. Behavior layer coordinates approval logic, escalation, and notifications across systems.",
            // NEW: Patterns applied
            patterns_used: ["Task Chaining", "Handoff", "Recovery"],
            // NEW: Context preserved
            context_preserved: [
                "Employee ID, submission date, receipt images",
                "Policy check result (under/over threshold)",
                "Manager assignment + OOO status",
                "Approval history (who approved, when)"
            ],
            // NEW: What could go wrong
            failure_modes: [
                {
                    failure: "Manager doesn't see context",
                    impact: "Approves policy-violating expense",
                    prevention: "Context schema includes: expense details, policy check result, employee history"
                },
                {
                    failure: "Reimbursement step fails silently",
                    impact: "Employee never paid, doesn't know why",
                    prevention: "Failed payment triggers recovery: retry + notify employee + alert finance"
                }
            ]
        },
        {
            title: "Customer Refund",
            scenario: "Customer requests refund via chatbot.",
            behavior: [
                "Agent checks order status and return policy.",
                "Eligible: initiate refund, update order system, send confirmation email.",
                "Ineligible: explain why, offer alternative (exchange, credit), escalate if customer insists.",
                "Human agent: sees full context (chat history, policy check, customer sentiment)."
            ],
            what_matters: "Agent makes first decision. If it escalates, human doesn't start over. Context travels.",
            patterns_used: ["Clarify", "Handoff", "Recovery"],
            context_preserved: [
                "Order ID, purchase date, item details",
                "Return policy result (eligible/ineligible, why)",
                "Chat history (what customer said, what agent tried)",
                "Customer sentiment (frustrated, calm, neutral)"
            ],
            failure_modes: [
                {
                    failure: "Agent guesses ineligible, customer insists",
                    impact: "Agent refuses valid refund request",
                    prevention: "Ambiguity threshold: if policy is unclear, escalate to human"
                },
                {
                    failure: "Human agent sees empty ticket",
                    impact: "Customer repeats entire story",
                    prevention: "Handoff includes full context: order, policy check, chat history"
                }
            ]
        },
        {
            title: "Invoice Processing",
            scenario: "Vendor invoice arrives via email.",
            behavior: [
                "System extracts data (amount, PO number, vendor).",
                "Matches to PO. If match: route to AP for payment.",
                "No match: flag for review, suggest similar POs, ask user to confirm or reject.",
                "Payment scheduled: notify vendor, update ERP, log in audit trail."
            ],
            what_matters: "System acts where it's confident, asks when it's not. Every action preserves trail.",
            patterns_used: ["Clarify", "Task Chaining", "Trust Signals"],
            context_preserved: [
                "Invoice PDF, extracted fields",
                "PO matching confidence score",
                "Suggested alternatives (similar POs)",
                "User decision (confirmed, rejected, manual entry)"
            ],
            failure_modes: [
                {
                    failure: "No PO match, system auto-rejects",
                    impact: "Valid invoice blocked, vendor not paid",
                    prevention: "Clarify pattern: suggest similar POs, let human decide"
                },
                {
                    failure: "Payment scheduled but vendor not notified",
                    impact: "Vendor calls asking for payment status",
                    prevention: "Task chaining: payment scheduled → trigger vendor notification"
                }
            ]
        },
        {
            title: "Scheduled Report",
            scenario: "Weekly sales report auto-generates and distributes.",
            behavior: [
                "System runs report query Friday 8am.",
                "Detects anomaly: sales down 40% vs. last week.",
                "Instead of auto-sending, flags for review: 'Data looks unusual. Confirm or investigate?'",
                "User confirms data is correct. Report sends with note: 'Confirmed despite anomaly.'"
            ],
            what_matters: "Automation doesn't mean blind execution. System notices, pauses, asks.",
            patterns_used: ["Trust Signals", "Human Control"],
            context_preserved: [
                "Report parameters (date range, filters)",
                "Anomaly detection result (what's unusual, by how much)",
                "User decision (confirmed, rejected, requested investigation)",
                "Distribution list"
            ],
            failure_modes: [
                {
                    failure: "Anomaly detected, report sends anyway",
                    impact: "Execs make decisions on bad data",
                    prevention: "Human control: auto-pause on anomaly, require confirmation"
                },
                {
                    failure: "User confirms, but no record of confirmation",
                    impact: "Later questioned 'who approved sending this?'",
                    prevention: "Trust signals: log confirmation + timestamp in audit trail"
                }
            ]
        },
        {
            title: "Private Wealth Rebalancing with Suitability Review",
            scenario: "A wealth advisor asks the agent to prepare a portfolio rebalance recommendation for a high-net-worth client before a client meeting.",
            behavior: [
                "Agent interprets the advisor's goal: reduce concentration risk while preserving income and tax sensitivity.",
                "Agent checks client profile, investment objectives, risk tolerance, liquidity needs, tax constraints, restricted securities, and household-level exposure.",
                "Agent identifies that the client is overweight in a single tech stock due to recent market gains.",
                "Agent models two rebalance paths: Conservative path (gradual sell-down over multiple tax lots) and Faster path (larger immediate reduction with higher realized gains).",
                "Agent flags that the recommendation requires human review because it affects suitability, tax exposure, and client consent.",
                "Agent prepares a meeting-ready summary with the recommendation, rationale, tradeoffs, open questions, and next best action.",
                "Human advisor reviews, edits, and approves before anything is sent or executed."
            ],
            what_matters: "The agent can coordinate analysis across systems, but human judgment remains required for suitability, consent, and fiduciary responsibility.",
            patterns_used: ["Clarify", "Coordinate", "Context", "Involve", "Handoff", "Trust Signals", "Recovery"],
            context_preserved: [
                "Client goals and household profile",
                "Risk tolerance and investment policy",
                "Current holdings and concentration exposure",
                "Tax lot details and realized gain estimates",
                "Restricted securities and compliance notes",
                "Prior advisor notes and client preferences",
                "Approval status and open questions"
            ],
            failure_modes: [
                {
                    failure: "Agent recommends trades without explaining assumptions",
                    impact: "Advisor doesn't understand basis for recommendation, can't explain to client",
                    prevention: "Transparency: show assumptions, calculations, and methodology in summary"
                },
                {
                    failure: "Agent recommends trades without showing tax impact",
                    impact: "Client surprised by capital gains tax bill",
                    prevention: "Context schema includes: estimated realized gains, tax lot selection logic"
                },
                {
                    failure: "Agent sends recommendation directly to client",
                    impact: "Bypasses fiduciary review, creates compliance risk",
                    prevention: "Human control: advisor must review and approve before any client communication"
                },
                {
                    failure: "Recommendation doesn't account for restricted securities",
                    impact: "Suggests selling shares that can't be sold, breaks trust",
                    prevention: "Coordinate: check compliance constraints before modeling rebalance paths"
                }
            ]
        }
    ],

    questionThemes: [
        {
            theme: "Trust & Transparency",
            icon: "👁️",
            questions: [
                {
                    question: "Does the user know what the system just did?",
                    use_when: "Evaluating transparency in autonomous actions.",
                    example: "A refund agent processes a return and emails confirmation. Customer replies asking 'Did this go through?' The agent never showed in-progress state."
                },
                {
                    question: "Does the system explain its reasoning or just its result?",
                    use_when: "Reviewing agent responses for trust-building.",
                    example: "Agent recommends Vendor A over Vendor B. Doesn't explain why. Team questions the choice. Turns out it was based on price alone, ignoring delivery history."
                },
                {
                    question: "What would make the user stop trusting this?",
                    use_when: "Stress-testing confidence-building mechanisms.",
                    example: "Expense agent auto-approves $450 reports. One report gets flagged manually later for a policy violation. User asks: 'Why did the agent approve this?' No audit trail exists."
                }
            ]
        },
        {
            theme: "Error & Recovery",
            icon: "⚠️",
            questions: [
                {
                    question: "What happens when this step fails?",
                    use_when: "Designing a multi-step flow. Forces team to consider error states.",
                    example: "Invoice processing agent fails at step 3 (PO matching). No notification sent. AP team discovers it two weeks later when vendor calls asking about payment."
                },
                {
                    question: "If this ran at 3am with no one watching, what could go wrong?",
                    use_when: "Evaluating unattended automation safety.",
                    example: "Scheduled report generation hits a data anomaly and sends incorrect revenue numbers to exec team. No validation step. Decision made on bad data before anyone notices."
                }
            ]
        },
        {
            theme: "Human Control",
            icon: "🤝",
            questions: [
                {
                    question: "How does the system know when to ask a human?",
                    use_when: "Defining agent autonomy boundaries.",
                    example: "Agent approves a $4,500 refund request automatically. Policy says manager approval needed over $1K. No threshold was defined in the system."
                },
                {
                    question: "If I interrupt this, does my intent get lost?",
                    use_when: "Testing system resilience to user course-correction.",
                    example: "User starts flight booking, asks 'Do you cover pets?' mid-flow. Agent answers but loses the departure city and dates. User has to start over."
                },
                {
                    question: "Can the user undo this later?",
                    use_when: "Designing high-stakes actions. Undo or audit trail is critical.",
                    example: "Bulk update agent changes 500 customer records. One hour later, team realizes it applied wrong discount tier. No rollback option. Manual fix takes 3 days."
                }
            ]
        },
        {
            theme: "Handoffs & Context",
            icon: "🔗",
            questions: [
                {
                    question: "What context does the next step need?",
                    use_when: "Designing handoffs between surfaces or actors.",
                    example: "Agent escalates billing issue to human support. Support agent sees ticket ID but no history: what the customer said, what the agent tried, what failed. Customer repeats entire story."
                },
                {
                    question: "Is this one task or three tasks pretending to be one?",
                    use_when: "Scoping behavior boundaries. Helps clarify what belongs together.",
                    example: "User says 'set up my account.' Agent interprets this as: create profile, configure preferences, send welcome email, schedule onboarding call. Steps span different systems and owners. Task scope was never defined."
                }
            ]
        }
    ],

    questions: [
        {
            question: "What happens when this step fails?",
            use_when: "Designing a multi-step flow. Forces team to consider error states."
        },
        {
            question: "How does the system know when to ask a human?",
            use_when: "Defining agent autonomy boundaries."
        },
        {
            question: "If I interrupt this, does my intent get lost?",
            use_when: "Testing system resilience to user course-correction."
        },
        {
            question: "What context does the next step need?",
            use_when: "Designing handoffs between surfaces or actors."
        },
        {
            question: "Does the user know what the system just did?",
            use_when: "Evaluating transparency in autonomous actions."
        },
        {
            question: "What would make the user stop trusting this?",
            use_when: "Stress-testing confidence-building mechanisms."
        },
        {
            question: "Is this one task or three tasks pretending to be one?",
            use_when: "Scoping behavior boundaries. Helps clarify what belongs together."
        },
        {
            question: "If this ran at 3am with no one watching, what could go wrong?",
            use_when: "Evaluating unattended automation safety."
        },
        {
            question: "Does the system explain its reasoning or just its result?",
            use_when: "Reviewing agent responses for trust-building."
        },
        {
            question: "Can the user undo this later?",
            use_when: "Designing high-stakes actions. Undo or audit trail is critical."
        }
    ],

    top10Questions: [
        {
            question: "What tells the system when to answer, act, ask, escalate, recover, or stop?",
            anchor: "Explicit decision rules based on risk, confidence thresholds, and user intent—not assumptions."
        },
        {
            question: "Are we defining this as a UI pattern, or as a behavior standard?",
            anchor: "Behavior standard. It must work across every surface: Slack, mobile, email, agent handoff."
        },
        {
            question: "What customer outcome does this behavior support?",
            anchor: "Progress without confusion. Task completion with preserved context and trust."
        },
        {
            question: "What context must survive across surfaces, agents, tools, and humans?",
            anchor: "Intent, history, constraints, and what was already tried. Never make them start over."
        },
        {
            question: "Where does human judgment matter?",
            anchor: "Risk, consent, ambiguity, and accountability decisions. Agent stops and asks, not assumes."
        },
        {
            question: "What does the user need to trust before moving forward?",
            anchor: "Visibility: what the system did, why it did it, and what happens next."
        },
        {
            question: "What should the system preserve when it fails?",
            anchor: "Context, history, and a clear recovery path—not a dead end or silent failure."
        },
        {
            question: "What failure would block launch?",
            anchor: "Lost context at handoff, silent failures, or the agent acting beyond its authority."
        },
        {
            question: "What signal tells us this behavior is working?",
            anchor: "Users don't repeat themselves. Tasks complete across handoffs. Escalations include full context."
        },
        {
            question: "Where can the agent complete the task but still fail the experience?",
            anchor: "When it doesn't explain reasoning, loses context mid-flow, or forces the user to start over."
        }
    ],

    // NEW: Industry Test Cases
    industryTestCases: [
        {
            industry: "Healthcare",
            icon: "🏥",
            title: "Patient Appointment Scheduling Agent",
            tagline: "Multi-provider coordination, HIPAA compliance, emergency vs. routine",
            fde: "Marcus",
            company: "Regional Health System",
            assignment: "Design appointment scheduling agent that works across patient portal, phone (IVR), SMS, and front desk kiosk. Must handle insurance verification, provider availability, and emergency escalation.",
            constraints: ["HIPAA compliance (PHI protection)", "Multi-provider coordination", "Insurance pre-auth workflows", "Emergency vs. routine triage"],
            surfaces: ["Patient portal", "Mobile app", "SMS", "IVR phone", "Front desk kiosk"],

            anchors: {
                intent: {
                    challenge: "User says 'I need to see a doctor' - but is it urgent? What type? Existing issue or new?",
                    solution: "Triage questions: 'Is this an emergency? (If yes → ER). What brings you in today? New issue or follow-up?'",
                    ambiguity_map: [
                        "'I need an appointment' → What type? Which provider?",
                        "'I'm sick' → How urgent? Symptoms?",
                        "'Follow-up visit' → With which doctor? For what condition?"
                    ],
                    confidence_thresholds: {
                        high: ">90% - Clear request: 'Annual physical with Dr. Smith'",
                        medium: "70-90% - 'I need to see a cardiologist' (which one?)",
                        low: "<70% - 'I don't feel well' (triage needed)"
                    }
                },
                coordinate: {
                    challenge: "Multi-step flow: Triage → Check insurance → Find available provider → Verify coverage → Schedule → Send confirmation → Pre-visit instructions",
                    solution: "Task chaining with checkpoints. Each step validates before proceeding. Insurance check happens before slot is held.",
                    flow: [
                        "1. Triage intent (urgent? routine? follow-up?)",
                        "2. Check insurance eligibility (real-time verification)",
                        "3. Find available providers (specialty, location, availability)",
                        "4. Verify pre-authorization needed (for certain procedures)",
                        "5. Hold appointment slot (temporary, 5-min expiry)",
                        "6. Confirm with patient",
                        "7. Send confirmation + pre-visit instructions",
                        "8. Notify provider's office"
                    ],
                    failure_points: [
                        {
                            step: "Insurance verification",
                            failure: "Insurance API timeout",
                            recovery: "Allow manual entry, flag for verification by front desk, don't block appointment"
                        },
                        {
                            step: "Provider availability",
                            failure: "All slots filled during booking",
                            recovery: "Show next available, offer waitlist, suggest other providers"
                        }
                    ]
                },
                context: {
                    challenge: "Patient starts on portal, calls in mid-booking, front desk needs to see everything",
                    solution: "Context schema includes: patient_id, insurance_info, triage_result, provider_preference, appointment_details, PHI (encrypted)",
                    schema: {
                        intent_id: "uuid",
                        patient: {
                            id: "patient_id",
                            mrn: "medical_record_number",
                            insurance: {
                                carrier: "string",
                                policy_number: "encrypted",
                                group_number: "encrypted",
                                verified: "boolean",
                                verified_at: "timestamp"
                            },
                            phi: {
                                encrypted: true,
                                fields: ["dob", "ssn", "diagnosis_codes"]
                            }
                        },
                        triage: {
                            urgency: "emergency|urgent|routine",
                            chief_complaint: "string",
                            symptoms: ["array"],
                            duration: "string"
                        },
                        appointment: {
                            type: "new_patient|follow_up|annual_physical|specialist",
                            provider_id: "string",
                            specialty: "string",
                            datetime: "ISO8601",
                            status: "requested|held|confirmed|completed",
                            pre_auth_required: "boolean"
                        },
                        workflow: {
                            state: "triaging|insurance_check|finding_provider|confirming|scheduled",
                            progress: ["array of completed steps"],
                            pending: ["array of next steps"]
                        },
                        compliance: {
                            hipaa_consent: "boolean",
                            phi_access_log: ["array of who accessed what, when"],
                            audit_trail: ["every decision logged"]
                        }
                    },
                    handoffs: [
                        {
                            from: "Patient portal",
                            to: "IVR phone",
                            scenario: "Patient starts online, calls to finish",
                            context_preserved: "Insurance verified, triage completed, provider preference captured",
                            human_sees: "IVR says: 'I see you were scheduling with Dr. Smith. Let me find you an appointment.'"
                        },
                        {
                            from: "Agent",
                            to: "Front desk",
                            scenario: "Complex case needs human help",
                            context_preserved: "Full triage, insurance status, patient preference, what agent tried",
                            human_sees: "Front desk dashboard shows: Patient needs specialist, insurance requires pre-auth, agent suggested Dr. Jones but no availability"
                        }
                    ]
                },
                involve: {
                    challenge: "When should agent escalate vs. handle autonomously?",
                    solution: "Risk-based escalation: Emergency symptoms → immediate escalation. Pre-auth needed → notify scheduler. No availability → offer alternatives, escalate if patient insists.",
                    escalation_triggers: [
                        {
                            condition: "Emergency symptoms (chest pain, severe bleeding, etc.)",
                            action: "Immediate escalation to triage nurse + 911 if needed",
                            priority: "CRITICAL"
                        },
                        {
                            condition: "Insurance pre-authorization required",
                            action: "Flag for scheduler to verify before confirming",
                            priority: "HIGH"
                        },
                        {
                            condition: "No provider availability within requested timeframe",
                            action: "Offer alternatives, escalate if patient needs urgent care",
                            priority: "MEDIUM"
                        },
                        {
                            condition: "Complex case (multiple conditions, special needs)",
                            action: "Route to care coordinator",
                            priority: "MEDIUM"
                        }
                    ],
                    decision_matrix: {
                        routine_physical_with_pcp: "AGENT handles (schedule directly)",
                        specialist_referral_no_preauth: "AGENT handles (schedule directly)",
                        specialist_referral_with_preauth: "FLAG for human verification",
                        urgent_care_needed: "ESCALATE to triage nurse",
                        emergency_symptoms: "ESCALATE immediately + suggest ER"
                    }
                }
            },

            deliverables: {
                context_schema: "Patient + Insurance + Triage + Appointment + HIPAA audit",
                decision_matrix: "When to schedule vs. escalate (urgency-based)",
                risk_thresholds: "Emergency symptoms, pre-auth requirements, provider unavailability",
                flow_map: "Triage → Insurance → Provider search → Confirm → Notify",
                testing_protocols: [
                    "Interrupt Test: Portal → Phone context preservation",
                    "Ambiguity Test: 'I don't feel well' triggers triage questions",
                    "Authority Test: Emergency symptoms escalate immediately",
                    "HIPAA Test: PHI encrypted in transit, access logged",
                    "Insurance Test: Verification failure doesn't block appointment",
                    "Handoff Test: Front desk sees full triage context"
                ]
            },

            metrics: {
                context_preservation_rate: "> 99% (HIPAA requires no data loss)",
                triage_accuracy: "> 95% (correct urgency classification)",
                insurance_verification_rate: "> 90% (automated verification)",
                escalation_rate: "20-30% (expected for complex cases)",
                emergency_detection_rate: "100% (cannot miss emergency symptoms)",
                appointment_completion_rate: "> 85% (from intent to scheduled)"
            },

            key_insight: "In healthcare, the coordination layer must balance autonomy with safety. Agent handles routine scheduling but immediately escalates anything that could be urgent. HIPAA compliance means every access is logged, and PHI must survive surface switches without being exposed."
        },

        {
            industry: "Sales",
            icon: "💼",
            title: "Lead Qualification & Routing Agent",
            tagline: "CRM integration, territory rules, lead scoring",
            fde: "Priya",
            company: "Enterprise SaaS Company",
            assignment: "Design lead qualification agent that works across web forms, chat, phone, and email. Must score leads, route to correct sales rep based on territory/size/vertical, and sync with Salesforce.",
            constraints: ["Multi-channel lead capture", "Complex territory rules", "Lead scoring algorithm", "CRM sync (Salesforce)", "Speed-to-lead < 5 minutes"],
            surfaces: ["Website chat", "Web form", "Email", "Phone (SDR)", "LinkedIn integration"],

            anchors: {
                intent: {
                    challenge: "Visitor says 'Tell me about pricing' - but are they a real buyer or just researching? What company size? Decision maker?",
                    solution: "Qualification questions: Company size, role, timeline, budget, use case. High-intent signals (demo request, pricing page) vs. low-intent (blog reader).",
                    ambiguity_map: [
                        "'Interested in your product' → What's your use case? Company size?",
                        "'Tell me about pricing' → Are you evaluating now or just researching?",
                        "'I have a question' → About what? Sales or support?"
                    ],
                    confidence_thresholds: {
                        high: ">90% - 'I want to schedule a demo for our 500-person company'",
                        medium: "70-90% - 'We're evaluating solutions' (needs qualification)",
                        low: "<70% - 'Just browsing your site' (nurture, don't route)"
                    }
                },
                coordinate: {
                    challenge: "Multi-step: Capture lead → Score → Enrich (Clearbit) → Check territory rules → Route to rep → Notify → Sync to CRM → Follow-up sequence",
                    solution: "Task chaining with parallel enrichment. While scoring, also enrich company data. Route based on combined score + territory rules.",
                    flow: [
                        "1. Capture lead data (name, email, company)",
                        "2. Score lead (BANT: Budget, Authority, Need, Timeline)",
                        "3. Enrich with external data (Clearbit, LinkedIn)",
                        "4. Apply territory rules (geography, vertical, company size)",
                        "5. Find owner (AE or SDR based on lead score)",
                        "6. Route to owner (Slack notification + email + CRM task)",
                        "7. Sync to Salesforce (create Lead or Contact)",
                        "8. Trigger follow-up sequence (if no response in 1 hour)"
                    ],
                    failure_points: [
                        {
                            step: "Data enrichment",
                            failure: "Clearbit API timeout",
                            recovery: "Proceed with basic data, flag for manual enrichment, don't block routing"
                        },
                        {
                            step: "Territory assignment",
                            failure: "No matching owner (new territory)",
                            recovery: "Route to sales ops, notify manager, create round-robin assignment"
                        },
                        {
                            step: "CRM sync",
                            failure: "Salesforce duplicate detection",
                            recovery: "Merge with existing record, preserve new data, notify owner"
                        }
                    ]
                },
                context: {
                    challenge: "Lead starts on website chat, fills form, emails back with questions, SDR calls them - all context must unify",
                    solution: "Single lead record with activity timeline. Every touchpoint appends to history. SDR sees: chat transcript, form responses, email thread, enrichment data.",
                    schema: {
                        lead_id: "uuid",
                        contact: {
                            name: "string",
                            email: "string",
                            phone: "string",
                            company: "string",
                            title: "string",
                            linkedin_url: "string"
                        },
                        enrichment: {
                            company_size: "number",
                            industry: "string",
                            revenue: "string",
                            technologies: ["array"],
                            funding_stage: "string",
                            source: "clearbit|linkedin|manual"
                        },
                        qualification: {
                            bant_score: "0-100",
                            budget: "unknown|<$10K|$10K-$50K|$50K+",
                            authority: "decision_maker|influencer|researcher",
                            need: "pain_level_1-10",
                            timeline: "immediate|this_quarter|this_year|exploring"
                        },
                        activity_timeline: [
                            {
                                timestamp: "ISO8601",
                                type: "chat|form_fill|email|call|demo",
                                surface: "website|email|phone",
                                content: "What happened",
                                intent_signals: ["pricing_page", "demo_request", "comparison_question"]
                            }
                        ],
                        routing: {
                            territory: "west|east|emea|apac",
                            vertical: "healthcare|fintech|retail|saas",
                            company_size_tier: "smb|mid_market|enterprise",
                            assigned_owner: "user_id",
                            assignment_reason: "territory_match|round_robin|manager_override"
                        },
                        workflow: {
                            state: "new|qualifying|routed|contacted|qualified|disqualified",
                            progress: ["captured", "scored", "enriched", "routed"],
                            next_action: "sdr_outreach|ae_demo|nurture_sequence"
                        }
                    },
                    handoffs: [
                        {
                            from: "Website chat",
                            to: "SDR phone call",
                            scenario: "Hot lead requests demo via chat, SDR calls 3 minutes later",
                            context_preserved: "Chat transcript, company enrichment data, intent signals (demo request), BANT score",
                            human_sees: "SDR dashboard: 'Lead from XYZ Corp (500 employees, fintech) requested demo 3 min ago. They asked about enterprise pricing and compliance. BANT score: 85/100.'"
                        },
                        {
                            from: "Form submission",
                            to: "AE email",
                            scenario: "Enterprise lead fills form, auto-routed to AE",
                            context_preserved: "Form data, enrichment, territory assignment reason, previous website activity",
                            human_sees: "AE gets Slack: 'New enterprise lead: Jane Smith, VP Eng at TechCorp (2K employees). Viewed pricing 3x this week. Routed to you (West territory, enterprise tier).'"
                        }
                    ]
                },
                involve: {
                    challenge: "When should agent route to SDR vs. AE? When should it nurture vs. immediate outreach?",
                    solution: "Lead score + company size determines routing. High-value leads (enterprise, high BANT) → AE directly. Mid-tier → SDR. Low score → nurture campaign.",
                    escalation_triggers: [
                        {
                            condition: "Enterprise lead (>1K employees) + high BANT score (>80)",
                            action: "Route to AE immediately, Slack alert, bypass SDR",
                            priority: "CRITICAL"
                        },
                        {
                            condition: "Mid-market lead (100-1K employees) + medium BANT (50-80)",
                            action: "Route to SDR for qualification call",
                            priority: "HIGH"
                        },
                        {
                            condition: "SMB lead (<100 employees) or low BANT (<50)",
                            action: "Nurture campaign (email sequence), no immediate human",
                            priority: "LOW"
                        },
                        {
                            condition: "Existing customer inquiry",
                            action: "Route to CSM, not sales",
                            priority: "HIGH"
                        },
                        {
                            condition: "Competitor domain detected",
                            action: "Flag for review, don't auto-route",
                            priority: "MEDIUM"
                        }
                    ],
                    decision_matrix: {
                        enterprise_high_intent: "Route to AE (immediate)",
                        midmarket_qualified: "Route to SDR (same day)",
                        smb_exploring: "Nurture campaign (no human yet)",
                        existing_customer: "Route to CSM (not sales)",
                        student_or_competitor: "Disqualify (don't route)"
                    }
                }
            },

            deliverables: {
                context_schema: "Lead + Enrichment + BANT + Activity Timeline + Routing",
                decision_matrix: "When to route to AE vs. SDR vs. nurture",
                lead_scoring_model: "BANT-based (0-100 scale) with intent signals",
                flow_map: "Capture → Score → Enrich → Route → Notify → Sync",
                testing_protocols: [
                    "Interrupt Test: Chat → Email → Call context unification",
                    "Routing Test: Enterprise lead routes to AE, SMB to nurture",
                    "Duplicate Test: Existing contact doesn't create duplicate in CRM",
                    "Enrichment Failure Test: Clearbit timeout doesn't block routing",
                    "Territory Test: Complex rules (geo + vertical + size) apply correctly",
                    "Speed Test: Lead routed within 5 minutes of capture"
                ]
            },

            metrics: {
                lead_capture_rate: "> 95% (forms + chat + email)",
                enrichment_success_rate: "> 85% (external data append)",
                routing_accuracy: "> 98% (correct owner assignment)",
                speed_to_lead: "< 5 minutes (capture to SDR notification)",
                context_preservation_rate: "> 99% (across surfaces)",
                crm_sync_success: "> 99.5% (no data loss to Salesforce)"
            },

            key_insight: "In sales, the coordination layer is a routing engine. It must capture intent across channels, score quality, apply complex territory logic, and route to the right human FAST. Context must unify (chat + form + email = one lead record) so reps aren't surprised when they call."
        },

        {
            industry: "Field Service",
            icon: "🔧",
            title: "Technician Dispatch & Parts Ordering Agent",
            tagline: "Mobile workforce, inventory management, real-time scheduling",
            fde: "Jordan",
            company: "Industrial Equipment Maintenance",
            assignment: "Design field service agent that handles service requests, dispatches technicians, checks parts availability, and coordinates across customer, dispatcher, technician mobile app, and warehouse.",
            constraints: ["Real-time technician location/availability", "Parts inventory sync", "SLA compliance (4-hour emergency response)", "Mobile offline support", "Multi-site coordination"],
            surfaces: ["Customer portal", "Dispatcher dashboard", "Technician mobile app", "SMS", "Phone (call center)"],

            anchors: {
                intent: {
                    challenge: "Customer says 'My machine is down' - but how urgent? What type of machine? Warranty or billable? Parts needed?",
                    solution: "Triage questions: What equipment? Error code? Impact to operations? Warranty status? Then classify: Emergency (SLA 4hr), Urgent (24hr), Routine (1 week).",
                    ambiguity_map: [
                        "'Machine not working' → Which machine? Serial number? Error code?",
                        "'Need a technician' → For what? How urgent? On-site or remote possible?",
                        "'Equipment making noise' → Safety issue or performance issue?"
                    ],
                    confidence_thresholds: {
                        high: ">90% - 'Conveyor belt #3 stopped, error code E-421, production halted'",
                        medium: "70-90% - 'Pump making strange noise' (needs diagnostics)",
                        low: "<70% - 'Something's wrong' (needs triage)"
                    }
                },
                coordinate: {
                    challenge: "Multi-step: Triage → Check warranty → Find available tech → Check parts inventory → Dispatch → Tech arrives → Diagnose → Order parts (if needed) → Complete work → Update asset record",
                    solution: "Parallel coordination: While checking warranty, also find available techs. While dispatching, also reserve parts. Mobile app syncs offline work when tech regains connectivity.",
                    flow: [
                        "1. Capture service request (equipment ID, issue, customer contact)",
                        "2. Triage urgency (emergency/urgent/routine)",
                        "3. Check warranty status + service history",
                        "4. Find available technician (skill match, location, SLA)",
                        "5. Check parts inventory (predicted parts based on error code)",
                        "6. Dispatch technician (send job to mobile app)",
                        "7. Tech arrives on-site (GPS check-in)",
                        "8. Tech diagnoses (may need to order parts)",
                        "9. If parts needed → Order from warehouse → Delivery to site",
                        "10. Tech completes work → Update asset maintenance record",
                        "11. Customer approval + invoice"
                    ],
                    failure_points: [
                        {
                            step: "Technician availability",
                            failure: "No qualified tech available within SLA window",
                            recovery: "Escalate to manager, consider contractor, notify customer of delay, offer temporary workaround"
                        },
                        {
                            step: "Parts availability",
                            failure: "Critical part out of stock",
                            recovery: "Check alternate warehouses, order expedited shipping, notify customer of delay, offer loaner equipment"
                        },
                        {
                            step: "Mobile app offline",
                            failure: "Tech loses connectivity mid-diagnosis",
                            recovery: "App queues updates locally, syncs when online, critical data (parts order) prompts 'find WiFi to submit'"
                        }
                    ]
                },
                context: {
                    challenge: "Customer calls, dispatcher assigns tech, tech goes on-site (offline), orders parts via app, warehouse ships - all must see unified work order",
                    solution: "Work order context travels across: call center → dispatcher → tech mobile app → warehouse system. Tech's offline updates sync when back online. Everyone sees real-time status.",
                    schema: {
                        work_order_id: "uuid",
                        customer: {
                            id: "customer_id",
                            site_location: "address + GPS coordinates",
                            contact_person: "name + phone",
                            priority_level: "platinum|gold|standard"
                        },
                        equipment: {
                            asset_id: "string",
                            serial_number: "string",
                            model: "string",
                            warranty_status: "in_warranty|out_of_warranty|expired",
                            service_history: ["array of past work orders"],
                            last_maintenance: "timestamp"
                        },
                        issue: {
                            reported_problem: "string",
                            error_code: "string (if available)",
                            urgency: "emergency|urgent|routine",
                            sla_deadline: "timestamp",
                            impact: "production_down|degraded_performance|preventive"
                        },
                        dispatch: {
                            technician_id: "user_id",
                            skills_required: ["array"],
                            estimated_arrival: "timestamp",
                            travel_time: "minutes",
                            status: "assigned|en_route|on_site|in_progress|parts_needed|completed"
                        },
                        parts: {
                            predicted_parts: ["array based on error code"],
                            actual_parts_needed: ["array from tech diagnosis"],
                            inventory_status: ["in_stock|out_of_stock|backordered"],
                            ordered_parts: ["array with delivery ETA"]
                        },
                        workflow: {
                            state: "created|dispatched|in_progress|parts_pending|completed|invoiced",
                            progress: ["array of completed steps"],
                            offline_updates: ["array of changes made while offline"],
                            last_synced: "timestamp"
                        },
                        timeline: [
                            {
                                timestamp: "ISO8601",
                                actor: "customer|dispatcher|tech|warehouse",
                                event: "request_created|tech_dispatched|arrived_on_site|diagnosis_complete|parts_ordered|work_completed",
                                notes: "string"
                            }
                        ]
                    },
                    handoffs: [
                        {
                            from: "Customer call",
                            to: "Dispatcher dashboard",
                            scenario: "Customer calls about broken conveyor, dispatcher needs to assign tech",
                            context_preserved: "Equipment ID, error code, urgency, customer location, warranty status",
                            human_sees: "Dispatcher dashboard: 'Emergency request: Conveyor #3 down at XYZ Factory. Error E-421 (motor failure). Warranty expired. Production halted. SLA: 4 hours.'"
                        },
                        {
                            from: "Dispatcher",
                            to: "Tech mobile app",
                            scenario: "Work order dispatched to tech's phone",
                            context_preserved: "Full work order, service history, predicted parts, customer contact, site map",
                            human_sees: "Tech mobile app shows: Work order #12345, conveyor motor issue, parts likely needed: motor relay (in stock), customer contact: John Smith 555-1234, site address + GPS navigation button"
                        },
                        {
                            from: "Tech mobile app (offline)",
                            to: "Warehouse system",
                            scenario: "Tech diagnoses on-site (no signal), orders parts, app syncs when back online",
                            context_preserved: "Diagnosis notes, parts list, urgency, delivery address",
                            human_sees: "Warehouse system receives parts order when tech regains signal: 'Urgent parts needed for WO #12345: motor relay qty 2, bearing kit qty 1. Deliver to XYZ Factory by tomorrow 9am.'"
                        }
                    ]
                },
                involve: {
                    challenge: "When should agent dispatch automatically vs. escalate to dispatcher? When should tech call for help?",
                    solution: "SLA-based + complexity-based escalation. Emergency + available tech → auto-dispatch. No tech available OR complex issue → escalate to manager. Tech diagnosis uncertain → escalate to senior tech.",
                    escalation_triggers: [
                        {
                            condition: "Emergency SLA + no qualified tech available",
                            action: "Escalate to service manager, consider contractor, notify customer",
                            priority: "CRITICAL"
                        },
                        {
                            condition: "Critical part out of stock + production down",
                            action: "Escalate to operations manager, expedite order, consider loaner equipment",
                            priority: "CRITICAL"
                        },
                        {
                            condition: "Tech unsure of diagnosis (safety concern)",
                            action: "Escalate to senior tech for remote support or on-site assist",
                            priority: "HIGH"
                        },
                        {
                            condition: "SLA at risk (tech running late, parts delayed)",
                            action: "Notify customer, offer alternatives, escalate to dispatcher",
                            priority: "HIGH"
                        },
                        {
                            condition: "Customer requests additional work (scope creep)",
                            action: "Tech flags for approval, dispatcher quotes additional cost",
                            priority: "MEDIUM"
                        }
                    ],
                    decision_matrix: {
                        emergency_with_available_tech: "Auto-dispatch (immediate)",
                        urgent_with_qualified_tech: "Auto-dispatch (notify dispatcher)",
                        routine_maintenance: "Schedule optimal time (no immediate dispatch)",
                        no_tech_available_in_sla: "Escalate to manager",
                        safety_concern_detected: "Escalate immediately + on-site supervisor",
                        warranty_dispute: "Escalate to customer service"
                    }
                }
            },

            deliverables: {
                context_schema: "Work Order + Equipment + Dispatch + Parts + Offline Updates",
                decision_matrix: "When to auto-dispatch vs. escalate (SLA + complexity)",
                sla_thresholds: "Emergency (4hr), Urgent (24hr), Routine (1 week)",
                flow_map: "Triage → Assign → Dispatch → Diagnose → Parts → Complete",
                testing_protocols: [
                    "Offline Test: Tech works without signal, syncs when back online",
                    "SLA Test: Emergency request dispatches within 30 minutes",
                    "Parts Test: Out-of-stock part triggers alternate warehouse search",
                    "Handoff Test: Dispatcher → Tech → Warehouse context preserved",
                    "Escalation Test: No available tech triggers manager alert",
                    "Concurrent Test: Multiple work orders don't overbook same tech"
                ]
            },

            metrics: {
                sla_compliance_rate: "> 95% (emergency within 4hr, urgent within 24hr)",
                first_time_fix_rate: "> 85% (job completed on first visit)",
                parts_availability_accuracy: "> 90% (predicted parts match actual)",
                context_sync_success: "> 99% (offline updates merge correctly)",
                dispatch_optimization: "< 15 min avg travel time (location-based assignment)",
                customer_satisfaction: "> 4.5/5 (post-service survey)"
            },

            key_insight: "In field service, the coordination layer is a real-time coordination engine. It must handle offline mobile workers, predict parts needs, enforce SLAs, and keep everyone synchronized. The challenge is mobile connectivity: context must survive offline periods and merge cleanly when tech reconnects."
        },

        {
            industry: "Nonprofit",
            icon: "❤️",
            title: "Donation Processing & Donor Engagement Agent",
            tagline: "Recurring gifts, tax receipts, donor stewardship",
            fde: "Alex",
            company: "Environmental Conservation Nonprofit",
            assignment: "Design donation processing agent that works across website, text-to-donate, direct mail, events, and phone. Must handle one-time and recurring gifts, generate tax receipts, route high-value donors to major gifts officer, and trigger stewardship communications.",
            constraints: ["Multi-channel donation capture", "Recurring gift management", "IRS compliance (tax receipts)", "Donor privacy (GDPR/CCPA)", "Major donor identification & routing"],
            surfaces: ["Donation website", "Text-to-donate", "Mobile app", "Phone (call center)", "Event registration", "Direct mail"],

            anchors: {
                intent: {
                    challenge: "Donor says 'I want to help' - but one-time or recurring? General fund or specific campaign? In honor of someone? Tax receipt needed?",
                    solution: "Clarification flow: Amount? One-time or monthly? Which program? In honor/memory of someone? Need tax receipt? Then customize stewardship based on giving level.",
                    ambiguity_map: [
                        "'I want to donate' → Amount? One-time or recurring? Which program?",
                        "'Support your work' → General fund or specific campaign?",
                        "'Donate in memory of...' → Notification to family? Tribute card?"
                    ],
                    confidence_thresholds: {
                        high: ">90% - 'I want to give $100/month to the wildlife conservation program'",
                        medium: "70-90% - 'I want to donate to help forests' (which campaign?)",
                        low: "<70% - 'How can I help?' (needs clarification: volunteer? donate? advocate?)"
                    }
                },
                coordinate: {
                    challenge: "Multi-step: Capture donation → Process payment → Generate receipt → Route high-value to MGO → Trigger thank-you → Schedule stewardship touches → Update donor record → Tag for campaign attribution",
                    solution: "Task chaining with donor journey orchestration. Immediate: payment + receipt. Within 24hr: personal thank-you. Within 1 week: impact story. High-value donors get personal outreach.",
                    flow: [
                        "1. Capture donation (amount, payment method, designation)",
                        "2. Process payment (Stripe, PayPal, check processing)",
                        "3. Generate tax receipt (IRS-compliant, email PDF)",
                        "4. Identify donor segment (major|mid-level|grassroots|first-time)",
                        "5. Route high-value donors (>$1K) to major gifts officer",
                        "6. Trigger immediate thank-you (email within 1 hour)",
                        "7. Schedule stewardship sequence (impact updates, invitations)",
                        "8. Update donor CRM (lifetime giving, campaign attribution)",
                        "9. If recurring: Set up monthly charge + reminder emails",
                        "10. If tribute gift: Notify honoree family (if requested)"
                    ],
                    failure_points: [
                        {
                            step: "Payment processing",
                            failure: "Credit card declined",
                            recovery: "Offer alternate payment (bank transfer, PayPal), save donation intent, retry in 3 days, send reminder email"
                        },
                        {
                            step: "Tax receipt generation",
                            failure: "PDF service timeout",
                            recovery: "Queue for later generation, send immediate thank-you, flag for manual follow-up, ensure receipt sent within 48hr"
                        },
                        {
                            step: "Recurring gift processing",
                            failure: "Monthly charge fails",
                            recovery: "Retry 2x over 7 days, send donor reminder 'Update your card', offer to switch to annual gift, don't cancel immediately"
                        }
                    ]
                },
                context: {
                    challenge: "Donor gives via website, calls to increase amount, attends event, receives mail appeal - all must unify into single donor record with full history",
                    solution: "Single donor profile with multi-channel giving history. Event attendance + website donation + mail response = one relationship. MGO sees complete picture before calling.",
                    schema: {
                        donor_id: "uuid",
                        contact: {
                            name: "string",
                            email: "string",
                            phone: "string",
                            address: "string (for mail appeals)",
                            communication_preferences: {
                                email: "boolean",
                                mail: "boolean",
                                phone: "boolean",
                                sms: "boolean"
                            },
                            privacy_status: "gdpr_compliant|ccpa_compliant"
                        },
                        giving_profile: {
                            lifetime_giving: "number",
                            first_gift_date: "timestamp",
                            most_recent_gift_date: "timestamp",
                            largest_gift: "number",
                            giving_frequency: "one_time|monthly|quarterly|annual|lapsed",
                            donor_segment: "major|mid_level|grassroots|first_time|lapsed",
                            retention_status: "new|retained|reactivated|lapsed"
                        },
                        gift_history: [
                            {
                                gift_id: "uuid",
                                date: "timestamp",
                                amount: "number",
                                designation: "general_fund|wildlife|forests|oceans",
                                campaign: "year_end|monthly_giving|emergency_appeal",
                                channel: "website|text|mail|event|phone",
                                recurring: "boolean",
                                tribute: {
                                    type: "in_honor_of|in_memory_of",
                                    honoree_name: "string",
                                    notify_family: "boolean",
                                    family_contact: "email or address"
                                }
                            }
                        ],
                        stewardship: {
                            assigned_mgo: "user_id (if major donor)",
                            last_personal_contact: "timestamp",
                            next_touch_due: "timestamp",
                            engagement_score: "0-100 (website visits, email opens, event attendance)",
                            interests: ["wildlife", "forests", "advocacy"]
                        },
                        tax_receipts: [
                            {
                                receipt_id: "uuid",
                                year: "number",
                                total_giving: "number",
                                sent_date: "timestamp",
                                pdf_url: "string"
                            }
                        ],
                        workflow: {
                            state: "processing_payment|receipt_generated|thank_you_sent|mgo_notified|stewardship_active",
                            progress: ["array"],
                            next_action: "send_impact_report|invite_to_event|upgrade_ask"
                        }
                    },
                    handoffs: [
                        {
                            from: "Website donation",
                            to: "Major Gifts Officer",
                            scenario: "First-time donor gives $5K, MGO needs to call within 48hr",
                            context_preserved: "Donation details, campaign they responded to, email opens history, website pages visited, interests",
                            human_sees: "MGO dashboard: 'New major donor: Sarah Johnson gave $5K to wildlife program. First gift. Visited website 5x last month. Opened every email about endangered species. Call to thank + invite to behind-the-scenes tour.'"
                        },
                        {
                            from: "Text-to-donate",
                            to: "Call center",
                            scenario: "Donor texts to give, later calls to ask about recurring option",
                            context_preserved: "Text donation amount, designation, phone number, giving history",
                            human_sees: "Call center screen pops: 'Donor calling: John Smith. Gave $50 via text 2 hours ago (wildlife fund). Lifetime giving: $350. Last gift: 6 months ago. Opportunity to upgrade to monthly giving.'"
                        },
                        {
                            from: "Event attendance",
                            to: "Email stewardship",
                            scenario: "Donor attends gala, later receives impact report email with personalized content",
                            context_preserved: "Event attendance, table assignment, conversations logged, follow-up needed",
                            human_sees: "Email personalization: 'Dear Jane, It was wonderful seeing you at the Conservation Gala last week. As a longtime supporter of our ocean program, I thought you'd love to see this update on the coral reef restoration you helped fund...'"
                        }
                    ]
                },
                involve: {
                    challenge: "When should agent handle donation autonomously vs. route to MGO? When should it send automated thank-you vs. prompt personal outreach?",
                    solution: "Giving-level based routing. <$1K → automated stewardship. $1K-$10K → MGO notified, personal thank-you within 48hr. >$10K → immediate MGO call. First-time donors always get personal touch.",
                    escalation_triggers: [
                        {
                            condition: "First-time donor (any amount)",
                            action: "Send personalized welcome email, MGO reviews, consider personal call if >$250",
                            priority: "HIGH"
                        },
                        {
                            condition: "Major gift (>$10K)",
                            action: "Immediate MGO notification, personal call within 24hr, handwritten thank-you note",
                            priority: "CRITICAL"
                        },
                        {
                            condition: "Mid-level gift ($1K-$10K)",
                            action: "MGO notified, personal email within 48hr, consider phone call",
                            priority: "HIGH"
                        },
                        {
                            condition: "Recurring gift canceled or card declined",
                            action: "MGO notified if mid-level or above, personalized re-engagement email",
                            priority: "MEDIUM"
                        },
                        {
                            condition: "Tribute gift (in memory/honor)",
                            action: "MGO reviews before notification sent to family, ensure sensitive handling",
                            priority: "HIGH"
                        },
                        {
                            condition: "Donor requests specific program information",
                            action: "Route to program staff for detailed conversation",
                            priority: "MEDIUM"
                        }
                    ],
                    decision_matrix: {
                        first_time_donor_100: "Automated thank-you + MGO review + consider call",
                        recurring_monthly_50: "Automated stewardship (impact reports)",
                        major_gift_10k: "Immediate MGO call + handwritten note",
                        midlevel_gift_5k: "MGO personal email + phone call",
                        declined_recurring_payment: "Automated retry + donor reminder + MGO notified if mid-level",
                        tribute_gift: "MGO reviews notification before sending to family"
                    }
                }
            },

            deliverables: {
                context_schema: "Donor + Giving Profile + Gift History + Stewardship + Tax Receipts",
                decision_matrix: "When to auto-thank vs. personal outreach (giving level)",
                giving_thresholds: "Major (>$10K), Mid-level ($1K-$10K), Grassroots (<$1K)",
                flow_map: "Capture → Process → Receipt → Segment → Route → Thank → Steward",
                testing_protocols: [
                    "Multi-channel Test: Website + text + mail = unified donor record",
                    "Routing Test: $10K gift routes to MGO within 5 minutes",
                    "Recurring Test: Failed payment triggers retry + donor notification",
                    "Tax Receipt Test: Receipt generated within 24hr, IRS-compliant",
                    "Privacy Test: GDPR/CCPA opt-out honored across all channels",
                    "Stewardship Test: Major donor receives personal touchpoint within 48hr"
                ]
            },

            metrics: {
                payment_success_rate: "> 97% (first-try processing)",
                receipt_delivery_rate: "100% (within 48hr, IRS requirement)",
                major_donor_response_time: "< 24hr (MGO personal outreach)",
                retention_rate: "> 70% (recurring donors retained year-over-year)",
                channel_unification_rate: "> 99% (multi-channel gifts merge correctly)",
                donor_satisfaction: "> 4.7/5 (thank-you quality + receipt timeliness)"
            },

            key_insight: "In nonprofit, the coordination layer is a donor relationship engine. It must capture generosity across channels, route high-value donors for personal touches, automate stewardship for grassroots donors, and ensure IRS compliance. The challenge is balancing automation (scale) with personalization (relationships). Major donors must never feel like 'just a number.'"
        }
    ],

    copyBank: [
        {
            situation: "Someone says: 'We don't need design, it's all backend.'",
            response: "Behavior is designed, not just built. Someone has to decide what happens when the system fails, when it waits, when it asks. That's design.",
            use: "Reframe design as decision-making, not decoration."
        },
        {
            situation: "Someone says: 'Can't we just add a UI for that?'",
            response: "We could. But if the user is in Slack, email, and mobile, which UI do they use? Behavior layer solves for intent, not interface.",
            use: "Redirect from 'add a screen' to 'design the coordination.'"
        },
        {
            situation: "Someone says: 'Just let the AI figure it out.'",
            response: "The AI needs guidelines. When does it act? When does it ask? When does it escalate? That's the coordination layer.",
            use: "Establish that AI needs orchestration rules."
        },
        {
            situation: "Someone says: 'Why is this taking so long?'",
            response: "We're not just building the feature. We're designing how it behaves when interrupted, when it fails, and when it hands off. That durability takes time.",
            use: "Defend deliberate design of edge cases."
        },
        {
            situation: "Someone says: 'Users won't notice this.'",
            response: "That's the point. Good behavior layer is invisible when it works, obvious when it doesn't.",
            use: "Reframe invisibility as success, not irrelevance."
        },
        {
            situation: "Someone asks: 'What's the user flow?'",
            response: "There isn't one flow. There are multiple surfaces with one coordinated task. Let me show you the behavior map.",
            use: "Shift from linear flows to system choreography."
        },
        {
            situation: "Someone says: 'Our agent is 95% accurate, that's enough.'",
            response: "What happens in the 5%? Does it escalate gracefully or fail silently? The behavior in the 5% determines trust.",
            use: "Highlight that error handling is part of the experience."
        },
        {
            situation: "Someone asks: 'Do we really need all these states?'",
            response: "These aren't abstract states. They're real situations: task started, waiting for data, escalated, completed. Users experience all of them.",
            use: "Justify state modeling as reflection of reality."
        }
    ]
};

let activeSection = 'spine';
let activeFilters = {
    role: [],
    concept: []
};

function renderSpine() {
    const content = document.getElementById('spine-content');
    content.innerHTML = `
        <div class="behavior-questions-card">
            <div class="bq-label">Behavior Layer Questions</div>
            <div class="bq-list">
                ${data.spine.quickQuestions.map(q => `
                    <div class="bq-item">
                        <div class="bq-item-label">${q.label}</div>
                        <div class="bq-item-question">${q.question}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        <h2>Four Anchors</h2>
        <p class="section-description">Every behavior layer decision maps to one of these.</p>
        <div class="anchors-label">Every agentic experience breaks when one of these fails.</div>
        <div class="anchors">
            ${data.spine.anchors.map((anchor, i) => `
                <div class="anchor-card-rich">
                    <div class="anchor-header">
                        <div class="anchor-number">${i + 1}</div>
                        <div class="anchor-title-group">
                            <div class="anchor-label-row">
                                <div class="anchor-label">${anchor.label}</div>
                                <div class="anchor-pill">${anchor.pill}</div>
                            </div>
                            <div class="anchor-name">${anchor.name}</div>
                        </div>
                    </div>
                    <div class="anchor-meaning">${anchor.meaning}</div>
                    <div class="anchor-section">
                        <div class="anchor-section-label">Decision question:</div>
                        <div class="anchor-section-text">${anchor.question}</div>
                    </div>
                    <div class="anchor-section anchor-prevents">
                        <div class="anchor-section-label">Prevents:</div>
                        <div class="anchor-section-text">${anchor.prevents}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="highlight-card">
            <div class="highlight-label">💡 Tip</div>
            <p class="highlight-text">Headless is not UI-less. It is coordination-first: the experience lives in how intent, context, work, and humans stay connected.</p>
        </div>
    `;
}

// NEW: Render Getting Started
function renderGettingStarted() {
    const content = document.getElementById('getting-started-content');
    if (!content) return;

    let html = `
        <!-- Hero Section -->
        <div class="playbook-hero">
            <div class="playbook-hero-inner">
                <div class="playbook-hero-eyebrow">Core Thesis</div>
                <h2 class="playbook-hero-title">Headless Experience Design</h2>
                <p class="playbook-hero-thesis">In headless and agentic systems, the experience succeeds or fails based on how the system behaves across steps, surfaces, and humans.</p>
                <p class="playbook-hero-thesis">Agentic systems succeed when intent, coordination, context, and human judgment work together across every step.</p>
            </div>
        </div>

        <!-- Behavior Layer Summary -->
        <div class="behavior-layer-summary">
            <h3 class="behavior-layer-title">The Behavior Layer</h3>
            <p class="behavior-layer-subtitle">Every agentic experience must answer four questions.</p>
            <div class="behavior-layer-grid">
                <div class="behavior-layer-item">
                    <div class="behavior-layer-item-label">Intent</div>
                    <div class="behavior-layer-item-desc">What does the user need?</div>
                </div>
                <div class="behavior-layer-item">
                    <div class="behavior-layer-item-label">Coordinate</div>
                    <div class="behavior-layer-item-desc">What happens next?</div>
                </div>
                <div class="behavior-layer-item">
                    <div class="behavior-layer-item-label">Context</div>
                    <div class="behavior-layer-item-desc">What carries forward?</div>
                </div>
                <div class="behavior-layer-item">
                    <div class="behavior-layer-item-label">Involve</div>
                    <div class="behavior-layer-item-desc">Where does human judgment matter?</div>
                </div>
            </div>
        </div>

        <!-- Four Anchors Section -->
        <div class="four-anchors-section">
            <div class="four-anchors-header">
                <h3 class="four-anchors-title">Four Anchors</h3>
                <p class="four-anchors-subtitle">Every behavior-layer decision maps to one of these. Every agentic experience breaks when one of these fails.</p>
            </div>

            <div class="structure-grid">
                <div class="structure-card" data-section="spine" style="cursor: pointer;">
                    <div class="structure-icon">🎯</div>
                    <div class="structure-title">Coordination Spine</div>
                    <div class="structure-desc">The 4 anchors framework: <strong>Intent, Coordinate, Context, Involve</strong>. Core thesis and what each anchor means.</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Understanding the foundation</span>
                    </div>
                </div>

                <div class="structure-card" data-section="concepts" style="cursor: pointer;">
                    <div class="structure-icon">💡</div>
                    <div class="structure-title">Core Concepts</div>
                    <div class="structure-desc">Nine patterns: Headless, Task Chaining, Single Door, Trust Signals, Handoff Protocol, Recovery Paths, Human Control, Intent Clarification, Context Detours</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Need concrete patterns to implement</span>
                    </div>
                </div>

                <div class="structure-card" data-section="by-role" style="cursor: pointer;">
                    <div class="structure-icon">👥</div>
                    <div class="structure-title">Role Guidance</div>
                    <div class="structure-desc">How to explain headless experience design to PM, Engineering, UX, and Editorial using their language and concerns</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Aligning cross-functional partners</span>
                    </div>
                </div>

                <div class="structure-card" data-section="examples" style="cursor: pointer;">
                    <div class="structure-icon">📖</div>
                    <div class="structure-title">Experience Examples</div>
                    <div class="structure-desc">Real scenarios showing coordination-first design in action: Expense approval, multi-step booking, CRM update, support escalation</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Need to see it in practice</span>
                    </div>
                </div>

                <div class="structure-card" data-section="tools" style="cursor: pointer;">
                    <div class="structure-icon">🛠</div>
                    <div class="structure-title">Decision Tools</div>
                    <div class="structure-desc">Checklists (Pre-Launch, Context Handoff), Templates (Context Schema, Event Schema, Recovery Path), Testing Protocols</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Ready to build or audit</span>
                    </div>
                </div>

                <div class="structure-card" data-section="test-cases" style="cursor: pointer;">
                    <div class="structure-icon">🏥</div>
                    <div class="structure-title">Test Cases</div>
                    <div class="structure-desc">Four complete industry examples: Healthcare, Sales, Field Service, Nonprofit. See how FDEs applied the 4 anchors.</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Want a worked example in your domain</span>
                    </div>
                </div>

                <div class="structure-card" data-section="questions" style="cursor: pointer;">
                    <div class="structure-icon">❓</div>
                    <div class="structure-title">Alignment Questions</div>
                    <div class="structure-desc">Sharp questions to surface assumptions and spot failure modes. Organized by anchor and scenario.</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">In a contentious meeting</span>
                        <span class="structure-use-chip">Reviewing work</span>
                    </div>
                </div>

                <div class="structure-card" data-section="reframes" style="cursor: pointer;">
                    <div class="structure-icon">🔄</div>
                    <div class="structure-title">Leadership Reframes</div>
                    <div class="structure-desc">Strategic questions with anchored answers. Quick responses to common objections about headless work.</div>
                    <div class="structure-use">
                        <span class="structure-use-label">Use when:</span>
                        <span class="structure-use-chip">Need to defend or explain this approach</span>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="subsection-title" style="margin-top: 96px; text-align: center; font-size: 32px;">Choose Your Path</h3>
        <p class="subsection-description" style="text-align: center; max-width: 650px; margin: 16px auto 32px auto; font-size: 16px;">Jump directly to what you need based on where you are right now.</p>
    `;

    html += data.gettingStarted.paths.map(path => `
        <div class="path-card">
            <div class="path-header">
                <span class="path-icon">${path.icon}</span>
                <div class="path-title">${path.persona}</div>
            </div>
            <div class="path-description">${path.description}</div>
            <div class="path-meta">
                <span class="path-time">⏱ ${path.timeEstimate}</span>
            </div>
            <div class="path-steps">
                <div class="path-steps-label">Your path:</div>
                <ol>
                    ${path.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            <div class="path-deliverables">
                <div class="path-deliverables-label">You'll produce:</div>
                <div class="path-deliverables-list">
                    ${path.deliverables.map(d => `<span class="deliverable-chip">${d}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    content.innerHTML = html;

    // Add click handlers for structure cards
    document.querySelectorAll('.structure-card[data-section]').forEach(card => {
        card.addEventListener('click', () => {
            const section = card.getAttribute('data-section');
            const navLink = document.querySelector(`.nav-link[data-section="${section}"]`);
            if (navLink) {
                navLink.click();
            }
        });
    });
}

// NEW: Render Tools Section
function renderTools() {
    const content = document.getElementById('tools-content');
    if (!content) return;

    // Render Quick Reference
    let html = `
        <div class="quick-reference-card">
            <div class="qr-header">
                <h3 class="qr-title">${data.tools.quickReference.title}</h3>
                <button class="copy-btn qr-print-btn" onclick="window.print()">Print</button>
            </div>
            <div class="qr-description">${data.tools.quickReference.description}</div>
            <div class="qr-grid">
                ${data.tools.quickReference.sections.map(section => `
                    <div class="qr-section">
                        <div class="qr-section-title">${section.title}</div>
                        <ul class="qr-list">
                            ${section.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Render checklists
    html += '<h3 class="tools-section-title" style="margin-top: 48px;">Checklists</h3>';
    html += '<div class="tools-grid">';

    data.tools.checklists.forEach(checklist => {
        html += `
            <div class="tool-card checklist-card">
                <div class="tool-card-header">
                    <div class="tool-card-title">${checklist.name}</div>
                    <span class="tool-card-category">${checklist.category}</span>
                </div>
                <div class="tool-card-description">${checklist.description}</div>
                <div class="checklist-content">
                    ${checklist.items.map(section => `
                        <div class="checklist-section">
                            <div class="checklist-section-title">${section.section}</div>
                            ${section.checks.map(check => `
                                <label class="checkbox-item">
                                    <input type="checkbox" />
                                    <span>${check}</span>
                                </label>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += '</div>';

    // Render templates
    html += '<h3 class="tools-section-title" style="margin-top: 48px;">Templates</h3>';
    html += '<div class="tools-grid">';

    data.tools.templates.forEach(template => {
        html += `
            <div class="tool-card template-card">
                <div class="tool-card-header">
                    <div class="tool-card-title">${template.name}</div>
                    <span class="tool-card-category">${template.category}</span>
                </div>
                <div class="tool-card-description">${template.description}</div>
        `;

        if (template.codeSnippet) {
            html += `
                <div class="code-template copyable-section">
                    <pre><code>${escapeHtml(template.codeSnippet)}</code></pre>
                </div>
            `;
        }

        if (template.structure) {
            html += '<div class="template-structure">';
            template.structure.forEach(item => {
                if (typeof item === 'string') {
                    html += `<div class="structure-item">${item}</div>`;
                } else {
                    html += `
                        <div class="structure-example">
                            <div class="structure-label">${item.label}:</div>
                            <div class="structure-text">${item.example}</div>
                        </div>
                    `;
                }
            });
            html += '</div>';
        }

        html += '</div>';
    });

    html += '</div>';

    // Render testing protocols
    html += '<h3 class="tools-section-title" style="margin-top: 48px;">Testing Protocols</h3>';
    html += '<div class="tools-grid">';

    data.tools.testingProtocols.forEach(protocol => {
        html += `
            <div class="tool-card testing-card">
                <div class="tool-card-header">
                    <div class="tool-card-title">${protocol.name}</div>
                </div>
                <div class="tool-card-description">${protocol.description}</div>
                <div class="testing-steps">
                    <div class="testing-steps-label">Test steps:</div>
                    <ol>
                        ${protocol.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="pass-condition">
                    <div class="pass-condition-label">✓ Pass condition:</div>
                    <div class="pass-condition-text">${protocol.passCondition}</div>
                </div>
            </div>
        `;
    });

    html += '</div>';

    content.innerHTML = html;
}

// NEW: Render Industry Test Cases
function renderTestCases() {
    const content = document.getElementById('test-cases-content');
    if (!content) return;

    // Industry selector
    let html = `
        <div class="industry-selector">
            ${data.industryTestCases.map((testCase, idx) => `
                <div class="industry-card ${idx === 0 ? 'active' : ''}" data-industry-id="${idx}">
                    <div class="industry-icon">${testCase.icon}</div>
                    <div class="industry-name">${testCase.industry}</div>
                    <div class="industry-tagline">${testCase.tagline}</div>
                </div>
            `).join('')}
        </div>
        <div id="test-case-detail"></div>
    `;

    content.innerHTML = html;

    // Render first test case by default
    renderTestCaseDetail(0);

    // Attach click handlers
    document.querySelectorAll('.industry-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const industryId = parseInt(e.currentTarget.getAttribute('data-industry-id'));

            // Update active state
            document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Render detail
            renderTestCaseDetail(industryId);
        });
    });
}

function renderTestCaseDetail(industryId) {
    const testCase = data.industryTestCases[industryId];
    const detailContainer = document.getElementById('test-case-detail');

    let html = `
        <div class="test-case-header">
            <div class="test-case-icon">${testCase.icon}</div>
            <div class="test-case-title-group">
                <h3 class="test-case-title">${testCase.title}</h3>
                <div class="test-case-meta">
                    <span class="test-case-fde">FDE: ${testCase.fde}</span>
                    <span class="test-case-company">${testCase.company}</span>
                </div>
            </div>
        </div>

        <div class="test-case-assignment">
            <div class="assignment-label">Assignment</div>
            <div class="assignment-text">${testCase.assignment}</div>
        </div>

        <div class="test-case-constraints">
            <div class="constraints-label">Constraints</div>
            <div class="constraints-list">
                ${testCase.constraints.map(c => `<div class="constraint-chip">${c}</div>`).join('')}
            </div>
        </div>

        <div class="test-case-surfaces">
            <div class="surfaces-label">Surfaces (Headless)</div>
            <div class="surfaces-list">
                ${testCase.surfaces.map(s => `<div class="surface-chip">${s}</div>`).join('')}
            </div>
        </div>

        <!-- Four Anchors Tabs -->
        <div class="anchors-tabs">
            <div class="anchor-tab active" data-anchor="intent">
                <span class="anchor-tab-icon">🎯</span>
                <span class="anchor-tab-label">Intent</span>
            </div>
            <div class="anchor-tab" data-anchor="coordinate">
                <span class="anchor-tab-icon">⚙️</span>
                <span class="anchor-tab-label">Coordinate</span>
            </div>
            <div class="anchor-tab" data-anchor="context">
                <span class="anchor-tab-icon">💾</span>
                <span class="anchor-tab-label">Context</span>
            </div>
            <div class="anchor-tab" data-anchor="involve">
                <span class="anchor-tab-icon">🤝</span>
                <span class="anchor-tab-label">Involve</span>
            </div>
        </div>

        <div id="anchor-content"></div>

        <!-- Deliverables -->
        <div class="test-case-deliverables">
            <h4>What ${testCase.fde} Delivered</h4>
            <div class="deliverables-grid">
                <div class="deliverable-item">
                    <div class="deliverable-icon">📋</div>
                    <div class="deliverable-name">Context Schema</div>
                    <div class="deliverable-desc">${testCase.deliverables.context_schema}</div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon">🎯</div>
                    <div class="deliverable-name">Decision Matrix</div>
                    <div class="deliverable-desc">${testCase.deliverables.decision_matrix}</div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon">📊</div>
                    <div class="deliverable-name">Risk Thresholds</div>
                    <div class="deliverable-desc">${testCase.deliverables.risk_thresholds}</div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon">🗺️</div>
                    <div class="deliverable-name">Flow Map</div>
                    <div class="deliverable-desc">${testCase.deliverables.flow_map}</div>
                </div>
            </div>
            <div class="testing-protocols">
                <div class="testing-label">Testing Protocols</div>
                <ul>
                    ${testCase.deliverables.testing_protocols.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>

        <!-- Metrics -->
        <div class="test-case-metrics">
            <h4>Success Metrics</h4>
            <div class="metrics-grid">
                ${Object.entries(testCase.metrics).map(([key, value]) => `
                    <div class="metric-item">
                        <div class="metric-label">${key.replace(/_/g, ' ')}</div>
                        <div class="metric-value">${value}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Key Insight -->
        <div class="test-case-insight">
            <div class="insight-icon">💡</div>
            <div class="insight-text">${testCase.key_insight}</div>
        </div>
    `;

    detailContainer.innerHTML = html;

    // Render first anchor by default
    renderAnchorContent(testCase, 'intent');

    // Attach tab click handlers
    document.querySelectorAll('.anchor-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const anchor = e.currentTarget.getAttribute('data-anchor');

            // Update active state
            document.querySelectorAll('.anchor-tab').forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Render anchor content
            renderAnchorContent(testCase, anchor);
        });
    });
}

function renderAnchorContent(testCase, anchorType) {
    const container = document.getElementById('anchor-content');
    const anchor = testCase.anchors[anchorType];

    let html = `<div class="anchor-detail">`;

    // Challenge
    html += `
        <div class="anchor-section">
            <div class="anchor-section-label">Challenge</div>
            <div class="anchor-section-text">${anchor.challenge}</div>
        </div>
    `;

    // Solution
    html += `
        <div class="anchor-section">
            <div class="anchor-section-label">${testCase.fde}'s Solution</div>
            <div class="anchor-section-text">${anchor.solution}</div>
        </div>
    `;

    // Type-specific content
    if (anchorType === 'intent') {
        html += `
            <div class="anchor-section">
                <div class="anchor-section-label">Ambiguity Map</div>
                <ul class="ambiguity-list">
                    ${anchor.ambiguity_map.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="anchor-section">
                <div class="anchor-section-label">Confidence Thresholds</div>
                <div class="confidence-grid">
                    <div class="confidence-item confidence-high">
                        <div class="confidence-label">High (>90%)</div>
                        <div class="confidence-example">${anchor.confidence_thresholds.high}</div>
                    </div>
                    <div class="confidence-item confidence-medium">
                        <div class="confidence-label">Medium (70-90%)</div>
                        <div class="confidence-example">${anchor.confidence_thresholds.medium}</div>
                    </div>
                    <div class="confidence-item confidence-low">
                        <div class="confidence-label">Low (<70%)</div>
                        <div class="confidence-example">${anchor.confidence_thresholds.low}</div>
                    </div>
                </div>
            </div>
        `;
    }

    if (anchorType === 'coordinate') {
        html += `
            <div class="anchor-section">
                <div class="anchor-section-label">Flow Steps</div>
                <ol class="flow-steps">
                    ${anchor.flow.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            <div class="anchor-section">
                <div class="anchor-section-label">Failure Points & Recovery</div>
                ${anchor.failure_points.map(fp => `
                    <div class="failure-point">
                        <div class="fp-step"><strong>Step:</strong> ${fp.step}</div>
                        <div class="fp-failure"><strong>Failure:</strong> ${fp.failure}</div>
                        <div class="fp-recovery"><strong>Recovery:</strong> ${fp.recovery}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (anchorType === 'context') {
        html += `
            <div class="anchor-section">
                <div class="anchor-section-label">Context Schema</div>
                <div class="schema-preview copyable-section">
                    <pre><code>${JSON.stringify(anchor.schema, null, 2)}</code></pre>
                </div>
            </div>
            <div class="anchor-section">
                <div class="anchor-section-label">Handoff Scenarios</div>
                ${anchor.handoffs.map(h => `
                    <div class="handoff-scenario">
                        <div class="handoff-route">${h.from} → ${h.to}</div>
                        <div class="handoff-scenario-text"><strong>Scenario:</strong> ${h.scenario}</div>
                        <div class="handoff-context"><strong>Context Preserved:</strong> ${h.context_preserved}</div>
                        <div class="handoff-human"><strong>Human Sees:</strong> "${h.human_sees}"</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (anchorType === 'involve') {
        html += `
            <div class="anchor-section">
                <div class="anchor-section-label">Escalation Triggers</div>
                ${anchor.escalation_triggers.map(et => `
                    <div class="escalation-trigger">
                        <div class="et-header">
                            <div class="et-condition">${et.condition}</div>
                            <div class="et-priority priority-${et.priority.toLowerCase()}">${et.priority}</div>
                        </div>
                        <div class="et-action"><strong>Action:</strong> ${et.action}</div>
                    </div>
                `).join('')}
            </div>
            <div class="anchor-section">
                <div class="anchor-section-label">Decision Matrix</div>
                <div class="decision-matrix">
                    ${Object.entries(anchor.decision_matrix).map(([scenario, decision]) => `
                        <div class="matrix-row">
                            <div class="matrix-scenario">${scenario.replace(/_/g, ' ')}</div>
                            <div class="matrix-decision">${decision}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function renderConcepts() {
    const content = document.getElementById('concepts-content');
    const filtered = filterItems(data.concepts, 'concept');

    let contextualCard = '';
    if (activeFilters.concept.length === 1) {
        const concept = activeFilters.concept[0];
        const example = conceptExampleMap[concept];
        if (example) {
            contextualCard = `
                <div class="contextual-card">
                    <div class="contextual-label">Concrete example: ${concept}</div>
                    <div class="contextual-content">${example}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${example.replace(/'/g, "\\'")}')">Copy</button>
                </div>
            `;
        }
    }

    if (filtered.length === 0) {
        content.innerHTML = contextualCard + '<div class="no-results"><div class="no-results-icon">🔍</div><div class="no-results-title">No concepts found</div><div class="no-results-description">Try adjusting your filters or search term</div></div>';
        return;
    }

    content.innerHTML = contextualCard + filtered.map(concept => `
        <div class="card concept-card" data-searchable="${concept.title} ${concept.description} ${concept.example} ${concept.principle} ${concept.howToImplement ? concept.howToImplement.join(' ') : ''} ${concept.redFlags ? concept.redFlags.join(' ') : ''}">
            <div class="card-header">
                <div>
                    <div class="card-title">${concept.title}</div>
                    <div class="card-tags">
                        ${concept.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="card-content">
                <p><strong>What it is:</strong> ${concept.description}</p>
                <p><strong>Example:</strong> ${concept.example}</p>
                <p><strong>Principle:</strong> ${concept.principle}</p>
                ${concept.howToImplement ? `
                    <div class="implementation-guide">
                        <strong>How to implement:</strong>
                        <ul>
                            ${concept.howToImplement.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${concept.redFlags ? `
                    <div class="red-flags">
                        <strong>🚩 Red flags:</strong>
                        <ul>
                            ${concept.redFlags.map(flag => `<li>${flag}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderByRole() {
    const content = document.getElementById('by-role-content');
    const filtered = filterItems(data.byRole, 'role');

    let contextualCard = '';
    if (activeFilters.role.length === 1) {
        const role = activeFilters.role[0];
        const question = roleQuestionMap[role];
        if (question) {
            contextualCard = `
                <div class="contextual-card copyable-section">
                    <div class="contextual-label">Best next question for ${role}</div>
                    <div class="contextual-content">${question}</div>
                </div>
            `;
        }
    }

    if (filtered.length === 0) {
        content.innerHTML = contextualCard + '<div class="no-results"><div class="no-results-icon">👤</div><div class="no-results-title">No roles found</div><div class="no-results-description">Try selecting different role filters</div></div>';
        return;
    }

    content.innerHTML = contextualCard + filtered.map(item => `
        <div class="card role-card" data-searchable="${item.role} ${item.concern} ${item.frame} ${item.talking_points.join(' ')} ${item.connect_to} ${item.care_about} ${item.persona_quotes.join(' ')} ${item.deliverablesForRole ? item.deliverablesForRole.join(' ') : ''}">
            <div class="card-header">
                <div>
                    <div class="card-title">${item.role}</div>
                    <div class="card-meta">${item.concern}</div>
                </div>
            </div>
            <div class="card-content">
                <div class="persona-care">
                    <strong>I care about:</strong> ${item.care_about}
                </div>
                <div class="persona-quotes">
                    ${item.persona_quotes.map(quote => `
                        <div class="persona-quote">
                            <span class="quote-mark">"</span>
                            <span class="quote-text">${quote}</span>
                        </div>
                    `).join('')}
                </div>
                <p><strong>Frame it:</strong> ${item.frame}</p>
                <p><strong>Talking points:</strong></p>
                <div>
                    ${item.talking_points.map(point => `
                        <div class="talk-track">
                            <div class="talk-track-text">${point}</div>
                            <button class="copy-btn" onclick="copyToClipboard('${point.replace(/'/g, "\\'")}')">Copy</button>
                        </div>
                    `).join('')}
                </div>
                <p><strong>Connect to:</strong> ${item.connect_to}</p>
                ${item.deliverablesForRole ? `
                    <div class="role-deliverables">
                        <strong>Deliverables ${item.role} should request:</strong>
                        <ul>
                            ${item.deliverablesForRole.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderExamples() {
    const content = document.getElementById('examples-content');
    content.innerHTML = data.examples.map(example => `
        <div class="card example-card" data-searchable="${example.title} ${example.scenario} ${example.behavior.join(' ')} ${example.what_matters} ${example.patterns_used ? example.patterns_used.join(' ') : ''} ${example.context_preserved ? example.context_preserved.join(' ') : ''}">
            <div class="card-header">
                <div>
                    <div class="card-title">${example.title}</div>
                    <div class="card-meta">${example.scenario}</div>
                </div>
            </div>
            <div class="card-content">
                <p><strong>How it works:</strong></p>
                <ol class="example-steps">
                    ${example.behavior.map(step => `<li>${step}</li>`).join('')}
                </ol>
                <div class="example-insight">
                    <strong>Why this matters:</strong> ${example.what_matters}
                </div>
                ${example.patterns_used ? `
                    <div class="patterns-applied">
                        <strong>Patterns applied:</strong>
                        <div class="pattern-tags">
                            ${example.patterns_used.map(p => `<span class="pattern-tag">${p}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                ${example.context_preserved ? `
                    <div class="context-block">
                        <strong>Context preserved:</strong>
                        <ul>
                            ${example.context_preserved.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${example.failure_modes ? `
                    <div class="failure-modes-block">
                        <strong>What could go wrong (and how to prevent it):</strong>
                        ${example.failure_modes.map(fm => `
                            <div class="failure-mode-item">
                                <div class="fm-failure">⚠️ ${fm.failure}</div>
                                <div class="fm-impact"><strong>Impact:</strong> ${fm.impact}</div>
                                <div class="fm-prevention"><strong>Prevention:</strong> ${fm.prevention}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderQuestions() {
    const content = document.getElementById('questions-content');
    content.innerHTML = data.questionThemes.map(theme => `
        <div class="question-theme">
            <div class="question-theme-header">
                <span class="question-theme-icon">${theme.icon}</span>
                <h3 class="question-theme-title">${theme.theme}</h3>
            </div>
            <div class="question-theme-content">
                ${theme.questions.map((item, idx) => `
                    <div class="question-card expandable" data-searchable="${item.question} ${item.use_when} ${theme.theme} ${item.example}" data-question-id="${theme.theme}-${idx}">
                        <div class="question-card-main">
                            <div class="question-card-left">
                                <div class="question-text">${item.question}</div>
                                <div class="card-meta">Use when: ${item.use_when}</div>
                            </div>
                            <div class="question-expand-icon">+</div>
                        </div>
                        <div class="question-card-expanded">
                            <div class="question-example-label">Real scenario where this surfaced an issue:</div>
                            <div class="question-example-text">${item.example}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Attach expand/collapse handlers
    document.querySelectorAll('.question-card.expandable').forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            // Collapse all other cards first
            document.querySelectorAll('.question-card.expandable').forEach(c => c.classList.remove('expanded'));
            // Toggle this card
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    });
}

function renderCopyBank() {
    const content = document.getElementById('copy-bank-content');
    content.innerHTML = `
        <div class="top10-card">
            <div class="top10-header">
                <div class="top10-label">Top 10 Meeting Questions</div>
                <div class="top10-subtitle">Strategic alignment questions with directional answers for decision-making.</div>
            </div>
            <ol class="top10-list">
                ${data.top10Questions.map(item => `
                    <li class="top10-item">
                        <div class="top10-content">
                            <div class="top10-question">${item.question}</div>
                            <div class="top10-anchor">
                                <span class="top10-anchor-label">Anchor:</span> ${item.anchor}
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ol>
        </div>
        <h3 class="subsection-title">Quick Pivots</h3>
        <p class="subsection-description">Responses to common objections and conversation blockers.</p>
        ${data.copyBank.map(item => `
            <div class="card copyable-section" data-searchable="${item.situation} ${item.response} ${item.use}">
                <div class="card-header">
                    <div>
                        <div class="card-title">${item.situation}</div>
                    </div>
                </div>
                <div class="card-content">
                    <p><strong>Say:</strong> ${item.response}</p>
                    <p><strong>Use:</strong> ${item.use}</p>
                </div>
            </div>
        `).join('')}
    `;
}

function renderFilters() {
    const roleFilters = document.getElementById('role-filters');
    const conceptFilters = document.getElementById('concept-filters');

    const roles = ['PM', 'Eng', 'UX', 'Editorial'];
    roleFilters.innerHTML = roles.map(role => {
        const isActive = activeFilters.role.includes(role) ? 'active' : '';
        const roleClass = role.toLowerCase().replace(' ', '-');
        return `<button class="role-filter ${roleClass} ${isActive}" data-filter="role" data-value="${role}">${role}</button>`;
    }).join('');

    const concepts = ['Headless', 'Task Chaining', 'Single Door', 'Trust', 'Handoff', 'Recovery', 'Human Control', 'Clarify', 'Detour'];
    conceptFilters.innerHTML = concepts.map(concept => {
        const isActive = activeFilters.concept.includes(concept) ? 'active' : '';
        return `<button class="role-filter ${isActive}" data-filter="concept" data-value="${concept}">${concept}</button>`;
    }).join('');

    attachFilterListeners();
}

function attachFilterListeners() {
    document.querySelectorAll('.role-filter').forEach(filter => {
        filter.replaceWith(filter.cloneNode(true));
    });

    document.querySelectorAll('.role-filter').forEach(filter => {
        filter.addEventListener('click', (e) => {
            const filterType = e.target.getAttribute('data-filter');
            const value = e.target.getAttribute('data-value');

            e.target.classList.toggle('active');

            if (e.target.classList.contains('active')) {
                if (!activeFilters[filterType].includes(value)) {
                    activeFilters[filterType].push(value);
                }
            } else {
                activeFilters[filterType] = activeFilters[filterType].filter(v => v !== value);
            }

            if (filterType === 'role') {
                renderByRole();
            } else if (filterType === 'concept') {
                renderConcepts();
            }

            const searchInput = document.getElementById('search');
            if (searchInput.value) {
                handleSearch(searchInput.value);
            }
        });
    });
}

function filterItems(items, filterType) {
    const activeFilterList = activeFilters[filterType];
    if (activeFilterList.length === 0) return items;

    if (filterType === 'role') {
        return items.filter(item => activeFilterList.includes(item.role));
    } else if (filterType === 'concept') {
        return items.filter(item =>
            item.tags.some(tag => activeFilterList.includes(tag))
        );
    }
    return items;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function copyToClipboard(text) {
    const cleanText = text.replace(/\\'/g, "'");
    navigator.clipboard.writeText(cleanText).then(() => {
        showToast();
    }).catch(err => {
        console.error('Copy failed:', err);
        const textarea = document.createElement('textarea');
        textarea.value = cleanText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function renderQuickAsk() {
    const content = document.getElementById('quick-ask-content');
    // Use top10Questions which have both question and answer
    const questionsWithAnswers = data.top10Questions;

    content.innerHTML = questionsWithAnswers.map((item, index) => `
        <div class="quick-question" data-question-id="${index}">
            <div class="quick-question-text">${item.question}</div>
            <div class="quick-question-answer" id="answer-${index}" style="display: none;">
                <div class="answer-label">Answer:</div>
                <div class="answer-text">${item.anchor}</div>
            </div>
        </div>
    `).join('');

    // Add click handlers to toggle answers
    document.querySelectorAll('.quick-question').forEach((questionEl, index) => {
        questionEl.addEventListener('click', (e) => {
            const answerId = `answer-${index}`;
            const answerEl = document.getElementById(answerId);
            const isVisible = answerEl.style.display !== 'none';

            // Toggle this answer
            answerEl.style.display = isVisible ? 'none' : 'block';
            questionEl.classList.toggle('expanded', !isVisible);
        });
    });
}

function toggleQuickAsk() {
    const panel = document.getElementById('quick-ask-panel');
    const overlay = document.getElementById('overlay');
    panel.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeQuickAsk() {
    const panel = document.getElementById('quick-ask-panel');
    const overlay = document.getElementById('overlay');
    panel.classList.remove('open');
    overlay.classList.remove('show');
}

function toggleMeetingMode() {
    document.body.classList.toggle('meeting-mode');
    const btn = document.getElementById('meeting-mode-toggle');
    btn.classList.toggle('active');

    const isActive = document.body.classList.contains('meeting-mode');
    localStorage.setItem('meetingMode', isActive);
}

function handleSearch(query) {
    const searchableCards = document.querySelectorAll('[data-searchable]');
    const lowerQuery = query.toLowerCase();

    let visibleCount = 0;
    searchableCards.forEach(card => {
        const text = card.getAttribute('data-searchable').toLowerCase();
        if (text.includes(lowerQuery)) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const sections = document.querySelectorAll('.section.active');
    sections.forEach(section => {
        const content = section.querySelector('[id$="-content"]');
        const visibleInSection = content.querySelectorAll('[data-searchable]:not([style*="display: none"])').length;

        if (visibleInSection === 0 && query !== '') {
            const existing = content.querySelector('.no-results');
            if (!existing) {
                content.innerHTML = '<div class="no-results"><div class="no-results-icon">🔍</div><div class="no-results-title">No results found</div><div class="no-results-description">Try a different search term or browse by section</div></div>';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSpine();
    renderGettingStarted();
    renderConcepts();
    renderByRole();
    renderExamples();
    renderQuestions();
    renderCopyBank();
    renderTools();
    renderTestCases();
    renderFilters();
    renderQuickAsk();

    const meetingMode = localStorage.getItem('meetingMode') === 'true';
    if (meetingMode) {
        document.body.classList.add('meeting-mode');
        document.getElementById('meeting-mode-toggle').classList.add('active');
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('show');
    }

    function openMobileMenu() {
        sidebar.classList.add('open');
        mobileOverlay.classList.add('show');
    }

    mobileMenuToggle.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when navigation link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');

            activeSection = section;

            const searchInput = document.getElementById('search');
            if (searchInput.value) {
                handleSearch(searchInput.value);
            }
        });
    });

    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clear-search');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        clearBtn.style.display = query ? 'block' : 'none';
        handleSearch(query);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        handleSearch('');
    });

    document.getElementById('quick-ask-btn').addEventListener('click', toggleQuickAsk);
    document.getElementById('close-quick-ask').addEventListener('click', closeQuickAsk);
    document.getElementById('overlay').addEventListener('click', closeQuickAsk);
    document.getElementById('meeting-mode-toggle').addEventListener('click', toggleMeetingMode);

    // Initialize breadcrumbs and back button
    initializeBreadcrumbsAndBackButton();
});

// ============================================
// Breadcrumbs and Back Button
// ============================================
let navigationHistory = [];

function initializeBreadcrumbsAndBackButton() {
    updateBreadcrumbs('getting-started');

    // Back button handler
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        if (navigationHistory.length > 0) {
            const previousSection = navigationHistory.pop();
            const navLink = document.querySelector(`.nav-link[data-section="${previousSection}"]`);
            if (navLink) {
                navLink.click();
            }
        } else {
            const homeLink = document.querySelector('.nav-link[data-section="getting-started"]');
            if (homeLink) homeLink.click();
        }
    });

    // Enhance nav link clicks to track history
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetSection = e.target.getAttribute('data-section');
            if (activeSection && activeSection !== targetSection) {
                navigationHistory.push(activeSection);
            }
            updateBreadcrumbs(targetSection);
        });
    });
}

function updateBreadcrumbs(sectionName) {
    const breadcrumbs = document.getElementById('breadcrumbs');
    const backButton = document.getElementById('back-button');

    const sectionNames = {
        'getting-started': 'Start Here',
        'spine': 'Coordination Spine',
        'concepts': 'Core Concepts',
        'by-role': 'Role Guidance',
        'examples': 'Experience Examples',
        'tools': 'Decision Tools',
        'test-cases': 'Test Cases',
        'questions': 'Alignment Questions',
        'reframes': 'Leadership Reframes'
    };

    const displayName = sectionNames[sectionName] || sectionName;

    if (sectionName === 'getting-started') {
        breadcrumbs.innerHTML = '<span class="breadcrumb-item">Home</span>';
        backButton.style.display = 'none';
    } else {
        breadcrumbs.innerHTML = `
            <span class="breadcrumb-item link" data-section="getting-started">Home</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item">${displayName}</span>
        `;

        // Add click listener to home breadcrumb
        const homeLink = breadcrumbs.querySelector('[data-section="getting-started"]');
        if (homeLink) {
            homeLink.addEventListener('click', () => {
                const navLink = document.querySelector('.nav-link[data-section="getting-started"]');
                if (navLink) navLink.click();
            });
        }

        backButton.style.display = 'inline-flex';
    }
}
