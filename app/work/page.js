import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Work from "@/components/Work";

export default function WorkPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <Banner />
      <Nav current="work" />
      <Work />
    </main>
  );
}
