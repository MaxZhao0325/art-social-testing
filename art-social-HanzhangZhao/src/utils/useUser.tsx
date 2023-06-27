import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react';
import { Subscription } from '@/utils/type';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // const getSubscription = () =>
  //   supabase
  //     .from('subscriptions')
  //     .select('*, prices(*, products(*))')
  //     .in('status', ['trialing', 'active'])
  //     .single();

  useEffect(() => {
    if (user && !isLoadingData && !subscription) {
      // setIsloadingData(true);
      // Promise.allSettled([getSubscription()]).then(
      //   (results) => {
      //     const subscriptionPromise = results[0];
      //
      //     if (subscriptionPromise.status === 'fulfilled')
      //       setSubscription(subscriptionPromise.value.data);
      //
      //     setIsloadingData(false);
      //   }
      // );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
