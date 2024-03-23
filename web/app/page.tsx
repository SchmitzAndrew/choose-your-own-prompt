import { Chat } from "@/components/chat/chat";
import { Decisions, Stage } from "@/components/stage/stage";

export default function Home() {
  const backgroundGradient = {
    background: "linear-gradient(90deg, #8360c3 0%, #2ebf91 100%)",
  };

  let contentList = "";
  const stage = `You are standing on the deck of a weather-beaten ship, the salty breeze \
whipping through your hair as the sun sinks low on the horizon. Your \
name is Jack Sparrow, a seasoned pirate with a thirst for adventure and \
a knack for finding trouble. As the crew bustles about, preparing for \
another night on the open sea, you find yourself drawn to an old, \
weathered map tucked away in the captain's quarters. The map is said to \
lead to the legendary treasure of Blackbeard himself – a fortune so vast \
it could make even the most hardened pirate's dreams come true. But it's \
not just the promise of gold that intrigues you; it's the thrill of the \
hunt, the challenge of outsmarting your rivals, and the chance to etch \
your name into the annals of pirate history. With a gleam in your eye \
and a swagger in your step, you snatch up the map and study it closely. \
The parchment is yellowed with age, the ink faded and smudged, but \
there's no mistaking the unmistakable markings that point to a remote \
island deep in the heart of the Caribbean. As you trace your finger \
along the lines, plotting your course, you can't help but wonder what \
dangers lie ahead. Will you encounter rival pirates hell-bent on \
claiming the treasure for themselves? Will you face treacherous storms, \
hidden traps, or ancient curses? Or will you emerge victorious, with \
riches beyond your wildest dreams? The choice is yours, me hearties. So, \
what'll it be? Will you set sail in search of Blackbeard's fabled \
fortune, or will you turn back and leave the map to gather dust for \
another day?`;
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-16"
      style={backgroundGradient}
    >
      <Stage text={stage} />
    </main>
  );
}
