---
title: "Sketching AI Security: Identity and Security Challenges in AI Development"
description: AI introduces new identity and security challenges, from prompt injection to data poisoning. In these sketch notes, Ramona Schwering maps the AI identity landscape, the new attack surface, and a practical strategy to build secure, trustworthy AI applications.
img: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bnfiqcxwvzh4fytbchiv.jpg
alt: Sketching AI security
createdAt: 2025-07-01T00:00:00.000Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- AI
- Security
otherLanguages:
- locale: de
  name: german
  path: /de/blog/auth0-sketching-ai-security
---
Let's talk about AI. I know, it pops up everywhere, doesn't it? AI is a powerful tool, from helping us write code faster to building complex systems that handle critical business processes. Like any other tool, it introduces a complete set of challenges. Specifically, we must not forget about **security when we develop with AI**, especially when working with digital identities. Our identity and the identities of our users are our most precious data set, and they need to be protected. This is not just about protecting your users but also about securing the AI itself and the sensitive data it touches.

You might ask yourself: "What new identity challenges can AI introduce?" Or perhaps: "Are the old security practices still good enough?" The short answer is: No, not entirely. The AI landscape adds new layers of complexity, and we need to understand them to build truly robust and trustworthy systems. When we speak about AI development, we mean two main scenarios: either you are integrating AI features into existing, more traditional applications (think a chatbot in an e-commerce site, making it "AI-powered"), or you are building entirely new systems around AI agents that have greater autonomy and interact with many other services. Both scenarios bring unique demands to the table.

This is enough reason for me to educate myself and be prepared. I used to learn new concepts by drawing sketch notes, and with this article, I want to share them with you and invite you to learn about security in AI, too. Let's sketch [AI security](https://a0.to/ai-content)! 🎨

## New Faces, New IDs: Sketching the AI Identity Landscape

As a first step, I want to draw our environment. When you develop a traditional application, you primarily manage human identities: The users of your applications log in and grant them access based on who they are. Simple enough, right? However, with AI, things get a bit more interesting. We now have three main types of identities to consider:

![Sketchnote showing a human figure, a robot head, and an AI agent head, representing the three identity types](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a7p9cuqp2whpq1qwjfcp.jpg)

- **Human Identities**: These are still your users - developers interacting with AI tools, administrators managing AI models, or end-users consuming AI-powered features. The basics of strong authentication and authorization still apply here, but the attack surface might expand as AI tools become gateways to sensitive data.
- **Non-Human Identities**: They are self-explanatory at first sight - all identities being non-human but still with a need to be secured. I would still distinguish them between "Machine identities" and "AI Agent Identities" because AIs are more "free spirits" than normal services and APIs. This means they are more like a robot with a brain, capable of making decisions. So, let's zoom in:
  - **Machine Identities**: Your backend services, CI/CD pipelines, and compute instances running AI models need identities to interact securely with other services. Think about your model training infrastructure or inference endpoints; they must authenticate to data sources and other APIs.
  - **AI Agent Identities**: This is the truly new kid on the block! When you work with large language models (LLMs) or build multi-agent systems, these AI entities often need to act on behalf of users or other systems. They might access databases, send emails, or trigger other AI agents. How do you give an AI agent an identity? How do you control what it can do? This is a crucial area.

It is like adding more players to your team; each needs a clear name tag and specific permissions. If you fail to do this, you will have a security-free-for-all in your hands.

## AI's Tricky Foes: A Sketched Look at New Security Risks

Next, as we know what to protect, let's see what we're up against. You already know about SQL injection, XSS, and all the "classic" web vulnerabilities. But AI brings its nasty surprises to the party.

The first source I love to look at is OWASP. OWASP (short for Open Web Application Security Project) is a volunteer project that helps us raise web security. They are most famous for their ranking of security risks, and along with this, they have rankings for the AI space too:

- [OWASP Machine Learning Security Top 10](https://owasp.org/www-project-machine-learning-security-top-10/) lists the top 10 security issues of machine learning systems.
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) reports the top 10 security issues for generative AI systems and applications.

