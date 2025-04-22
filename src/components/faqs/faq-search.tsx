import { Input } from "@/components/ui/input";

export function FaqSearch({ search, setSearch }: { search: string; setSearch: (_val: string) => void }) {
  return (
    <div className="mb-6">
      <Input
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
