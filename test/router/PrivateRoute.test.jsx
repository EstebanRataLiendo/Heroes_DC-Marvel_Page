import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en PublicRoute.jsx', () => {

    test('Debe mostrar el children si está autenticado ', () => {

        Storage.prototype.setItem = jest.fn()
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Esteban',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta Privada')).toBeTruthy();

        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman")

    });

    test('Debe navegar si no está autenticado', () => {
        
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="/marvel" element={
                            <PrivateRoute>
                                <h1>Ruta Private</h1>
                            </PrivateRoute>
                        }/>

                        <Route path="/login" element={ <h1>Página Login</h1> } />
                        
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );
        screen.debug()
        expect( screen.getByText('Página Login')).toBeTruthy();

    });

});

