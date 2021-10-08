import React, { createContext, useState, useContext } from 'react';

const AlbumContext = createContext()
const OtherContext = createContext()
const AuthContext = createContext()
export const ModelContext = createContext()

export function useAlbum(){
  return useContext(AlbumContext)
}
export function useOther(){
  return useContext(OtherContext)
}
export function useAuth(){
  return useContext(AuthContext)
}
export function useModel(){
  return useContext(ModelContext)
}

function ContextProvider({children}) {

  const [prismicRef, setPrismicRef] = useState('')
  const [albumData, setAlbumData] = useState(null)
  const [currentAlbum, setCurrentAlbum] = useState(null)
  const [currentAlbumId, setCurrentAlbumId] = useState(0)
  const [playlistData,setPlaylistData] = useState(null)
  const [searchAlbumData, setSearchAlbumData] = useState(null)
  const [dateFilterOrder, setDateFilterOrder] = useState('desc')

  const [showMore, setShowMore] = useState({currentPage : 1, clickedCount : 0,clicked : false})
  const [hideShowMore, setHideShowMore] = useState(true)

  //other Context
  const [menuHidden, setMenuHidden] = useState(false)
  // const [modelOpen, setModelOpen] = useState(false)



  //auth context
  const [authUser, setAuthUser] = useState({name : '', email:'', emailVerified:false, })
  const [authUserLogined, setAuthUserLogined] = useState(false)
  const [login, setLogin] = useState(false)

    
    
    return (
        <AlbumContext.Provider value= {
          {
            albumData,setAlbumData,
            currentAlbum,setCurrentAlbum,
            currentAlbumId,setCurrentAlbumId,
            playlistData,setPlaylistData,
            showMore, setShowMore,
            searchAlbumData, setSearchAlbumData,
            prismicRef,setPrismicRef,
            dateFilterOrder, setDateFilterOrder,
            hideShowMore, setHideShowMore,
            login,setLogin,
          } 
        }
        >   
          <OtherContext.Provider value={
            {
              menuHidden, setMenuHidden,

            }
          }>
            <AuthContext.Provider value={
              {
                authUser, setAuthUser,
                authUserLogined, setAuthUserLogined
              }}>
              {children}
            </AuthContext.Provider>
          </OtherContext.Provider>
        </AlbumContext.Provider>
    )
}



export default ContextProvider