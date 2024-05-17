import React from 'react';
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { cn } from "../../lib/utils";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "../ui/date_location_dialog";
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Toaster } from '../ui/toaster';
import { useToast } from '../ui/use-toast';
import { useEffect } from 'react';
import { useState } from 'react';
import { Database } from '@sqlitecloud/drivers';


function formatDate(date, options) {
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function DateLoc({ dategiven, onDateChange, departgiven, onDepartureChange, arrivegiven, onArrivalChange }) {

    const { toast } = useToast();

    const [date, setDate] = React.useState(new Date());
    const [dpartLocation, setdepartLocation] = React.useState("");
    const [arrLocation, setarrLocation] = React.useState("");

    // create a list of string locations
    const [locations, setLocations] = useState([]);

    let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');

    // handle submit
    const handleSubmit = (e) => {
        //e.preventDefault();

        if (!date || !dpartLocation || !arrLocation || dpartLocation === "" || arrLocation === "") {
            if (!date) {
                console.log("Current Date: ", date);
                toast({
                    title: "Error: Date not selected",
                    description: "Please select a date.",
                    type: "error"
                })
                return;
            }
            else if (!dpartLocation) {
                console.log("Current Departure Location: ", dpartLocation);
                toast({
                    title: "Error: Departure Location not selected",
                    description: "Please select a departure location.",
                    type: "error"
                })
            }
            else if (!arrLocation) {
                console.log("Current Arrival Location: ", arrLocation);
                toast({
                    title: "Error: Arrival Location not selected",
                    description: "Please select an arrival location.",
                    type: "error"
                })
            }
            else if (dpartLocation === "") {
                toast({
                    title: "Error: Departure Location not selected",
                    description: "Please select a departure location.",
                    type: "error"
                })
            }
            else if (arrLocation === "") {
                toast({
                    title: "Error: Arrival Location not selected",
                    description: "Please select an arrival location.",
                    type: "error"
                })
            }

            return;
        }
        else if (dpartLocation === arrLocation) {
            toast({
                title: "Error: Same Locations",
                description: "Departure and Arrival locations cannot be the same.",
                type: "error"
            })
            return;
        }

        onDateChange(date);
        onDepartureChange(dpartLocation);
        onArrivalChange(arrLocation);

        /*toast({
            title: "Success",
            description: "Date and Locations successfully selected.",
            type: "success"
        })*/
    }

    const handleSubmitToast = (e) => {
        if (!date || !dpartLocation || !arrLocation || dpartLocation === "" || arrLocation === "") {
            if (!date) {
                console.log("Current Date: ", date);
                toast({
                    title: "Error: Date not selected",
                    description: "Please select a date.",
                    type: "error"
                })
                return;
            }
            else if (!dpartLocation) {
                console.log("Current Departure Location: ", dpartLocation);
                toast({
                    title: "Error: Departure Location not selected",
                    description: "Please select a departure location.",
                    type: "error"
                })
            }
            else if (!arrLocation) {
                console.log("Current Arrival Location: ", arrLocation);
                toast({
                    title: "Error: Arrival Location not selected",
                    description: "Please select an arrival location.",
                    type: "error"
                })
            }
            else if (dpartLocation === "") {
                toast({
                    title: "Error: Departure Location not selected",
                    description: "Please select a departure location.",
                    type: "error"
                })
            }
            else if (arrLocation === "") {
                toast({
                    title: "Error: Arrival Location not selected",
                    description: "Please select an arrival location.",
                    type: "error"
                })
            }

            return;
        }
        else if (dpartLocation === arrLocation) {
            toast({
                title: "Error: Same Locations",
                description: "Departure and Arrival locations cannot be the same.",
                type: "error"
            })
            return;
        }
    }

    async function fetchLocations() {
        // set the date as todays date
        let new_date = new Date();
        // set to early morning
        new_date.setHours(0, 0, 0, 0);
        // set the date
        setDate(new_date);
        let location = await database.sql`SELECT locations FROM Locations;`;
        // print the locations
        console.log(location);
        setLocations(location.map((location) => location.locations));
    }

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <Dialog
        >
            <Toaster
                type="error"
            ></Toaster>
            <DialogTrigger>
                <Button onClick={fetchLocations}
                    variant="outline"
                >Select Location and Date</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <h2 style={{ fontSize: "1.3rem" }}
                    >Choose Date:</h2>
                </DialogHeader>
                <div className='ml-5 mr-5'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    <span>{formatDate(date, "PPPP")}</span>
                                ) : (
                                    <span className="text-muted-foreground">Select Date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus={date}
                                showOutsideDays={true}
                                disabled={(day) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0); // Set time to midnight
                                    const selectedDay = new Date(day);
                                    selectedDay.setHours(0, 0, 0, 0); // Set time to midnight
                                    return selectedDay < today;
                                }}
                            //disabled={(day) => day < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogHeader>
                    <h2 style={{ fontSize: "1.3rem" }}
                    >Choose Departure Location:</h2>
                </DialogHeader>
                <div className='ml-5 mr-5'>
                    <Select
                        onValueChange={(e) => setdepartLocation(e)}
                    >
                        <SelectTrigger className="w-[180px]"
                        >
                            <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[280px]"
                        >
                            {locations.map((location) => (
                                <SelectItem value={location}
                                >{location}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogHeader>
                    <h2 style={{ fontSize: "1.3rem" }}
                    >Choose Arrival Location:</h2>
                </DialogHeader>
                <div className='ml-5 mr-5'>
                    <Select
                        onValueChange={(e) => setarrLocation(e)}
                    >
                        <SelectTrigger className="w-[180px]"
                        >
                            <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]"
                        >
                            {locations.map((location) => (
                                <SelectItem value={location}
                                    onSelect={(e) => setarrLocation(location)}
                                >{location}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div
                    className="flex justify-end space-x-2 p-4 bg-card"
                >
                    <DialogClose>
                        <Button
                            variant="destructive"

                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    {date === null || dpartLocation === "" || arrLocation === "" || (date !== null && date === undefined) || (dpartLocation === arrLocation) ? (
                        <Button
                            //className="bg-primary"
                            variant='outline'
                            onClick={handleSubmitToast}
                        >
                            Confirm
                        </Button>
                    ) : (
                        <DialogClose>
                            <Button
                                className="bg-primary"
                                onClick={handleSubmit}
                            >
                                Confirm
                            </Button>
                        </DialogClose>
                    )}

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DateLoc;
