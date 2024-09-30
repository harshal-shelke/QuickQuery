import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent,prevPrompt,setrecentPrompt,newChat}= useContext(Context)

  const loadPrompt=async(prompt)=>{
    setrecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} />
        <div onClick={()=>newChat()} className="new-chat">
          <img className="" src={assets.plus_icon} />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img className="" src={assets.message_icon} />
                  <p>{item.slice(0,18)} ..</p>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
      {/* <div className="bottom">
            <div className="bottom-item">
                <img className="" src={assets.question_icon} />
            </div>
            </div> */}
    </div>
  );
};

export default Sidebar;
