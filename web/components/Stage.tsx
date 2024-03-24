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
      <img src={image} className="rounded-md h-auto" />
      <p className="text-center mx-24">
        <Balancer>{text}</Balancer>
      </p>
    </>
  );
}
