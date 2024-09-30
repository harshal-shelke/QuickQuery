import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
import './Main.css'
import React, { useContext } from 'react';

const Main = () => {

    const { 
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setinput}=useContext(Context)
    return (
        <div className='main'>
        <div className="nav">
            <p>QuickQuery</p>
        </div>

            {!showResult
            ?<>
            <div className="main-container">
            <div className="greet">
                <p><span>Hello, Harsh</span></p>
                <p>How can i help you</p>
            </div>
            </div>

            </>
            :
            <div className="result">

            <div className="result-title">

                {/* <img className="" src={assets.user_icon} /> */}
                <p>{`You -> ${recentPrompt}`}</p>

            </div>

            <div className="result-data">
                {/* <img className="" src={assets.gemini_icon} /> */}
                {loading
                ? <div className="loader">
                    <hr/>
                    <hr/>
                    <hr/>
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>

            </div>
    
            }

        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setinput(e.target.value)}  value={input} placeholder='Enter your Query here' />
                <div className="">
                    <img onClick={()=>onSent()} src={assets.send_icon} />
                </div>  
            </div>
            <p className='bottom-info'>
            Created by - Harshal Shelke 
            </p>
        </div>
        </div>
    );
}

export default Main;
