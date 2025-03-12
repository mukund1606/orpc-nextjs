import { Suspense } from "react";

import { ClientTest } from "./_components/client-test";
import { ServerHydratedComponent } from "./_components/hydrated-component";
// import { ServerTest } from "./_components/server-test";

const name = "John Doe";
const name2 = "John Doe 2";

const Home = async () => {
  return (
    <div>
      <h1>Hello World</h1>
      {/* <Suspense fallback={<div>Loading Server Component...</div>}>
        <div className="flex gap-4">
          <p>Server Component:</p>
          <ServerTest name={name} />
        </div>
      </Suspense> */}
      <Suspense fallback={<div>Loading Hydrated Client Component...</div>}>
        <ServerHydratedComponent name={name} />
      </Suspense>
      <div className="flex gap-4">
        <p>Client Component:</p>
        <ClientTest name={name2} />
      </div>
    </div>
  );
};

export default Home;
