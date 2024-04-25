import React, { useState } from "react";
import { useForm } from "react-hook-form"

function Contact() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const api_url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts'

    fetch(api_url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data)
      body: JSON.stringify(name,email,message)
    })
      .then((response) => response.json())
      .then((result) => alert("送信しました"))
      .then( reset())
      .catch((error) => alert("正常に送信できませんでした"))
  }

  const inputClear = () => {
    reset();
  }
  
  return(
    <div className="mx-auto mb-10 w-8/12 py-10">
      <h1 className="text-xl text-black-500 font-bold mb-10">問合わせフォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex items-center mb-6">
          <div className="md:w-1/4">
            <label className="block mb-1 md:mb-0 pr-4 text-black" htmlFor="name">お名前</label>
          </div>
          <div className="md:w-3/4">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
              id="name"
              // value={name}
              onChange={(e) => setName(e.target.value)}
              {...register("name", {
                required: "お名前は必須です。",
                maxLength: {
                  value: 30,
                  message: "30文字以内で入力してください。"
                }
              })}
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
          </div>
        </div>
        <div className="md:flex items-center mb-6">
          <div className="md:w-1/4">
            <label className="block mb-1 md:mb-0 pr-4 text-black" htmlFor="email">メールアドレス</label>
          </div>
          <div className="md:w-3/4">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
              id="email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...register("email", {
                required: "メールアドレスは必須です。",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/,
                  message: "emailの形式で入力してください。"
                }
              })}
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </div>
        </div>
        <div className="md:flex items-center mb-6">
          <div className="md:w-1/4">
            <label className="block mb-1 md:mb-0 pr-4 text-black" htmlFor="message">本文</label>
          </div>
          <div className="md:w-3/4">
            <textarea
              name="body"
              id="message"
              cols="30"
              rows="8"
              className="w-full p-4 border border-gray-300 rounded-lg"
              // value={message}
              onChange={(e) => setMessage(e.target.value)}
              {...register("body", {
              required: "本文は必須です。",
                maxLength: {
                  value: 500,
                  message: "本文は500文字以内で入力してください。"
                }
              })}
            ></textarea>
            {errors.body && <span className="text-red-600 text-sm">{errors.body.message}</span>}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded mx-2 rounded-lg">送信</button>
          <button className="font-bold bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mx-2 rounded-lg" onClick={inputClear} type="button">クリア</button>
        </div>
      </form>
    </div>
  )
}

export default Contact