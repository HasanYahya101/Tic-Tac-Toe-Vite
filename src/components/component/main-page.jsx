import { Button } from "../ui/button";
import SignUpLogin from "./signup-login";

export function MainPage() {
  return (
    (<section
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-950 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Discover the Easiest Way to Book Bus Tickets
            </h1>
            <p className="mx-auto max-w-[800px] text-lg md:text-xl text-gray-300">
              Our bus ticket booking system makes it simple to find and book the perfect bus ride for your next
              adventure. Explore routes, compare prices, and secure your seat in just a few clicks.
            </p>
          </div>
          <SignUpLogin></SignUpLogin>
        </div>
      </div>
    </section >)
  );
}
