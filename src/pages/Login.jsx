import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { login } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { setLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handelFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const { data, token } = await login(formData);
      setLogin({ data, token });
      navigate('/');
    } catch (err) {
      console.log(err?.response?.data || err);
      if (err?.message === 'Network Error') {
        toast('Server Unreachable', {
          description:
            'Unable to reach backend. Check VITE_API_BASE_URL and backend CORS origin settings.',
        });
      } else {
        toast('Invalid Credentials', {
          description: `Username or Password may be invalid`,
        });
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-4 py-8 sm:px-6">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-md place-items-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">Login</CardTitle>
                <CardDescription className="text-center">
                  This is Sphurti Admin Dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="username">Username</label>
                      <Input
                        id="username"
                        placeholder="Enter username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handelFormData}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="password">Password</label>
                      <Input
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        type="text"
                        value={formData.password}
                        onChange={handelFormData}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button type="submit" disabled={disabled} className="w-full">
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}

export default Login;
