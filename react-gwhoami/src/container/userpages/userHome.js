import { faArrowRightFromBracket, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react"
import Scrollbars from "react-custom-scrollbars";
import { Link, useParams } from "react-router-dom";
import MyLocalStorage from "../../helper/mylocalStorage";
const UserHomePage = React.memo(() => {
    const [menuTip, showMenuTip] = useState(false);
    const {pageId} = useParams();
    const bodyClick = useCallback((e) => {
        e.stopPropagation();
        if (e.target.classList.contains('__tipmenu')) return;
        showMenuTip(false);
    },[]);
    const shortName = useRef(MyLocalStorage.getShortName())
    useEffect(()=>{
        if (!menuTip) {
            document.body.removeEventListener('click', bodyClick);
        } else document.body.addEventListener('click', bodyClick);
        return () => {
            document.body.removeEventListener('click', bodyClick);
        }
        // eslint-disable-next-line
    },[menuTip]);
    const showMenu = (e) => {
        showMenuTip(!menuTip);
    }
    return (
        <div className="bdy">
            <aside id="sidenav-open" className="h-screen">
                <nav className="flex flex-col justify-between h-full p-5 border-r bg-gray-50">
                    <div>
                        <Link to={`/admin/users`} className={`flex items-center p-3 mb-2 rounded-xl hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b': ''}`}>
                            <FontAwesomeIcon icon={faHome} className="text-3xl mr-2"/>
                            <span className="text-gray-900">Home</span>
                        </Link>
                    </div>
                    <div className="px-32">&nbsp;</div>
                </nav>
                <a href="#/abc" id="sidenav-close" title="Close Menu" aria-label="Close Menu"><span></span></a>
            </aside>
            <main className="overflow-auto h-screen">
                <header className="flex items-center justify-between px-4 py-3 sticky top-0 bg-gray-50 shadow-md" style={{zIndex: "999"}}>
                    <div className="flex items-center justify-between">
                        <a href="#sidenav-open" className="visible sm:hidden" title="Open Menu" aria-label="Open Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </a>
                        <h1 className="mx-2 text-xl font-bold text-gray-900">Gwhoami</h1>
                        
                    </div>
                    <div className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer" id="userdropdown" onClick={e=>showMenu(e)}>
                        <div className="rounded-full w-12 h-12 hover:border-dodge-b ignore-body-click border border-gray-500 flex justify-center items-center text-xs font-bold">{shortName.current}</div>
                    </div>
                    <div id="usermenu" className={`absolute lg:mt-16 pt-1 left-0 lg:left-auto lg:right-0 lg:top-0 lg:w-auto w-full${menuTip ? '' : ' hidden'}`}>
                        <div className="__tipmenu bg-white shadow-xl lg:px-8 px-6 lg:py-4 pb-4 pt-0 rounded lg:mr-3 rounded-t-none">
                            {/* <a href="/settings" className="pb-2 block text-gray-600 hover:text-gray-900 font-medium ignore-body-click"><FontAwesomeIcon icon={faGear} className="mr-1"/> Settings</a> */}
                            <Link to="/" className="block text-gray-600 hover:text-dodge-b font-medium ignore-body-click cursor-pointer"><FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-1"/> Logout</Link>
                        </div>
                    </div>
                </header>
                <Scrollbars className="px-4 overflow-auto" style={{height: "calc(100% - 72px)"}}>
                    {/* <div style={{height: "2000px"}}></div> */}
                   {/* <Switch>
                        <Route exact path={path} render={(props)=><UserGrid {...props}/>}></Route>
                   </Switch> */}
                   {pageId === 'home' && <div className="flex justify-center items-center h-full"><div className="text-2xl">Welcome {MyLocalStorage.getLoginInfo().name}</div></div>}
                </Scrollbars>
                {/* <div className="px-4 py-3 overflow-auto" style={{height: "calc(100% - 72px)"}}>
                    
                </div> */}
            </main>
        </div>
    );
});

export default UserHomePage;