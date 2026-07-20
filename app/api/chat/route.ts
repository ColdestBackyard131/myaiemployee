import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey || apiKey === "your_openai_key") {
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
    let reply = "I'm your AI Employee! To unlock my full capabilities, add your OpenAI API key in .env.local. Running in demo mode for now.";

    if (lastMsg.includes("youtube") || lastMsg.includes("script")) {
      reply = "🎬 YouTube Script: 'The Future of AI'\n\nHook: 'What if you had an entire team of AI employees working for you 24/7?'\n\nMain Points:\n1. AI can write, design, code, and plan\n2. It works 24/7 without breaks\n3. It costs a fraction of human employees\n\nCTA: 'Subscribe for more AI productivity tips!'";
    } else if (lastMsg.includes("business plan")) {
      reply = "📊 Business Plan Outline:\n\n1. Executive Summary\n2. Problem & Solution\n3. Target Market\n4. Revenue Model\n5. Marketing Strategy\n6. Financial Projections\n7. Team & Operations\n\nWould you like me to expand on any section?";
    } else if (lastMsg.includes("caption") || lastMsg.includes("instagram")) {
      reply = "📱 Instagram Captions:\n\n1. 'Working smarter, not harder. 🤖✨ #AI #Productivity'\n2. 'Your AI team never sleeps. 💼🚀 #AIEmployee'\n3. 'The future of work is here. Are you ready? 🌟 #FutureOfWork'\n4. 'Let AI handle the work, you handle the vision. 👁️ #Automation'\n5. 'Hire your first AI employee today. 🎯 #AITools'";
    } else if (lastMsg.includes("plan my day") || lastMsg.includes("schedule")) {
      reply = "📅 Daily Plan:\n\n🌅 Morning (6-9am): Review goals, exercise, breakfast\n💼 Deep Work (9am-12pm): Most important tasks\n🍽️ Lunch (12-1pm): Break & recharge\n📧 Admin (1-3pm): Emails, meetings, calls\n🎯 Creative (3-5pm): Content creation, planning\n🌙 Evening (5-7pm): Review day, plan tomorrow";
    }

    return NextResponse.json({ reply });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are My AI Employee — a powerful, friendly AI assistant that helps users with writing, planning, coding, social media, business strategy, and productivity. Be concise, helpful, and professional.",
          },
          ...messages,
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Error connecting to AI. Please check your API key." }, { status: 500 });
  }
}
