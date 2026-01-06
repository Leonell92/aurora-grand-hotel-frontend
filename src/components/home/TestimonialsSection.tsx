import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold-light font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Guest Reviews
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            What Our Guests Say
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued guests have to 
            say about their experience at Aurora Grand Hotel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-charcoal-light rounded-xl p-8 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-primary-foreground/90 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-serif font-medium text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-primary-foreground/60">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-primary-foreground/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <p className="font-serif text-4xl font-semibold text-gold-light mb-2">4.9</p>
              <p className="text-sm text-primary-foreground/60">Average Rating</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p className="font-serif text-4xl font-semibold text-gold-light mb-2">15k+</p>
              <p className="text-sm text-primary-foreground/60">Happy Guests</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <p className="font-serif text-4xl font-semibold text-gold-light mb-2">50+</p>
              <p className="text-sm text-primary-foreground/60">Awards Won</p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <p className="font-serif text-4xl font-semibold text-gold-light mb-2">25</p>
              <p className="text-sm text-primary-foreground/60">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
