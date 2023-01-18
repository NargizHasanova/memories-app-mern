import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { useEffect } from 'react';
import { getPosts } from '../../redux/postsSlice';


export default function Home() {
    // const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query =  new URLSearchParams(useLocation().search)
    // console.log(useLocation())//{pathname: '/posts', search: '?page=2', hash: '', state: null, key: 'z1ornz3g'}
    const page = query.get('page') || 1;

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPosts(page));
    }, [dispatch, page]);
    

    const searchPost = () => {
        if (search.trim() || tags.length) {
            dispatch(getPostsBySearch({ search, tags: tags }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyDown = (e) => {
        // 13 is an enter key
        if (e.keyCode === 13) {
            e.preventDefault();
            searchPost()
        }
    };

    const handleAddChip = (tag) => {
        return setTags([...tags, tag])//["js","mern"]
    }

    const handleDeleteChip = (tag) => {
        return setTags(tags.filter(t => t !== tag))
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    container
                    className={classes.gridContainer}
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                onKeyDown={handleKeyDown}
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)} 
                                />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}// chip = tag
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                variant="contained"
                                color="primary">Search
                            </Button>
                        </AppBar>
                        <Form />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
