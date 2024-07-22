import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

import axios from "../../customAxios";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";

export const Index = () => {
  const [text, setText] = React.useState("");
  const { id } = useParams();
  const onSubmit = async () => {
    try {
      const fields = { text };

      await axios.post(`/posts/comments/${id}`, fields);
    } catch (error) {
      console.log(error, "Error while posting a comment");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Leave comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
