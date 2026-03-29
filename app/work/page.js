import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Work from "@/components/Work";

export default function WorkPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="work" />
      </div>
      <Work />
    </main>
  );
}
