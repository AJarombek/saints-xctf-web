### Overview

Containers for pages in the React application.  Each container represents a distinct URL (React Router route) in the 
webpage.

### Directories

| Directory Name        | Description                                                               |
|-----------------------|---------------------------------------------------------------------------|
| `Admin`               | `/admin` - Landing page for administrators.                               |
| `Dashboard`           | `/dashboard` - Dashboard page for signed in users.                        |
| `EditLog`             | `/log/edit/:id` - Page for users to edit existing logs.                   |
| `ForgotPassword`      | `/forgotpassword` - Page to request a forgot password code.               |
| `ForgotPasswordReset` | `/forgotpassword/reset` - Page to reset a password with a valid code.     |
| `Group`               | `/group/:id` - Page for a group.                                          |
| `GroupAdmin`          | `/admin/group/:id` - Admin page for a group.                              |
| `Home`                | `/` - Home page for non-signed in users.                                  |
| `Log`                 | `/log/view/:id` - Page to view a log and its comments.                    |
| `NewLog`              | `/log/new` - Page to create a new log.                                    |
| `Profile`             | `/profile/:username` - Profile page for a user.                           |
| `Register`            | `/register` - Registration page for new users.                            |
| `SignIn`              | `/signin` - Page for users to sign in.                                    |
| `Teams`               | `/teams` - Page for a list of teams and their corresponding groups.       |

### Resources

1) [Redux with React](https://redux.js.org/basics/usage-with-react)
2) [React-Redux Tutorial](https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013/)
3) [Redux Async Actions](https://redux.js.org/advanced/async-actions)
