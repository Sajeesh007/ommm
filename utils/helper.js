import axios from "axios"

const fetchAlbum = async (id,genre) =>{
  try {
    const albumDetails = await axios({
      method: 'post',
      url: `api/album`,
      data: {
        albumIds : `${id.join('%2C')}`
      }
    })
    albumDetails.data.albums.map((albums,id)=>albums.genre = genre[id])
    return albumDetails?.data?.albums
  } catch (e) {
    console.log(e);
  }
  
}

const accessToken = async () => {
  const accessToken = await axios.get('https://ommm-website.prismic.io/api/v2')
  return accessToken.data.refs[0].ref
}

const artist = async (ref,artistName) => {
  const albumPredicates = `[at(document.tags, [${artistName}])]`
  const album = await axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${albumPredicates}]&pageSize=50`)
  const result = album.data.results.map((releases)=>({
    catalogue: releases.uid, 
    albumName: releases.data.release_details[0].text,
    release_year: releases.data.release_date.slice(0,4)
  }))
  return {
    results : result
  }
}

const album = async (ref,pageSize,pageNumber,order) => {
  const albumPredicates = '[at(document.type, "releases")]'
  const albumOrdering = `[my.releases.release_date ${order}]`
  const album = await axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${albumPredicates}]
  &orderings=${albumOrdering}&pageSize=${pageSize}&page=${pageNumber}`)
  
  return {
    id : album.data.results.map((releases)=>releases.data.release_details[3].text),
    genre : album.data.results.map((releases)=>releases.data.release_details[2].text),
    currentPage : album.data.total_pages,
    totalPages : album.data.total_pages,
  }
}

const albumSearch = async (ref, search) => {
  const albumPredicates = '[at(document.type, "releases")]'
  const albumOrdering = '[my.releases.release_date desc]'
  const searchItem = `[fulltext(document,"${search}")]`
  const album = await axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${albumPredicates}]&q=[${searchItem}]
  &orderings=${albumOrdering}`)
  return{
    id : album.data.results.map((releases)=>releases.data.release_details[3].text),
    genre : album.data.results.map((releases)=>releases.data.release_details[2].text),
  }
}

const playlist= async (ref) => {
  const playlistPredicates = '[at(document.type, "playlists_page")]'
  const playlist =  await axios.get(`https://ommm-website.prismic.io/api/v2/documents/search?ref=${ref}&q=[${playlistPredicates}]`)
  const playlistDetails = Object.values(playlist.data.results[0].data)
  return playlistDetails
}

export {accessToken, album, playlist, fetchAlbum, albumSearch, artist,}