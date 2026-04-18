// Thin application shell. During Stage B, this delegates to the original
// monolith at ./vestige-site.jsx. As components are extracted into pages/
// and components/, this file grows into a proper router/composition root.
import VestigeSite from "./vestige-site.jsx";

export default function App() {
  return <VestigeSite />;
}
