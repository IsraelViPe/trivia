import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import Login from '../pages/Login';
import App from '../App';

describe('if Login renders inputs fields', () => {
	it('checks if name input exist', () => {
		renderWithRouterAndRedux(<App />);
		const input = screen.getByRole('textbox', {
			name: /nome/i,
		});

		expect(input).toBeInTheDocument();
	});
	it('checks if email input exist', () => {
		renderWithRouterAndRedux(<App />);
		const input = screen.getByRole('textbox', {
			name: /email/i,
		});

		expect(input).toBeInTheDocument();
	});
	it('check if name and email are typped corectly on inputs', () => {
		renderWithRouterAndRedux(<App />);
		const inputEmail = screen.getByRole('textbox', {
			name: /email/i,
		});
		const inputName = screen.getByRole('textbox', {
			name: /nome/i,
		});

		userEvent.type(inputEmail, 'teste@teste.com');
		expect(inputEmail.value).toBe('teste@teste.com');

		userEvent.type(inputName, 'Fulaninho');
		expect(inputName.value).toBe('Fulaninho');
	});
	it('checks if redirect works', async () => {
		renderWithRouterAndRedux(<App />);

		const btn = screen.getByRole('button', { name: /play/i });
		expect(btn).toBeInTheDocument();
		const inputEmail = screen.getByRole('textbox', {
			name: /email/i,
		});
		const inputName = screen.getByRole('textbox', {
			name: /nome/i,
		});
		userEvent.type(inputEmail, 'teste@teste.com');
		userEvent.type(inputName, 'Fulaninho');
		userEvent.click(btn);
		const picture = screen.getByRole('img');
		expect(picture).toBeInTheDocument();
	});
	it('clicks on settings and redirect to /settings', () => {
		const { history } = renderWithRouterAndRedux(<App />);
		const btn = screen.getByRole('button', {
			name: /settings/i,
		});

		expect(btn).toBeInTheDocument();
		userEvent.click(btn);
		expect(history.location.pathname).toBe('/settings');
	});

	it('clicks on play and redirects to /game', async () => {
	// 	const { history } = renderWithRouterAndRedux(<App />);

	// 	const btn = screen.getByRole('button', { name: /play/i });
	// 	expect(btn).toBeInTheDocument();
	// 	const inputEmail = screen.getByRole('textbox', {
	// 		name: /email/i,
	// 	});
	// 	const inputName = screen.getByRole('textbox', {
	// 		name: /nome/i,
	// 	});
	// 	userEvent.type(inputEmail, 'teste@teste.com');
	// 	userEvent.type(inputName, 'Fulaninho');
	// 	userEvent.click(btn);
	// 	await waitFor(() => {
	// 		const picture = screen.getByRole('img');
	// 		expect(picture).toBeInTheDocument();
    //   expect(history.location.pathname).toBe('/game')
	// 	});
	});
});
