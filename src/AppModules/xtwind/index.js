import * as twind from 'twind';
import { css, theme, screen } from 'twind/css';
import { styled } from '@twind/react';
import { lineClamp } from '@twind/line-clamp';

if (!window.twind) {
    console.warn('Twind is not set globally. This is not expected behavior. Check the Uniweb engine.');
    window.twind = twind;
}

// The tw function allows you to represent your styles in arrays, objects, template literals, functions, or any combination of these.
// The apply function can be used to define a collection of Twind classes that can later be overwritten in a tw call
const { tw, apply } = window.twind;

// css function allows you to write CSS within Twind and provides support for global styling.
// theme function can be used to access theme values inside of a css function call.
// styled function can create a styled a styled components, which is inspired by stitches.
// screen function allows you to create media queries that reference your Twind breakpoints by name (sm,md, etc.).
// the lineClamp function is to specify how many lines of text should be visible before truncating.
export { tw, css, apply, theme, styled, screen, lineClamp };
