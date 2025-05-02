import { GuidanceDialog } from "@/components/guidance/guidance-dialog";
import PoojaBanner from "@/components/pooja/pooja-banner";
import PoojaList from "@/components/pooja/pooja-list";

export default function Home() {
  return (
    <>
      <PoojaBanner />
      <PoojaList />
      <GuidanceDialog />
    </>
  );
}
