# Final Year Group Blog

A collaborative blogging platform designed for final year project groups to share updates, insights, and progress on their projects.

![Final Year Group Blog](https://placeholder.svg?height=400&width=800)

## Features

- **User Authentication**: Secure login system with role-based access control (admin and member roles)
- **Blog Post Management**: Create, edit, publish, and delete blog posts
- **Markdown Support**: Write posts using Markdown with live preview
- **Tag System**: Organize posts with tags for better categorization
- **Search Functionality**: Search posts by title, content, or tags
- **Author Profiles**: Public author profiles with customizable "About Me" sections
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Admin Dashboard**: Manage users and content from a central dashboard

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS, shadcn/ui components
- **Markdown**: React Markdown with syntax highlighting

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas account)

## Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Ssaava/fyp-30-blog.git
   cd final-year-group-blog
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=group-blog
   JWT_SECRET=your_jwt_secret_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

   Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_jwt_secret_key` with a secure random string.

### Database Setup

1. Seed the database with initial data:
   \`\`\`bash
   npm run seed

   # or

   yarn seed
   \`\`\`

   This will create sample users and posts in your database:

   - Admin user: admin@example.com / admin123
   - Member users: member1@example.com, member2@example.com, etc. / member123

2. (Optional) Add the "about" field to existing users if you're migrating from an older version:
   \`\`\`bash
   node -r ts-node/register scripts/add-about-field.ts
   \`\`\`

### Running the Development Server

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Authentication

- Visit `/login` to sign in with your credentials
- After login, you'll be redirected to the dashboard

### Dashboard

- **My Posts**: View, edit, and manage your blog posts
- **Create Post**: Write new blog posts with Markdown support
- **Profile**: Edit your public profile information
- **Admin Panel**: Manage users (admin only)

### Blog

- The home page displays all published posts
- Use the sidebar to search, filter by author, or browse by tags
- Click on a post title to read the full post
- Click on an author's name to view their profile

## Project Structure

\`\`\`
final-year-group-blog/
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ ├── authors/ # Author profile pages
│ ├── dashboard/ # Dashboard pages
│ ├── login/ # Authentication pages
│ ├── posts/ # Blog post pages
│ └── ...
├── components/ # React components
├── lib/ # Utility functions and hooks
├── public/ # Static assets
├── scripts/ # Database scripts
└── ...
\`\`\`

## Default User Credentials

| Email               | Password  | Role   |
| ------------------- | --------- | ------ |
| admin@example.com   | admin123  | Admin  |
| member1@example.com | member123 | Member |
| member2@example.com | member123 | Member |
| member3@example.com | member123 | Member |
| member4@example.com | member123 | Member |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
