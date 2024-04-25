import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import CategoryTag from "../components/CategoryTag"

type ArticleProps = {
  thumbnailUrl: string,
  createdAt: number,
  categories: string[],
  title: string,
  content: string
}

function Article() {
  const { postId } = useParams();
  const [post, setPost] = useState<ArticleProps>()

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${postId}`)
      const data = await res.json()
      setPost(data.post)
    }
    fetcher()
  }, [postId])

  if (!post) {
    return <div>読み込み中...</div>
  }

  return(
    <div className="mx-auto mb-10 w-6/12 p-5 mt-4">
      <img src={post.thumbnailUrl} alt="" className="mb-2" />
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        <CategoryTag categories={post.categories} />
      </div>
      <h2 className="text-2xl font-bold mb-5">{post.title}</h2>
      <p className="line-clamp-2"
          dangerouslySetInnerHTML={{__html: post.content}}></p>
    </div>
  )
}

export default Article