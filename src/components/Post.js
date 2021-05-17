import React from 'react';

const Post = ({post}) => {
    const likeAction = (e) => {
        e.preventDefault();
    }

    const postData = (new Date(post.createdAt));
    

    return (
        <div className="post">
            <footer className="postHeader">
                <h4>{post.type}</h4>
                <h2>{postData.getMonth() + "-" + postData.getDate() + "-" + postData.getFullYear()}</h2>
            </footer>
          <p>{post.content}</p>
          <footer className="postBottom">
            <i class="far fa-heart"></i>
            <i class="far fa-comments"></i>
            <i class="far fa-share-square"></i>
          </footer>
          <footer className="postStat">
            <h5>{post.likes}</h5>
            <h5>{post.likes}</h5>
            <h5>{post.likes}</h5>
          </footer>
        </div>
    
    );
}

export default Post;