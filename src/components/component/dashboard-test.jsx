import { BrowserRouter as Router, Link } from 'react-router-dom';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import DateLoc from './date-loc-dialogue';
import { AlertDialogLogout } from './logout-alert';
import React from 'react';

export function DashboardTest() {
    const [dateSelected, SetdateSelected] = React.useState(null);
    const [arivallocationSelected, SetarivallocationSelected] = React.useState("");
    const [departurelocationSelected, SetdeparturelocationSelected] = React.useState("");

    const handleDateChange = (date) => {
        console.log("Date updated to:", date); // Debug log
        SetdateSelected(date);
    }

    const handleDepartureChange = (location) => {
        console.log("Departure location updated to:", location); // Debug log
        SetdeparturelocationSelected(location);
    }

    const handleArrivalChange = (location) => {
        console.log("Arrival location updated to:", location); // Debug log
        SetarivallocationSelected(location);
    }

    return (
        (<div className="flex flex-col min-h-screen">
            <header
                className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">Ticketing System</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
                        href="#"
                    >
                        <SettingsIcon className="h-5 w-5" />
                        Settings
                    </Button>

                    {/*<Button
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
            href="#">
            <LogOutIcon className="h-5 w-5" />
            Logout
  </Button>*/}
                    <AlertDialogLogout></AlertDialogLogout>
                </div>
            </header >
            <div className="flex-1 bg-gray-100 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Book Tickets</CardTitle>
                                <TicketIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <DateLoc dategiven={dateSelected} onDateChange={handleDateChange} departgiven={departurelocationSelected} onDepartureChange={handleDepartureChange} arrivegiven={arivallocationSelected} onArrivalChange={handleArrivalChange}
                                    ></DateLoc>
                                </div>
                                <div>
                                    <Label htmlFor="arr_loc">Arrival Location:</Label>
                                    {arivallocationSelected == null || arivallocationSelected === "" ? (
                                        <Input id="arr_loc" type="text"
                                            value="Select Arrival Location" readOnly
                                            className="text-gray-500 dark:text-gray-400"
                                        ></Input>
                                    ) : (
                                        <Input id="arr_loc" type="text"
                                            value={"Selected Arrival Location is " + arivallocationSelected + " on " + dateSelected.toDateString() + "."}
                                            readOnly
                                        ></Input>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="dep_loc">Departure Location:</Label>
                                    {departurelocationSelected == null || departurelocationSelected === "" ? (
                                        <Input id="dep_loc" type="text"
                                            value="Select Arrival Location" readOnly
                                            className="text-gray-500 dark:text-gray-400"
                                        ></Input>
                                    ) : (
                                        <Input id="dep_loc" type="text"
                                            value={"Selected Location is " + departurelocationSelected + " on " + dateSelected.toDateString() + "."}
                                            readOnly
                                        ></Input>
                                    )}
                                </div>
                                <Button>Book Tickets</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>View Bookings</CardTitle>
                                <ViewBookingIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Concert</TableCell>
                                        <TableCell>2023-05-12</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>Booked</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Sports</TableCell>
                                        <TableCell>2023-06-01</TableCell>
                                        <TableCell>4</TableCell>
                                        <TableCell>Purchased</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Theater</TableCell>
                                        <TableCell>2023-07-15</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>Booked</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Buy Tickets</CardTitle>
                                <PurchaseIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="event">Event</Label>
                                    <Select id="event">
                                        <option>Select an event</option>
                                        <option>Concert</option>
                                        <option>Sports</option>
                                        <option>Theater</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" />
                                </div>
                                <div>
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input id="quantity" min="1" type="number" />
                                </div>
                                <Button>Buy Tickets</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>View Purchased</CardTitle>
                                <ViewPurchasedIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Concert</TableCell>
                                        <TableCell>2023-05-12</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>Purchased</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Sports</TableCell>
                                        <TableCell>2023-06-01</TableCell>
                                        <TableCell>4</TableCell>
                                        <TableCell>Purchased</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Theater</TableCell>
                                        <TableCell>2023-07-15</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>Purchased</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >)
    );
}

function LogOutIcon(props) {
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>)
    );
}


function SettingsIcon(props) {
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
            <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>)
    );
}


function TicketIcon(props) {
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
            <path
                d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
        </svg>)
    );
}

function PurchaseIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="lucide lucide-credit-card text-gray-500 dark:text-gray-400"
            className='text-gray-500 dark:text-gray-400'>
            <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10"
            />

        </svg>)
    );
}

function ViewBookingIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-view text-gray-500 dark:text-gray-400"
            className='text-gray-500 dark:text-gray-400'><path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" /><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" /><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />

        </svg>)
    );
}

function ViewPurchasedIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-fullscreen text-gray-500 dark:text-gray-400"
            className='text-gray-500 dark:text-gray-400'
        ><path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect width="10" height="8" x="7" y="8" rx="1" />

        </svg>)
    );
}