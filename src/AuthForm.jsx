import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "http://121.146.229.198:8000", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzQxMTAwNDAwLAogICJleHAiOiAxODk4ODY2ODAwCn0.-ecQE0vNhNZE6kNt2nBZlcTkQhUtKgOWqFfGrBWH38g"
);

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Authentication error:', error.message);
    } else {
      console.log('Successfully signed up:', data);
      alert('Successfully signed up! Check your email to verify your account.');
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default AuthForm;
