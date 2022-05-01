import "../css/post.css";

export default function PostCardComp({ like, image, desc, owner, _id, callback, onDelete }) {
    return (
        <div className="post-container">
            <div className="post-inner">
                <div className="post-owner">
                    <div>{owner}</div>
                    <div>
                        <button onClick={() => callback({ desc, image, _id })}>Edit</button>
                        <button onClick={() => onDelete(_id)}>Delete</button>
                    </div>
                </div>
                <div className="post-desc">{desc}</div>
                <img className="post-image" src={`http://134.209.103.131:3001/image/post/${image}`} />
                <div className="post-like">{like}</div>
            </div>
        </div>
    );
}
