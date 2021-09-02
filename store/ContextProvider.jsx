import React, { createContext, useState, useContext } from 'react';
import firebaseApp from '../firebase/firebase.config'

const AlbumContext = createContext()

export function useAlbum(){
    return useContext(AlbumContext)
  }

function ContextProvider({children}) {

    const [albumData, setAlbumData] = useState(null)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [currentAlbumId, setCurrentAlbumId] = useState(0)
    const [login, setLogin] = useState(false)
    const [playlistData,setPlaylistData] = useState(null)

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
            } 
        }
        >   
            {children}
        </AlbumContext.Provider>
    )
}

export default ContextProvider