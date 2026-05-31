# Week 04: Interactive Ecommerce Product Page

An interactive version of the sneaker product page from week 2. This project adds JavaScript for image sliding, quantity changes, cart updates, and cart dropdown behavior.

## Tech Used

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (`Outfit`)
- Local product images and SVG icons

## Project Structure

```text
week-04-interactive-ecommerce-product-page/
|-- assets/
|   |-- designs/
|   |   `-- desktop-design.jpg
|   `-- images/
|       |-- image-product-*.jpg
|       |-- image-product-*-thumbnail.jpg
|       |-- icon-*.svg
|       |-- image-avatar.png
|       `-- favicon-32x32.png
|-- index.html
|-- style.css
|-- script.js
`-- README.md
```

## Main Files

- `index.html`: Product page markup, slider image wrapper, cart dropdown, quantity buttons, and add-to-cart button.
- `style.css`: Responsive layout, image slider styling, active thumbnail state, cart dropdown, and product controls.
- `script.js`: Slider logic, thumbnail selection, cart dropdown toggle, quantity state, cart rendering, and delete-cart behavior.
- `assets/images/`: Product images, thumbnails, icons, avatar, and favicon.

## Features

- Product image slider with previous and next buttons.
- Clickable thumbnails with active styling.
- Quantity counter that prevents negative values.
- Add-to-cart behavior that moves the selected quantity into the cart.
- Cart badge showing the number of items.
- Cart dropdown with empty state, item total, checkout button, and delete button.
- Click-outside behavior to close the cart dropdown.

## How to Run

Open `index.html` directly in your browser, or use the VS Code Live Server extension.
