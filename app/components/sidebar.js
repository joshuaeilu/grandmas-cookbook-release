'use client'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function SideBar() {

    // Function to toggle the sidebar
    function toggleSidebar() {
        const sidebar = document.getElementById('default-sidebar');
        sidebar.classList.replace('');
    }

return (
    <div className="relative">
        <div className="fixed bg-white z-10 flex w-full">
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-3 m-2.5 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <div style={{width:'65%'}} className=" flex justify-center md:hidden ">
                <Image src="/semi_logo.png" alt="avatar" width={80} height={80}/>
            </div>
        </div>

        <aside id="default-sidebar" className="fixed md:relative top-0 left-0 z-40 w-64 md:w-48 xl:w-64 h-full h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
                <img src="/full_logo.png" alt="avatar"  />
                <ul>
                    <li>
                        <Link href="/all_meals" className={clsx("flex items-center p-2 mb-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",{
                            'bg-red-100 dark:bg-red-700': usePathname() === '/all_meals'
                        })} onClick={toggleSidebar}>
                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960" >
                                <path d="m175-120-56-56 410-410q-18-42-5-95t57-95q53-53 118-62t106 32q41 41 32 106t-62 118q-42 44-95 57t-95-5l-50 50 304 304-56 56-304-302-304 302Zm118-342L173-582q-54-54-54-129t54-129l248 250-128 128Z"/>
                            </svg>
                            <span className="ms-3">Meals</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/categories" className={clsx("flex items-center p-2 mb-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",{
                            'bg-red-100 dark:bg-red-700': usePathname() === '/categories'
                        })} onClick={toggleSidebar}>
                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z"/>
                            </svg>
                            <span className="ms-3">Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nations" className={clsx("flex items-center p-2 mb-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",{
                            'bg-red-100 dark:bg-red-700': usePathname() === '/nations'
                        })} onClick={toggleSidebar}>
                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/>
                            </svg>
                            <span className="ms-3">Nations</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/meal_maker" className={clsx("flex items-center p-2 mb-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",{
                            'bg-red-100 dark:bg-red-700': usePathname() === '/meal_maker'
                        })} onClick={toggleSidebar}>
                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M640-320q50 0 85 35t35 85q0 50-35 85t-85 35q-38 0-68.5-22T528-160H274l-40 62q-9 14-25.5 17.5T178-86q-14-9-17.5-25.5T166-142l158-242q-72-33-118-101.5T160-640h560q0 86-46 154.5T556-384l23 36q-21 10-34.5 20T515-300l-40-62q-8 2-17 2h-36q-9 0-17-2l-79 122h202q13-36 43.5-58t68.5-22Zm0 160q17 0 28.5-11.5T680-200q0-17-11.5-28.5T640-240q-17 0-28.5 11.5T600-200q0 17 11.5 28.5T640-160ZM440-440q60 0 109.5-33t74.5-87H256q26 54 75 87t109 33ZM336-680q5-29-1.5-49T307-775q-20-26-26.5-49.5T279-880h40q-5 29 1.5 48.5T348-786q21 26 27 49.5t1 56.5h-40Zm100 0q5-29-1-49t-27-46q-21-25-27.5-48.5T379-880h40q-5 29 1.5 48.5T448-786q20 25 26.5 48.5T476-680h-40Zm100 0q5-29-1-49t-27-46q-21-25-27.5-48.5T479-880h40q-5 29 1.5 48.5T548-786q20 25 26.5 48.5T576-680h-40Zm-96 240Z"/>
                            </svg>
                            <span className="ms-3">Meal Maker</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
)
}
