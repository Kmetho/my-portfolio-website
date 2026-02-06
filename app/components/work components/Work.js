import Websites from "./Websites";
import BlenderRender from "./BlenderRender";

export default function Work() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Websites />
      <BlenderRender />
    </div>
  );
}
