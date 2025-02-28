# BlackGround : An ATProto Social Media Implementation

An application (based on Statusphere example by ATProtocol) covering:

- Signin via OAuth
- Fetch information about users (profiles)
- Listen to the network firehose for new data
- Publish data on the user's account using a custom schema

And a somewhat functional social media which federates with the AT Protocol Network.

## Getting Started

```sh
git clone https://github.com/bluesky-social/statusphere-example-app.git
cd statusphere-example-app
cp .env.template .env
npm install
npm run dev
# Navigate to http://localhost:8080
```