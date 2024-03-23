import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const Stage = ({ text }: { text: string }) => {
  return (
    <Card className="grow w-full backdrop-blur-xl justify-center items-center flex flex-col bg-white/80">
      <img
        src="https://iadsb.tmgrup.com.tr/0999d9/0/0/0/0/2048/1199?u=https://idsb.tmgrup.com.tr/2017/03/19/jack-sparrow-might-be-inspired-by-a-muslim-captain-1489951367309.jpg"
        className="rounded-md h-64"
      />
      <Balancer>
        <p className="text-center mx-24">{text}</p>
      </Balancer>
      <Decisions />
    </Card>
  );
};

export const Decisions = () => {
  return (
    <div className="grid grid-cols-3 w-full gap-4 px-24">
      <Button variant="outline">Option 1</Button>
      <Button variant="outline" disabled>
        Option 2
      </Button>
      <Button variant="outline" disabled>
        Option 3
      </Button>
    </div>
  );
};
