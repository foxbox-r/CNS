import React from 'react';
import {Link} from "react-router-dom"

function Comment({comment}){
    const {color,backgroundColor} = comment.User;
    return (
        <div className="Comment">
            <Link to={`/userPosts/${comment.User.id}`}>
                <header style={{color,backgroundColor}}>
                    {comment.User.name[0].toUpperCase()}
                </header>
            </Link>
            <article>
                <p className="name"><Link to={`/userPosts/${comment.User.id}`}>{comment.User.name}</Link></p>
                <p className="description">{comment.description}</p>
            </article>
        </div>
    )
}

export default Comment;