import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
//import AuthForm from "./AuthForm";
//import LoginForm from "./LoginForm";


const supabase = createClient("https://bndjecsgiowpherjagbx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZGplY3NnaW93cGhlcmphZ2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTI5MDYsImV4cCI6MjA1NTY4ODkwNn0.iDcIgOAjny8v2Sx8Hj_ChEhK0vMRLuJo3ItybQRC2qQ");

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </>
    )
  }
  else {
    return (<div>Logged in!</div>)
  }





}

export default App;
