# Video Call Application

A modern, real-time video calling application built with Next.js, TypeScript, and ZEGO Cloud. This application enables users to create and join video call rooms with a beautiful, responsive UI.

## Features

- 🎥 Real-time video and audio calling
- 🔒 Secure room creation and joining
- 🎨 Modern UI with dark theme
- 📱 Responsive design for all devices
- 🔄 Room ID sharing functionality
- 🎯 One-on-one video calls
- 🎤 Camera and microphone controls
- 💬 Built-in text chat
- 📊 User list display
- 🖥️ Screen sharing capability

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Video SDK:** ZEGO Cloud
- **Icons:** Lucide Icons

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- ZEGO Cloud account and credentials

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/kstubhieeee/video-call.git
cd video-call
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your ZEGO Cloud credentials:
```env
NEXT_PUBLIC_ZEGO_APP_ID=your_app_id_here
NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_server_secret_here
NEXT_PUBLIC_ZEGO_SERVER_URL=your_server_url_here
NEXT_PUBLIC_ZEGO_APP_SIGN=your_app_sign_here
NEXT_PUBLIC_ZEGO_CALLBACK_SECRET=your_callback_secret_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Create a Room:**
   - Click the "Create" button to generate a random room ID
   - Share the room ID with others to join

2. **Join a Room:**
   - Enter the room ID
   - Enter your name
   - Click "Join Room"

3. **During the Call:**
   - Use the built-in controls to manage your camera and microphone
   - Share your screen if needed
   - Use the text chat feature
   - View other participants in the user list

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_ZEGO_APP_ID`: Your ZEGO Cloud App ID
- `NEXT_PUBLIC_ZEGO_SERVER_SECRET`: Your ZEGO Cloud Server Secret
- `NEXT_PUBLIC_ZEGO_SERVER_URL`: Your ZEGO Cloud Server URL
- `NEXT_PUBLIC_ZEGO_APP_SIGN`: Your ZEGO Cloud App Sign
- `NEXT_PUBLIC_ZEGO_CALLBACK_SECRET`: Your ZEGO Cloud Callback Secret

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ZEGO Cloud](https://www.zegocloud.com/) for providing the video SDK
- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
