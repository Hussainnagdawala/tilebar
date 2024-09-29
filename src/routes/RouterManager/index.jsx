// here your routing logic will come
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../index";
import { Wrappers } from "../../containers";
import { MemberLayout, VisitorLayout } from "../RouterLazyImports";
import { AppSpinner } from "../../common";
const Index = () => {
  return (
    <>
      <Wrappers>
        <Suspense fallback={<AppSpinner />}>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                path={route.path}
                element={
                  <VisitorLayout>
                    <route.component />
                  </VisitorLayout>
                }
                key={index}
              />
            ))}
            {privateRoutes.map((route, index) => (
              <Route
                path={route.path}
                element={
                  <MemberLayout>
                    <route.component />
                  </MemberLayout>
                }
                key={index}
              />
            ))}
          </Routes>
        </Suspense>
      </Wrappers>
    </>
  );
};
export default Index;
