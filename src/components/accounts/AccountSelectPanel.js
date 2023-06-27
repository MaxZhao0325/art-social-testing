import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
// import FB from "@rivercode/facebook-conversion-api-nextjs";
import React, { useEffect } from "react";

import { useUserAccount } from "../../contexts/userContext";

export default function AccountSelectPanel() {
  const { accounts } = useUserAccount();

  // it's used to make a temp post, just for testing. this function will be transferred to newpostpanel later
  const createPosts = async () => {
    for (let account of accounts) {
      if (account.social_media === "LinkedIn") {
        try {
          const response = await fetch("/api/post/linkedin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: account.access_token,
              userId: account.user_id,
              content: "change the original post content",
            }),
          });

          const data = await response.json();
          console.log("Post created for account", account.user_id, data);

          // adding a delay of 10 seconds between posts to make sure linkedin will not consider them as repeated content
          await new Promise((resolve) => setTimeout(resolve, 10000));
        } catch (error) {
          console.error(
            "Error creating post for account",
            account.user_id,
            error
          );
        }
      }
    }
  };

  const handleLinkedInSignIn = () => {
    // Redirect to LinkedIn authentication page
    window.location.href = "/api/auth/linkedin";
  };

  const handleTwitterSignIn = () => {
    // Redirect to Twitter authentication page (to be implemented)
    window.location.href = "/api/auth/twitter";
  };

  const handleInstagramSignIn = () => {
    window.location.href = "/api/auth/instagram";
  };

  const handleFacebookSignIn = () => {
    initializeFacebookSDK();
  };

  const stackDirection = useBreakpointValue({ base: "column", md: "row" });

  ///////////////////// Facebook account authentication
  function initializeFacebookSDK() {
    function statusChangeCallback(response) {
      console.log(response);
      if (response.status === "connected") {
        // Logged into your webpage and Facebook.
        console.log(response.authResponse.accessToken);
        sendTokenToAPI(response.authResponse.accessToken); // Pass the access token
      } else {
        window.FB.login(
          function (response) {
            // handle the response
            console.log(response.authResponse.accessToken);
          },
          { scope: "public_profile,email" }
        );

        console.log(`User not authenticated ${response}`);
      }
    }

    function sendTokenToAPI(accessToken) {
      // Send the access token to your API
      const response = await fetch("/api/callback/facebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (typeof window !== "undefined") {
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      // Define window.fbAsyncInit
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1763236047458975",
          cookie: true,
          xfbml: true,
          version: "v17.0",
        });

        window.FB.getLoginStatus(function (response) {
          statusChangeCallback(response);
        });
      };
    }
  }

  // Call the function to initialize the Facebook SDK
  /////////////////////

  return (
    // <Box>
    //     <Text>Add your accounts</Text>
    //     {/* <Button onClick={getAccessToken}>LinkedIn</Button> */}
    //     <Button>
    //         <Link href="/api/linkedin_auth">
    //             Login with LinkedIn
    //         </Link>
    //     </Button>
    //     <Button>Twitter</Button>
    //     <Button onClick={createPosts}>
    //         Create Posts
    //     </Button>
    // </Box>

    <Box my={6}>
      <Flex justifyContent="center">
        <Stack direction={stackDirection} spacing={4} align="center">
          <Button
            onClick={handleLinkedInSignIn}
            leftIcon={
              <Image
                src="images/linkedin_icon.png"
                alt="LinkedinIcon"
                boxSize="24px"
              />
            }
            colorScheme="linkedin"
          >
            Connect LinkedIn
          </Button>
          <Button
            onClick={handleTwitterSignIn}
            leftIcon={
              <Image
                src="images/twitter_icon.png"
                alt="TwitterIcon"
                boxSize="24px"
              />
            }
            colorScheme="twitter"
          >
            Connect Twitter
          </Button>
          <Button
            onClick={handleInstagramSignIn}
            leftIcon={
              <Image
                src="images/instagram_icon.png"
                alt="InstagramIcon"
                boxSize="24px"
              />
            }
            colorScheme="pink"
          >
            Connect Instagram
          </Button>
          <Button
            onClick={handleFacebookSignIn}
            leftIcon={
              <Image
                src="images/facebook_icon.png"
                alt="FacebookIcon"
                boxSize="24px"
              />
            }
            colorScheme="facebook"
          >
            Connect Facebook
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
