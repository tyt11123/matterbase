import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import SearchPaper from "./SearchPaper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    "& div + *": {
      margin: theme.spacing(1, 0),
    },
    "& p + *": {
      margin: theme.spacing(1, 0),
    },
  },
  pagination: {
    display: "inline-flex",
  },
  textAlignStart: {
    textAlign: "start",
  },
  marginStart: {
    margin: theme.spacing(0, 1),
  },
  textAlignRight: {
    textAlign: "right",
  },
}));

const redux = {
  count: 28,
  material: [
  {
    id: 1,
    brand: "Urban Coast Tile",
    collection: "Stanlet Glam #5",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155625_77b68595d1feaf7f6d2dc910e8f5e571.JPG",
    link: "/stanlet-glam-#5-1",
    created_at: "2021-08-10T03:42:08.329Z",
    updated_at: "2021-08-10T03:42:08.329Z",
  },
  {
    id: 2,
    brand: "GENROSE Stone + Tile",
    collection: "Promenade",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155648_c40b186c1f4afebc850c17de94b41456.JPG",
    link: "/promenade-2",
    created_at: "2021-08-10T03:42:07.329Z",
    updated_at: "2021-08-10T03:42:07.329Z",
  },
  {
    id: 3,
    brand: "Mosa",
    collection: "4x12",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155704_1ec88b53d40ccd5e84e87691f207da67.JPG",
    link: "/4x12-3",
    created_at: "2021-08-10T03:42:06.329Z",
    updated_at: "2021-08-10T03:42:06.329Z",
  },
  {
    id: 4,
    brand: "Trendy Surfaces",
    collection: "Chalet",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155721_35bbc116c76146e5ef8570fa198d39e5.JPG",
    link: "/chalet-4",
    created_at: "2021-08-10T03:42:05.329Z",
    updated_at: "2021-08-10T03:42:05.329Z",
  },
  {
    id: 5,
    brand: "Aphelion Collection",
    collection: "Nova",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155735_741212f574d8f750c4e408e850f83e05.JPG",
    link: "/nova-5",
    created_at: "2021-08-10T03:42:04.329Z",
    updated_at: "2021-08-10T03:42:04.329Z",
  },
  {
    id: 6,
    brand: "Atlas Concorde",
    collection: "Dolmen Pro",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155801_71a6846abd78bb8bc2183dd33454dcfe.JPG",
    link: "/dolmen-pro-6",
    created_at: "2021-08-10T03:42:03.329Z",
    updated_at: "2021-08-10T03:42:03.329Z",
  },
  {
    id: 7,
    brand: "Riad Tile",
    collection: "Zellige",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155816_e1b955a358516c074c12b6dd0e93e590.JPG",
    link: "/zellige-7",
    created_at: "2021-08-10T03:42:02.329Z",
    updated_at: "2021-08-10T03:42:02.329Z",
  },
  {
    id: 8,
    brand: "Urban Coast Tile",
    collection: "Stanlet Glam #5",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155625_77b68595d1feaf7f6d2dc910e8f5e571.JPG",
    link: "/stanlet-glam-#5-8",
    created_at: "2021-08-01T03:41:08.329Z",
    updated_at: "2021-08-01T03:41:08.329Z",
  },
  {
    id: 9,
    brand: "GENROSE Stone + Tile",
    collection: "Promenade",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155648_c40b186c1f4afebc850c17de94b41456.JPG",
    link: "/promenade-9",
    created_at: "2021-08-01T03:41:07.329Z",
    updated_at: "2021-08-01T03:41:07.329Z",
  },
  {
    id: 10,
    brand: "Mosa",
    collection: "4x12",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155704_1ec88b53d40ccd5e84e87691f207da67.JPG",
    link: "/4x12-10",
    created_at: "2021-08-01T03:41:06.329Z",
    updated_at: "2021-08-01T03:41:06.329Z",
  },
  {
    id: 11,
    brand: "Trendy Surfaces",
    collection: "Chalet",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155721_35bbc116c76146e5ef8570fa198d39e5.JPG",
    link: "/chalet-11",
    created_at: "2021-08-01T03:41:05.329Z",
    updated_at: "2021-08-01T03:41:05.329Z",
  },
  {
    id: 12,
    brand: "Aphelion Collection",
    collection: "Nova",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155735_741212f574d8f750c4e408e850f83e05.JPG",
    link: "/nova-12",
    created_at: "2021-08-01T03:41:04.329Z",
    updated_at: "2021-08-01T03:41:04.329Z",
  },
  {
    id: 13,
    brand: "Atlas Concorde",
    collection: "Dolmen Pro",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155801_71a6846abd78bb8bc2183dd33454dcfe.JPG",
    link: "/dolmen-pro-13",
    created_at: "2021-08-01T03:41:03.329Z",
    updated_at: "2021-08-01T03:41:03.329Z",
  },
  {
    id: 14,
    brand: "Riad Tile",
    collection: "Zellige",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155816_e1b955a358516c074c12b6dd0e93e590.JPG",
    link: "/zellige-14",
    created_at: "2021-08-01T03:41:02.329Z",
    updated_at: "2021-08-01T03:41:02.329Z",
  },
  {
    id: 15,
    brand: "Urban Coast Tile",
    collection: "Stanlet Glam #5",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155625_77b68595d1feaf7f6d2dc910e8f5e571.JPG",
    link: "/stanlet-glam-#5-15",
    created_at: "2021-08-01T03:40:08.329Z",
    updated_at: "2021-08-01T03:40:08.329Z",
  },
  {
    id: 16,
    brand: "GENROSE Stone + Tile",
    collection: "Promenade",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155648_c40b186c1f4afebc850c17de94b41456.JPG",
    link: "/promenade-16",
    created_at: "2021-08-01T03:40:07.329Z",
    updated_at: "2021-08-01T03:40:07.329Z",
  },
  {
    id: 17,
    brand: "Mosa",
    collection: "4x12",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155704_1ec88b53d40ccd5e84e87691f207da67.JPG",
    link: "/4x12-17",
    created_at: "2021-08-01T03:40:06.329Z",
    updated_at: "2021-08-01T03:40:06.329Z",
  },
  {
    id: 18,
    brand: "Trendy Surfaces",
    collection: "Chalet",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155721_35bbc116c76146e5ef8570fa198d39e5.JPG",
    link: "/chalet-18",
    created_at: "2021-08-01T03:40:05.329Z",
    updated_at: "2021-08-01T03:40:05.329Z",
  },
  {
    id: 19,
    brand: "Aphelion Collection",
    collection: "Nova",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155735_741212f574d8f750c4e408e850f83e05.JPG",
    link: "/nova-19",
    created_at: "2021-08-01T03:40:04.329Z",
    updated_at: "2021-08-01T03:40:04.329Z",
  },
  {
    id: 20,
    brand: "Atlas Concorde",
    collection: "Dolmen Pro",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155801_71a6846abd78bb8bc2183dd33454dcfe.JPG",
    link: "/dolmen-pro-20",
    created_at: "2021-08-01T03:40:03.329Z",
    updated_at: "2021-08-01T03:40:03.329Z",
  },
  {
    id: 21,
    brand: "Riad Tile",
    collection: "Zellige",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155816_e1b955a358516c074c12b6dd0e93e590.JPG",
    link: "/zellige-21",
    created_at: "2021-08-01T03:40:02.329Z",
    updated_at: "2021-08-01T03:40:02.329Z",
  },
  {
    id: 22,
    brand: "Urban Coast Tile",
    collection: "Stanlet Glam #5",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155625_77b68595d1feaf7f6d2dc910e8f5e571.JPG",
    link: "/stanlet-glam-#5-22",
    created_at: "2021-08-01T03:32:08.329Z",
    updated_at: "2021-08-01T03:32:08.329Z",
  },
  {
    id: 23,
    brand: "GENROSE Stone + Tile",
    collection: "Promenade",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155648_c40b186c1f4afebc850c17de94b41456.JPG",
    link: "/promenade-23",
    created_at: "2021-08-01T03:32:07.329Z",
    updated_at: "2021-08-01T03:32:07.329Z",
  },
  {
    id: 24,
    brand: "Mosa",
    collection: "4x12",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155704_1ec88b53d40ccd5e84e87691f207da67.JPG",
    link: "/4x12-24",
    created_at: "2021-08-01T03:32:06.329Z",
    updated_at: "2021-08-01T03:32:06.329Z",
  },
  {
    id: 25,
    brand: "Trendy Surfaces",
    collection: "Chalet",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155721_35bbc116c76146e5ef8570fa198d39e5.JPG",
    link: "/chalet-25",
    created_at: "2021-08-01T03:32:05.329Z",
    updated_at: "2021-08-01T03:32:05.329Z",
  },
  {
    id: 26,
    brand: "Aphelion Collection",
    collection: "Nova",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155735_741212f574d8f750c4e408e850f83e05.JPG",
    link: "/nova-26",
    created_at: "2021-08-01T03:32:04.329Z",
    updated_at: "2021-08-01T03:32:04.329Z",
  },
  {
    id: 27,
    brand: "Atlas Concorde",
    collection: "Dolmen Pro",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155801_71a6846abd78bb8bc2183dd33454dcfe.JPG",
    link: "/dolmen-pro-27",
    created_at: "2021-08-01T03:32:03.329Z",
    updated_at: "2021-08-01T03:32:03.329Z",
  },
  {
    id: 28,
    brand: "Riad Tile",
    collection: "Zellige",
    src: "https://img.eservice-hk.net/upload/2021/07/27/155816_e1b955a358516c074c12b6dd0e93e590.JPG",
    link: "/zellige-28",
    created_at: "2021-08-01T03:32:02.329Z",
    updated_at: "2021-08-01T03:32:02.329Z",
  },
  ],
};

