import React,{useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import {Container, PostCard} from "../components"
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) =>{
        if(posts){
            setPosts(posts.rows)
        }
    })        
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            {posts.map((post) => (
                <div key={post.$id}>
                    <PostCard {...post}/>
                </div>
            ))}
        </Container>
    </div>
  )
}

export default AllPosts