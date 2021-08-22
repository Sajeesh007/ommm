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
            } 
        }
        >   
            {children}
        </AlbumContext.Provider>
    )
}

export default ContextProvider