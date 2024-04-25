import React, { useState } from "react";



function Contact() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [messageErrorMessage, setMessageErrorMessage] = useState("")

  const onSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNameErrorMessage("")
    setEmailErrorMessage("")
    setMessageErrorMessage("")

    const formData = {
      name,
      email,
      message
    }

    const emptyName = name === ""
    const insufficientNameLength = message.length > 30
    const emptyEmail = email === ""
    const emptyMessage = message === ""
    const insufficientMessageLength = message.length > 500
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/
    if(emptyName) setNameErrorMessage("お名前は必須です。")
    if(insufficientNameLength) setNameErrorMessage("30文字以内で入力してください。")
    if(emptyEmail) setEmailErrorMessage("メールアドレスは必須です。")
    if (!regex.test(email)) setEmailErrorMessage("emailの形式で入力してください。")
    if(emptyMessage) setMessageErrorMessage("本文は必須です。")
    if(insufficientMessageLength) setMessageErrorMessage("本文は500文字以内で入力してください。")

    const enableSubmit = !emptyName && !insufficientNameLength && !emptyEmail && regex.test(email) && !emptyMessage && !insufficientMessageLength


    if(enableSubmit) {
      const api_url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts'

      fetch(api_url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data)
        body: JSON.stringify(name, email, message)
      })
      .then((response) => response.json())
      .then((result) => alert("送信しました"))
      .catch((error) => alert("正常に送信できませんでした"))
      .then(() => {
        setName("")
        setEmail("")
        setMessage("")
        console.log(formData)
      })
    }
  }

  const onChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangeMessage = (e:React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const inputClear = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    setName("")
    setEmail("")
    setMessage("")
    setNameErrorMessage("")
    setEmailErrorMessage("")
    setMessageErrorMessage("")
  }

  return(
    <div className="mx-auto mb-10 w-8/12 py-10">
      <h1 className="text-xl text-black-500 font-bold mb-10">問合わせフォーム</h1>
      <form onSubmit={onSubmit}>
        <div className="md:flex items-center mb-6">
          <div className="md:w-1/4">
            <label className="block mb-1 md:mb-0 pr-4 text-black" htmlFor="name">お名前</label>
          </div>
          <div className="md:w-3/4">
            <input
              type="text"
              name="name"
              className="w-full p-4 border border-gray-300 rounded-lg"
              id="name"
              value={name}
              onChange={onChangeName}
            />
            {nameErrorMessage && <span className="text-red-600 text-sm">{nameErrorMessage}</span>}
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
              value={email}
              onChange={onChangeEmail}
            />
            {emailErrorMessage && <span className="text-red-600 text-sm">{emailErrorMessage}</span>}
          </div>
        </div>
        <div className="md:flex items-center mb-6">
          <div className="md:w-1/4">
            <label className="block mb-1 md:mb-0 pr-4 text-black" htmlFor="message">本文</label>
          </div>
          <div className="md:w-3/4">
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="8"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={message}
              onChange={onChangeMessage}
            ></textarea>
            {messageErrorMessage && <span className="text-red-600 text-sm">{messageErrorMessage}</span>}
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