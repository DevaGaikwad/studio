import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-secondary">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] w-full flex items-center justify-center text-white">
          <Image
            src="https://placehold.co/1600x400.png"
            alt="Our Team"
            fill
            style={{objectFit: 'cover'}}
            className="brightness-50"
            data-ai-hint="team working"
          />
          <div className="relative z-10 text-center p-4">
            <h1 className="text-5xl font-bold font-headline">About Bombay Cloths</h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto">
              Weaving the fabric of tradition with the threads of modern style.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold font-headline mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in the heart of the bustling metropolis of Mumbai, Bombay Cloths began with a simple idea: to create high-quality, stylish apparel that captures the vibrant spirit of the city. We believe that clothing is more than just fabric; it's a form of expression, a slice of culture, and a personal statement.
                </p>
                <p className="text-muted-foreground">
                  From our humble beginnings as a small boutique, we have grown into a brand trusted by customers for our commitment to craftsmanship, sustainable practices, and timeless design. Every piece in our collection is thoughtfully designed and ethically sourced, ensuring you look good and feel good about what you wear.
                </p>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Fashion workshop"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                   data-ai-hint="fashion workshop"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-4xl font-bold font-headline mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8">
                  <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide our customers with exceptional apparel that combines quality, style, and comfort, while promoting sustainable and ethical manufacturing practices.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be a leading fashion brand recognized globally for its unique designs, commitment to sustainability, and celebration of the rich textile heritage of India.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-semibold mb-2">Our People</h3>
                  <p className="text-muted-foreground">
                    To foster a creative and inclusive environment that empowers our team of artisans, designers, and staff to innovate and excel in their craft.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
