import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MusicPage from "./pages/MusicPage";
import PodcastContainer from "./pages/PodcastContainer";
import Search from "./pages/Search";
import ArtistAlbums from "./pages/ArtistAlbums";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { AdminDashBoard } from "./components/Admin/AdminDashBoard";
import AdminHome from "./pages/Admin/AdminHome";
import ViewSong from "./pages/Admin/songs/ViewSong";
import AddSong from "./pages/Admin/songs/AddSong";
import EditSong from "./pages/Admin/songs/EditSong";
import ViewArtist from "./pages/Admin/artist/ViewArtist";
import AddArtist from "./pages/Admin/artist/AddArtist";
import EditArtist from "./pages/Admin/artist/EditArtist";
import ViewPlaylist from "./pages/Admin/playlist/ViewPlaylist";
import AddPlaylist from "./pages/Admin/playlist/AddPlaylist";
import EditPlayList from "./pages/Admin/playlist/EditPlayList";
import ViewAllPlaylist from "./pages/ViewAllPlaylist";
import PlaylistAlbum from "./pages/PlaylistAlbum";
import LikedSongsAlbum from "./pages/LikedSongsAlbum";
import ViewUsers from "./pages/Admin/user/ViewUsers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={"User"} />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/musics" element={<MusicPage />} />
              <Route path="/podcasts" element={<PodcastContainer />} />
              <Route path="/search" element={<Search />} />
              <Route path="/likedsongs" element={<LikedSongsAlbum />} />
              <Route path="/section" element={<ViewAllPlaylist />} />
              <Route path="/artist/:id" element={<ArtistAlbums />} />
              <Route path="/playlist/:id" element={<PlaylistAlbum />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={"Admin"} />}>
            <Route path="/Admin" element={<AdminDashBoard />}>
              <Route index element={<AdminHome />} />
              <Route path="songs">
                <Route index element={<ViewSong />} />
                <Route path="add" element={<AddSong />} />
                <Route path="edit/" element={<EditSong />} />
              </Route>
              <Route path="artist">
                <Route index element={<ViewArtist />} />
                <Route path="add" element={<AddArtist />} />
                <Route path="edit/:id" element={<EditArtist />} />
              </Route>
              <Route path="playlist">
                <Route index element={<ViewPlaylist />} />
                <Route path="add" element={<AddPlaylist />} />
                <Route path="edit" element={<EditPlayList />} />
              </Route>
              <Route path="users">
                <Route index element={<ViewUsers/>} />
                <Route path="add" element={<AddPlaylist />} />
                <Route path="edit" element={<EditPlayList />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
