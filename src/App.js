import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "@mui/material/Button";
import { increment, decrement, incrementByAmount } from "./reducers/counter";
import PostCardComp from "./components/postCard";

function App() {
    const counterState = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const [name, setName] = useState("name from state");
    const [allPost, setAllPost] = useState([]);

    async function getPosts() {
        try {
            const data = await axios.get("http://134.209.103.131:3001/post/getAllPost");
            console.log(data.data);
            setAllPost(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="App">
            {/* {counterState.value} */}
            {/* <Button onClick={() => dispatch(increment())} variant="contained">
                Increment Value
            </Button>
            <Button onClick={() => dispatch(decrement())} variant="contained">
                Decrement Value
            </Button>
            <Button onClick={() => dispatch(incrementByAmount(10))} variant="contained">
                Increment Value by amounts
            </Button> */}
            
            {allPost &&
                allPost.length > 0 &&
                allPost.map((value, index) => <PostCardComp owner={value.userId.email} desc={value.desc} image={value.image} like={value.like} />)}
        </div>
    );
}

export default App;
