import Websites from "./work components/Websites.js";
import BlenderRender from "./work components/BlenderRender.js";

export default function Work() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Websites />
      <BlenderRender />
    </div>
  );
}
