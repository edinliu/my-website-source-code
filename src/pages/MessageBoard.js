import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Form from "../components/CommentForm"
import Comment from "../components/Comment"
import "./MessageBoard.sass"
import { Link } from "react-router-dom";
import Hamburger from '../components/Hamburger'
import apiUrl from '../lib/apiUrl'

function MessageBoard() {
  const [data, setData] = useState([])
  useEffect(() => {
    getRequest()
  }, [])
  function fetchData(request, jsonHandler, textHandler) {
    fetch(request)
      .then(response => response.text())
      .then(text => {
        try {
          const json = JSON.parse(text);
          // Do your JSON handling here
          if (typeof jsonHandler === 'function') jsonHandler(json)
        } catch (err) {
          // It is text, do you text handling here
          if (typeof textHandler === 'function') textHandler(text)
        }
      });
  }
  function getRequest() {
    const request = new Request(apiUrl)
    fetchData(request, setData)
  }
  function postRequest(data, setMessage) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const request = new Request(apiUrl, requestOptions)
    const textHandler = (text) => {
      setMessage(text)
    }
    fetchData(request, addFrontEndData, textHandler)
  }
  function deleteRequest(id, deletePassword, setMessage) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    const request = new Request(apiUrl + `${id}/${deletePassword}`, requestOptions)
    fetchData(request, (json) => { putFrontEndData(json, id) }, setMessage)
  }
  const addFrontEndData = (newData) => {
    let arr = [...data]
    arr.push(newData)
    setData(arr)
  }
  const putFrontEndData = (newData, id) => {
    let arr = [...data]
    arr[id - 1] = newData
    setData(arr)
  }
  const Comments = () =>
    data !== [] && data.map(comment =>
      <Comment
        name={comment.name}
        email={comment.email}
        content={comment.content}
        key={comment.id}
        id={comment.id}
        isDelete={comment.isDelete}
        sendDeletRequest={deleteRequest}
      />
    )
  return (
    <div id="messageBoard">
      <Header><Link className="nav-link" to="/" key="home">home</Link></Header>
      <div className="container">
        <Comments />
        <Form postMethod={postRequest} />
        <a
          className="reply_btn"
          href="/message_board#CommentForm"
        >
          留言
        </a>
      </div>
      <Hamburger><Link className="btn btn-primary" to="/" key="home">home</Link></Hamburger>
    </div>
  )
}
export default MessageBoard