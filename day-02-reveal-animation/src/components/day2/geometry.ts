/** [top, right, bottom, left] in viewport percent. Shared by the reveal and the hero frame so they line up. */
export type Insets = [number, number, number, number];

export const geometry = {
  desktop: { closed: [42, 40, 49, 40] as Insets, frame: [14, 4, 6, 4] as Insets },
  mobile: { closed: [44, 24, 50, 24] as Insets, frame: [12, 4, 26, 4] as Insets },
};
