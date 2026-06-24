// Editorial collection shown on first launch. Fixed IDs keep the seeded posts
// stable while localStorage handles any changes made by the reader.
export const starterPosts = [
  {
    id: "ai-own-the-outcome",
    title: "AI Can Write Code. Engineering Still Means Owning the Outcome",
    subtitle:
      "The useful question is not whether a model can generate a function, but whether a team can understand, test, and operate what ships.",
    author: "B. Ahamed",
    category: "Artificial Intelligence",
    status: "Published",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=82",
    content: `
      <p>There is a particular kind of excitement that arrives when an AI tool produces working code in seconds. A blank file becomes a component, a test suite appears, and an unfamiliar API suddenly feels approachable. That moment is real. It is also the beginning of the engineering work, not the end of it.</p>

      <p>Code generation changes the cost of producing a first attempt. It does not remove the cost of deciding whether that attempt belongs in a real system. The generated function still has assumptions. The dependency still needs a reason to exist. The error path still has to make sense at two in the morning when a customer cannot complete an important task.</p>

      <h2>Speed is local, quality is systemic</h2>

      <p>A developer can feel faster while the team becomes slower. More code can mean more review, more tests, more deployment risk, and more future maintenance. DORA's 2025 research describes AI as an amplifier: it magnifies the strengths of teams with clear feedback loops, and it also magnifies the confusion of teams with weak testing, unclear ownership, or difficult releases.</p>

      <p>That is a better model than the idea of AI as a universal productivity switch. If a team can release small changes, observe production, and recover quickly, generated code may move through a healthy system. If the same team has a fragile test suite and a three-week review queue, faster generation simply delivers more work to the bottleneck.</p>

      <blockquote>The value of AI is not measured by how much code it produces. It is measured by how much useful, understandable software reaches people without creating hidden debt.</blockquote>

      <h2>Use the model to widen your thinking</h2>

      <p>The most productive prompts are often not requests for a finished answer. They are requests for alternatives. Ask for three data models and the tradeoffs between them. Ask which edge cases are missing. Ask for a failure-mode analysis before asking for an implementation. Ask the model to explain what evidence would prove its own suggestion wrong.</p>

      <p>This turns AI into a thinking partner rather than an authority. It is especially useful in the early part of a task, when the shape of the problem is still flexible. A quick prototype can expose a bad assumption before the team invests in it. A generated test matrix can reveal that a feature described as simple actually has six meaningful states.</p>

      <h2>Review the seams, not only the syntax</h2>

      <p>Generated code often looks polished at the line level. The greater risks sit between the lines: authorization boundaries, retry behavior, stale data, logging, accessibility, and the way a change interacts with the rest of the product. These are contextual questions. A model sees the context we provide; an engineer is responsible for noticing the context that was never provided.</p>

      <ul>
        <li>Confirm the behavior with tests that you understand and can explain.</li>
        <li>Inspect every new dependency, permission, and network request.</li>
        <li>Read the unhappy paths before admiring the happy path.</li>
        <li>Check whether the change is observable after deployment.</li>
        <li>Rewrite any section that the team would struggle to maintain without the model.</li>
      </ul>

      <p>METR's 2025 controlled study found that experienced open-source developers working in familiar repositories took longer with the AI tools tested in that setting, even though they expected to be faster. The result should not be stretched into a permanent verdict on AI. It is more useful as a reminder that perceived speed and measured speed are different things.</p>

      <h2>Ownership is the durable skill</h2>

      <p>Tools will improve. Interfaces will change. The durable engineering skill is ownership: the ability to explain why a solution is shaped this way, what could break, how the team will know, and what it will do next.</p>

      <p>AI can help us get to a possible answer sooner. Engineering is the discipline of turning that possibility into a dependable decision. The person who presses publish, approves the pull request, or deploys the service still owns the outcome. That responsibility is not a limitation of AI-assisted development. It is what makes the work engineering.</p>
    `,
    createdAt: "2026-06-12",
    updatedAt: "2026-06-24",
  },
  {
    id: "reliability-better-questions",
    title: "Reliable Software Begins With Better Questions",
    subtitle:
      "Observability is not a dashboard added at the end. It is a habit of designing software that can explain what it is doing.",
    author: "B. Ahamed",
    category: "Software Engineering",
    status: "Published",
    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=82",
    content: `
      <p>A feature can pass every local test and still become mysterious in production. The database is slower there. A third-party service times out. Real users take paths nobody included in the demo. The difference between a stressful incident and a manageable one is often whether the system can answer a few basic questions.</p>

      <p>What changed? Who is affected? Is the failure growing? Which dependency is involved? Can we reduce the impact without making the situation worse?</p>

      <p>Reliable software is designed to make those questions answerable.</p>

      <h2>Start with the user-visible promise</h2>

      <p>Teams sometimes begin monitoring with the easiest metric to collect: CPU usage, memory, or a count of requests. Those numbers can be useful, but they do not automatically describe the experience of a user. A service may have comfortable CPU usage while every checkout request fails because a payment dependency is returning errors.</p>

      <p>Google's Site Reliability Engineering guidance recommends thinking about signals such as latency, traffic, errors, and saturation. The deeper lesson is not the list itself. It is the decision to monitor behavior that connects technical health to the promise made to users.</p>

      <p>For a blog application, that promise might be simple: a writer can save a draft and find it again. From that sentence, useful questions follow. How often do saves fail? How long does a save take? Are failures related to large uploaded images? Does the post still exist after a refresh?</p>

      <h2>Logs should tell a story</h2>

      <p>A log line is valuable when it helps reconstruct an event. Good logs include enough context to connect related actions without exposing sensitive information. They describe what the system attempted, what happened, and which stable identifier can be used to continue the investigation.</p>

      <p>Bad logs create noise. They repeat successful events at high volume, hide the important failure in a wall of text, or report an error without the operation that caused it. Logging everything is not the same as observing well.</p>

      <blockquote>Observability is the ability to ask new questions of a running system without first shipping new code to answer them.</blockquote>

      <h2>Design failure as part of the feature</h2>

      <p>Every external call can be slow. Every browser storage operation can fail. Every uploaded image can be too large or malformed. Treating these outcomes as part of the feature produces calmer software.</p>

      <ul>
        <li>Use timeouts so one dependency cannot hold work forever.</li>
        <li>Retry only operations that are safe to repeat.</li>
        <li>Return messages that help the user recover.</li>
        <li>Record enough context for the team to understand the failure.</li>
        <li>Test the degraded path, not only the successful path.</li>
      </ul>

      <p>This does not require enterprise infrastructure. A small application can be reliable through careful validation, useful console errors during development, visible success states, and storage behavior that is deliberately tested. Reliability begins as a way of thinking long before it becomes a platform.</p>

      <h2>Alerts should lead to action</h2>

      <p>An alert is an interruption. It should be reserved for a condition that needs a human decision now. If a warning can wait until morning, place it in a report. If nobody knows what to do when an alert fires, improve the alert before adding more of them.</p>

      <p>A useful alert contains a symptom, impact, and first investigative step. It does not merely say that a server is unhappy. It says that published stories are failing to load for a meaningful share of readers, the problem began after a specific release, and the rollback path is available.</p>

      <h2>Make the system easy to explain</h2>

      <p>The best reliability work often looks ordinary: smaller functions, explicit states, predictable error handling, and fewer surprising dependencies. These decisions reduce the number of things an engineer must hold in mind during an incident.</p>

      <p>Software becomes dependable when its behavior is visible and its failures are considered normal engineering material. The goal is not a system that never fails. The goal is a system that fails within understood boundaries, tells us what happened, and gives the team a clear way forward.</p>
    `,
    createdAt: "2026-06-14",
    updatedAt: "2026-06-23",
  },
  {
    id: "ship-smaller-feedback-loops",
    title: "Ship Smaller: The Engineering Advantage of Short Feedback Loops",
    subtitle:
      "Small changes are easier to understand, safer to release, and far more honest about whether an idea is helping users.",
    author: "B. Ahamed",
    category: "Engineering Practice",
    status: "Published",
    cover:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=82",
    content: `
      <p>Large releases feel efficient while they are being planned. One meeting covers many features. One branch contains the whole redesign. One launch date promises a dramatic transformation. The trouble begins when the work meets reality.</p>

      <p>A large batch hides uncertainty. When something breaks, the team has many possible causes. When users are confused, it is difficult to know which change created the confusion. Reviewers must understand weeks of decisions at once, and rollback becomes a negotiation instead of a button.</p>

      <h2>Small is not the same as incomplete</h2>

      <p>A small change should still be coherent. It should make one useful improvement, preserve the surrounding experience, and leave the system in a healthy state. The goal is not to scatter unfinished fragments into production. The goal is to reduce the distance between an idea and trustworthy feedback.</p>

      <p>DORA's guidance on continuous delivery emphasizes working in small batches because small changes move through version control, testing, review, and deployment with faster feedback. This changes the economics of quality. When checking a change is cheap, teams can check more often.</p>

      <h2>Review becomes a conversation again</h2>

      <p>A reviewer can reason carefully about a focused pull request. They can ask why a new state exists, inspect its tests, and notice an accessibility issue. In a massive pull request, the same reviewer is pushed toward scanning. Important details become visually indistinguishable from mechanical changes.</p>

      <p>Small pull requests also improve the quality of explanations. The author can describe the problem, decision, and evidence without writing a novel. GitHub's own review guidance recommends making changes easy to review and keeping reviewers informed. That is not administrative polish. It is part of engineering quality.</p>

      <blockquote>The size of a change shapes the quality of attention it receives.</blockquote>

      <h2>Release risk becomes easier to control</h2>

      <p>Imagine changing the editor, storage format, dashboard layout, and publishing workflow in one release. If saving stops working, every layer is suspect. Now imagine introducing the storage change behind a tested migration, then updating the editor, then refining the dashboard. Each step has a smaller search space and a clearer rollback.</p>

      <ul>
        <li>Separate structural refactors from visible behavior changes.</li>
        <li>Use feature flags when a complete experience needs several deployments.</li>
        <li>Keep database and storage migrations backward compatible during rollout.</li>
        <li>Measure the user outcome before expanding the change.</li>
        <li>Delete temporary paths after the new behavior proves stable.</li>
      </ul>

      <h2>Feedback should change the next step</h2>

      <p>Shipping frequently has little value if nobody learns from the result. The team needs a clear expectation before release. Perhaps the new draft flow should reduce abandoned posts. Perhaps a smaller image upload should prevent storage failures. The observation does not need to be sophisticated, but it must be connected to a decision.</p>

      <p>This is where user focus matters. Faster delivery can produce more low-value software if the team measures output instead of outcomes. A short feedback loop includes the reader or customer, not only the build server.</p>

      <h2>Choose a boring rhythm</h2>

      <p>Healthy delivery is pleasantly uneventful. Changes are small enough to review. Tests run automatically. Releases happen during normal working hours. If something goes wrong, the team can identify the change and recover without heroics.</p>

      <p>That rhythm may look less impressive than a giant launch. It creates something more valuable: confidence. Confidence lets a team experiment, improve, and respond to users without turning every change into an event. Shipping smaller is not merely a delivery technique. It is a way to keep learning faster than complexity grows.</p>
    `,
    createdAt: "2026-06-17",
    updatedAt: "2026-06-22",
  },
  {
    id: "review-ai-generated-code",
    title: "How I Review AI-Generated Code Before I Trust It",
    subtitle:
      "A practical review routine for turning a convincing suggestion into code I am prepared to maintain.",
    author: "B. Ahamed",
    category: "Code Review",
    status: "Draft",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=82",
    content: `
      <p>AI-generated code often arrives with confidence. The names are tidy, the comments sound reasonable, and the happy path may work on the first run. That surface quality is exactly why I slow down before accepting it.</p>

      <p>I do not review generated code as if it came from a careless developer. I review it as code produced without responsibility for the system around it. The model will not receive the support ticket, explain the security incident, or maintain the dependency two years later. I will.</p>

      <h2>First, I restate the problem without looking at the answer</h2>

      <p>Before reading the generated implementation, I write down what the change must do, what it must never do, and which parts of the system it can affect. This prevents the proposed code from quietly redefining the task.</p>

      <p>If I cannot explain the expected behavior in a few sentences, I am not ready to review an implementation. The code may be syntactically correct while solving the wrong problem beautifully.</p>

      <h2>Then I trace data and trust boundaries</h2>

      <p>I follow every input from entry to storage or output. Where is it validated? Can it contain HTML, a file, a URL, or an identifier belonging to another user? Which values are trusted only because the interface normally produces them?</p>

      <p>OWASP's secure code review guidance is useful here because it pushes review beyond obvious syntax issues. Business logic, authorization, race conditions, and application-specific trust rules often require human context. A generic test suite rarely discovers all of them.</p>

      <ul>
        <li>Check authorization separately from authentication.</li>
        <li>Inspect how untrusted content is rendered.</li>
        <li>Look for secrets, personal data, and excessive logging.</li>
        <li>Confirm that repeated requests cannot corrupt state.</li>
        <li>Review dependency versions and licenses before installation.</li>
      </ul>

      <h2>I make the tests disagree with the implementation</h2>

      <p>Generated tests can repeat the assumptions of generated code. To avoid that loop, I write at least one test from the requirement and one from a failure scenario before accepting the suggested tests. I change boundaries, remove expected fields, repeat actions, and simulate unavailable dependencies.</p>

      <p>A test is valuable when it would fail for a believable bug. A large collection of assertions is not automatically a strong safety net.</p>

      <h2>I remove anything I cannot justify</h2>

      <p>AI tools sometimes add abstractions, fallback behavior, dependencies, or configuration that make the answer look complete. I ask a blunt question about every extra piece: what current requirement needs this?</p>

      <p>If the answer is vague, I remove it. Smaller code is easier to review and easier to own. I can add a capability later when the product has evidence that it needs one.</p>

      <blockquote>I do not merge code because I understand what it does today. I merge it when I also understand how it can fail tomorrow.</blockquote>

      <h2>Finally, I explain the change in my own words</h2>

      <p>Before opening a pull request, I describe the decision, tradeoffs, tests, and rollback path without borrowing the model's explanation. If I struggle to do that, the implementation is still not mine.</p>

      <p>GitHub describes pull request review as a collaboration for improving quality and sharing knowledge. That only works when the author can participate as an owner, not merely as the person who transferred output from a model into the repository.</p>

      <p>This draft is still evolving, but the principle is settled: AI can propose code at remarkable speed. Trust should continue to move at the speed of evidence.</p>
    `,
    createdAt: "2026-06-20",
    updatedAt: "2026-06-24",
  },
  {
    id: "portfolio-decisions",
    title: "A Portfolio Project Should Explain Your Decisions",
    subtitle:
      "The strongest student projects do more than display features. They reveal how the developer thinks when the answer is not obvious.",
    author: "B. Ahamed",
    category: "Career",
    status: "Draft",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=82",
    content: `
      <p>A portfolio is often treated like a gallery: a grid of screenshots, technology logos, and links to repositories. That can prove that a project exists. It does not always prove that the person presenting it understands the work.</p>

      <p>Hiring teams are not only looking for finished interfaces. They are looking for evidence of judgment. Why was this problem worth solving? Which constraint changed the design? What failed during development? How did feedback influence the next version?</p>

      <h2>Begin with a real user and a narrow problem</h2>

      <p>A project becomes easier to evaluate when its purpose is specific. "A blog app" describes a category. "A writing desk that lets a student move an article from rough draft to publication without losing work" describes a problem and an experience.</p>

      <p>DORA's research on user-centric teams makes a useful point: understanding user needs is connected to better product and organizational outcomes. For a portfolio project, user focus also creates better engineering decisions. It gives you a reason to prioritize one feature and reject another.</p>

      <h2>Show the path, not only the final screen</h2>

      <p>The final design hides the uncertainty that produced it. A short case study can restore that story. Include an early sketch, the first data model, a bug that changed the architecture, or a mobile layout that forced you to simplify the interface.</p>

      <p>This does not mean publishing every thought. Choose a few decisions that reveal your process. Explain the options you considered, the tradeoff you accepted, and what you would revisit with more time.</p>

      <blockquote>A polished result earns attention. A clear decision story earns trust.</blockquote>

      <h2>Make quality visible</h2>

      <p>Many important engineering choices are invisible in a screenshot. Empty states, validation, keyboard access, responsive behavior, safe HTML rendering, storage failures, and confirmation before destructive actions all shape whether an application feels dependable.</p>

      <p>Bring those details into the project description. A reviewer should not have to inspect every file to discover that you considered them.</p>

      <ul>
        <li>List the main user workflow and how you tested it.</li>
        <li>Describe one accessibility or responsive design decision.</li>
        <li>Explain how data is stored and what its limitations are.</li>
        <li>Include the checks used before deployment.</li>
        <li>Write down one known limitation honestly.</li>
      </ul>

      <h2>Use AI without erasing your authorship</h2>

      <p>AI tools can help research APIs, compare approaches, generate test cases, and improve wording. The portfolio still needs to show your understanding. If a reviewer asks why a component is structured a certain way, "the tool generated it" ends the conversation too early.</p>

      <p>The 2025 Stack Overflow Developer Survey found that more respondents distrusted the accuracy of AI tools than trusted it. That caution is healthy for students too. Use assistance, then verify the behavior, simplify the result, and make sure you can explain every important part.</p>

      <h2>Finish the unglamorous parts</h2>

      <p>A deployed link, useful README, sensible commit history, and clear setup steps say a great deal about professional readiness. They show that you can carry work beyond the interesting middle and make it usable by someone else.</p>

      <p>A portfolio does not need ten projects. Two or three thoughtful projects with clear decisions are more memorable than a page full of familiar clones. Build something small enough to finish, deep enough to discuss, and honest enough to represent how you actually work.</p>

      <p>This article remains a draft while I add concrete examples from the development of this blog manager itself.</p>
    `,
    createdAt: "2026-06-21",
    updatedAt: "2026-06-24",
  },
];
