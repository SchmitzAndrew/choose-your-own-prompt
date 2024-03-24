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
        <button
          key={index}
          onClick={() => onSelect(decision)}
          className="overflow-visible disabled:opacity-50 text-base md:text-lg lg:text-xl px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4"
          disabled={disabled}
          
        >
          {decision.decisionText}
        </button>
      ))}
    </div>
  );
}
