import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store';
import { useEffect } from 'react';

export const useCheckLogin = ({ from = '/' }: { from: string }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated', isAuthenticated);
      console.log('user', user  );
      // navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate, user]);
}