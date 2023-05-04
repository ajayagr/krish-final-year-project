import React, { useState, useEffect } from "react";
import { data } from "../data/blogdata";
import CardDesign from "../components/CardDesign";
import DropDown from "../components/dropdown";

function Landingpage() {
  const [value, setValue] = useState([]);

  function Draftdata() {
    const filteredDraft = data.filter((user) => {
      return user.status === "DRAFT";
    });
    return setValue(filteredDraft);
  }
  function ARCHIVEDdata() {
    const filteredARCHIVE = data.filter((user) => {
      return user.status === "ARCHIVED";
    });
    return setValue(filteredARCHIVE);
  }

  function LIVEdata() {
    const filteredLIVE = data.filter((user) => {
      return user.status === "LIVE";
    });
    return setValue(filteredLIVE);
  }
  function all() {
    setValue(data);
  }

  useEffect(() => {
    all();
  }, []);

  return (
    <>
      <div className="ml-56 mt-20">
        <div className="flex justify-between items-center">
          <div>
            <ul className="flex gap-8 mx-20 font-semibold">
              <li
                className="hover:bg-violet-600 hover:text-white active:bg-violet-700 rounded-md px-2 py-1 cursor-pointer"
                onClick={all}
              >
                ALL
              </li>
              <li
                className="hover:bg-violet-600 hover:text-white active:bg-violet-700 rounded-md px-2 py-1 cursor-pointer"
                onClick={LIVEdata}
              >
                LIVE
              </li>
              <li
                className="hover:bg-violet-600 hover:text-white active:bg-violet-700 rounded-md px-2 py-1 cursor-pointer"
                onClick={Draftdata}
              >
                DRAFT
              </li>
              <li
                className="hover:bg-violet-600 hover:text-white active:bg-violet-700 rounded-md px-2 py-1 cursor-pointer"
                onClick={ARCHIVEDdata}
              >
                ARCHIVED
              </li>
            </ul>
          </div>
          <div>
            <DropDown />
          </div>
        </div>
        <>
          <div className="flex flex-wrap px-12 pt-4 gap-6">
            {value.map((item) => (
              <CardDesign
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                date={item.date}
                duration={item.duration}
                category={item.category}
                status={item.status}
              />
            ))}
          </div>
        </>
      </div>
      ;
    </>
  );
}

export default Landingpage;
