/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
    //state.posts = {isLoading: true, posts: Array(8), currentPage: 1, numberOfPages: 2}
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const classes = useStyles();

    
    // console.log(posts.numberOfPages);
    // console.log(posts.currentPage);

    return (
        <>
            {posts?.numberOfPages > 1 && ( // bu useeffectden evvel ise dusur deye undefined qaytarir ilk ve <></> bele qalir sonra uje ici dolur.Ama biz sadece sonu goruruk.Console-da bunu aciq aydin gormek olar 
                <Pagination
                    classes={{ ul: classes.ul }}
                    count={posts.numberOfPages}
                    page={posts.currentPage} // hemen page numberi krujoka alir sadece
                    variant="outlined"
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                    )}
                />
            )}
        </>
    );
};

export default Paginate;