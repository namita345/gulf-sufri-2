# Digital Menus hero — Tabikh + book sizing fix

This version changes **only** the Digital Menus hero image sizing and positioning:

- Tabikh's image dimensions now match its real 1150×996 source aspect ratio, preventing squashing.
- Both hero illustrations are around 25–30% smaller on desktop, each anchored to its own side of the hero artwork column.
- Their CSS height is auto and their proportions are preserved at desktop, tablet and mobile sizes.
- The speech bubble is repositioned nearer to Tabikh, clear of the menu book and header.
- Existing navigation, copy, other sections, effects, template hover fix and final CTA remain unchanged.

**Deploy:** Extract this ZIP as the Vercel project root, use the existing Vite settings (`npm run build`, output `dist`), and verify `/services/digital-menus` at desktop and mobile widths.
