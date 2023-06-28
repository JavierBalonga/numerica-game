import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">HomePage</h1>
      <p className="text-xl">This page is under development.</p>
      <Link to="/rothiotome">Go to Channel</Link>
    </>
  );
}
