"use client"
import { useLoadingStore } from '@/store'; // Assuming correct import path
import { MdVerifiedUser } from 'react-icons/md';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroller';
import { toast } from 'react-toastify'; // Assuming correct usage
import { paginate } from './server'; // Assuming correct import path
import MyImage from "next/image";
import cssi from "./my.module.css"

let fetchG = false;
const StudentsTab = ({
  setActiveStudent,
  students,
  setStudents,
  showStudents,
  setShowStudents,
  stData,
  setStData,
  mkey
}) => {
  const [fetching, setFetching] = useState(true);
  const setLoadingG = useLoadingStore(state => state.setLoadingG);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  // Store clientHeight in state for potential re-usage
  const [clientHeight, setClientHeight] = useState(0);

  const fetchInitial = async () => {
    const studentsElement = document.getElementById("students");
    // Update clientHeight state for potential re-usage in calculations
    const clientHeight = studentsElement.clientHeight

    const pagestofetch = Math.ceil(clientHeight / 700)
    const values = pagestofetch * 20;


    paginate(1, values, mkey)
      .then((e) => {
        if (!e) {
          console.error(e, "Students"); // Handle potential errors gracefully
          return;
        }

        setStudents((prevStudents) => ({ ...prevStudents, [mkey]: e?.students })); // Update nested state using spread syntax
        setShowStudents((prevStudents) => ({ ...prevStudents, [mkey]: e?.students }));
        setStData((preData) => ({
          ...preData,
          [mkey]: { found: e.found, totalCount: e.totalCount, page: pagestofetch },
        }));

      })
      .catch((e) => {
        // Handle any errors that might occur during pagination
        console.error(e);
        // Set fetching to false even in case of errors
      });
  };

  // Run fetchInitial only once when the component mounts
  useEffect(() => {
    console.log("yes initial value changed")
    if (stData[mkey].page === 0) {
      fetchInitial();
    }
  }, []);

  const loadMore = useCallback(async () => {
    try {
      if (!fetchG && stData[mkey].totalCount >= 20 * stData[mkey].page) {
        fetchG = true;
     
        const e = await paginate(stData[mkey].page + 1, 20, mkey);

        if (!e) return fetchG = false;

        const updateStates = async () => {
          return new Promise(resolve => {
            setStudents(prevStudents => ({
              ...prevStudents,
              [mkey]: prevStudents[mkey].concat(e?.students),
            }));

            setShowStudents(prevShowStudents => ({
              ...prevShowStudents,
              [mkey]: prevShowStudents[mkey].concat(e?.students),
            }));

            setStData(prevStData => ({
              ...prevStData,
              [mkey]: {
                totalCount: e.totalCount,
                found: prevStData[mkey].found + e.found,
                page: prevStData[mkey].page + 1,
              },
            }));

            resolve();
          });
        };

        await updateStates();

        fetchG = false
      } else {
        setTimeout(() => {
          setStData((prevStData) => JSON.parse(JSON.stringify(prevStData)));
        }, 10);
      }
    } catch (err) {
      fetchG = false
    }
  }, [students])

  const handleActiveStudent = (e, index) => {
    e.preventDefault();
    const updatedStudents = JSON.parse(JSON.stringify(students[mkey])); // Create a copy to avoid mutation

    updatedStudents[index].css = " bg-sky-500 rounded-xl text-white";
    updatedStudents[index].cssGray = "text-white";

    setActiveStudent(updatedStudents[index]);
    setShowStudents({ ...showStudents, [mkey]: updatedStudents });

    if (document.documentElement.clientWidth < 768) {
      router.push(`/students/${updatedStudents[index].studentid}`);
    }
  };

  return (
    <div className={"flex flex-col pt-2 w-full bg-gray-50 dark:bg-sky-800 overflow-auto"} id="students" style={{ height: 'calc(100vh - 6.7rem)' }} >
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={loadMore}
        hasMore={stData[mkey].totalCount >= (stData[mkey].page * 20)}
        loader={<div className={`mx-auto w-full h-24 md:h-10`} key={0}>
          <div className={`${cssi.loader} mx-auto`}></div>
        </div>
      }
        onEnded={() => (console.log("yes"))}
        useWindow={false}
        style={{ height: 'calc(100vh - 6.7rem)' }}
      >
        {
          showStudents[mkey] ? showStudents[mkey].map((e, index) => (
            <div href={`/students`} key={index}
              onClick={e => { handleActiveStudent(e, index) }}
              className={"flex border-sky-700 h-16 items-center pl-4 justify-start w-full cursor-pointer " + e?.css}
            >

              <div className="flex items-center"  >
                <img src={e?.photo?.thumb || `https://ui-avatars.com/api/?name=${e.name || "L O L"}&background=random`}
                  width={50} height={10}
                  className="rounded-full"
                  alt="photo"
                />
              </div>

              <div className="pl-3 w-full z-10"  >
                <div className="h-6"  >{e?.name}</div>
                <div className={"text-sm text-gray-600 dark:text-gray-300 overflow-hidden h-6 " + e?.cssGray} >{e?.about}</div>
              </div>
              <div className="flex flex-col justify-end pr-4"  >
                <div className="text-gray-600"  >
                  <MdVerifiedUser className={"dark:text-gray-300 " + e?.cssGray} />
                </div>
              </div>
            </div>
          )) : <div>Check your internet connection</div>
        }
        {stData[mkey].totalCount < (stData[mkey].page * 20) && <div className='h-24 w-full text-center'>No more students</div>}
      </InfiniteScroll>
    </div>
  )
};

export default StudentsTab;