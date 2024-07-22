import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthCurrent, selectIsAuth } from "./redux/slices/auth";
import TagPage from "./pages/TagPage";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthCurrent());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
        <Routes>
          <Route path="/posts/:id/edit" element={<AddPost />} />
        </Routes>
        <Routes>
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Registration />} />
        </Routes>
        <Routes>
          <Route path="/tags/:name" element={<TagPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
