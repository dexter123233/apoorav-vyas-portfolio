# Portfolio Design System

## Color Palette
- Primary: #3b82f6 (Blue-500)
- Secondary: #8b5cf6 (Indigo-500)
- Accent: #fde047 (Yellow-400)
- Background: #0f0f23 (Dark Navy)
- Surface: rgba(0,0,0,0.4) (Translucent Dark)
- Text: #ffffff (White)
- Muted Text: rgba(255,255,255,0.8) (Semi-transparent White)

## Typography
- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Heading Size: 24px (h1)
- Subheading Size: 18px (h2, h3)
- Body Size: 14px
- Caption Size: 12px
- Font Weight: 
  - Regular: 400
  - Medium: 500
  - Semi-bold: 600
  - Bold: 700

## Spacing
- Base Unit: 8px
- Small: 4px (0.5x)
- Medium: 8px (1x)
- Large: 16px (2x)
- Extra Large: 24px (3x)
- Section Padding: 32px (4x)
- Container Max Width: 1200px

## Border & Radius
- Border Radius: 
  - Small: 4px
  - Medium: 8px
  - Large: 12px
  - Pill: 20px
  - Circle: 50%
- Border Width:
  - Thin: 1px
  - Medium: 2px
  - Thick: 3px
- Border Color: rgba(255,255,255,0.08) (Subtle)

## Elevation/Shadows
- Shadow Small: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)
- Shadow Medium: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)
- Shadow Large: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)
- Shadow XL: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

## Component Styles
### Buttons
- Primary Button:
  - Background: #3b82f6
  - Text: #ffffff
  - Padding: 12px 24px
  - Border Radius: 6px
  - Font Weight: 600
  - Transition: all 0.2s ease
  - Hover: #2563eb
- Secondary Button:
  - Background: transparent
  - Border: 2px solid #3b82f6
  - Text: #3b82f6
  - Padding: 12px 24px
  - Border Radius: 6px
  - Font Weight: 600
  - Transition: all 0.2s ease
  - Hover: background: rgba(59, 130, 246, 0.1)

### Cards/Folders
- Folder Container:
  - Width: 80px
  - Height: 80px
  - Border Radius: 18px
  - Display: flex
  - Align Items: center
  - Justify Content: center
  - Box Shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2)
  - Transition: transform 0.15s, box-shadow 0.15s
  - Hover: 
    - Transform: scale(1.05)
    - Box Shadow: 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)
- Folder Icon:
  - Filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))
- Folder Text:
  - Color: #ffffff
  - Text Shadow: 2px 2px 5px rgba(0, 0, 0, 0.7)
  - Font Size: 14px
  - Text Align: center
  - Margin Top: 5px

## Responsive Behavior
- Mobile Breakpoint: 768px
- Tablet Breakpoint: 1024px
- Desktop Breakpoint: 1200px
- On Mobile:
  - Navbar Padding: 0 16px
  - Nav Links: hidden
  - Eyes Container: hidden
  - Social Icons Gap: 20px
  - Sticky Note: 
    - Left: 16px
    - Right: 16px
    - Width: auto
    - Top: 80px
  - Desktop Icons: scale(0.8)
  - Power Icon Left: 20%
  - Brag Item: 
    - Font Size: 12px
    - Padding: 6px 12px

## Design Guardrails
- Maintain 8px grid alignment for all elements
- Use consistent border radius language (never mix sharp and rounded in same component group)
- Ensure minimum 4:1 contrast ratio for text readability
- Limit color palette to defined colors only
- Use spacing multiples consistently
- Maintain visual hierarchy through size, color, and spacing
- Keep interactive elements minimum 44x44px touch target
- Use elevation to communicate depth and importance
- Maintain consistent animation duration (150-250ms)
