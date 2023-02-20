import { Form, Link } from '@remix-run/react';
import { register } from '~/firebase.service';
import { createAuthSession } from '~/cookies';
import type { ActionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  try {
    const { user } = await register(email.toString(), password.toString());
    const token = await user.getIdToken();
    return createAuthSession(token, '/');
  } catch (error) {
    return error;
  }
};

export default function SignUp() {
  return (
    <div className='signup'>
      <h1>Sign Up Page</h1>

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

        <button type='submit'>Sign Up</button>
      </Form>

      <Link to='/login'>Go to Login</Link>
    </div>
  );
}
