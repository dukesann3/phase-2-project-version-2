
function Home() {
    return (
        <div style={{
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center'
        }}>
            <h1 style={{'marginTop': '5%'}}>WELCOME TO FLATSOCIAL</h1>
            <img src='./images/hashtag.jpg' alt='hashtag-image' style={{
                'width': '50%',
                'height': 'auto',
                'marginTop': '3%',
                'marginBottom': '3%'
            }}/>
        </div>
    );
}

export default Home;
