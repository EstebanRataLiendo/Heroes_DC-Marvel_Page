import { Route, Routes } from "react-router-dom"
import { HeroesRoutes } from "../heroes"
import { LoginPage } from "../auth/pages/LoginPage"
import { PrivateRoute, PublicRoute } from "./"

export const AppRouter = () => {
    return (
    <>
        <Routes>
            

            <Route path="/login/*" element={
                <PublicRoute>
                    <Routes>
                        <Route path="/*" element={<LoginPage />} />
                    </Routes>
                </PublicRoute>
                }  
            />



            {/* protegemos esta ruta */}
            <Route path="/*" element={
                <PrivateRoute>
                    <HeroesRoutes />
                </PrivateRoute>
                }  
            />



        </Routes>
    </>
)
}
