import Dashboard from "../components/Admin/Dashboard";
import Login from "../components/Admin/Login";
import {useAlbum} from '../store/ContextProvider'


export default function Admin() {

  const {login} = useAlbum()

  return (
    <div>
      {
        login ? (
          <Dashboard/>
        ) : (
          <Login/>
        )
      }
    </div>
  )
}
