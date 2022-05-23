import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Home = () => {

    return (
        <main>
            <LoginForm title={"Test Weather"} subTitle={"Sign in to your account"} />
            <Footer appName={"Test Weather"} creator={"Ronald Vezga"} />
        </main>
    )
}

export default Home;
