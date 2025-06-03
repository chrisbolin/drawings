import React from 'react';
import { createRoot } from 'react-dom/client';
import htm from '../external/htm.module.js';

const react = htm.bind(React.createElement);
const ReactDOM = { createRoot };

export { React, ReactDOM, react };
