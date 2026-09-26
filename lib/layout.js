// Shared layout switch for all widgets.
// Übersicht ignores anything under /lib/, so this file is not loaded as a widget.
//
// Each widget keeps its big-screen layout as the default and adds a
// `compact(...)` block with overrides for smaller displays (e.g. a laptop).
// In "auto" mode the compact block is wrapped in a media query, so the layout
// is picked per display based on its logical width.

// "auto" | "large" | "compact"
export const MODE = "auto";

// Displays narrower than this (in logical px) get the compact layout.
// Big screen is ~2560 wide; a 14" MacBook is 1512 at default scaling.
export const COMPACT_MAX_WIDTH = 1900;

export function compact(css) {
  if (MODE === "large") return "";
  if (MODE === "compact") return css;
  return `@media (max-width: ${COMPACT_MAX_WIDTH}px) { ${css} }`;
}
