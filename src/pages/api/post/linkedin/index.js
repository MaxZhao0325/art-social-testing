// pages/api/post.js
// this api posts the linkedin post for all linkedin selected accounts
import axios from 'axios';

// Apply the session middleware
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessToken, userId, content } = req.body;

    const postData = {
      author: `urn:li:person:${userId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    try {
      await axios.post('https://api.linkedin.com/v2/ugcPosts', postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'LinkedIn-Version': '202210',
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json({ message: 'Posted successfully!' });
    } catch (error) {
      console.error('Error posting to LinkedIn', error);
      res.status(500).json({ error: 'Error posting to LinkedIn' });
    }
  }
  // only alows POST method
  else {
    res.status(405).end(); // Method Not Allowed
  }
}
