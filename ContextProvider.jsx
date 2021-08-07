import React, { createContext, useState, useContext } from 'react';

const AlbumContext = createContext()

export function useAlbum(){
    return useContext(AlbumContext)
  }

function ContextProvider({children}) {

    const [albumData, setAlbumData] = useState(null)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const [currentAlbumId, setCurrentAlbumId] = useState(0)

    return (
        <AlbumContext.Provider value= {
            {
                albumData, 
                setAlbumData,
                currentAlbum,
                setCurrentAlbum,
                currentId, 
                setCurrentId,
                currentAlbumId,
                setCurrentAlbumId
            } 
        }
        >
            {children}
        </AlbumContext.Provider>
    )
}

export default ContextProvider