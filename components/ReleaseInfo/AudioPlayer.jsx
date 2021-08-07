import {useRef,useEffect,useState} from 'react'
import { FiPlay,FiPause } from "react-icons/fi";

export default function AudioPlayer({source}) {

  const audio = useRef()

  const [icon, setIcon] = useState('')
  const [persentage, setPersentage] = useState(0)
  const[play,setPlay] = useState(false)

  useEffect(() => {
    if(play){
      setIcon(<FiPause className='w-6 h-6'/>)
      audio.current.play()
    }else{
      setIcon(<FiPlay className='w-6 h-6 pl-1'/>)
      audio.current.pause()
      audio.current.load()
    }
  }, [play])

  useEffect(() => {
    if(play){
      setTimeout(() => {
        const per = (140 - (140 * (audio.current.currentTime / 30) * 100) / 100)
        setPersentage(per)
      }, 100);
    }
    if(audio.current.ended){
      setPlay(false)
    }
  }, [play,persentage])

  const handleClick = ()=>{
    setPlay(!play)
  }
  
  return (
    <>
      <div className='relative flex ml-52 '>
        <div className='flex relative'>
          <svg height="50" width="50" className={play ? 'fill-current text-green-600 stroke-current' : 'display-hidden'} >
            <circle cx="25" cy="25" r="22" strokeWidth="3" fill="none" style={{
              strokeDasharray : '140', 
              strokeDashoffset : '0' 
            }}
            className={play ? 'stroke-current text-gray-100 opacity-25' : 'display-hidden'}> 
            </circle>
            <circle cx="25" cy="25" r="22" strokeWidth="3" fill="none" style={{
              strokeDasharray : '140', 
              strokeDashoffset : `${persentage}` 
            }}
            className='troke-current text-white '> 
            </circle>
          </svg>
          <div className='flex absolute justify-center items-center rounded-full h-12 w-12 md:hover:cursor-pointer' onClick={handleClick}>
              {icon}
              <audio ref={audio} src={source}></audio>
        </div>
        </div>
      </div> 
    </>
  )
}
