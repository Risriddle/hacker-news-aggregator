

function Login() {
  async function handleSubmit(event) {
    
    event.preventDefault();

    const formElement = event.target;
    const formData = new FormData(formElement);

    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) {
      // Handle error response
      console.log(data)
      return;
    }
console.log(data,"logged in")
    // Handle success flow
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email-input">Email</label>
      <input
        
        id="email-input"
        name="email"
        required
        type="email"
      />
      <label htmlFor="password-input">Password</label>
      <input
        aria-describedby="password-hint"
        id="password-input"
        name="password"
        required
        type="password"
      />
      <div id="password-hint">
        Your password must be at least 8 characters long.
      </div>
      <button>Login</button>
    </form>
  );
}


export default Login
