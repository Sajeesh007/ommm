import React, { createContext, useState, useContext } from 'react';

const AlbumContext = createContext()

export function useAlbum(){
    return useContext(AlbumContext)
  }

function ContextProvider({children}) {
  
    const [prismicRef, setPrismicRef] = useState('')

    const [albumData, setAlbumData] = useState(null)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [currentAlbumId, setCurrentAlbumId] = useState(0)
    
    const [playlistData,setPlaylistData] = useState(null)

    const [searchAlbumData, setSearchAlbumData] = useState(null)

    const [showMore, setShowMore] = useState({currentPage : 1, clicked : false})

    const [login, setLogin] = useState(false)
    
    

    
    return (
        <AlbumContext.Provider value= {
            {
              albumData, 
              setAlbumData,
              currentAlbum,
              setCurrentAlbum,
              currentAlbumId,
              setCurrentAlbumId,
              login,
              setLogin,
              playlistData,
              setPlaylistData,
              showMore, 
              setShowMore,
              searchAlbumData, 
              setSearchAlbumData,
              prismicRef,
              setPrismicRef
            } 
        }
        >   
            {children}
        </AlbumContext.Provider>
    )
}

export default ContextProvider