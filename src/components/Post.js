import React, { useState }  from 'react';
import Modal from "react-modal";
import {Route, BrowserRouter as Router, useParams, useHistory, Redirect} from 'react-router-dom';

import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
Modal.setAppElement("#root");
const Post = ({post}) => {
    const [likeCount, setLikeCount] = useState(post.likes);
    const [likeUpdateCount, setLikeUpdateCount] = useState(1);
    const [commentCount, setCommentCount] = useState(post.comments.length);
    const [shareCount, setShareCount] = useState(post.shares);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

    const initialList = [];
    post.comments.forEach((comment) => {
      initialList.push(<li>{comment}</li>);
    });

    const [commentList, setCommentList] = useState(initialList);
    const [currentComment, setCurrentComment] = useState("");

    const apiURL = "http://localhost:8080/api/posts/";
    const likeAction = () => {
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
          setLikeCount(post.likes + likeUpdateCount);
          post.likes = post.likes + likeUpdateCount;
          const upc = (likeUpdateCount === 1) ? -1 : 1;
          setLikeUpdateCount(upc);
        });
    }

    function toggleModal() {
      setModalIsOpen(!modalIsOpen);
    }

    function toggleShareModal() {
      setShareModalIsOpen(!shareModalIsOpen);
    }

    const postDate = (new Date(post.createdAt));

    function sendComment(e) {
      e.preventDefault();
      console.log("here");
      const commentUpdate = {
        "recentComment": currentComment
      };
      fetch((apiURL + post._id), {
        method: 'PUT',
        body: JSON.stringify(commentUpdate),
        headers: {
            'content-type': 'application/json'
        }
      }).then(e => {
        console.log(e);
        commentList.push(<li>{currentComment}</li>);
        setCommentCount(commentList.length);
        setCommentList(commentList);
        setCurrentComment("");
      });
    }
    var postIDD = post._id;
    const history = useHistory();
    const goToPost = () => {
      const path = "/postid/" + postIDD;
      console.log(path);
      history.push(path);      
    }
    var thisPost = post;
    function PostPage() {
      let { id } = useParams();
      
      return (
        <div className="mews">
          <Post post={post}/>
        </div>
        
        
        );
    }

    return (
        <div className="post" onClick={goToPost} href="/postid/60a4175ec626325b14ee6777">
          <footer className="postHeader">
              <h4>{post.type}</h4>
              <h2>{postDate.getMonth() + "-" + postDate.getDate() + "-" + postDate.getFullYear()}</h2>
          </footer>
          <p>{post.content}</p>
          <footer className="postBottom">
            <i class="far fa-heart" onClick={likeAction}></i>
            <i class="far fa-comments" onClick={toggleModal}></i>
            <i class="far fa-share-square" onClick={toggleShareModal}></i>
          </footer>
          <footer className="postStat">
            <h5>{likeCount}</h5>
            <h5>{commentCount}</h5>
            <h5>{shareCount}</h5>
          </footer>
          <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel={post.name + "'s post"}>
            <h6>{post.name + "'s post"}</h6>
            <p>{post.content}</p>
            <form>
              <textarea value={currentComment} onChange={event => setCurrentComment(event.target.value)}>Enter comment here</textarea>
              <button onClick={sendComment}>Submit</button>
            </form>
            <button onClick={toggleModal}>Close</button>
            <div>
              {commentList}
            </div>
          </Modal>

          <Modal isOpen={shareModalIsOpen} onRequestClose={toggleShareModal} contentLabel={post.name + "'s post"}>
            <div class="shares">
              <FacebookShareButton
                url="https://www.google.com"
                quote={post.content}
              >
                <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
              </FacebookShareButton>

              <TwitterShareButton
                url="https://www.google.com"
                via={post.content}
              >
                <TwitterIcon logoFillColor="white" round={true}></TwitterIcon>
              </TwitterShareButton>

              <LinkedinShareButton
                url="https://www.google.com"
                title="Test Post"
                summary ={post.content}
              >
                <LinkedinIcon logoFillColor="white" round={true}></LinkedinIcon>
              </LinkedinShareButton>

            </div>
            <button onClick={toggleShareModal}>Close</button>
          </Modal>

          <Router>
            <Route path="/postid/:id" exact>
              <PostPage />
            </Route>
          </Router>

        </div>
    
    );
}

export default Post;