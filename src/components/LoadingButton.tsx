import {
  Button,
  Spinner,
  useToast,
  ButtonProps,
  extendTheme,
} from '@chakra-ui/react';
import { FC } from 'react';

// 1. Chakra UI Theme Extension (with Types)
const theme = extendTheme({
  components: {
    Alert: {
      variants: {
        customLoading: {
          container: {
            bg: '#2CA1FF',
          },
        },
      },
    },
  },
});

// 2. Loading Button Component (with Types)
interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...rest
}) => {
  const toast = useToast();

  return (
    <Button
      disabled={isLoading}
      aria-disabled={isLoading}
      aria-busy={isLoading}
      {...rest}
      onClick={() => {
        const examplePromise = new Promise<number>((resolve, reject) => {
          // Specify Promise type
          setTimeout(() => resolve(200), 5000);
        }).catch(error => {
          console.error('Promise Error:', error);
        });

        toast.promise(examplePromise, {
          success: {
            title: 'Tudo certo! 😎',
            description: '',
            position: 'top-right',
            isClosable: true,
          },
          error: {
            title: 'Algo deu errado 😭',
            description: 'Por favor, tente novamente.',
            position: 'top-right',
            isClosable: true,
          },
          loading: {
            title: 'Conectando ao servidor',
            description: 'Por favor aguarde ⌛',
            position: 'top-right',
            variant: theme.customLoading,
          },
        });
      }}
    >
      {isLoading ? (
        <Spinner
          mr={2}
          size='md'
          style={{ display: 'block', margin: '0 auto' }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
