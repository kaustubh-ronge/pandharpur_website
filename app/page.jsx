import HeroSection from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { features } from "@/data/features";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />

    </div>
  );
}
