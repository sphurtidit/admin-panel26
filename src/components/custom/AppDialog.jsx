import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createAdmin } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { useState } from 'react';
import { toast } from 'sonner';

export function AppDialog() {
  const [formTextData, setFormTestData] = useState({
    username: '',
    password: '',
  });
  const [role, setRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { userAuthToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handelRole = (value) => {
    setRole(value);
  };

  const handelTextData = (event) => {
    const { id, value } = event.target;
    setFormTestData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    if (!formTextData.username || !formTextData.password || !role) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await createAdmin({
        username: formTextData.username,
        password: formTextData.password,
        role: role,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });

      console.log('User Created Successfuly');

      setIsOpen(false);
      toast('New user has been created', {
        description: `User created with username ${formTextData.username}`,
      });

      setFormTestData({
        username: '',
        password: '',
      });
      setRole('');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Provide the details</DialogTitle>
          <DialogDescription>
            Make new who can access the admin pannel
          </DialogDescription>
        </DialogHeader>
        <form type="submit" onSubmit={handelSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={formTextData.username}
                className="col-span-3"
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                value={formTextData.password}
                className="col-span-3"
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Select Role
              </Label>
              <Select onValueChange={handelRole} value={role}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select the Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="master_admin">Master Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="sports_head">Sports Head</SelectItem>
                    <SelectItem value="pr_head">PR Head</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AppDialog;