export default function SearchGrid() {
  const classes = useStyles();
  const { count, material } = redux;
  const resultPerPage = 24;
  const numOfPage = Math.ceil(count / resultPerPage);
  const [page, setPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState((page - 1) * resultPerPage);
  const [lastIndex, setLastIndex] = useState(Math.min(page * resultPerPage - 1, count - 1));
  const [list, setList] = useState([...material]);
  const sortOption = [
    {
      id: 0,
      title: "Sort By Date (New)",
    },
    {
      id: 1,
      title: "Sort By Date (Old)",
    },
    {
      id: 2,
      title: "Sort By Name (A-Z)",
    },
    {
      id: 3,
      title: "Sort By Name (Z-A)",
    },
  ];
  const sortByDateAsc = (a, b) => {
    var nameA = a.created_at.toUpperCase(); // ignore upper and lowercase
    var nameB = b.created_at.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // dates must be equal
    return 0;
  };
  const sortByDateDesc = (a, b) => {
    var nameA = a.created_at.toUpperCase(); // ignore upper and lowercase
    var nameB = b.created_at.toUpperCase(); // ignore upper and lowercase
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    // dates must be equal
    return 0;
  };
  const sortByNameAsc = (a, b) => {
    var nameA = a.collection.toUpperCase(); // ignore upper and lowercase
    var nameB = b.collection.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  };
  const sortByNameDesc = (a, b) => {
    var nameA = a.collection.toUpperCase(); // ignore upper and lowercase
    var nameB = b.collection.toUpperCase(); // ignore upper and lowercase
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  };
  const [sort, setSort] = useState(sortOption[0]);
  const handleChange = (event, value) => {
    setPage(value);
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView();
    }
  };
  useEffect(() => {
    switch (sort.id) {
      case 0:
        Array.isArray(material) && material.sort(sortByDateDesc);
        break;
      case 1:
        Array.isArray(material) && material.sort(sortByDateAsc);
        break;
      case 2:
        Array.isArray(material) && material.sort(sortByNameAsc);
        break;
      case 3:
        Array.isArray(material) && material.sort(sortByNameDesc);
        break;
      default:
        break;
    };
    const firstInd = (page - 1) * resultPerPage;
    const lastInd = Math.min(page * resultPerPage - 1, count - 1);
    setFirstIndex(firstInd);
    setLastIndex(lastInd);
    setList(Array.isArray(material) ?
      material.filter((_, i) => i >= firstInd && i <= lastInd) :
      []);
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} className={classes.textAlignStart}>
              <Typography variant="h4" className={classes.marginStart}>
                Ceramics
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                className={classes.marginStart}
                options={sortOption}
                getOptionLabel={(option) => option.title}
                defaultValue={sortOption[0]}
                renderInput={(params) => <TextField {...params} />}
                onChange={(_, value) => { setSort(value) }}
                getOptionSelected={(option, value) => option.id === value.id}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="flex-end">
            {
              Array.isArray(list) &&
              list.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={3}>
                  <SearchPaper material={item} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography>
            Showing {firstIndex + 1} to {lastIndex + 1} of {count}
          </Typography>
          <Pagination
            className={classes.pagination}
            count={numOfPage} page={page} onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
