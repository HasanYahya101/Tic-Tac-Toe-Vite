import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import BusDialogue from "./bus-dialogue"
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Database } from '@sqlitecloud/drivers';
import { useEffect, useState } from 'react';

export function BusesList({ dep_loc, arr_loc, date, month, year }) {
  let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');

  const [data, setData] = useState([]);

  async function fetchData() {
    // query resturns Route_No, Bus_No, Depart_Loc, Arr_Loc, Time_Hour, Time_AM_PM, Date, Month, Year, price
    console.log("Fetching data for: ");
    console.log(dep_loc, arr_loc, date, month, year);
    let result = await database.sql`SELECT * FROM Bus_Routes WHERE Depart_Loc = ${dep_loc} AND Arr_Loc = ${arr_loc} AND Date = ${date} AND Month = ${month} AND Year = ${year}`;
    // print the locations
    console.log(result);
    setData(result);
  }

  /*useEffect(() => {
    fetchData();
  }, []);*/

  useEffect(() => {
    fetchData();
  }, [dep_loc, arr_loc, date, month, year]);

  return (
    (
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={fetchData}
          >View Routes</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[97vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Bus Routes</DialogTitle>
          </DialogHeader>
          <DialogDescription
          >
            Check the latest bus routes, departure times, and real-time updates.
          </DialogDescription>
          <Card className="w-full mt-1 overflow-auto max-h-[68vh] shadow-none"
            style={{ scrollbarWidth: 'none' }}
          >
            <section className="w-full mt-4 ">
              <div className="container grid gap-2 px-4 md:px-6 max-w-4xl mx-auto">

                <div className="grid gap-2">
                  {data.length === 0 ? (
                    <div className="border border-dashed shadow-sm rounded-lg flex-1 flex items-center justify-center p-8">
                      <div className="flex flex-col items-center gap-4">
                        <BusIcon className="h-12 w-12 text-gray-400" />
                        <h3 className="font-bold text-2xl tracking-tight">No bus routes found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Sorry for the inconvenience, we are working on adding more routes soon.
                        </p>
                      </div>
                    </div>

                  ) : (

                    data.map((item, index) => (

                      <Card key={index}
                        className="flex flex-row items-center gap-4 p-4 sm:p-6">
                        <div className="flex-1 grid gap-1">
                          <h3 className="font-semibold">Route {item.Route_No}</h3>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{item.Depart_Loc}</span>
                            <ArrowRightIcon className="h-4 w-4" />
                            <span>{item.Arr_Loc}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <ClockIcon className="h-4 w-4" />
                            <span>{item.Time_Hour} {item.Time_AM_PM}</span>
                            <span className="ml-4">
                              <Badge variant="secondary">On Time</Badge>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <BusIcon className="h-4 w-4" />
                            <span>Capacity: 28 passengers</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <DollarSignIcon className="h-4 w-4" />
                            <span>{item.price} PKR</span>
                          </div>
                        </div>
                        <BusDialogue Price_given={item.price} Routeno_given={item.Route_No} Busno_given={item.Bus_No} Depart_Loc_given={item.Depart_Loc} Arr_Loc_given={item.Arr_Loc} Time_Hour_given={item.Time_Hour} Time_AM_PM_given={item.Time_AM_PM} Date_given={item.Date} Month_given={item.Month} Year_given={item.Year}
                        >
                        </BusDialogue>
                      </Card>
                    ))
                  )}
                  <div className="mb-2"
                  ></div>
                </div>
              </div>
            </section>

          </Card>
          <DialogClose onAbortCapture={
            () => {
              // insert an empty array in data
              setData([]);
            }
          }
          ></DialogClose>
        </DialogContent>
      </Dialog>)
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

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}