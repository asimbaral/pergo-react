import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Post from './Post'
const PostList = ({posts}) => {
    return (
        <div className="mews">
          {posts.slice(0).map(post => (
            <Post post={post} key={post._id} onClick={console.log(":::::")}/>
          ))}
        </div>
    
    );
};

export default PostList;