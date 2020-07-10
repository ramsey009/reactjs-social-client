import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginBottom: "10px",
  },
  media: {
    height: 140,
  },
});

const TimelinePostCard = ({ post, auth }) => {
  const classes = useStyles();

  const printyyt = () => {
    console.log("hua hai bhai");
  };
  const timeline_post_image = "http://localhost:3000" + post.picture
  return (
    <Card className={classes.root}>
      <Link to={`/post/${post.id}`} style={{ textDecoration: "None" }}>
        <CardActionArea onClick={printyyt}>
          <CardMedia
            className={classes.media}
            image={timeline_post_image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ textDecoration: "None" }}
            >
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Typography variant="subtitle2">{post.likes_count} likes</Typography>
        <Typography></Typography>
        <Typography></Typography>

        <Typography variant="subtitle2">
          {post.comments_count} comments
        </Typography>
        <Typography></Typography>
        <Typography></Typography>

        <Typography variant="subtitle2">
          {post.bookmarks_count} bookmarks
        </Typography>
        {post.username == auth.couser.username ? (<div style={{ textAlign: "right" }}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>) : (<div></div>)}

      </CardActions>
    </Card>
  );
};

export default TimelinePostCard;
