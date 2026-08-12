# Havelyne Homes — Setup & Maintenance Guide

Welcome to the Havelyne Homes official website project!

## File Structure
- `index.html`: Site structure and markup
- `style.css`: Styles, layout, and mobile optimization
- `script.js`: Dynamic property search, modals, and inquiry auto-fill
- `README.md`: Administrative instructions
- `images/`: Image files (`hero.jpg`, `property-001.jpg`, etc.)

## Formspree Configuration
1. Go to [Formspree.io](https://formspree.io) and create a free account.
2. Create two forms:
   - Housing Request Form -> Send to `havelynehomes.rentals@outlook.com`
   - Property Submission Form -> Send to `havelynehomes.rentals@outlook.com`
3. Replace `YOUR_HOUSING_FORM_ID` and `YOUR_PROPERTY_FORM_ID` in `index.html` with your actual Formspree endpoint codes.

## Managing Listings
Open `script.js` and edit the `propertyData` array at the top of the file to add, edit, or remove listings.
