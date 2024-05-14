import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastProps {
  message: string;
  title?: string;
  status?: 'success' | 'error' | 'info';
  position?: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  title,
  status,
  position = 'info',
}) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      title,
      description: message,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }, [message, title, status, position, toast]);

  return null;
};

export default Toast;
