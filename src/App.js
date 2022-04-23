
import "./App.css"
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
	const [name,setName] = useState("name from state")
	const [allPost,setAllPost] = useState([])


	async function getPosts(){
		try {
			const data = await axios.get("http://127.0.0.1:3001/post/getAllPost")
			setAllPost(data.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		getPosts()
	},[]);

    return (
        <div className="App">
	
        </div>
    );
}

export default App;
	