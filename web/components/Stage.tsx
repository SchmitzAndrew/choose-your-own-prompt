import Balancer from "react-wrap-balancer";
export default function Stage({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    <>
      <p
        className="text-center text-xl p-12"
      >
        <Balancer>{text}</Balancer>
      </p>
    </>
  );
}
