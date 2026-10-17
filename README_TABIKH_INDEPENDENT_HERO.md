# GulfSufra — Tabikh / Enchanted Book hero correction (v2)

Updated only the **Digital Menus hero** at `/services/digital-menus`.

## Why the earlier layout did not work
The original hero used two absolute-positioned images with wide clamp sizes and several competing responsive rules. Shrinking only the widths did not establish reliable separation.

## What is fixed
- Tabikh and the enchanted book now occupy **two independent grid columns** (new `.gdm-hero-figures` component); neither can sit on top of the other.
- Images retain their **natural aspect ratios**, use `height: auto`, and are significantly smaller.
- Both stand on the hero floor, below the navigation instead of disappearing behind it.
- The speech bubble is placed over the gap above Tabikh; the existing hero copy and buttons are preserved.
- Tested visual layout at 1600px, 1200px, 768px, and 390px widths. The two image bounds do not overlap and are below the header.

## Scope
Modified only:
- `src/pages/DigitalMenus.jsx` (hero artwork markup)
- `src/pages/digital-menus.css` (hero-only scoped rules)

All other page sections, navigation, assets, links, forms, and animation logic are unchanged.

## Deploy
Deploy this ZIP as the project root on Vercel. The Digital Menus hero has `data-gdm-hero-layout="independent-figures-v2"` in its DOM; if that marker is missing from the live page, an older deployment is still being served.
