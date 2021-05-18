import React, { useState }  from 'react';

const Post = ({post}) => {
    const [likeCount, setLikeCount] = useState(post.likes);
    const [likeUpdateCount, setLikeUpdateCount] = useState(1);
    const apiURL = "http://localhost:8080/api/posts/";
    const likeAction = () => {
      console.log("likeUpdateCount: ", likeUpdateCount, " post.likes: ", post.likes);
        const likeUpdate = {
          "likes": (post.likes + likeUpdateCount)
        };
        fetch((apiURL + post._id), {
          method: 'PUT',
          body: JSON.stringify(likeUpdate),
          headers: {
              'content-type': 'application/json'
          }
        }).then(e => {
          console.log(likeUpdateCount);
          setLikeCount(post.likes + likeUpdateCount);
          post.likes = post.likes + likeUpdateCount;
          const upc = (likeUpdateCount === 1) ? -1 : 1;
          setLikeUpdateCount(upc);
          console.log(likeUpdateCount);
        });
    }

    const postDate = (new Date(post.createdAt));

    return (
        <div className="post">
            <footer className="postHeader">
                <h4>{post.type}</h4>
                <h2>{postDate.getMonth() + "-" + postDate.getDate() + "-" + postDate.getFullYear()}</h2>
            </footer>
          <p>{post.content}</p>
          <footer className="postBottom">
            <i class="far fa-heart" onClick={likeAction}></i>
            <i class="far fa-comments"></i>
            <i class="far fa-share-square"></i>
          </footer>
          <footer className="postStat">
            <h5>{likeCount}</h5>
            <h5>0</h5>
            <h5>0</h5>
          </footer>
        </div>
    
    );
}

export default Post;