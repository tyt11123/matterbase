import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "inherit",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

function SinglePreviewImageList({ image_objects, onRemove }) {
  const classes = useStyles();
  const imageCount = image_objects ?
    Math.min(image_objects.length, 2.5) :
    1;
  const columnWidth = window.innerWidth / imageCount;
  const imageWidth = image_objects ?
    Math.min(...image_objects.map(x => x.width)) :
    180;
  const displayRatio = Math.ceil(imageWidth / columnWidth);
  const rowHeight = image_objects ?
    Math.min(...image_objects.map(x => x.height / displayRatio)) :
    180;

  return (
    <div className={classes.root}>
      <ImageList
        className={classes.imageList}
        cols={Math.min(image_objects.length, 2.5)}
        rowHeight={rowHeight}
      >
        {image_objects.map((item, i) => (
          <ImageListItem key={i}>
            <img src={item.url} alt={i} />
            <ImageListItemBar
            //   title={item.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton 
                  aria-label={`cancel ${i}`}
                  onClick={onRemove(i)}
                >
                  <CancelIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

SinglePreviewImageList.propTypes = {
  image_objects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    thumbnailUrl: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  })),
  onRemove: PropTypes.func.isRequired,
};

export default SinglePreviewImageList;
