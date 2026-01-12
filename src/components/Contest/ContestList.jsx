import { Calendar, CalendarDays, Grid2X2, Grid3X3, Search } from "lucide-react";
import SearchBar from "../others/SearchBar";
import { Button } from "../ui/button";
import { contestData } from "../../data/ContestData";
import { useState } from "react";

const ContestList = () => {
  const [selected, setselected] = useState("grid");

  const [filters, setfilters] = useState({
    search: "",
    status: "",
  });

  const updateQuery = (key, value) => {
    setfilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1 className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 font-medium text-3xl">
          All Contests
        </h1>
        <div className="flex gap-5 bg-white px-4 py-3 rounded-xl ">
          <Grid3X3
            onClick={() => {
              if (selected == "grid") {
                setselected("calendar");
              } else {
                setselected("grid");
              }
            }}
            className={` ${selected == "grid" ? "text-blue-600" : "text-gray-600"} cursor-pointer `}
          />
          <CalendarDays
            onClick={() => {
              if (selected == "calendar") {
                setselected("grid");
              } else {
                setselected("calendar");
              }
            }}
            className={` ${selected == "calendar" ? "text-blue-600" : "text-gray-600"} cursor-pointer `}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 my-5">
        {/* input  */}
        <SearchBar
          value={filters.search}
          onChange={(val) => updateQuery("search", val)}
        />
        <Button
          onClick={() => {
            updateQuery("status", "");
          }}
          className={`rounded-3xl ${filters["status"] === "" ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white" : "text-black"} text-center px-5 py-6 border border-gray `}
        >
          All
        </Button>

        <Button
          onClick={() => {
            if(filters["status"]==="Ongoing"){
              updateQuery("status","");
            }else
            updateQuery("status", "Ongoing");
          }}
          className={`rounded-3xl ${filters["status"] === "Ongoing" ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white" : "text-black"} text-center py-6 px-5 border border-gray `}
        >
          <div className="w-2 h-2 rounded-full bg-green-300"></div>
          <p>Ongoing</p>
        </Button>
        <Button
          onClick={() => {
            if(filters["status"]==="Upcoming"){
              updateQuery("status","");
            }else
            updateQuery("status", "Upcoming");
          }}
          className={`rounded-3xl ${filters["status"] === "Upcoming" ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white" : "text-black"} text-center py-6 px-5 border border-gray `}
        >
          Upcoming
        </Button>
        <Button
          onClick={() => {
            if(filters["status"]==="Virtual"){
              updateQuery("status","");
            }else
            updateQuery("status", "Virtual");
          }}
          className={`rounded-3xl ${filters["status"] === "Virtual" ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white" : "text-black"} text-center py-6 px-5 border border-gray `}
        >
          Virtual
        </Button>
      </div>

      <div className="h-[47vh] overflow-scroll">
        {/* contest list  */}
        {contestData.map((obj, idx) => {
          return (
            <div key={idx} className="my-4 ">
              <div className="w-full flex items-center justify-between h-auto rounded-2xl shadow-lg bg-white py-7 px-8">
                <div className="flex">
                  <div className="bg-gray-100 w-18 h-18 text-center pt-2 rounded-2xl">
                    <p className="font-medium text-gray-600">{obj.month}</p>
                    <p className="font-bold text-xl">{obj.date}</p>
                  </div>
                  <div>
                    <div className="flex gap-5 px-4 py-1">
                      <h1 className="text-2xl font-medium text-gray-700 ">
                        {obj.name}
                      </h1>
                      <Button
                        className={`bg-linear-to-b ${obj.color} rounded-full text-white font-bold duration-500 `}
                      >
                        {obj.status}
                      </Button>
                    </div>
                    {/* info  */}
                    <div className="flex items-center gap-4 ">
                      <div className="flex gap-1 items-center mx-5 text-gray-500">
                        {obj.status === "Ongoing" ? (
                          <>
                            <p>Ends in</p>
                            <span className="bg-gray-100 px-2 py-1 text-gray-500">
                              {obj.startTime}
                            </span>
                          </>
                        ) : (
                          <>
                            <p className="text-gray"> Starts at</p>
                            <span className=" text-gray-500">
                              {obj.startTime}
                            </span>
                          </>
                        )}
                      </div>
                      <h4 className="text-gray-500">{obj.duration} Duration</h4>
                    </div>
                  </div>
                </div>
                <div className="flex gap-7">
                  <Button className="border  bg-orange-600 text-white font-medium">
                    {obj.prize}
                  </Button>
                  <Button className="border ">Register</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContestList;
