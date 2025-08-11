import { useState } from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { FaBars, FaTimes} from 'react-icons/fa';
import { Link } from "react-router-dom";
export default function Menu({links}){
    const [count , setcount]=useState(false)
    return(
      
      <div className="">
       
        <div className="  md:hidden relative flex items-center">
            <div onClick={()=>setcount(!count)} className="text-green-600 right-5 font-bold text-2xl fixed z-40">
                {count ? <FaTimes/>  :  <FaBars/> }
            </div>
           
         {count && (
            <motion.div
        initial={{opacity:0 , x:300}}
        animate={{opacity:1, x:0}}
        transition={{
          duration:1
        }}
        >
        <ul className="absolute right-28 top-5 h-screen bg-black text-green-500 z-40 w-60 p-5 ">
          {links.map((item,index)=>(
            <li className="m-3 text-xl  hover:scale-110 duration-100 hover:text-green-600" key={index}><Link to={item.path}>{item.label}</Link></li>
          ))}
          <hr className="border-green-600 my-4"/>
          <div>{count && <Button/>}</div>
        </ul>
        </motion.div>
      )}
        </div>
    </div>
    )
}