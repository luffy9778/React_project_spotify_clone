import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MusicPage from "./pages/MusicPage";
import PodcastContainer from "./pages/PodcastContainer";
import Search from "./pages/Search";
import Album from "./components/album/Album";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

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
              <Route path="/likedsongs" element={<Search />} />
              <Route path="/section" element={<Search />} />
              <Route path="/artist/:id" element={<Album />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<h1>404 page not found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
