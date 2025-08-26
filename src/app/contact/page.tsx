
"use client"
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function ContactPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you shortly.",
        });
        (e.target as HTMLFormElement).reset();
    }
  return (
    <div className="bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-headline">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
                <CardContent className="p-8">
                     <h2 className="text-3xl font-semibold mb-6">Send us a Message</h2>
                     <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" required/>
                        </div>
                         <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" required/>
                        </div>
                         <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Your message..." required rows={6}/>
                        </div>
                        <Button type="submit" size="lg" className="w-full" variant="destructive">Send Message</Button>
                     </form>
                </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
                 <Card>
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
                        <div className="space-y-6 text-lg">
                            <div className="flex items-center gap-4">
                                <MapPin className="h-8 w-8 text-primary"/>
                                <div>
                                    <h3 className="font-semibold">Our Address</h3>
                                    <p className="text-muted-foreground">123 Fashion Street, Colaba, Mumbai, India - 400001</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-8 w-8 text-primary"/>
                                 <div>
                                    <h3 className="font-semibold">Email Us</h3>
                                    <p className="text-muted-foreground">support@bombaycloths.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-8 w-8 text-primary"/>
                                <div>
                                    <h3 className="font-semibold">Call Us</h3>
                                    <p className="text-muted-foreground">+91 22 1234 5678</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
                 <Card className="overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.292209028889!2d72.83025861489868!3d18.91899108717804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c0d3a5a7d7%3A0x8da4103c00490b4a!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625078516885!5m2!1sen!2sin" 
                        width="100%" 
                        height="300" 
                        style={{border: 0}}
                        allowFullScreen
                        loading="lazy"
                        ></iframe>
                    </div>
                 </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
