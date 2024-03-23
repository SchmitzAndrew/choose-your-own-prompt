import { Chat } from "@/components/chat/chat";

export default function Home() {
  const backgroundGradient = {
    background: 'linear-gradient(90deg, #8360c3 0%, #2ebf91 100%)'
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16" style={backgroundGradient}>
      <Chat />
    </main>
  );
}
