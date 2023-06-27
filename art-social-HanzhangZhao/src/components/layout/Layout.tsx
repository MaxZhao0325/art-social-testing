import { Container, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

interface DocsLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: DocsLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', onClose);

    return () => {
      router.events.off('routeChangeComplete', onClose);
    };
  });

  return (
    <>
      <Header>
        <Container maxW='7xl' flex='1 0 auto' py={2}>
          {/*<Stack*/}
          {/*    direction={{base: 'column', lg: 'row'}}*/}
          {/*    spacing={{base: 0, lg: 8}}>*/}
          {/*    /!*<Navigation display={{ base: 'none', lg: 'block' }} />*!/*/}
          {/*    <Flex*/}
          {/*        direction={'column'}*/}
          {/*        w={'full'}*/}
          {/*        maxW={{lg: 'calc(100% - 16rem)'}}>*/}
          {/*        {children}*/}
          {/*    </Flex>*/}
          {/*</Stack>*/}
          {children}
        </Container>
      </Header>
      <Footer />
    </>
  );
};

export default Layout;
