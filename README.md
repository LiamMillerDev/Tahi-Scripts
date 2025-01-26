# Webflow Scripts

A collection of lightweight, performant utilities for Webflow projects.

## Usage

Include the desired feature in your Webflow project using jsDelivr CDN:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@latest/[feature-name].js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/LiamMillerDev/Tahi-Scripts@v1.0.0/[feature-name].js"></script>
```

## Available Features

Each feature is documented in its own directory under `src/features/`:

- `auto-tabs/` - Automatic tab rotation system
- [More features to be added]

## Development

1. Clone the repository
```bash
git clone https://github.com/LiamMillerDev/Tahi-Scripts.git
cd tahi-scripts
```

2. Install dependencies
```bash
npm install
```

3. Build the project
```bash
npm run build
```

## Feature Structure

Each feature follows a consistent structure:
- `feature-name.js` - Main implementation file
- `DOCS.md` - Usage documentation and examples
- `PLAN.md` - Feature planning and architecture notes

## Attribute Naming Convention
All custom attributes use the `ts-` prefix:
- `ts-price`: Price values
- `ts-type`: Type identifiers
- `ts-currency`: Currency format
- And so on...

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