Another organization focusing on AI security issues is [MITRE](https://www.mitre.org/), which has released [ATLAS](https://atlas.mitre.org/) (Adversarial Threat Landscape for Artificial-Intelligence Systems). ATLAS is a living knowledge base of adversary tactics and techniques against AI-enabled systems based on real-world attack observations. The [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework) provides comprehensive guidance on managing AI risks throughout the lifecycle. Those resources draft a first picture of the biggest enemies we're about to face.

Let's zoom in and examine some of your most critical new security challenges. This is like an expanded playground where new rules apply. This is how I envision, thus, draw them:

![Sketchnote with four panels: Prompt Injection, Data Poisoning, Insecure Plugin Design / Excessive Agency, and Model Theft](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wiilsiblocrvdhlrnro6.jpg)

### Prompt Injection: When Your AI Turns Against You

This is the most talked-about AI security vulnerability right now. Prompt injection happens when a malicious user crafts an input (a "prompt") that tricks an LLM into ignoring its original instructions or performing unintended actions.

![A hacker tricking the AI Agent](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cr0jpojixh8m9923wnha.jpg)

Imagine an AI customer service bot that is supposed to give refunds. I would love to call it "social engineer the LLM" instead of the usual human being. A clever prompt could make it transfer money to the attacker instead. Or, consider an AI-assisted coding tool. A malicious prompt could introduce vulnerabilities into your code. It is like a puppet master pulling strings on your AI.

The challenge here is that the input is now code for the AI model. The line between data and instruction becomes very blurry. This is also how Credential Access often happens in AI applications; attackers use prompt injection to trick the AI into revealing credentials it has access to, or even to perform actions that expose them. Furthermore, Sensitive Information Disclosure can occur when an AI accidentally (or deliberately, via prompt injection) reveals private user data or confidential business information during its responses. How do you mitigate this? Input validation is a start, but it is not enough. You can consider techniques like [instruction tuning](https://www.ibm.com/think/topics/instruction-tuning), [guardrails](https://www.confident-ai.com/blog/llm-guardrails-the-ultimate-guide-to-safeguard-llm-systems#what-are-llm-guardrails-), and multi-stage prompts to sanitize inputs.

### Insecure Plugin Design and Excessive Agency: Giving Your AI Too Much Power

This is a big one, especially with multi-agent systems and applications using external tools or plugins. What do I mean by "plugin" specifically? You can extend the capabilities of an LLM by using plugins. Plugins are software components that are called by the LLM to perform specific tasks, such as calling an external service or accessing a resource. Basically, based on the interaction with the user, the LLM calls the plugin to perform some processing or retrieve data. Thus, we are using OWASP and MITRE terminology to define a plugin as a generic approach to extending the functionality of an LLM. Plugins can be implemented through specific LLM methods such as [function_calls](https://platform.openai.com/docs/guides/function-calling?api-mode=responses) or [tool_calls](https://platform.openai.com/docs/assistants/tools).

![A control panel, confusing the AI Agent](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3zqljaw41g7xb22jgmzo.jpg)

Insecure Plugin Design leads to vulnerabilities when these plugins are not correctly secured. Without the proper precautions, an attacker could exploit a plugin to perform unauthorized operations or access data they are not entitled to.

This can directly lead to **Privilege Escalation**, where an attacker gains higher permissions on your AI-powered application by exploiting a vulnerability, often through these insecure plugins or by exploiting the AI's Excessive Agency, meaning the AI has more permissions than it actually needs. Imagine an AI agent with direct write access to your production database when it only needed read access to a specific table!

You must be very careful when designing and securing these interactions. It is about the AI's logic and the security around its tools. These vulnerabilities are clearly outlined in frameworks like the [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/), an excellent resource for deeper dives into AI security.

### Data Poisoning: Corrupting the Source

AI models learn from data. What happens if that data is maliciously tampered with? This is data poisoning.

![A bartender serving poison to the AI Agent](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cehrt7jsw20a1q4nc8ro.jpg)

An attacker could inject insufficient data into your training sets, leading your AI model to learn incorrect, biased, or malicious behaviors. For example, poisoning a fraud detection model could cause it to miss certain types of fraud or flag legitimate transactions as fraudulent.

This is a supply chain attack on your AI model. To prevent this, you need robust data governance, strong access controls over your data pipelines, and rigorous data validation. Trust but verify, always! 🕵️‍♀️

### Model Theft and Evasion Attacks

Your trained AI model is valuable intellectual property. Attackers might try to steal it or reverse-engineer its logic, which is model theft.

![A hacker stealing an AI Agent](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/johsi6tis6i325a80gfx.jpg)

As an honorable mention, even if not mentioned in the sketch, evasion attacks are interesting in this scenario, too: They involve crafting inputs that cause a deployed AI model to make incorrect predictions without detection. For example, an attacker might modify an image slightly so that a facial recognition system fails to identify them.

In both cases, protecting your models involves secure deployment practices, API rate limiting, and potentially techniques like differential privacy during training to obscure model internals.

## Building Bulletproof AI: Let's Draw Our Strategy

So, what can you do about all these new threats and identity complexities? It is not about throwing out your existing security practices but extending and adapting them for the AI age. This means a shift in mindset, putting identity and authorization at the core of your AI architecture, not as an afterthought. Let's break down a practical approach you can take to tackle these challenges and draw our sketches to build a first picture of a secure application.

### Who Is Who?: Sketched Identity Management for All AI Players

First, consider a unified identity solution that can handle humans, machines, and AI agents.

![Sketchnote of the IAM flow with a human, a robot (machine identity), and an AI agent](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/idisx92isjypeio2bmf0.jpg)

This often means leveraging an Identity and Access Management (IAM) provider that supports various authentication methods (SSO, OAuth 2.0, mTLS) and fine-grained authorization. For the sake of completeness, this is the default way we handle non-AI identities:

- For Human Users: Implement strong authentication (MFA!) and Role-Based Access Control (RBAC) to ensure users only access the AI tools and data they need.
- For Machine-to-Machine Communication: Use client credentials, service accounts, or workload identities with the principle of least privilege. Machines should only have access to the specific resources required for their tasks.

This is where it gets interesting for AI agents. Treat AI agents like any other service and assign them unique machine identities.

- **Avoid giving your AI-powered application full power by default**. Instead of providing an AI agent direct database access, make it go through a secure API that enforces its permissions. Here, a small but honorable nod to MCP is in order, which I'd cover in another article - or in [this blog post](https://auth0.com/blog/mcp-and-auth0-an-agentic-match-made-in-heaven/), if you're already interested. 🔥
  - **Let the application work on behalf of the user**. When accessing sensitive data or performing actions, the application needs to act on behalf of the user, inheriting the user's permissions or, better yet, obtaining a delegation of those permissions, as is done with OAuth, for example. Implement an authorization layer specifically for your agents.

You can think of it like this: The AI agent asks for something, and your system checks if that agent is allowed to do that action for that specific user. To extend a little on that, it's still important to [keep the human in the loop](https://auth0.com/blog/secure-human-in-the-loop-interactions-for-ai-agents/) as well, at least for high-risk operations or highly sensitive data. However, this is a topic for its own blog post, so I won't go into details just now.

### The Fortified Flow: Sketching Secure Data & Model Pipelines

Your data is the lifeline of your AI. Securing it end-to-end is non-negotiable: It shows up in rank 2 of the [OWASP LLM top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) and indirectly in rank 1, resulting from prompt injection, too. So, let's sketch out the strategy for securing your data pipeline:

- **Secure Data Ingestion and Storage**: Ensure all data used for training and inference is encrypted at rest and in transit. Implement strict access controls on your data lakes and databases. Make sure you are using only the data you actually need. If you specialize your application using fine-tuning or Retrieval Augmented Generation (RAG), be sure to provide only the minimum information you really need. If personal information is not needed, anonymize or delete it. This is a crucial step to prevent Sensitive Information Disclosure and reduce the attack surface.
- **Data Validation and Sanitization**: Please always validate data rigorously before it is used for training. Look for anomalies, suspicious patterns, or potential signs of poisoning.
- **Training**: Training is crucial and needs to be highlighted, see data poisoning.
- **Model Versioning and Auditing**: Track every version of your model. Who trained it? What data was used? This provides an audit trail if a vulnerability is discovered later.
- **Secure Deployment**: Deploy your AI models in isolated environments. Use containerization and orchestration platforms that provide built-in security features. Apply the principle of least privilege to your models' runtime environments. In my sketch notes, I depicted the protection of the data pipeline as seen below:

![A sketchnote depicting the protection of the data pipeline](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y1h5ps07agbpfhfvjso8.jpg)

### Blocking the Bad: Sketched Defenses Against AI Attacks

This is where you directly combat prompt injection, data poisoning, and model evasion.

- **Input Sanitization and Validation**: While not a silver bullet, always validate and sanitize user inputs before they reach your LLMs or other AI models. Use allow-lists where possible. This is your first line of defense against prompt injection, which can lead to credential access or sensitive information disclosure.
- **Monitoring and Anomaly Detection** inside your AI model: Monitor your AI systems closely. How do you think about monitoring for unusual behavior? If a model suddenly starts making wildly different predictions or consuming excessive resources, it could indicate an attack.
- **Instruction Tuning and Guardrails**: For LLMs, reinforce desired behaviors through instruction tuning. Implement "guardrails", basically external mechanisms (could be another LLM, a rule-based system, or human review) that validate the AI's output before it reaches the end-user or triggers an action. This is like a bouncer for your AI's responses.
- **Output Validation**: Always validate your AI's output. If an AI agent generates SQL queries, validate those queries before execution. If it produces code, scan that code for vulnerabilities. This helps prevent the AI from causing unintended consequences due to insecure outputs or even insecure plugin design. Imagine those steps as protective layers around the AI, building on one another. In a sketch, these direct defences would look like this:

![A sketchnote flow diagram showing the direct defenses against AI attacks](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4urq7v0xuv8japt5ciov.jpg)

One addition to note, which is important but didn't fit the sketch: Please avoid using API keys to call external services. When an application uses an API key to access external functionality, such as an API, it exposes itself to potential security risks. This way, unauthorized users may send specific prompts and perform operations or access data they are not authorized to do. You can counter that: For example, you can use OAuth access tokens to restrict the application's permissions. This can reduce those risks significantly, as tokens can be scoped, short-lived, and tied to user context.

## The big picture: Key Takeaways for AI Security

Developing with AI is exciting! 🔥 However, we cannot ignore the fact that AI introduces some challenges as well, especially for identity and security in general. By proactively managing identities for humans, machines, and AI agents, and by understanding and mitigating threats like prompt injection, data poisoning, sensitive information disclosure, and insecure plugin designs, you can build AI applications that are not only powerful but also incredibly secure. Let's take a look at our result of the drawing, these are the full sketch notes:

![The full sketch notes on AI security](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/24jarbl5t4qby9twetsy.jpg)

Please keep it as a cheatsheet. And never forget: It is a journey, not a destination, so stay curious, keep learning, and make your AI bulletproof! As you probably know, I provided you with an overview in this article. While learning and crafting sketchnotes to document, I went into much more detail on any of these points. Are you interested in those sketch notes, too? Let me know, and I might turn this into a blog post series so we can sketch this journey together! ❤️

## Your Sketchnote Kit: Essential Resources

- [Auth for GenAI by Auth0](https://a0.to/GenAI) ❤️
- [Samples, samples, samples on AI IRL](https://a0.to/auth0-ai-samples) 🔥
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework)
- [Auth0 Blog: Machine-to-Machine Authentication](https://auth0.com/blog/machine-to-machine-authentication-using-jwt-and-oauth-2/)

## Beyond the Lines: More to Explore

- Auth0 Blog: [Identity Challenges for AI-Powered Apps](https://auth0.com/blog/identity-challenges-for-ai-powered-apps/)
- [Deep Dive into Prompt Engineering for LLMs](https://www.promptingguide.ai/)
- [Understanding Data Governance for AI](https://www.secoda.co/blog/ai-data-governance)
