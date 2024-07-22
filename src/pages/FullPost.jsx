import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../customAxios";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { comments } = useSelector((state) => state.posts);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "Error");
      });
  }, []);

  const isCommentLoading = comments.status === "loading";

  const postsComments = comments.items.filter((item) => item.postId === id);

  if (loading) {
    return <Post isLoading={loading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock isLoading={isCommentLoading} items={postsComments}>
        <Index />
      </CommentsBlock>
    </>
  );
};
