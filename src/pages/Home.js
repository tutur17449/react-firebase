import useAuth from '../hooks/useAuth'

const Home = () => {

    const { authentification } = useAuth()

    console.log(authentification)

    return (
        <h1> Welcome to firebase training !</h1>
    )
}

export default Home