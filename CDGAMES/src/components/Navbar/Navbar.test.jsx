import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
    // Test para verificar que todos los elementos se renderizan correctamente
    it('debe mostrar la marca, los links de navegación y los botones de login/registro', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Verifica el link de la marca
        const brandLink = screen.getByRole('link', { name: /cd games/i });
        expect(brandLink).toBeInTheDocument();
        expect(brandLink).toHaveAttribute('href', '/');

        // Verifica los links de navegación principal
        expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Productos' })).toHaveAttribute('href', '/productos');
        expect(screen.getByRole('link', { name: 'Nosotros' })).toHaveAttribute('href', '/nosotros');
        expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/contacto');
        expect(screen.getByRole('link', { name: /carrito/i })).toHaveAttribute('href', '/carrito');

        // Verifica los botones/links de Iniciar Sesión y Registrarse
        expect(screen.getByRole('button', { name: 'Iniciar Sesion' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();

        // Verifica que los botones de login/registro estén dentro de un link
        expect(screen.getByRole('link', { name: 'Iniciar Sesion' })).toHaveAttribute('href', '/login');
        expect(screen.getByRole('link', { name: 'Registrarse' })).toHaveAttribute('href', '/register');

        // Verifica el botón toggler de Bootstrap
        const toggler = screen.getByRole('button', { name: /toggle navigation/i });
        expect(toggler).toHaveAttribute('data-bs-toggle', 'collapse');
        expect(toggler).toHaveAttribute('data-bs-target', '#menuPrincipal');
    });

    // Test para verificar que la navegación funciona
    it('debe navegar a la página de productos al hacer click en el link correspondiente', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<><Navbar /><h1>Página de Inicio</h1></>} />
                    <Route path="/productos" element={<h1>Página de Productos</h1>} />
                </Routes>
            </MemoryRouter>
        );

        // El usuario hace click en el link "Productos"
        await user.click(screen.getByRole('link', { name: 'Productos' }));

        // Verifica que el contenido de la nueva página sea visible
        expect(await screen.findByRole('heading', { name: 'Página de Productos' })).toBeInTheDocument();
    });
});