import { Badge } from "@/components/ui/badge";

export function PageHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="max-w-2xl mx-auto text-gray-600">{subtitle}</p>
    </div>
  );
}