"use client"
import { useLoadingStore } from '@/store'
import { MdVerifiedUser } from 'react-icons/md'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroller';
import { toast } from 'react-toastify'
import { paginate } from './server'
import MyImage from "next/image"

const TopStudentsTab = ({ setActiveStudent, students, setStudents, showStudents, setShowStudents, stData, setStData }) => {
    const mkey = 2;
    const [fetching, setFetching] = useState(true)
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    const [hasMore, setHasMore] = useState(true)
    const router = useRouter()

    const fetchInitial = async () => {
        const studentsElement = document.getElementById("students")
        const clientHeight = studentsElement.clientHeight;
        const pagestofetch = Math.ceil(clientHeight / 700)
        const values = pagestofetch * 20
        // first ...

        console.log("fetching", values)
        paginate(1, values, mkey).then((e) => {
            if (!e)
                return console.log(e, "Students");

            setFetching(true)
            setStudents(prevStudents => { prevStudents[mkey] = e?.students; return prevStudents })
            setShowStudents(prevStudents => { prevStudents[mkey] = e?.students; return prevStudents })
            setStData(preData => { preData[mkey] = { found: e.found, totalCount: e.totalCount, page: pagestofetch }; return preData })
            setFetching(false)
            return e;
        })
            .catch((e) => {
                setFetching(false)

            })
    }

    useEffect(() => {
        setTimeout(() => {
            setHasMore(hasm => stData[mkey].totalCount >= (stData[mkey].page * 20))
            
            console.log(stData[mkey].totalCount >= (stData[mkey].page * 20))
        }, 0);
    }, [stData[mkey].page])

    const loadMore = async () => {
        console.log(stData[mkey])
        if (stData[mkey].page == 0) {
            await fetchInitial()
        }
        else if (stData[mkey].totalCount >= 20 * stData[mkey].page) {
            setFetching(true)
            const e = await paginate(stData[mkey].page + 1, 20, mkey)

            if (!e) return;
            setStudents(prevStudents => {
                { prevStudents[mkey] = prevStudents[mkey].concat(e?.students); return prevStudents }
            });

            setShowStudents(prevShowStudents => { prevShowStudents[mkey] = prevShowStudents[mkey].concat(e?.students); return prevShowStudents });

            setStData(prevStData => { prevStData[mkey] = { totalCount: e.totalCount, found: prevStData[mkey].found + e.found, page: prevStData[mkey].page + 1 }; return prevStData; })

            setFetching(false)
        }
    }

    // useEffect(() => {

    //     const studentsElement = document.getElementById("students");
    //     studentsElement.addEventListener("scroll", handleScroll);

    //     return () => {
    //         const studentsElement = document.getElementById("students");
    //         studentsElement?.removeEventListener("scroll", handleScroll);
    //     };

    // }, [stData[mkey].page])



    const handleActiveStudent = (e, index) => {
        e.preventDefault();
        // toast.success("Yes")
        let nStudents = JSON.parse(JSON.stringify(students))
        setActiveStudent(nStudents[mkey][index])
        nStudents[mkey][index].css = " bg-sky-500 rounded-xl text-white"
        nStudents[mkey][index].cssGray = "text-white"
        setShowStudents(nStudents)
        if (document.documentElement.clientWidth < 768) {
            router.push(`/students/${nStudents[mkey][index].studentid}`)
        }
    }


    return (
        <div className={"flex flex-col pt-2 w-full bg-white dark:bg-sky-800 overflow-y-scroll "} id="students" style={{ height: 'calc(100vh - 6.7rem)' }} >
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
                onEnded={() => (console.log("yes"))}
                useWindow={false}
                style={{ height: 'calc(100vh - 6.7rem)' }}
            >
                {
                    showStudents[mkey].map((e, index) => (<div href={`/students`} key={index}
                        onClick={e => { handleActiveStudent(e, index) }}
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
                    </div>))
                }
                {!hasMore && <div className='h-6 w-full text-center'>No more students</div>}
            </InfiniteScroll>
        </div>
    )
}

export default TopStudentsTab;