import { AIChat } from "../components/ai-chat";
import { Navbar } from "../components/navbar";

export function AIChatPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <AIChat />
      </div>
    </>
  );
}