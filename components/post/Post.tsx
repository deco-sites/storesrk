import { useState, useEffect } from "preact/hooks";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Post {
  author: Author;
  content: string;
}

export interface Props {
  posts?: Post[];
}

function Post({ posts }: Props) {
  const [dataPost, setDataPost] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts");
      
      if (response.ok) {
        const data = await response.json();
        setDataPost(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('erro', error);
    }
  };
  
    useEffect(() => {
      getPosts();
    }, [])
    
  return (
    <div class="max-w-[1200px] mx-auto">
      <h1>Posts ?</h1>
      <div class="bg-red-300 w-full h-full flex gap-4">
          {dataPost &&
            dataPost.map((post, index) => (
              <div key={index + 1} class="bg-green-300 w-[330px] h-[330px] mb-4 flex flex-col items-center">
                <h1>{post.content}</h1>
                <div>
                  <h1 class="text-red-300">{post.author.name}</h1>
                  <h1>{post.author.role}</h1>
                  <img src={post.author.avatarUrl} alt={post.author.name} />
                </div>
              </div>
            ))}
        </div>
    </div>
  );
}

export default Post;
