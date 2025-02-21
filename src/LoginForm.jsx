import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://bndjecsgiowpherjagbx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZGplY3NnaW93cGhlcmphZ2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTI5MDYsImV4cCI6MjA1NTY4ODkwNn0.iDcIgOAjny8v2Sx8Hj_ChEhK0vMRLuJo3ItybQRC2qQ");

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Authentication error:', error.message);
    } else {
      console.log('Successfully signed in:', data);
      alert('Successfully signed in!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
