import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Post } from "../../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./TagPage.module.scss";

const TagPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const { name } = useParams();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const isPostLoading = posts.status === "loading";

  const filteredPosts = posts.items.filter((post) => post.tags.includes(name));

  return (
    <>
      <h2 className={clsx(styles.title, { [styles.titleFull]: true })}>
        #{name} 's posts
      </h2>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : filteredPosts).map((obj, index) =>
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
      </Grid>
    </>
  );
};

export default TagPage;
