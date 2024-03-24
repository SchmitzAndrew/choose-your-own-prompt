import Balancer from "react-wrap-balancer";
export default function Node({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    <>
      <img src={image} className="rounded-md h-64" />
      <p className="text-center mx-24">
        <Balancer>{text}</Balancer>
      </p>
    </>
  );
}