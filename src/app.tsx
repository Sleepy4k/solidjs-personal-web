import { DEV, onMount, Suspense, type Component } from "solid-js";
import { Router, type RouteSectionProps } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { routes } from "@/routes";
import Sidebar from "@components/sidebar";
import Navbar from "@components/navbar";
import Meta from "@contexts/meta";
import Github from "@contexts/github";
import { isServer } from "solid-js/web";
import { Toaster } from "solid-toast";
import Loader from "@components/loader";
import toastConfig from "@config/toaster";

const App: Component = () => {
  onMount(() => {
    if (!DEV || isServer) return;

    console.log("Initialising app...");

    new Promise((resolve) => setTimeout(resolve, 50)).then(() => {
      window.scrollTo(0, 0);
      console.log("App initialised!");
    });
  });

  return (
    <MetaProvider>
      <main>
        <Router
          root={(props: RouteSectionProps) => (
            <Suspense fallback={<Loader />}>
              <Meta.Provider>
                <Github.Provider>
                  <Toaster
                    gutter={8}
                    position="top-right"
                    toastOptions={toastConfig}
                  />
                  <Sidebar />
                  <div class="main-content">
                    <Navbar />
                    {props.children}
                  </div>
                </Github.Provider>
              </Meta.Provider>
            </Suspense>
          )}
        >
          {routes}
        </Router>
      </main>
    </MetaProvider>
  );
};

export default App;
