import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function CategoryCard({ category, isActive, ...props }) {
  const cardClassName = `cursor-pointer transition-all h-full ${
    isActive ? 'ring-2 ring-orange-500' : 'hover:shadow-lg'
  }`;

  return (
    <Card className={cardClassName} {...props}>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className={`p-3 rounded-full ${category.color}`}>
          {category.icon}
        </div>
        <div>
          <CardTitle>{category.title}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}