import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en SearchPage.jsx', () => {
    beforeEach(() => jest.clearAllMocks() );

    
    test('Debe mostrarse correctamente con valores por defecto', () => {
        
        const { container } = render (
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )
        // screen.debug()
        expect(container).toMatchSnapshot()
    });

    test('Debe mostrar a Batman y el input con el valor del queryString', () => {
        
        render (
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )
        screen.debug()

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img= screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
        
        const alertDanger = screen.getByLabelText('alert-danger');
        expect(alertDanger.style.display).toBe("none");

    });

    test('Debe mostrar un error si no se encuentra el hero (bratman)', () => {

        render (
            <MemoryRouter initialEntries={['/search?q=bratman']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const alertDanger = screen.getByLabelText('alert-danger');
        expect(alertDanger.style.display).toBe('');
        
    });

    test('Debo llamar el navigate a la pantalla nueva', () => {

        const inputValue = 'superman'
        
        render (
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change( input, { target: {name: 'searchText', value: inputValue}} )

        const form = screen.getByRole('form')
        fireEvent.submit( form )

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${inputValue}`)
        
    });

});