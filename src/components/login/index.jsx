

export default function Login({ handleSelect }) {


    return (
        <div className='login-container'>
            <form action="">
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' placeholder="Email" />
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
            <p>Don't have an account? Sign up <a href="">here</a></p>
        </div>
    )
}