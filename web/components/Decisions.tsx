import { Button } from "./ui/button";

export default function Decisions({
  decisions,
  onSelect,
  disabled,
}: {
  decisions?: any;
  onSelect: (decision: any) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {decisions.returnedDecisions.map((decision: any, index: any) => (
        <Button
          key={index}
          onClick={() => onSelect(decision)}
          className="overflow-visible"
          disabled={disabled}
          variant="outline"
        >
          {decision}
        </Button>
      ))}
    </div>
  );
}
