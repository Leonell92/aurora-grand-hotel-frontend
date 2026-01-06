import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Award, Users, Sparkles } from "lucide-react";
import hotelExterior from "@/assets/hotel-exterior.jpg";
import restaurant from "@/assets/restaurant.jpg";
import poolSpa from "@/assets/pool-spa.jpg";

const values = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description: "Every guest is treated like family, with personalized attention and warm service.",
  },
  {
    icon: Award,
    title: "Excellence in Every Detail",
    description: "From our linens to our cuisine, we never compromise on quality.",
  },
  {
    icon: Users,
    title: "Community & Connection",
    description: "We create spaces where memories are made and connections flourish.",
  },
  {
    icon: Sparkles,
    title: "Sustainable Luxury",
    description: "Committed to responsible practices that preserve our world for future generations.",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hotelExterior})` }}
        >
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative z-10 text-center container mx-auto px-4">
          <p className="text-gold-light font-medium tracking-[0.2em] uppercase text-sm mb-4 animate-fade-up">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            About Aurora Grand
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            A legacy of excellence spanning over two decades, where timeless elegance 
            meets contemporary sophistication.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Est. 1999
              </p>
              <h2 className="font-serif text-4xl font-medium text-foreground mb-6">
                A Heritage of Hospitality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in the heart of New York City, Aurora Grand Hotel was born from 
                  a vision to create a sanctuary where luxury meets genuine warmth. What 
                  began as a boutique establishment has grown into an internationally 
                  acclaimed destination for discerning travelers.
                </p>
                <p>
                  Our founder, Eleanor Aurora, believed that true luxury lies not in 
                  opulence alone, but in the art of making every guest feel genuinely 
                  valued and cared for. This philosophy remains at the heart of everything 
                  we do.
                </p>
                <p>
                  Today, Aurora Grand stands as a testament to timeless elegance, 
                  combining the grandeur of classic hospitality with modern comforts 
                  and sustainable practices that honor our responsibility to future 
                  generations.
                </p>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={restaurant}
                alt="Aurora Grand Restaurant"
                className="rounded-xl luxury-shadow"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <p className="font-serif text-4xl font-semibold">25+</p>
                <p className="text-sm opacity-80">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-4xl font-medium text-foreground mb-6">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values are the foundation of every experience we create, 
              guiding us in our pursuit of exceptional hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-background rounded-xl p-8 text-center hover-lift luxury-shadow animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative animate-fade-up">
              <img
                src={poolSpa}
                alt="Aurora Grand Spa"
                className="rounded-xl luxury-shadow"
              />
            </div>
            <div className="order-1 lg:order-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
                The Experience
              </p>
              <h2 className="font-serif text-4xl font-medium text-foreground mb-6">
                Unparalleled Luxury
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  At Aurora Grand, every moment is curated to exceed expectations. 
                  From our world-class spa where ancient healing traditions meet 
                  modern wellness, to our award-winning restaurant serving culinary 
                  masterpieces, we invite you to experience the extraordinary.
                </p>
                <p>
                  Our dedicated team of hospitality professionals is committed to 
                  anticipating your every need, ensuring that your stay is not just 
                  comfortable, but truly memorable.
                </p>
              </div>
              <Link to="/rooms">
                <Button variant="luxury" size="lg">
                  Explore Our Rooms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-up">
              <p className="font-serif text-3xl font-semibold text-gold-light mb-2">5 Star</p>
              <p className="text-sm text-primary-foreground/60">Forbes Rating</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <p className="font-serif text-3xl font-semibold text-gold-light mb-2">#1</p>
              <p className="text-sm text-primary-foreground/60">Condé Nast Traveler</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p className="font-serif text-3xl font-semibold text-gold-light mb-2">AAA</p>
              <p className="text-sm text-primary-foreground/60">Five Diamond Award</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <p className="font-serif text-3xl font-semibold text-gold-light mb-2">Gold</p>
              <p className="text-sm text-primary-foreground/60">Sustainability Award</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
