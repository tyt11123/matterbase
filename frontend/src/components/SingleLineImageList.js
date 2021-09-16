import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

const useStyles = makeStyles({
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
});

function SingleLineImageList({ image_objects }) {
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
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

SingleLineImageList.propTypes = {
  image_objects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    thumbnailUrl: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  })).isRequired,
};

export default SingleLineImageList;
