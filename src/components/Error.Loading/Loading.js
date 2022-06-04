import Spinner from 'react-bootstrap/Spinner'
const Loading = () => {
    return (
        <>
            <div style={{
                backgroundColor: "rgba(0,0,0,0.61)", position: "fixed", width: "100vw", height: "100vh", zIndex: 998,
                top: 0, left: 0
            }}>
            </div>
            <Spinner animation="border" variant="info" style={{ position: "fixed", zIndex: 999, top: "50%", left: "50%" }} />
        </>

    );
};

export default Loading;
