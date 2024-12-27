import AuthProvider from "./provider/authProvider";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;