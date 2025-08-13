require('@testing-library/jest-dom');

// Polyfill for TextEncoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Extend Jest matchers
expect.extend({
    toBeInTheDocument(received) {
        const pass = received !== null && received !== undefined;
        if (pass) {
            return {
                message: () => `expected ${received} not to be in the document`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be in the document`,
                pass: false,
            };
        }
    },
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
})); 