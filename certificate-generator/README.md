# Certificate Generator

This project is a web application that allows users to convert a Catholic name into a certificate format, complete with a QR code for validation. The application provides a user-friendly interface for inputting names and generating certificates.

## Project Structure

```
certificate-generator
├── index.html               # Main HTML document for the website
├── styles                   # Directory for CSS styles
│   ├── main.css             # Main styles for the website
│   └── certificate.css      # Styles specific to the certificate
├── scripts                  # Directory for JavaScript files
│   ├── main.js              # Main JavaScript logic for the website
│   ├── certificate-generator.js # Functions for generating the certificate
│   └── qr-code.js          # Functions for generating QR codes
├── assets                   # Directory for assets
│   ├── fonts                # Directory for font files
│   │   └── certificate-font.woff # Custom font for the certificate
│   └── templates            # Directory for HTML templates
│       └── certificate-template.html # Template for the certificate layout
├── libs                     # Directory for external libraries
│   └── qrcode.min.js       # Library for generating QR codes
└── README.md                # Documentation for the project
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd certificate-generator
   ```

2. **Open `index.html`** in your web browser to access the application.

3. **Ensure you have a local server** running if you encounter issues with loading local files, especially for QR code generation.

## Usage Guidelines

1. Enter the name you wish to convert in the provided input field.
2. Click the "Generate Certificate" button to create the certificate.
3. The generated certificate will be displayed along with a QR code for validation.
4. You can scan the QR code with a mobile device to verify the certificate.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.