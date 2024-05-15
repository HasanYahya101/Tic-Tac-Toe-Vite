import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function BusesList() {
  return (
    (<section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="grid gap-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bus Routes</h2>
          <p
            className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Check the latest bus routes, departure times, and real-time updates.
          </p>
        </div>
        <div className="grid gap-4">
          <Card className="flex flex-row items-center gap-4 p-4 sm:p-6">
            <div className="flex-1 grid gap-1">
              <h3 className="font-semibold">Route 101</h3>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <span>Downtown</span>
                <ArrowRightIcon className="h-4 w-4" />
                <span>Uptown</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4" />
                <span>7:00 AM</span>
                <span className="ml-4">
                  <Badge variant="secondary">On Time</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BusIcon className="h-4 w-4" />
                <span>Capacity: 50 passengers</span>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">View route</span>
            </Button>
          </Card>
          <Card className="flex flex-row items-center gap-4 p-4 sm:p-6">
            <div className="flex-1 grid gap-1">
              <h3 className="font-semibold">Route 102</h3>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <span>Uptown</span>
                <ArrowRightIcon className="h-4 w-4" />
                <span>Suburbs</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4" />
                <span>8:15 AM</span>
                <span className="ml-4">
                  <Badge variant="secondary">On Time</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BusIcon className="h-4 w-4" />
                <span>Capacity: 40 passengers</span>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">View route</span>
            </Button>
          </Card>
          <Card className="flex flex-row items-center gap-4 p-4 sm:p-6">
            <div className="flex-1 grid gap-1">
              <h3 className="font-semibold">Route 103</h3>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <span>Suburbs</span>
                <ArrowRightIcon className="h-4 w-4" />
                <span>Downtown</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4" />
                <span>9:30 AM</span>
                <span className="ml-4">
                  <Badge variant="secondary">On Time</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BusIcon className="h-4 w-4" />
                <span>Capacity: 28 passengers</span>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">View route</span>
            </Button>
          </Card>
          <Card className="flex flex-row items-center gap-4 p-4 sm:p-6">
            <div className="flex-1 grid gap-1">
              <h3 className="font-semibold">Route 104</h3>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <span>Downtown</span>
                <ArrowRightIcon className="h-4 w-4" />
                <span>Airport</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4" />
                <span>10:45 AM</span>
                <span className="ml-4">
                  <Badge variant="secondary">On Time</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BusIcon className="h-4 w-4" />
                <span>Capacity: 55 passengers</span>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">View route</span>
            </Button>
          </Card>
        </div>
      </div>
    </section>)
  );
}

function ArrowRightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>)
  );
}


function BusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path
        d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>)
  );
}


function ClockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>)
  );
}


function MapPinIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>)
  );
}
