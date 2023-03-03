import Head from 'next/head'
import { useState } from 'react';
const { Api, TelegramClient } = require("telegram");
const { StringSession, StoreSession } = require("telegram/sessions");

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [session, setSession] = useState(null);

  async function handleStart() {
    const apiId = 22710080;
    const apiHash = "7276ae9635cca9ee3d2aa4e4fd434c22";
    const client = new TelegramClient(session, apiId, apiHash, {});
    await client.start({
      phoneNumber: async () => await setPhoneNumber(prompt("number ?")),
      password: async () => await setPassword(prompt("password ?")),
      phoneCode: async () => await setPhoneCode(prompt("code ?")),
      onError: (err) => console.log(err),
    });
    const storeSession = new StoreSession({ name: "my_session" });
    storeSession.setSession(client.session.save());
    setSession(storeSession);
  }

  return (
    <>
      <Head>
        <title>Telegram Login App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Telegram Login</h1>
        <button onClick={handleStart}>Start</button>
        {session && <p>Session saved: {session.getSession()}</p>}
      </div>
    </>
  )
}
