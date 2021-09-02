
export default function Skelton({isPlaylist}) {

  return (
    <div>
      <div className='skelton' />
      <div className='skelton-text '/>
      {!isPlaylist && <div className='skelton-text'/>}
      
    </div>
  )
}
