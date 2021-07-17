import React, { createContext, useState, useContext } from 'react';

const AlbumContext = createContext()

export function useAlbum(){
    return useContext(AlbumContext)
  }

function ContextProvider({children}) {

    const [albumData, setAlbumData] = useState(null)
    const [latestAlbum, setLatestAlbum] = useState(null)

    return (
        <AlbumContext.Provider value= {
            {
                albumData, 
                setAlbumData,
                latestAlbum,
                setLatestAlbum,
            } 
        }
        >
            {children}
        </AlbumContext.Provider>
    )
}

export default ContextProvider