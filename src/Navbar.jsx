import Button from "./Button"
import Menu from "./Menu"
import { Link } from "react-router-dom";
export default function Navbar(){
    const Navlinks =[  
  { label: "Home", path: "/" },
  { label: "Market", path: "/market" },
  { label: "Chart", path: "/chart" },
  { label: "Trade", path: "/trade" },
]
    return(
        <nav className="h-12 w-full  flex flex-row items-center justify-between p-5 fixed z-50  backdrop-blur-sm border-white/0 bg-white/0  ">
            <div>
                <h1 className="text-center text-2xl md:text-3xl font-bold text-green-500 md:pl-5">Crypto<span className="md:text-4xl text-3xl text-green-600">X</span></h1>
            </div>
            
            <div className="ml-[400px] ">
                <ul className="flex-row gap-8 hidden md:flex">
                    {Navlinks.map((links , index)=>(
                        <li  key={index} className="text-green-500 font-bold text-md hover:scale-110 
                        duration-100 hover:text-green-600"><Link to={links.path}>{links.label}</Link></li>
                    ))}
                </ul>
            </div>
            <div className="hidden md:flex">
            <Button/>
            </div>
            <Menu links={Navlinks}/>
        </nav>
    )
}