import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server';
import "@testing-library/jest-dom"

expect.extend(matchers);

// Set up mock service worker
server.events.on('request:start', ({ request }) => {
	console.log('MSW intercepted: ', request.method, request.url);
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//
afterEach(() => cleanup());
