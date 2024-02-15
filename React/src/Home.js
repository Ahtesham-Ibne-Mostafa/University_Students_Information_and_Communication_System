const Home = () => {
    const handleClick = () => {
        // Add your desired functionality here
        console.log("Button clicked!");
    };

    return (
        <div className="Home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
};

export default Home;
