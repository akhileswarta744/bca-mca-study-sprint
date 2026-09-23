import { TopicLearningContent } from '../../types';

export const SE_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'se-sdlc-models': {
    topicId: 'se-sdlc-models',
    topicName: 'SDLC Phases, Waterfall Model & Spiral Model',
    subjectId: 'software-engineering',
    whatIsIt: 'The Software Development Life Cycle (SDLC) is a structured systematic process for planning, creating, testing, deploying, and maintaining high-quality software systems.',
    simpleExplanation: 'Building software is like constructing a house: you cannot start painting interior walls or laying bricks before the architect finishes blueprints (Requirements & Design). SDLC models define the schedule and stages—from the initial blueprint to the ribbon-cutting and ongoing home maintenance.',
    technicalExplanation: 'SDLC Core Phases: 1. Requirements Analysis (SRS document), 2. System Design (High-Level Architecture and Low-Level Component Design), 3. Implementation / Coding, 4. Testing & Verification, 5. Deployment / Release, 6. Maintenance (Corrective, Adaptive, Perfective, Preventive). Waterfall Model is a linear-sequential model where each phase must complete before the next begins; rigid, simple, but poor at accommodating shifting requirements. Spiral Model (developed by Barry Boehm) is a risk-driven meta-model combining iterative development with systematic risk assessment cycles.',
    importantDefinitions: [
      { term: 'SRS (Software Requirements Specification)', definition: 'A formal document describing all functional and non-functional requirements, constraints, and system behaviors.' },
      { term: 'Waterfall Model', definition: 'A classic linear-sequential SDLC model where progress flows steadily downwards through discrete phases.' },
      { term: 'Spiral Model', definition: 'A risk-driven evolutionary SDLC model organized into four quadrants: Determine Objectives, Identify & Resolve Risks, Develop & Test, Plan Next Phase.' },
    ],
    keyConcepts: [
      'Waterfall Limitations: High risk of failure on projects with evolving requirements; working software is produced very late in the lifecycle.',
      'When to use Waterfall: Stable, well-understood requirements with established technology (e.g. government defense contracts, embedded systems).',
      'Spiral Model 4 Quadrants: 1. Objective Setting, 2. Risk Assessment & Reduction (prototyping), 3. Development & Validation, 4. Review & Next Phase Planning.',
      'Cost of fixing bugs increases exponentially in later phases (e.g. 100x more expensive in production maintenance than during requirements phase).',
    ],
    example: {
      type: 'diagram',
      title: 'Waterfall SDLC Sequential Stages',
      explanation: 'Unidirectional flow from requirements to maintenance.',
      diagramAscii: `
[ Requirements Analysis ] 
            |
            v
   [ System Design ]
            |
            v
   [ Implementation / Coding ]
            |
            v
      [ Integration & Testing ]
            |
            v
         [ Deployment ]
            |
            v
         [ Operations & Maintenance ]
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'What is the biggest drawback of the classic Waterfall Model in modern commercial software engineering?',
        answer: 'The lack of flexibility and inability to accommodate requirement changes once the design phase is completed. In the real world, user requirements constantly evolve. In Waterfall, working software is only demonstrated to stakeholders near the end of the project lifecycle. Discovering misunderstandings or design flaws at that late stage requires massive, cost-prohibitive rework.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming the Spiral Model is best suited for small, simple projects.',
        correction: 'The Spiral Model is complex, expensive, and demands deep risk-assessment expertise; it is specifically designed for large, high-risk, mission-critical systems.',
        why: 'Small projects cannot justify the overhead and specialized cost of formal multi-quadrant risk analysis.',
      },
    ],
    quickRevision: [
      'SDLC phases: Requirements -> Design -> Coding -> Testing -> Deployment -> Maintenance.',
      'Waterfall is linear-sequential; rigid; suited for fixed, clear requirements.',
      'Spiral model is risk-driven with 4 iterative quadrants.',
      'Cost of fixing errors grows exponentially across subsequent SDLC stages.',
    ],
    practiceQuestions: [
      {
        id: 'se-sdlc-q1',
        question: 'Which of the following is the defining core characteristic of Barry Boehm’s Spiral Model of software development?',
        options: ['Automated test-driven generation', 'Explicit risk assessment and risk management at every iteration', 'Zero documentation requirement', 'Strict linear progress without feedback loops'],
        correctOptionIndex: 1,
        explanation: 'The defining and distinguishing characteristic of the Spiral Model is its risk-driven approach, where every iteration begins with risk identification and prototype evaluation.',
      },
    ],
  },

  'se-agile-scrum': {
    topicId: 'se-agile-scrum',
    topicName: 'Agile Methodology & Scrum Framework',
    subjectId: 'software-engineering',
    whatIsIt: 'Agile is an iterative, incremental software engineering approach emphasizing adaptive planning, rapid customer feedback, cross-functional collaboration, and early delivery of working software.',
    simpleExplanation: 'Instead of spending two years building a massive cruise ship in secret only to find out customers wanted a jet ski, Agile delivers a working skateboard in 2 weeks, then upgrades it into a bicycle, then a motorcycle, and eventually a car, getting real customer feedback at every single step.',
    technicalExplanation: 'The Agile Manifesto values: Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan. Scrum is the most prevalent Agile framework. Work is divided into fixed timeboxed iterations called Sprints (typically 1 to 4 weeks). Scrum Roles: Product Owner (manages product backlog and business vision), Scrum Master (serves as process coach, removes team blockers), Development Team (cross-functional engineers). Scrum Artifacts: Product Backlog, Sprint Backlog, Increment. Scrum Ceremonies: Sprint Planning, Daily Scrum (15-min standup), Sprint Review (demo), Sprint Retrospective.',
    importantDefinitions: [
      { term: 'Sprint', definition: 'A timeboxed iteration of typically 2 to 4 weeks during which a potentially shippable product increment is created.' },
      { term: 'Product Owner', definition: 'The stakeholder role responsible for maximizing product value and prioritizing items in the Product Backlog.' },
      { term: 'Scrum Master', definition: 'The servant-leader coach who facilitates Scrum ceremonies and eliminates team impediments/blockers.' },
      { term: 'User Story', definition: 'A concise informal requirement from the end-user perspective: "As a [role], I want [feature], so that [business value]."' },
    ],
    keyConcepts: [
      'Scrum Roles: Product Owner, Scrum Master, Development Team (no project managers).',
      'Scrum Ceremonies (4): 1. Sprint Planning, 2. Daily Scrum (What did I do? What will I do? Any blockers?), 3. Sprint Review, 4. Sprint Retrospective (team reflection & continuous improvement).',
      'Sprint Backlog is locked during the sprint to preserve focus.',
      'Velocity: The metric tracking the amount of work (in story points) completed by a Scrum team during a sprint.',
    ],
    example: {
      type: 'text',
      title: 'Scrum Sprint Cycle and Ceremonies Overview',
      explanation: 'The cadence of events occurring across a 2-week Scrum sprint.',
      output: `Product Backlog (Prioritized features managed by Product Owner)
   |
   +--> Sprint Planning (Team selects items for Sprint Backlog)
           |
           +--> Sprint Execution (2-Week Timebox)
                   |-- Daily Standup (15-min daily sync)
                   |-- Continuous Integration & Testing
                   v
           +--> Sprint Review (Demonstrate working software to stakeholders)
                   v
           +--> Sprint Retrospective (Inspect & Adapt: What went well? What to improve?)
                   v
           Shippable Product Increment Released!`,
    },
    commonInterviewQuestions: [
      {
        question: 'What is the difference between the Sprint Review and the Sprint Retrospective?',
        answer: 'Sprint Review focuses on the PRODUCT: the team demonstrates the newly completed software increment to stakeholders and the Product Owner to gather feedback on functionality. Sprint Retrospective focuses on the PROCESS and TEAM: the team meets privately to inspect their own workflow, tools, communication, and interpersonal dynamics to identify concrete improvements for the next sprint.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Treating the Scrum Master as a traditional command-and-control Project Manager.',
        correction: 'The Scrum Master is a servant-leader and coach who helps the self-organizing team succeed and removes external roadblocks; they do not assign tasks to developers.',
        why: 'In Scrum, the engineering team is self-organizing and pulls tasks from the sprint backlog.',
      },
    ],
    quickRevision: [
      'Agile: Working software & customer collaboration over rigid documentation.',
      'Scrum roles: Product Owner, Scrum Master, Development Team.',
      'Ceremonies: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.',
      'Sprints are timeboxed (usually 2 weeks) yielding shippable increments.',
    ],
    practiceQuestions: [
      {
        id: 'se-agile-q1',
        question: 'Which Scrum ceremony is specifically dedicated to team self-reflection and process improvement rather than feature demonstration?',
        options: ['Sprint Planning', 'Daily Scrum', 'Sprint Review', 'Sprint Retrospective'],
        correctOptionIndex: 3,
        explanation: 'The Sprint Retrospective is held at the end of every sprint for the team to reflect on what went well, what did not, and how to improve processes.',
      },
    ],
  },
};
