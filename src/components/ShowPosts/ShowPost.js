import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Modal, Button } from "react-bootstrap";
import "./ShowPost.css";
const ShowPost = () => {
  const [show, setShow] = useState(false);

  const [postShow, setPostShow] = useState(false);

  const [showData, setShowData] = useState(false);
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [commentID, setCommentID] = useState("");
  const [postID, setPostID] = useState("");

  const handlePostClose = () => setPostShow(false);
  const handlePostShow = () => setPostShow(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let showCommentIDData = commentData.find((e) => e.id === commentID);
  const fetchData = async () => {
    setShowData(true);
    try {
      const response = await axios.get(
        "http://jsonplaceholder.typicode.com/posts"
      );
      setPostData(response?.data);

      setShowData(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
   // fetchCommentData();
   // fetchPostDetails();
  }, []);

  const fetchCommentData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );

      setCommentData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostDetails = async () => {
    console.log("CLICKED")
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postID}`
      );
      console.log("===>", response)
      setPostDetails(response?.data);
      // console.log("===>", postDetails)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      <div  className="grid-container"> 

      <h4> POSTS</h4>
  
        {postData.map((item) => {
          return (
            <div  >
            <div >
              <Card  style={{ width: "18rem" }} >
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>

                  <Card.Text>{item.body}</Card.Text>
                  <Card.Link
                    onClick={(e) => {
                      handleShow();
                      setCommentID(item?.id)
                      fetchCommentData()
                    }}
                  >
                    Show Comment
                  </Card.Link>
                  <Card.Link
                    onClick={(e) => {
                      handlePostShow();
                      setPostID(item?.id !== "" && item?.id);
                      console.log(postID)
                      fetchPostDetails()
                    }}
                  >
                    Post Details
                  </Card.Link>
                </Card.Body>
              </Card>
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showCommentIDData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showCommentIDData?.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Closeee
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={postShow} onHide={handlePostClose}>
        <Modal.Header closeButton>
          <Modal.Title>{postDetails?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{postDetails?.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePostClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowPost;
