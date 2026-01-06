import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPasswordPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory-dark px-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <h1 className="font-serif text-3xl">Aurora <span className="text-primary font-light">Grand</span></h1>
        </Link>
      </div>
      <div className="bg-card rounded-xl p-8 luxury-shadow">
        <h2 className="font-serif text-2xl font-medium text-foreground mb-2">Reset Password</h2>
        <p className="text-muted-foreground mb-6 text-sm">Enter your email and we'll send you a reset link.</p>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <Button variant="luxury" size="lg" className="w-full">Send Reset Link</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/login" className="text-primary hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  </div>
);

export default ForgotPasswordPage;
