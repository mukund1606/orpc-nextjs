import { Suspense } from "react";
import { ClientTest } from "./_components/client-test";
import { ServerTest } from "./_components/server-test";

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <div className="flex gap-4">
        <p>Server Component:</p>
        <Suspense fallback={<div>Loading...</div>}>
          <ServerTest name="John Doe" />
        </Suspense>
      </div>
      <div className="flex gap-4">
        <p>Client Component:</p>
        <ClientTest name="John Doe" />
      </div>
    </div>
  );
};

export default Home;
