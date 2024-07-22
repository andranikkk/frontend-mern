import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchPosts,
  fetchTags,
} from "../redux/slices/postsSlice";

export const Home = () => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);

  const isPostLoading = posts.status === "loading";
  const isTagLoading = tags.status === "loading";
  const isCommentLoading = comments.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [dispatch]);

  const fetchPopular = [...posts.items].sort(
    (a, b) => b.viewsCount - a.viewsCount
  );

  const fetchNewest = [...posts.items].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabValue}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading
            ? [...Array(5)]
            : tabValue === 0
            ? fetchNewest
            : fetchPopular
          ).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagLoading} />
          <CommentsBlock items={comments.items} isLoading={isCommentLoading} />
        </Grid>
      </Grid>
    </>
  );
};
