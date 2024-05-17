import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,

} from "../ui/bus-dialog-ui";
import { Toaster } from '../ui/toaster';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { Database } from '@sqlitecloud/drivers';

let Price_given_; let Routeno_; let Busno_given_; let Depart_Loc_given_; let Arr_Loc_given_; let Time_Hour_given_; let Time_AM_PM_given_; let Date_given_; let Month_given_; let Year_given_;

function SeatList(rowNo, seatNo, seat, date, month, year, depart_loc, arr_loc) {
  this.rowNo = rowNo;
  this.seatNo = seatNo;
  this.seat = seat;
  this.date = date;
  this.month = month;
  this.year = year;
  this.depart_loc = depart_loc;
  this.arr_loc = arr_loc;
}

function BusDialogue({ Price_given, Routeno_given, Busno_given, Depart_Loc_given, Arr_Loc_given, Time_Hour_given, Time_AM_PM_given, Date_given, Month_given, Year_given }) {
  const BusSeatStatusEnum = {
    Available: "Available",
    Selected: "Selected",
    Taken: "Taken",
  }

  // filling global variables
  Price_given_ = Price_given;
  Routeno_ = Routeno_given;
  Busno_given_ = Busno_given;
  Depart_Loc_given_ = Depart_Loc_given;
  Arr_Loc_given_ = Arr_Loc_given;
  Time_Hour_given_ = Time_Hour_given;
  Time_AM_PM_given_ = Time_AM_PM_given;
  Date_given_ = Date_given;
  Month_given_ = Month_given;
  Year_given_ = Year_given;

  let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');
  const { toast } = useToast();

  var fetchcounter = 0;

  // create a usestate with list/array of selectedseats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // create a 28 seats array
  const [seats, setSeats] = useState(new Array(28));

  // write a function called switch seat that takes in a number
  const switchSeat = (seatNumber, row, col) => {
    // if seat is taken throw toaster
    if (seats[seatNumber] === BusSeatStatusEnum.Taken) {
      toast({
        title: "Error: Seat Taken",
        description: "The seats in red are already taken and cannot be selected.",
      })
      return;
    }
    else {
      const updatedSeats = [...seats]; // Create a copy of the seats array
      if (updatedSeats[seatNumber] === BusSeatStatusEnum.Available) {
        updatedSeats[seatNumber] = BusSeatStatusEnum.Selected;
        // add to selected seats
        setSelectedSeats([...selectedSeats, new SeatList(row, col, seatNumber + 1)]);
      } else if (updatedSeats[seatNumber] === BusSeatStatusEnum.Selected) {
        updatedSeats[seatNumber] = BusSeatStatusEnum.Available;
        // remove from selected seats
        setSelectedSeats(selectedSeats.filter(seat => !(seat.rowNo === row && seat.seatNo === col)));
      }

      // Update the state with the new array
      setSeats(updatedSeats);
    }
  }

  async function fetchSeats() {
    let result = await database.sql`SELECT * FROM Seats_Info WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given}`;
    console.log(result);
    // loop through the result and set the seats to taken
    const updatedSeats = [...seats]; // Create a copy of the seats array

    let row = result[0];
    for (let j = 1; j <= 28; j++) {

      if (row[`seat_${j}`] === 'A') {

        if (updatedSeats[j - 1] !== BusSeatStatusEnum.Selected) {
          updatedSeats[j - 1] = BusSeatStatusEnum.Available;
        }
      }
      else {
        updatedSeats[j - 1] = BusSeatStatusEnum.Taken;
      };
    }

    // Update the state with the new array
    setSeats(updatedSeats);
  }

  useState(() => {
    fetchSeats();
  }, [Price_given, Routeno_given, Busno_given]);



  const clearSeats = () => {
    // check if any is selected, if not throw a toast

    if (selectedSeats.length === 0) {
      toast({
        title: "Error: No Seats Selected",
        description: "Please select a seat to clear.",
      })
      return;
    }

    // loop and if not taken and selected then set to available
    const updatedSeats = [...seats]; // Create a copy of the seats array
    for (let i = 0; i < updatedSeats.length; i++) {
      if (updatedSeats[i] === BusSeatStatusEnum.Selected) {
        updatedSeats[i] = BusSeatStatusEnum.Available;
      }
    }
    // Update the state with the new array
    setSeats(updatedSeats);

    // clear selected seats
    setSelectedSeats([]);
  }

  function clearSeatsNotoast() {
    // copy seats
    const updatedSeats = [...seats]; // Create a copy of the seats array
    for (let i = 0; i < updatedSeats.length; i++) {
      if (updatedSeats[i] === BusSeatStatusEnum.Selected) {
        updatedSeats[i] = BusSeatStatusEnum.Available;
      }
    }

    // Update the state with the new array
    setSeats(updatedSeats);

    // clear selected seats
    setSelectedSeats([]);
  }

  async function buttonClicked() {
    clearSeatsNotoast();
    console.log("seats debug", seats);
    fetchcounter++;
  }

  async function confirmSeats() {
    // At the start, fetch seats to be up-to-date with the database
    //fetchSeats();

    // check if any is selected, if not throw a toast
    if (selectedSeats.length === 0) {
      toast({
        title: "Error: No Seats Selected",
        description: "Please select a seat to confirm.",
      })
      return;
    }

    const updatedSeats = [...seats]; // Create a copy of the seats array
    let query = `SELECT CASE WHEN seat_${selectedSeats[0].seat} = 'A'`;
    for (let i = 1; i < selectedSeats.length; i++) {
      query += ` AND seat_${selectedSeats[i].seat} = 'A'`;
    }
    query += ` THEN 1 ELSE 0 END AS is_seat_A FROM Seats_Info WHERE route_no = '${Routeno_given}' AND bus_no = '${Busno_given}' AND Depart_Loc = '${Depart_Loc_given}' AND Arr_Loc = '${Arr_Loc_given}' AND Time_Hour = '${Time_Hour_given}' AND Time_AM_PM = '${Time_AM_PM_given}' AND Date = '${Date_given}' AND Month = '${Month_given}' AND Year = '${Year_given}' LIMIT 1;`;


    let res_num = await database.sql(query);
    console.log("Complete result:", res_num);

    if (res_num.length > 0) {
      let is_seat_A = res_num[0].is_seat_A;
      console.log("test num", is_seat_A);
      if (is_seat_A === 0) {
        clearSeats();
        fetchSeats();
        toast({
          title: "Error: Seat Taken",
          description: "The seat you selected has already been taken. Sorry for the inconvenience. We will update the seats again.",
        })
      }
    }


    return

    // Update the state with the new array
    setSeats(updatedSeats);
  }

  // use state 
  useState(() => {
    fetchSeats();
  }, [fetchcounter]);

  return (
    <Dialog
    >
      <Toaster
      ></Toaster>
      <DialogTrigger asChild>
        <Button onClick={() => buttonClicked()}
          size="icon" variant="outline">
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">View route</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogClose>
          <button className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        <Card
        >
          <div className='overflow-auto'>
            <div
              className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-auto">
              <div className="p-6 md:p-8 overflow-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Select Your Seats</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Selected</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">1</span>
                        {seats[0] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(0, 1, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[0] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(0, 1, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(0, 1, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}

                        {seats[4] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(4, 1, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[4] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(4, 1, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(4, 1, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[8] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(8, 1, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[8] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(8, 1, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(8, 1, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[12] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(12, 1, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[12] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(12, 1, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(12, 1, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[16] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(16, 1, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[16] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(16, 1, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(16, 1, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[20] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(20, 1, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[20] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(20, 1, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(20, 1, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[24] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(24, 1, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[24] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(24, 1, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(24, 1, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}
                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">2</span>
                        {seats[1] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(1, 2, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[1] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(1, 2, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(1, 2, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}
                        {seats[5] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(5, 2, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[5] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(5, 2, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(5, 2, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[9] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(9, 2, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[9] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(9, 2, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(9, 2, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[13] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(13, 2, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[13] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(13, 2, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(13, 2, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[17] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(17, 2, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[17] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(17, 2, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(17, 2, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[21] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(21, 2, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[21] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(21, 2, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(21, 2, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[25] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(25, 2, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[25] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(25, 2, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(25, 2, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}
                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">3</span>
                        {seats[2] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(2, 3, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[2] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(2, 3, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(2, 3, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}
                        {seats[6] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(6, 3, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[6] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(6, 3, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(6, 3, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[10] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(10, 3, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[10] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(10, 3, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(10, 3, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[14] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(14, 3, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[14] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(14, 3, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(14, 3, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[18] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(18, 3, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[18] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(18, 3, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(18, 3, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[22] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(22, 3, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[22] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(22, 3, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(22, 3, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[26] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(26, 3, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[26] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(26, 3, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(26, 3, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}

                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">4</span>
                        {seats[3] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(3, 4, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[3] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(3, 4, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(3, 4, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}
                        {seats[7] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(7, 4, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[7] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(7, 4, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(7, 4, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[11] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(11, 4, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[11] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(11, 4, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(11, 4, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[15] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(15, 4, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[15] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(15, 4, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(15, 4, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[19] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(19, 4, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[19] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(19, 4, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(19, 4, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[23] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(23, 4, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[23] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(23, 4, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(23, 4, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[27] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(27, 4, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[27] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(27, 4, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(27, 4, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}

                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-gray-100 max-w-[40vh] dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Selected Seats</h3>
                    <div className="max-h-[36vh] max-w-[50vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }} >
                      <div className="space-y-4">
                        {selectedSeats.map((seat, index) => (

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-primary rounded-sm" />
                              <span className="text-sm">Seat {seat.rowNo}-{seat.seatNo}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">${Price_given}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex justify-end gap-4">
                <Button onClick={() => clearSeats()}
                  variant="outline">Clear</Button>

                <Button onClick={() => confirmSeats()}
                >Continue</Button>

              </div>
            </div>
          </div>


        </Card>
      </DialogContent>
    </Dialog >

  )
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

export default BusDialogue