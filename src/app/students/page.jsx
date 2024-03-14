"use client"
import Link from "next/link";
import cssi from "./my.module.css"
import { IoMenu } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { deleteCookie, getCookie } from "cookies-next";
import MyImage from "next/image"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useLoadingStore, useStudentActiveTab } from "@/store";
import { paginate } from "./server";
import { useRouter } from "next/navigation";

const Students = () => {

  const [students, setStudents] = useState([[], [], []])
  let [showStudents, setShowStudents] = useState([[], [], []])
  const [scroll, setScroll] = useState({})
  const [activeStudent, setActiveStudent] = useState("")
  const [fetching, setFetching] = useState(true)
  const [activeTab, setActiveTab] = useState({ value: 0 })
  let dtFetch = false;
  // => {
  //   const storedValue = localStorage.getItem("studentActiveTab");
  //   return storedValue ? JSON.parse(storedValue) : { value: 0 };
  // });

  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  let [stData, setStData] = useState([{
    found: 0,
    totalCount: 0,
    page: 0
  }, {
    found: 0,
    totalCount: 0,
    page: 0
  }, {
    found: 0,
    totalCount: 0,
    page: 0
  }])

  const router = useRouter()

  const fetchInitial = useCallback(async () => {
    const studentsElement = document.getElementById("students")
    const clientHeight = studentsElement.clientHeight;
    const pagestofetch = Math.ceil(clientHeight / 700)
    const values = pagestofetch * 20
    let actTab;

    setActiveTab(act => { actTab = act; return act })
    // first ...
    if (dtFetch)
      return;

    console.log("fetching")
    dtFetch = true
    paginate(1, values, activeTab).then((e) => {
      setFetching(true)
      setStudents(prevStudents => { prevStudents[activeTab.value] = e?.students; return prevStudents })
      setShowStudents(prevStudents => { prevStudents[activeTab.value] = e?.students; return prevStudents })
      setStData(preData => { preData[activeTab.value] = { found: e.found, totalCount: e.totalCount, page: pagestofetch }; return preData })
      setFetching(false)
      dtFetch = false
      return e;
    })
      .catch((e) => {
        setFetching(false)
        dtFetch = false

      })
  }, [activeTab.value])

  let isEventListenerAdded = false;
  const handleScroll = useCallback(async () => {
    const studentsElement = document.getElementById("students")
    const totalHeight = studentsElement.scrollHeight
    const heightOne = studentsElement.scrollTop
    const heightTwo = studentsElement.clientHeight

    if (totalHeight == heightOne + heightTwo) {

      if (stData[activeTab.value].totalCount >= 20 * stData[activeTab.value].page) {
        setFetching(true)
        console.log(stData)
        const e = await paginate(stData[activeTab.value].page + 1, 20, activeTab)
     
        if(!e) return ;
        setStudents(prevStudents => {
          { prevStudents[activeTab.value] = prevStudents[activeTab.value].concat(e?.students); return prevStudents }
        });

        setShowStudents(prevShowStudents => { prevShowStudents[activeTab.value] = prevShowStudents[activeTab.value].concat(e?.students); return prevShowStudents });

        setStData(prevStData => { prevStData[activeTab.value] = { totalCount: prevStData[activeTab.value].totalCount, found: prevStData[activeTab.value].found + e.found, page: prevStData[activeTab.value].page + 1 }; return prevStData; })


        setFetching(false)

      }
    }
  }, [activeTab.value])


  useEffect(() => {
    setLoadingG(false)
    toast.dismiss()
console.log("yes")
    if (students[activeTab.value].length < 1) {
      fetchInitial()
    }

    if (!isEventListenerAdded) {
      const studentsElement = document.getElementById("students");
      studentsElement.addEventListener("scroll", handleScroll);
      isEventListenerAdded = true;
    }

    return () => {
      const studentsElement = document.getElementById("students");
      studentsElement?.removeEventListener("scroll", handleScroll);
      isEventListenerAdded = false;
    };

  }, [activeTab.value, setStudents])

  const handleActiveTab = async (e, v) => {
    setActiveTab(preValue => ({ value: v.value }));
    // localStorage.setItem("studentActiveTab", JSON.stringify({value: v.value}));
  }

  const token = getCookie("token");

  // Check if activeStudent and activeStudent.photo are defined
  const photoUrld = activeStudent?.photo && activeStudent.photo?.thumb || "https://ignou.sidsharma.in/hero5.png";

  const handleActiveStudent = (e, index) => {
    e.preventDefault();
    // toast.success("Yes")
    let nStudents = JSON.parse(JSON.stringify([...students]))
    setActiveStudent(nStudents[activeTab.value][index])
    nStudents[activeTab.value][index].css = " bg-sky-500 rounded-xl text-white"
    nStudents[activeTab.value][index].cssGray = "text-white"
    setShowStudents(nStudents)
    if (document.documentElement.clientWidth < 768) {
      router.push(`/students/${nStudents[activeTab.value][index].studentid}`)
    }
  }


  return (
    <div>

      {/* Main */}
      <div className="flex text-black dark:text-white h-screen w-full fixed">

        {/* Left side */}
        <div className="w-full md:w-1/3 bg-gray-100 dark:bg-sky-800 overflow-y-hidden border-r dark:border-r-0 pt-1 h-screen">

          <div className="h-[6.7rem]">
            {/* Top bar */}
            <div className="flex flex-col">
              <div className="flex items-center h-12">
                <IoMenu className="w-8 h-8 dark:text-white pl-2 " />
                <div className="w-full mx-3 flex">
                  <IoIosSearch className="w-5 h-8 dark:text-white absolute mt-1 ml-2" />
                  <input type="text" className="rounded-full bg-gray-100 dark:text-white dark:bg-sky-900 h-10 w-full pl-8 active:border-none focus:outline-blue-500 focus:outline-2 outline outline-1 outline-gray-300 dark:outline-none"
                    placeholder="Search"
                  />
                </div>
              </div>

              {/* Middle Bar */}
              <ul className={`flex mt-2 text-gray-600 dark:text-gray-400 font-bold h-12 items-end pl-4 whitespace-nowrap overflow-x-scroll ${cssi.scrollhide}`}>
                <li className={activeTab.value == 0 ? "p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl cursor-pointer" : "p-3 hover:dark:bg-sky-700 rounded-t-lg cursor-pointer"}
                  onClick={e => handleActiveTab(e, { value: 0 })} value={1234}
                >
                  Students</li>
                <li className={activeTab.value == 1 ? "p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl cursor-pointer" : "p-3 hover:dark:bg-sky-700 rounded-t-lg cursor-pointer"}
                  onClick={e => { handleActiveTab(e, { value: 1 }) }}
                >New Students</li>
                <li className={activeTab.value == 2 ? "p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl cursor-pointer" : "p-3 hover:dark:bg-sky-700 rounded-t-lg cursor-pointer"}
                  onClick={e => { handleActiveTab(e, { value: 2 }) }}
                >Top Students</li>
                {/* <li className="p-3 hover:dark:bg-sky-700 rounded-t-lg" >Top Students</li> */}
              </ul>
              <div className="w-full bg-gray-300 dark:bg-sky-900 h-[1px] dark:h-[2px] relative z-30"></div>
            </div>
          </div>

          {/* students */}
          <div className={"flex flex-col pt-2 w-full bg-white dark:bg-sky-800 h-screen max-h-full overflow-scroll "} id="students">
            {
              showStudents[activeTab.value].map((e, index) => (<div href={`/students`} key={index}
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
            {fetching && <div className="flex items-center min-h-6 h-full w-full animate-bounce">Loading...</div>}
            <div className="h-4 w-full"></div>
          </div>

        </div>

        {/* Right side */}
        <div className="md:w-2/3 hidden md:block h-screen overflow-hidden">
          {activeStudent ? <div className="flex flex-col h-[90vh] relative bottom-4">
            <div className="hidden md:flex items-center flex-col md:flex-row  w-full" >
              {/* Image */}
              <div className="w-80 h-80 flex items-center justify-center">
                <div className='w-40 h-40 relative '>
                  {/* Ensure photoUrld is defined before using it */}
                  {photoUrld && <MyImage className="border-4 border-sky-500 rounded-full" src={photoUrld} fill alt="Photo" />}
                </div>
              </div>

              <div className="text-black dark:text-white">
                <div className="text-2xl flex space-x-14">
                  <div className="-pl-[1px]">
                    {activeStudent?.studentid}
                  </div>
                  <Link href={`/students/${activeStudent?.studentid}`}>
                    <button className='bg-sky-500 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md whitespace-nowrap' >See more</button>
                  </Link>
                </div>

                <div className="text-gray-700 mt-6 flex space-x-8 dark:text-gray-400">
                  <div> <b>0</b> posts</div>
                  <div><b>0</b> following</div>
                  <div><b>0</b> tags</div>
                </div>
                <div className="mt-4 font-bold">{activeStudent.name}</div>
                {/* <div>{activeStudent?.email}</div> */}

                <div className="text-sm">{activeStudent?.about ? activeStudent.about : (<div>
                  Busy in study...  <br />
                </div>)}</div>
                <div className="flex space-x-2 my-1">

                  <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' >See more</button>
                  <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' >See more</button>
                </div>
              </div>
            </div>
            <div className="w-full md:flex justify-center hidden">
              <div className="flex flex-col w-4/5 space-x-6">
                <h5 className="text-2xl font-bold">My Courses</h5>
                <div className="flex">

                  {
                    [0, 1, 2].map((e, index) => (
                      <div className="flex flex-col items-center space-y-2 mx-[1px]" key={index}>
                        <div className="w-32 h-32 rounded bg-sky-600"></div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    </div>
  )
}

export default Students