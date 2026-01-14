import { useState } from "react";
import { useForm } from "react-hook-form"; // Recommended for forms, run: npm install react-hook-form
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../store/auth-context";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Simple state for MVP (later use React Hook Form)
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/users/login", formData);
      login(response.data.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-100'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center text-blue-900'>
            EthioBroker
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <Alert
                variant='destructive'
                className='bg-red-50 text-red-600 border-red-200 p-3 rounded-md text-sm'
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email or Username</Label>
              <Input
                id='email'
                name='email'
                type='text'
                placeholder='broker@example.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type='submit'
              className='w-full bg-blue-900 hover:bg-blue-800 text-blue-100'
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='text-center text-sm text-slate-500 justify-center'>
          &copy; 2025 EthioBroker Systems
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
