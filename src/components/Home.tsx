import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/staff">Go to staff</Link>
    </div>
  );
}
