import { Form, Link } from '@remix-run/react';
import { login } from '~/firebase.service';
import { createAuthSession } from '~/cookies';
import type { ActionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  const { user } = await login(email.toString(), password.toString());
  const token = await user.getIdToken();
  return createAuthSession(token, '/');
};

export default function Login() {
  return (
    <div className='login'>
      <h1>Login Page</h1>

      <Form method='post'>
        <p>
          <label>
            Email
            <input type='email' name='email' />
          </label>
        </p>
        <p>
          <label>
            Password
            <input type='password' name='password' />
          </label>
        </p>

        <button type='submit'>Login</button>
      </Form>

      <Link to='/signup'>Create Account</Link>
    </div>
  );
}
