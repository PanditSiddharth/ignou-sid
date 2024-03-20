"use client"
import { useLoadingStore } from '@/store'; // Assuming correct import path
import { MdVerifiedUser } from 'react-icons/md';
import cssi from "./my.module.css"
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroller';
import { toast } from 'react-toastify'; // Assuming correct usage
import { paginate } from './server'; // Assuming correct import path
import MyImage from "next/image";
let fetchG = false;
const SellersTab = ({
  setActiveSeller,
  sellers,
  setSellers,
  showSellers,
  setShowSellers,
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
    const sellersElement = document.getElementById("sellers");
    // Update clientHeight state for potential re-usage in calculations
    const clientHeight = sellersElement.clientHeight

    const pagestofetch = Math.ceil(clientHeight / 700)
    const values = pagestofetch * 20;

    console.log("fetching", values);
    paginate(1, values, mkey)
      .then((e) => {
        if (!e) {
          console.log(e, "Sellers"); // Handle potential errors gracefully
          return;
        }

        setSellers((prevSellers) => ({ ...prevSellers, [mkey]: e?.sellers })); // Update nested state using spread syntax
        setShowSellers((prevSellers) => ({ ...prevSellers, [mkey]: e?.sellers }));
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
        console.log(stData)
        const e = await paginate(stData[mkey].page + 1, 20, mkey);

        if (!e) return fetchG = false;

        const updateStates = async () => {
          return new Promise(resolve => {
            setSellers(prevSellers => ({
              ...prevSellers,
              [mkey]: prevSellers[mkey].concat(e?.sellers),
            }));

            setShowSellers(prevShowSellers => ({
              ...prevShowSellers,
              [mkey]: prevShowSellers[mkey].concat(e?.sellers),
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
  }, [sellers])

  const handleActiveSeller = (e, index) => {
    e.preventDefault();
    const updatedSellers = JSON.parse(JSON.stringify(sellers[mkey])); // Create a copy to avoid mutation

    updatedSellers[index].css = " bg-sky-500 rounded-xl text-white";
    updatedSellers[index].cssGray = "text-white";

    setActiveSeller(updatedSellers[index]);
    setShowSellers({ ...showSellers, [mkey]: updatedSellers });

    if (document.documentElement.clientWidth < 768) {
      router.push(`/sellers/${updatedSellers[index].sellerid}`);
    }
  };

  return (
    <div className={"flex flex-col pt-2 w-full bg-white dark:bg-sky-800 overflow-auto "} id="sellers" style={{ height: 'calc(100vh - 6.7rem)' }} >
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={loadMore}
        hasMore={stData[mkey].totalCount >= (stData[mkey].page * 20)}
        loader={<div className={`mx-auto w-full h-24 md:h-10`} key={0}>
        <div className={`${cssi.loader} mx-auto`}></div>
      </div>}
        onEnded={() => (console.log("yes"))}
        useWindow={false}
        style={{ height: 'calc(100vh - 6.7rem)' }}
      >
        {
          showSellers[mkey].map((e, index) => (
            <div href={`/sellers`} key={index}
              onClick={e => { handleActiveSeller(e, index) }}
              className={"flex border-sky-700 h-16 items-center pl-4 justify-start w-full cursor-pointer " + e?.css}
            >

              <div className="flex items-center"  >
                <MyImage src={e?.photo?.thumb || "https://ignou.sidsharma.in/hero5.png"}
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
          ))
        }
        {stData[mkey].totalCount < (stData[mkey].page * 20) && <div className='h-24 w-full text-center'>No more sellers</div>}
      </InfiniteScroll>
    </div>
  )
};


export default SellersTab;