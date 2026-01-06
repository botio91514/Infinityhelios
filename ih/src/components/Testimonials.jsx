import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    location: "Mumbai, India",
    rating: 5,
    text: "Infinity Helios transformed our home with their solar panels. Our electricity bills have dropped by 80% and the installation was seamless. Highly recommended!",
    image: "👩"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Business Owner",
    location: "Delhi, India",
    rating: 5,
    text: "The commercial solar system has been a game-changer for our manufacturing unit. We've cut energy costs significantly while reducing our carbon footprint.",
    image: "👨"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Factory Manager",
    location: "Bangalore, India",
    rating: 5,
    text: "Outstanding service from start to finish. The team was professional, knowledgeable, and the system has exceeded our expectations in performance.",
    image: "👩"
  },
  {
    id: 4,
    name: "Amit Patel",
    role: "Property Developer",
    location: "Pune, India",
    rating: 5,
    text: "We've installed Infinity Helios systems in multiple properties. Consistent quality, excellent support, and great ROI. The best solar solution provider!",
    image: "👨"
  },
  {
    id: 5,
    name: "Ravi Singh",
    role: "Hospital Administrator",
    location: "Chennai, India",
    rating: 5,
    text: "Our hospital needed reliable power and Infinity Helios delivered beyond expectations. The solar installation runs flawlessly and has reduced our operational costs dramatically.",
    image: "👨"
  },
  {
    id: 6,
    name: "Meera Desai",
    role: "Hotel Owner",
    location: "Goa, India",
    rating: 5,
    text: "Installing solar panels was the best investment we made for our hotel. Guests love our commitment to sustainability, and our energy savings are incredible!",
    image: "👩"
  },
  {
    id: 7,
    name: "Vikram Reddy",
    role: "School Principal",
    location: "Hyderabad, India",
    rating: 5,
    text: "Our school now runs on clean solar energy. Infinity Helios not only reduced our electricity costs but also provided an educational opportunity for our students about renewable energy.",
    image: "👨"
  },
  {
    id: 8,
    name: "Anjali Mehta",
    role: "Restaurant Owner",
    location: "Ahmedabad, India",
    rating: 5,
    text: "Switching to solar power has been fantastic for our restaurant chain. Lower operating costs and a great way to show our commitment to the environment. Excellent service and support!",
    image: "👩"
  }
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      let newItemsPerView = 4;
      if (window.innerWidth < 768) {
        newItemsPerView = 1;
      } else if (window.innerWidth < 1024) {
        newItemsPerView = 2;
      }

      if (newItemsPerView !== itemsPerView) {
        setItemsPerView(newItemsPerView);
        setCurrentIndex(0); // Reset to first slide when view changes
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [itemsPerView]);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  // Reset current index if out of bounds
  useEffect(() => {
    if (totalSlides > 0 && currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [totalSlides, currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (totalSlides === 0) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start auto-play
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % totalSlides;
        return next;
      });
    }, 4000); // Auto-switch every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Restart auto-play after manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % totalSlides;
        return next;
      });
    }, 4000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Get testimonials for current slide
  const getCurrentTestimonials = () => {
    const start = currentIndex * itemsPerView;
    return testimonials.slice(start, start + itemsPerView);
  };

  return (
    <section className="section bg-slate-50 dark:bg-slate-900">
      <div className="container-main">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              What Our <span className="text-solarGreen">Customers</span> Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Infinity Helios.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:bg-solarGreen hover:text-white transition-all duration-300 flex items-center justify-center border border-slate-200 dark:border-slate-700"
            aria-label="Previous testimonials"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:bg-solarGreen hover:text-white transition-all duration-300 flex items-center justify-center border border-slate-200 dark:border-slate-700"
            aria-label="Next testimonials"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Testimonials Grid */}
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getCurrentTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105"
                  >
                    {/* Rating */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="mb-4"
                    >
                      <StarRating rating={testimonial.rating} />
                    </motion.div>

                    {/* Testimonial Text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed"
                    >
                      "{testimonial.text}"
                    </motion.p>

                    {/* Customer Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-full bg-solarGreen/20 flex items-center justify-center text-2xl"
                      >
                        {testimonial.image}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "w-8 bg-solarGreen"
                  : "w-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

