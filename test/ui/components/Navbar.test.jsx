import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context";
import { Navbar } from "../../../src/ui/components/Navbar";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}) )

describe('Pruebas en Navbar.jsx', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Esteban',
            id: '123'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('Debe mostrar el nombre del usuario', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar  />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        screen.debug()

        expect(screen.getByText('Esteban')).toBeTruthy()

    });

    test('Debe llamar el logout y navigate cuando se hace click en el boton', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar  />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn= screen.getByRole('button');
        fireEvent.click(logoutBtn)

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {"replace": true});

    });


});