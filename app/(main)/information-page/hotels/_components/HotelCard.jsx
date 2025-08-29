import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function HotelCard({ hotel }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {hotel.image && (
        <CardHeader className="p-0">
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={400}
            height={300}
            className="rounded-t-lg object-cover w-full h-48"
          />
        </CardHeader>
      )}
      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle>{hotel.name}</CardTitle>
            {hotel.category && (
              <Badge variant="secondary" className="text-xs capitalize">{hotel.category}</Badge>
            )}
          </div>
          <CardDescription className="text-sm text-muted-foreground mt-1">{hotel.address}</CardDescription>
          {hotel.description && (
            <p className="text-sm text-gray-700 mt-3">{hotel.description}</p>
          )}
          <Separator className="my-4" />
          <div className="space-y-1 text-sm text-gray-600">
            {hotel.phoneNumber && <p><strong>Phone:</strong> {hotel.phoneNumber}</p>}
            {hotel.priceRange && <p><strong>Price:</strong> {hotel.priceRange}</p>}
            {hotel.rating && <p><strong>Rating:</strong> ⭐ {hotel.rating}/5</p>}
          </div>
          {hotel.facilities?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {hotel.facilities.map((item, i) => (
                <Badge key={i} className="text-xs" variant="outline">{item}</Badge>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6">
          {hotel.website ? (
            <Button className="w-full" asChild>
              <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          ) : (
            <Button className="w-full" disabled variant="secondary">No Website Available</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}