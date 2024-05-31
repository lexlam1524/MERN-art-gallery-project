import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Art Gallery</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/artists">
            <li>Artists</li>
          </Link>
          <Link to="/artifacts">
            <li>Artifacts</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile">
                <li>
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <li>Sign In</li>
              </Link>
              <Link to="/sign-up">
                <li>Sign Up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
