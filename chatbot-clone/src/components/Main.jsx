import { useContext } from 'react';
import { assets } from '../assets/assets';
import './Main.css';
import { Context } from '../context/Context';
function Main()
{

  //get states and functions using contextapi and use these to display result on main component

  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

  function handleInputChange (event)
  {
    setInput(event.target.value);
  }

  return(
    
        <div className="main">

            <div className="nav">
                <p>Gemini</p>
                <img src = {assets.profile_icon} alt = "user" id = "user-icon"></img>
            </div>

            <div className='main-container'>

              {!showResult ? <>
                <div className="greet">
                <p><span>Hello, Lish.</span></p>
                <p>How can I help you today?</p>
              </div>

              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="compass"></img>
                </div>

                <div className="card">
                    <p>Breifly Summarise this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="compass"></img>
                </div>

                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="compass"></img>
                </div>

                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="compass"></img>
                </div>
              </div>

              </> : <div className='result'>
                    <div className="result-title">
                      <img src = {assets.profile_icon} alt = "profile-picture"></img>
                      <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                      <img src = {assets.gemini_icon}></img>
                      {loading ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                      </div> : <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
            
                    </div>
                    </div>} 



              <div className="main-bottom">
                <div className="search-box">
                  <input onChange = {handleInputChange} value = {input}type="text" placeholder='Enter a prompt here'></input>
                  <div>
                    <img src = {assets.gallery_icon}></img>
                    <img src = {assets.mic_icon}></img>
                    {input ? <img src = {assets.send_icon} onClick = {() => onSent()}></img> : null}
                  </div>
                </div>
                <p className="bottom-info">
                  Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                </p>
              </div>

          </div>

        </div>
    
  );
}

export default Main;