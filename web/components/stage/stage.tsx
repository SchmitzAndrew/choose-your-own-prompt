import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const Stage = ({ text }: { text: string }) => {
  return (
    <Card className="grow w-full backdrop-blur-xl justify-center bg-white/80">
      <Balancer>
        <p className="text-center p-12">{text}</p>
      </Balancer>
      <Decisions />
    </Card>
  );
};

export const Decisions = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-12">
      <Button variant="outline">Option 1</Button>
      <Button variant="outline">Option 2</Button>
      <Button variant="outline">Option 3</Button>
      <Button variant="outline">Option 4</Button>
    </div>
  );
};
