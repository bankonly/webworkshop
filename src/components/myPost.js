import { useState, useEffect } from "react";
import axios from "axios";
import PostCardComp from "./postCard";
import "../css/mypost.css";

export default function MyPostComponent() {
    const [myPost, setMyPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [desc, setDesc] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [image, setImage] = useState(null);

    async function initState() {
        setLoading(true);
        try {
            const token = localStorage.getItem("token")
            const data = await axios.get("http://134.209.103.131:3001/post/myPost", {
                headers: {
                    Authorization: token,
                },
            });
            console.log(data.data)
            if (data.status === 200) {
                console.log(data.data);
                setMyPost(data.data);
            }
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false);
    }

    useEffect(() => {
        initState();
    }, []);

    async function submitPost() {
        try {
            const formData = new FormData();
            formData.append("desc", desc);
            formData.append("image", image);

            const token = localStorage.getItem("token");
            const data = await axios.post("http://134.209.103.131:3001/post/createPost", formData, {
                headers: {
                    Authorization: token,
                },
            });
            if (data.status === 200) {
                console.log("Upload success");
                console.log(data.data);
                myPost.push(data.data);
                setMyPost(myPost);
                setShowForm(false);
                return;
            }

            console.log(data.data);
        } catch (error) {
            console.log(error.response || error);
        }
    }

    async function postCallback({ desc, image, _id }) {
        setShowFormEdit(true);
        setUpdateId(_id);
        console.log({ desc, image, _id });
    }

    async function editPost() {
        try {
            const formData = new FormData();
            formData.append("desc", desc);
            formData.append("image", image);

            const token = localStorage.getItem("token");
            const data = await axios.put("http://134.209.103.131:3001/post/editPost/" + updateId, formData, {
                headers: {
                    Authorization: token,
                },
            });
            if (data.status === 200) {
                console.log("Edit Success");
                setShowFormEdit(false);
                initState();
                return;
            }
        } catch (error) {
            console.log(error.response || error);
        }
    }

    async function onDelete(_id) {
        try {
            const token = localStorage.getItem("token");
            const data = await axios.delete("http://134.209.103.131:3001/post/deletePost/" + _id, {
                headers: {
                    Authorization: token,
                },
            });
            if (data.status === 200) {
                initState();
                return;
            }
        } catch (error) {
            console.log(error.response || error);
        }
    }

    return (
        <div>
            {loading === true
                ? "Loading My Post..."
                : myPost.length < 1
                ? "No Post Found"
                : myPost.map((value, index) => (
                      <PostCardComp
                          _id={value._id}
                          onDelete={onDelete}
                          callback={postCallback}
                          owner={value.userId.email}
                          image={value.image}
                          like={value.like}
                          desc={value.desc}
                      />
                  ))}

            <div className="add-post-btn" onClick={() => setShowForm(true)}>
                Add Post
            </div>

            <div className="post-cover" style={{ display: showForm === true ? "block" : "none" }}>
                <div className="post-form">
                    <input
                        className="post-form-desc"
                        type="text"
                        placeholder="Description of post"
                        onChange={(event) => setDesc(event.target.value)}
                    />
                    <input className="post-form-file" type="file" onChange={(event) => setImage(event.target.files[0])} />
                    <div className="post-form-save-btn" onClick={submitPost}>
                        Save
                    </div>
                    <div className="post-form-cancel-btn" onClick={() => setShowForm(false)}>
                        Cancel
                    </div>
                </div>
            </div>

            <div className="post-cover" style={{ display: showFormEdit === true ? "block" : "none" }}>
                <div className="post-form">
                    <input
                        className="post-form-desc"
                        type="text"
                        placeholder="Description of post"
                        onChange={(event) => setDesc(event.target.value)}
                    />
                    <input className="post-form-file" type="file" onChange={(event) => setImage(event.target.files[0])} />
                    <div className="post-form-save-btn" onClick={editPost}>
                        Save Edit
                    </div>
                    <div className="post-form-cancel-btn" onClick={() => setShowFormEdit(false)}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
}
