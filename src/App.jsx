import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
//import AuthForm from "./AuthForm";
//import LoginForm from "./LoginForm";


const supabase = createClient(
  "http://121.146.229.198:8000", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzQxMTAwNDAwLAogICJleHAiOiAxODk4ODY2ODAwCn0.-ecQE0vNhNZE6kNt2nBZlcTkQhUtKgOWqFfGrBWH38g"
);

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
