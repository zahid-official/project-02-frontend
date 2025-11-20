"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="bg-background lg:py-24 py-8"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Column */}
        <div className="flex flex-1 flex-col max-lg:items-center gap-6 lg:gap-8">
          {/* Section Title */}
          <div className="section-title-gap-xl  max-lg:items-center  max-lg:text-center flex flex-col">
            <div className="relative overflow-hidden max-w-48 text-sm border px-4 py-1 rounded-2xl -mb-2">
              <span className="inline-flex gap-1.5 items-center">
                <Sparkles size={15} />
                Welcome to Medicare
              </span>
            </div>

            <h1 id="hero-heading" className="sm:text-5xl text-4xl font-bold">
              The most reliable healthcare platform
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Access quality healthcare services anytime, anywhere. Experience
              seamless medical consultations with certified professionals
              dedicated to your wellness journey.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 flex-row">
            <Button>Get started</Button>
            <Button variant="ghost">
              Explore
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex-1 aspect-square overflow-hidden rounded-2xl border-2 border-primary/10 bg-linear-to-br from-primary/5 to-secondary/5 p-3 shadow-2xl shadow-primary/10">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="https://res.cloudinary.com/ddbsm0sjt/image/upload/1654_svnwdp.jpg"
              alt="Hero section visual"
              fill
              priority
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
