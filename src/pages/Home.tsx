import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import CategoryTag from "../components/CategoryTag"

type HomeProps = {
  id: number,
  createdAt: number,
  categories: string[],
  title: string,
  content: string
}

function Home () {
  const [posts, setPosts] = useState<HomeProps[]>([])

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json()
      setPosts(data.posts)
    }
    fetcher()
  }, [])

  return(
    <>
      <ul className="py-10">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div className="mx-auto border mb-10 w-6/12 p-5">
                <div className="flex justify-between mb-2">
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                  <CategoryTag categories={post.categories} />
                </div>
                <h2 className="text-xl mb-5">{post.title}</h2>
                <p className="line-clamp-2"
                   dangerouslySetInnerHTML={{__html: post.content}}></p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home